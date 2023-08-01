const Controller = require("../../controller");
const createError = require("http-errors");
const { default: getVideoDurationInSeconds } = require("get-video-duration");
const { default: mongoose } = require("mongoose");
const path = require("path");

const { CourseModel } = require("../../../../models/course.model");
const { addEpisodeValidator, updateEpisodeValidator } = require("../../../validators/admin/course/episode.validator");
const { deleteFilesFromPublic } = require("../../../../utils/deleteFilesFromPublic");
const { deleteNullsFromObjects } = require("../../../../utils/deleteNullsFromObject");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");
const { secondsToTimeFormat } = require("../../../../utils/multer/secondsToTimeFormat");

class EpisodeController extends Controller {

    addEpisode = async (req, res, next) => {
        let { error } = addEpisodeValidator(req.body);
        if(error) {
            console.log(error);
            deleteFilesFromPublic(req.video);
            return next(createError.BadRequest(error.message));
        }
        
        let videoURL = `${process.env.BASE_URL}:${process.env.PORT}/${req.video}`;
        let seconds = await getVideoDurationInSeconds(videoURL);
        let durationTime = secondsToTimeFormat(seconds);
        const episodeData = {
            $push: {
                'chapters.$.episodes': {
                    title: req.body.title,
                    text: req.body.text,
                    type: req.body.type,
                    time: durationTime,
                    video: req.video
                }                
            }
        }
        const findQuery = {
            _id: req.body.courseId,
            'chapters._id': req.body.chapterId,
        }
        const updatedCourse = await CourseModel.findOneAndUpdate(findQuery, episodeData, {new: true});
        if( !updatedCourse ) {
            deleteFilesFromPublic(req.video);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Episode added to chapter successfully'
        });
    }

    removeEpisode = async (req, res, next) => {
        const { episodeId } = req.params;
        const { error } = objectIDValidator({id: episodeId});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const episodeData = {
            $pull: {
                'chapters.$.episodes': {
                    _id: episodeId
                }              
            }
        }
        const findQuery = {
            'chapters.episodes._id': episodeId,
        }
        const updatedCourse = await CourseModel.findOneAndUpdate(findQuery, episodeData, {new: true});
        if( !updatedCourse ) {
            deleteFilesFromPublic(req.video);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Episode removed from chapter successfully'
        });
    }

    updateEpisode = async (req, res, next) => {
        const { episodeId } = req.params;
        let { error } = updateEpisodeValidator(req.body);
        let { error: objectIdError } = objectIDValidator({id: episodeId});
        if(error || objectIdError) {
            console.log(error);
            deleteFilesFromPublic(req.video);
            return next(createError.BadRequest(error.message));
        }
        let time = null;
        let video = null;
        if(req.video) {
            let videoURL = `${process.env.BASE_URL}:${process.env.PORT}/${req.video}`;
            let seconds = await getVideoDurationInSeconds(videoURL);
            time = secondsToTimeFormat(seconds);
            video = req.video;
        }
        const data = {
            title: (req.body.title && req.body.title.trim().length > 0) ? req.body.title.trim() : null,
            text: (req.body.text && req.body.text.trim().length > 0) ? req.body.text.trim() : null,
            type: (req.body.type && req.body.type.trim().length > 0) ? req.body.type.trim() : null,
            time: time ? time : null,
            video: video ? video : null,
        }
        const blackListFields = ['_id'];
        deleteNullsFromObjects(data, blackListFields);
        const updateData = {
            $set: { 'chapters.$.episodes' : data }
        }
        const findQuery = {
            'chapters.episodes': { $elemMatch: { _id: new mongoose.Types.ObjectId(episodeId) } },
        }
        const updatedCourse = await CourseModel.findOneAndUpdate(findQuery, updateData, { new: true }).select({__v: 0});
        if( !updatedCourse ) {
            deleteFilesFromPublic(req.video);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Episode updated successfully'
        });
    }
}

module.exports = {
    EpisodeController: new EpisodeController(),
}
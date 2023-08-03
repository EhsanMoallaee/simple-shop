const createError = require("http-errors");
const Controller = require("../../controller");
const { CourseModel } = require("../../../../models/course.model");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");
const { getChaptersOfCourse } = require("./functions/getChaptersOfCourse");
const { getOneChapter } = require("./functions/getOneChapter");

class ChapterController extends Controller {

    addChapter = async (req, res, next) => {
        const {id, title, text } = req.body;
        const { error } = objectIDValidator({id: id});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const course = await CourseModel.findById(id);
        if(!course) return next(createError.NotFound('Course not found'));
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            { _id : id },
            { $push: { chapters : { title, text } } },
            { new: true }
        );
        if(!updatedCourse) {
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                updatedCourse
            }
        })
    }

    getAllChaptersOfOneCourse = async (req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const course = await getChaptersOfCourse(id);
        if(!course) return next(createError.NotFound('Course not found'));
        
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                course
            }
        })
    }

    removeChapter = async (req, res, next) => {
        const { chapterId } = req.params;
        const { error } = objectIDValidator({id: chapterId});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const chapter = await getOneChapter(chapterId);
        if(!chapter) return next(createError.NotFound('chapter not found'));   
        const updateQuery = {
            $pull: {
                chapters:{
                    _id: chapterId
                }
            }
        }
        const removeResult = await CourseModel.updateOne({_id: chapterId}, {updateQuery});
        if(removeResult.modifiedCount == 0) return next(createError.InternalServerError('Internal server error occured'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Chapter deleted successfully'
        })
    }

    updateChapter = async (req, res, next) => {
        const { chapterId } = req.params;
        const { error } = objectIDValidator({id: chapterId});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const chapter = await getOneChapter(chapterId);
        if(!chapter) return next(createError.NotFound('Chapter not found'));  
        let { title, text } = req.body;
        title = (title && title.trim().length > 0) ? title.trim() : chapter.title;
        text = (text && text.trim().length > 0) ? text.trim() : chapter.text;
        const updateQuery = {
            $set: {
                'chapters.$.title':  title,
                'chapters.$.text':  text 
            }
        }
        const updateResult = await CourseModel.updateOne({'chapters._id': chapterId}, updateQuery);
        if(updateResult.modifiedCount == 0) return next(createError.InternalServerError('Update failed'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Chapter updated successfully'
        })
    }

}

module.exports = {
    ChapterController: new ChapterController()
}
const createError = require("http-errors");
const Controller = require("../../controller");
const { CourseModel } = require("../../../../models/course.model");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");

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
            { $push: { chapters : { title, text, episodes: [] } } },
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
}

module.exports = {
    ChapterController: new ChapterController()
}
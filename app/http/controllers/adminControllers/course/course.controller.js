const createError = require("http-errors");
const { CourseModel } = require("../../../../models/course.model");
const Controller = require("../../controller");
const { addCourseValidator } = require("../../../validators/admin/course/course.validator");
const { deleteFilesFromPublic } = require("../../../../utils/deleteFilesFromPublic");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");

class CourseController extends Controller {

    getAllCourses = async (req, res, next) => {
        const { search } = req.query;
        const searchQuery = search ? { $text: { $search: new RegExp(search, 'ig')}} : {};
        const courses = await CourseModel.find(searchQuery)
        .populate([
            { path: 'category', select: {title: 1}},
            { path: 'teacher', select: {first_name: 1, last_name: 1, mobile: 1, email: 1}},
        ])
        .sort({ _id: -1}).lean({ virtuals: true})
        if(!courses || courses.length == 0) return next(createError.NotFound('Course not found'))
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                courses
            }
        })
    }

    addCourse = async (req, res, next) => {
        const { error } = addCourseValidator(req.body);
        if(error) {
            console.log(error);
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest(error.message));
        }
        const image = req.images[0];
        const teacher = req.user._id;
        const courseData = { ...req.body, image, teacher}
        if(courseData.type == 'FREE' && (courseData.price > 0 || courseData.discount > 0)) {
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest('Free type courses cant have price and discount greater than zero'));
        }
        const course = await CourseModel.create(courseData);
        if(!course || !course._id) {
            deleteFilesFromPublic(req.images);
            return next(createError.InternalServerError('Internal server error occured'));
        }
        return res.status(201).json({
            statusCode: 201,
            success: true,
            message: 'Course created successfully',
            data: {
                course
            }
        })
    }
    
    getCourseById = async (req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id: id});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const course = await CourseModel.findById(id);
        if(!course) return next(createError.NotFound('Course not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                course
            }
        })
    }   

}

module.exports = {
    CourseController: new CourseController()
}
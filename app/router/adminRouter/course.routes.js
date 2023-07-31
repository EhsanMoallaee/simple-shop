const { Router } = require('express');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { CourseController } = require('../../http/controllers/adminControllers/course.controller');
const adminCourseRouter = Router();

adminCourseRouter.post('/add', [imageUploader.single('image'), stringToArray('tags')], CourseController.addCourse);
adminCourseRouter.get('/list', CourseController.getAllCourses);
adminCourseRouter.get('/:courseId', CourseController.getCourseById);

module.exports = {
    adminCourseRouter,
}
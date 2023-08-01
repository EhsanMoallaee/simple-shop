const { Router } = require('express');
const { CourseController } = require('../../http/controllers/adminControllers/course/course.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const adminCourseRouter = Router();

adminCourseRouter.post('/add', [imageUploader.single('image'), stringToArray('tags')], CourseController.addCourse);
adminCourseRouter.get('/list', CourseController.getAllCourses);
adminCourseRouter.get('/:id', CourseController.getCourseById);
adminCourseRouter.patch('/update/:id', [imageUploader.single('image'), stringToArray('tags')], CourseController.updateCourse);

module.exports = {
    adminCourseRouter,
}
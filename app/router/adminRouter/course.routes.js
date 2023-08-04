const { Router } = require('express');
const { CourseController } = require('../../http/controllers/adminControllers/course/course.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { PERMISSIONS } = require('../../utils/constants');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const adminCourseRouter = Router();

adminCourseRouter.get('/list', CourseController.getAllCourses);
adminCourseRouter.get('/:id', CourseController.getCourseById);
adminCourseRouter.post(
    '/add',
    [checkPermission([PERMISSIONS.COURSE.CREATE]), imageUploader.single('image'), stringToArray('tags')],
    CourseController.addCourse
);
adminCourseRouter.patch(
    '/update/:id',
    [checkPermission([PERMISSIONS.COURSE.UPDATE]),imageUploader.single('image'), stringToArray('tags')],
    CourseController.updateCourse
);

module.exports = {
    adminCourseRouter,
}
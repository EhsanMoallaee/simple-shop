const { Router } = require('express');
const { BlogController } = require('../../http/controllers/adminControllers/blog/blog.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { PERMISSIONS } = require('../../utils/constants');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const adminBlogRouter = Router();

adminBlogRouter.get('/', BlogController.getAllBlogs);
adminBlogRouter.get('/:id', BlogController.getBlogById);
adminBlogRouter.post(
    '/add',
    [checkPermission([PERMISSIONS.BLOG.CREATE]), imageUploader.single('image'), stringToArray('tags')],
    BlogController.addBlog
);
adminBlogRouter.delete(
    '/:id',
    checkPermission([PERMISSIONS.BLOG.DELETE]),
    BlogController.deleteBlogById
);
adminBlogRouter.patch(
    '/update/:id',
    [checkPermission([PERMISSIONS.BLOG.UPDATE]), imageUploader.single('image'), stringToArray('tags')],
    BlogController.updateBlogById
);

module.exports = {
    adminBlogRouter,
}
const { Router } = require('express');
const { BlogController } = require('../../http/controllers/adminControllers/blog/blog.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const adminBlogRouter = Router();

adminBlogRouter.get('/', BlogController.getAllBlogs);
adminBlogRouter.post('/add', [imageUploader.single('image'), stringToArray('tags')], BlogController.addBlog);
adminBlogRouter.get('/:id', BlogController.getBlogById);
adminBlogRouter.delete('/:id', BlogController.deleteBlogById);
adminBlogRouter.patch('/update/:id', [imageUploader.single('image'), stringToArray('tags')], BlogController.updateBlogById);

module.exports = {
    adminBlogRouter,
}
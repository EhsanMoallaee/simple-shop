const { Router } = require('express');
const { adminCategoryRouter } = require('./category.routes');
const { adminBlogRouter } = require('./blog.routes');
const { adminProductRouter } = require('./product.routes');
const { adminCourseRouter } = require('./course.routes');
const adminRouter = Router();
/**
 * @swagger
 * tags:
 *   -  name: AdminPanel
 *   -  name: -Course
 *   -  name: -Product
 *   -  name: -Category
 *   -  name: -Blog
 */
adminRouter.use('/category', adminCategoryRouter);
adminRouter.use('/blogs', adminBlogRouter);
adminRouter.use('/products', adminProductRouter);
adminRouter.use('/courses', adminCourseRouter);

module.exports = {
    adminRouter,
}
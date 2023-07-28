const { Router } = require('express');
const { adminCategoryRouter } = require('./category.routes');
const { adminBlogRouter } = require('./blog.routes');
const { adminProductRouter } = require('./product.routes');
const adminRouter = Router();
/**
 * @swagger
 * tags:
 *   -  name: AdminPanel
 *   -  name: -Product
 *   -  name: -Category
 *   -  name: -Blog
 */
adminRouter.use('/category', adminCategoryRouter);
adminRouter.use('/blogs', adminBlogRouter);
adminRouter.use('/products', adminProductRouter);

module.exports = {
    adminRouter,
}
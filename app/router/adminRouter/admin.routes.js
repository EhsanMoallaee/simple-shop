const { Router } = require('express');
const { categoryRouter } = require('./category.routes');
const { blogRouter } = require('./blog.routes');
const adminRouter = Router();
/**
 * @swagger
 * tags:
 *   -  name: AdminPanel
 *   -  name: -Category
 *   -  name: -Blog
 */
adminRouter.use('/category', categoryRouter)
adminRouter.use('/blogs', blogRouter)

module.exports = {
    adminRouter,
}
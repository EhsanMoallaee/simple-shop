const { Router } = require('express');
const { adminBlogRouter } = require('./blog.routes');
const { adminCategoryRouter } = require('./category.routes');
const { adminChapterRouter } = require('./chapter.routes');
const { adminCourseRouter } = require('./course.routes');
const { adminEpisodeRouter } = require('./episode.routes');
const { adminProductRouter } = require('./product.routes');
const adminRouter = Router();

adminRouter.use('/category', adminCategoryRouter);
adminRouter.use('/blogs', adminBlogRouter);
adminRouter.use('/products', adminProductRouter);
adminRouter.use('/courses', adminCourseRouter);
adminRouter.use('/chapters', adminChapterRouter);
adminRouter.use('/episodes', adminEpisodeRouter);

module.exports = {
    adminRouter,
}
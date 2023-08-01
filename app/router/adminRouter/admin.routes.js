const { Router } = require('express');
const { adminCategoryRouter } = require('./category.routes');
const { adminBlogRouter } = require('./blog.routes');
const { adminProductRouter } = require('./product.routes');
const { adminCourseRouter } = require('./course.routes');
const { adminChapterRouter } = require('./chapter.routes');
const { adminEpisodeRouter } = require('./episode.routes');
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
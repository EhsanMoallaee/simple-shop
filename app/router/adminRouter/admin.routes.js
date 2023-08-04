const { Router } = require('express');
const { adminBlogRouter } = require('./blog.routes');
const { adminCategoryRouter } = require('./category.routes');
const { adminChapterRouter } = require('./chapter.routes');
const { adminCourseRouter } = require('./course.routes');
const { adminEpisodeRouter } = require('./episode.routes');
const { adminProductRouter } = require('./product.routes');
const { adminUserRouter } = require('./user.routes');
const { adminPermissionRouter } = require('./permission.routes');
const { adminRoleRouter } = require('./role.routes');
const { checkRole } = require('../../http/middlewares/role.guard');
const { ROLES } = require('../../utils/constants');
const adminRouter = Router();

adminRouter.use(
    '/category',
    checkRole([ROLES.ADMIN]),
    adminCategoryRouter
);
adminRouter.use(
    '/blogs',
    checkRole([ROLES.ADMIN, ROLES.TEACHER, ROLES.WRITER]),
    adminBlogRouter
);
adminRouter.use(
    '/products',
    checkRole([ROLES.ADMIN, ROLES.SUPPLIER]),
    adminProductRouter
);
adminRouter.use(
    '/courses',
    checkRole([ROLES.ADMIN, ROLES.TEACHER]),
    adminCourseRouter
);
adminRouter.use(
    '/chapters',
    checkRole([ROLES.ADMIN, ROLES.TEACHER]),
    adminChapterRouter
);
adminRouter.use(
    '/episodes',
    checkRole([ROLES.ADMIN, ROLES.TEACHER]),
    adminEpisodeRouter
);
adminRouter.use(
    '/users',
    checkRole([ROLES.ADMIN]),
    adminUserRouter
);
adminRouter.use(
    '/permissions',
    checkRole([ROLES.SUPERADMIN]),
    adminPermissionRouter
);
adminRouter.use(
    '/roles',
    checkRole([ROLES.SUPERADMIN]),
    adminRoleRouter
);

module.exports = {
    adminRouter,
}
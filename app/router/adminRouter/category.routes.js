const { Router } = require('express');
const { CategoryController } = require('../../http/controllers/adminControllers/category/category.controller');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const { PERMISSIONS } = require('../../utils/constants');
const adminCategoryRouter = Router();

adminCategoryRouter.get('/root-categories', CategoryController.getAllRootCategories);
adminCategoryRouter.get('/children/:parent', CategoryController.getChildrenOfCategory);
adminCategoryRouter.get('/all', CategoryController.getAllCategories);
adminCategoryRouter.get('/list-of-all', CategoryController.getAllCategoriesWithoutPopulate);
adminCategoryRouter.get('/:id', CategoryController.getCategoryById);
adminCategoryRouter.post(
    '/add',
    checkPermission([PERMISSIONS.CATEGORY.CREATE]),
    CategoryController.addCategory
);
adminCategoryRouter.delete(
    '/remove/:id',
    checkPermission([PERMISSIONS.CATEGORY.DELETE]),
    CategoryController.removeCategory
);
adminCategoryRouter.patch(
    '/update/:id',
    checkPermission([PERMISSIONS.CATEGORY.UPDATE]),
    CategoryController.updateCategory
);

module.exports = {
    adminCategoryRouter,
}
const { Router } = require('express');
const { CategoryController } = require('../../http/controllers/adminControllers/category/category.controller');
const adminCategoryRouter = Router();

adminCategoryRouter.post('/add', CategoryController.addCategory);
adminCategoryRouter.get('/root-categories', CategoryController.getAllRootCategories);
adminCategoryRouter.get('/children/:parent', CategoryController.getChildrenOfCategory);
adminCategoryRouter.get('/all', CategoryController.getAllCategories);
adminCategoryRouter.delete('/remove/:id', CategoryController.removeCategory);
adminCategoryRouter.get('/list-of-all', CategoryController.getAllCategoriesWithoutPopulate);
adminCategoryRouter.get('/:id', CategoryController.getCategoryById);
adminCategoryRouter.patch('/update/:id', CategoryController.updateCategory);

module.exports = {
    adminCategoryRouter,
}
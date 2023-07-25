const { Router } = require('express');
const { categoryRouter } = require('./category.routes');
const adminRouter = Router();
/**
 * @swagger
 * tags:
 *   -  name: AdminPanel
 *   -  name: Category
 */
adminRouter.use('/category', categoryRouter)

module.exports = {
    adminRouter,
}
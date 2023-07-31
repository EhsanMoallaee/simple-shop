const { Router } = require('express');
const homeController = require('../../http/controllers/generalControllers/home.controller');
const { verifyAccessToken } = require('../../http/middlewares/login.middleware');
const generalRouter = Router();
/**
 * @swagger
 * tags:
 *   name: Index
 *   description: Home page
 */
/**
 * @swagger
 * /:
 *  get:
 *      tags: [Index]
 *      summary: This is index route
 *      description: First page
 *      parameters:
 *          -   in: header 
 *              name: access-token
 *              example: Bearer <...your token...>           
 *      responses: 
 *          200:
 *              description: success
 *          400: 
 *              description: Not Found
 */

generalRouter.get('/', homeController.indexPage);

module.exports =  {
    generalRouter
};
const { Router } = require('express');
const homeController = require('../../http/controllers/generalControllers/home.controller');
const generalRouter = Router();

generalRouter.get('/', homeController.indexPage)

module.exports =  generalRouter;
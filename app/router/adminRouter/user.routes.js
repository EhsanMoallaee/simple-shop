const { Router } = require('express');
const { UserController } = require('../../http/controllers/adminControllers/user/user.controller');
const { imageUploader } = require('../../utils/multer/image.uploader');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const adminUserRouter = Router();

adminUserRouter.get('/list', UserController.getAllUsers);
adminUserRouter.patch('/update/:id', UserController.updateUserProfile);

module.exports = {
    adminUserRouter,
}
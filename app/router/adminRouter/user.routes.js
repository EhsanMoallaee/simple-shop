const { Router } = require('express');
const { UserController } = require('../../http/controllers/adminControllers/user/user.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { PERMISSIONS } = require('../../utils/constants');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const adminUserRouter = Router();

adminUserRouter.get(
    '/list',
    checkPermission([PERMISSIONS.USER.READ]),
    UserController.getAllUsers
);
adminUserRouter.patch(
    '/update/:id',
    checkPermission([PERMISSIONS.USER.UPDATE]),
    UserController.updateUserProfile
);
adminUserRouter.patch(
    '/set-permissions/:id',
    [checkPermission([PERMISSIONS.USER.SET_PERMISSION]), stringToArray('permissions')],
    UserController.setUserPermissions
);
adminUserRouter.get(
    '/data/:id',
    [checkPermission([PERMISSIONS.USER.FULL_DATA])],
    UserController.getFullUserData
);

module.exports = {
    adminUserRouter,
}
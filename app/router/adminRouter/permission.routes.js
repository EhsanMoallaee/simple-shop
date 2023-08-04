const { Router } = require('express');
const { PermissionController } = require('../../http/controllers/adminControllers/RBAC/permission.controller');
const { PERMISSIONS } = require('../../utils/constants');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const adminPermissionRouter = Router();

adminPermissionRouter.get('/list', PermissionController.getAllPermissions);
adminPermissionRouter.post(
    '/add',
    checkPermission([PERMISSIONS.PERMISSION.CREATE]),
    PermissionController.addPermission
);
adminPermissionRouter.delete(
    '/remove/:id',
    checkPermission([PERMISSIONS.PERMISSION.DELETE]),
    PermissionController.removePermission
);
adminPermissionRouter.patch(
    '/update/:id',
    checkPermission([PERMISSIONS.PERMISSION.UPDATE]),
    PermissionController.updatePermission
);

module.exports = {
    adminPermissionRouter
}
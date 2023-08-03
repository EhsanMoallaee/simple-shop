const { Router } = require('express');
const { PermissionController } = require('../../http/controllers/adminControllers/RBAC/permission.controller');
const adminPermissionRouter = Router();

adminPermissionRouter.get('/list', PermissionController.getAllPermissions);
adminPermissionRouter.post('/add', PermissionController.addPermission);
adminPermissionRouter.delete('/remove/:id', PermissionController.removePermission);
adminPermissionRouter.patch('/update/:id', PermissionController.updatePermission);

module.exports = {
    adminPermissionRouter
}
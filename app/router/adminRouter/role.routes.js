const { Router } = require('express');
const { RoleController } = require('../../http/controllers/adminControllers/RBAC/role.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const { PERMISSIONS } = require('../../utils/constants');
const { checkPermission } = require('../../http/middlewares/permission.guard');
const adminRoleRouter = Router();

adminRoleRouter.get(
    '/list',
    checkPermission([PERMISSIONS.ROLE.READ]),
    RoleController.getAllRoles
);
adminRoleRouter.post(
    '/add',
    [checkPermission([PERMISSIONS.ROLE.CREATE]), stringToArray('permissions')],
    RoleController.addRole
);
adminRoleRouter.delete(
    '/remove/:id',
    checkPermission([PERMISSIONS.ROLE.DELETE]),
    RoleController.removeRole
);
adminRoleRouter.patch(
    '/update/:id',
    [checkPermission([PERMISSIONS.ROLE.UPDATE]), stringToArray('permissions')],
    RoleController.updateRole
);

module.exports = {
    adminRoleRouter
}
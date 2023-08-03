const { Router } = require('express');
const { RoleController } = require('../../http/controllers/adminControllers/RBAC/role.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');
const adminRoleRouter = Router();

adminRoleRouter.get('/list', RoleController.getAllRoles);
adminRoleRouter.post('/add', [stringToArray('permissions')], RoleController.addRole);
adminRoleRouter.delete('/remove/:id', RoleController.removeRole);
adminRoleRouter.patch('/update/:id', [stringToArray('permissions')], RoleController.updateRole);

module.exports = {
    adminRoleRouter
}
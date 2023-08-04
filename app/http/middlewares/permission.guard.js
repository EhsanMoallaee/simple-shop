const createError = require("http-errors");
const { PermissionModel }  = require("../../models/permission.model");
const { PERMISSIONS } = require("../../utils/constants");

function checkPermission(requiredPermissions = []) {
    return async function(req, res, next) {
        const permissions = req.user.permissions;
        const userPermissions = await PermissionModel.find({_id: {$in: permissions}}, {title: 1, _id: 0});
        const userPermissionsTitles = userPermissions.map(permission => permission.title)
        const userRole = req.user.role;
        if(userRole === 'SuperAdmin' && userPermissionsTitles.includes(PERMISSIONS.ALL)) return next();
        const hasPermission = requiredPermissions.every(permission => { return userPermissionsTitles.includes(permission) });
        if(requiredPermissions.length == 0 || hasPermission) return next();
        return next(createError.Forbidden('You have not permission to access this route'));
    }
}

module.exports = {
    checkPermission,
}
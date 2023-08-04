const createError = require("http-errors");

function checkRole(requiredRoles = []) {
    return async function(req, res, next) {
        const userRole = req.user.role;
        const hasRole = requiredRoles.some(role => { return userRole.includes(role) });
        if(requiredRoles.length == 0 || hasRole) return next();
        return next(createError.Forbidden('You have not permission to access this route'));
    }
}

module.exports = {
    checkRole,
}
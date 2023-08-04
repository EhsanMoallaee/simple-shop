const createError = require("http-errors");
const Controller = require("../../controller");
const { RoleModel } = require("../../../../models/role.model");
const { addRoleValidator, updateRoleValidator } = require("../../../validators/admin/RBAC/role.validator");
const { checkPermissionsExist } = require("./functions/checkPermissionsExist");
const { deepCopyOfAnObject } = require("../../../../utils/deepCopyOfAnObject");
const { deleteNullsFromObjects } = require("../../../../utils/deleteNullsFromObject");
const { findRoleByTitle } = require("./functions/findRoleByTitle");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");

class RoleController extends Controller {

    getAllRoles = async (req, res, next) => {
        const roles = await RoleModel.find()//.populate([{path: 'permissions'}]);
        if(!roles || roles.length == 0) return next(createError.NotFound('Roles not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                roles
            }
        })
    }

    addRole = async (req, res, next) => {
        const { error } = addRoleValidator(req.body);
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const { title, description, permissions } = req.body;
        const roleExist = await findRoleByTitle(title);
        if(roleExist) return next(createError.BadRequest('Role with this title already exist'));
        const permissionsExist = await checkPermissionsExist(permissions);
        if(!permissionsExist) return next(createError.BadRequest('At least one permission for this role does not exist'));
        const role = await RoleModel.create({ title, description, permissions });
        if(!role) return next(createError.InternalServerError('Internal server error occured'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                role
            }
        })
    }

    removeRole = async (req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id});
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const role = await RoleModel.findByIdAndRemove(id);
        if(!role) return next(createError.InternalServerError('Role not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Role deleted successfully'
        })
    }

    updateRole = async (req, res, next) => {
        const { id } = req.params;
        let { error: objectIDError } = objectIDValidator({id});
        let { error } = updateRoleValidator(req.body);
        if(objectIDError || error) {
            console.log(error?.message || objectIDError?.message);
            return next(createError.BadRequest({dataError : error?.message, idError: objectIDError?.message}));
        }
        const data = deepCopyOfAnObject(req.body);
        deleteNullsFromObjects(data, []);
        const updateRole = await RoleModel.findByIdAndUpdate(id, {$set: data}, { new: true }).select({__v: 0});
        if(!updateRole) return next(createError.InternalServerError('Update failed'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Role updated successfully'
        })
    }
}

module.exports = {
    RoleController: new RoleController()
}
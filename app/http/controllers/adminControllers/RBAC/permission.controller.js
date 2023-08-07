const createError = require("http-errors");
const { PermissionModel } = require("../../../../models/permission.model");
const Controller = require("../../controller");
const { addPermissionValidator, updatePermissionValidator } = require("../../../validators/admin/RBAC/permission.validator");
const { deepCopyOfAnObject } = require("../../../../utils/deepCopyOfAnObject");
const { deleteNullsFromObjects } = require("../../../../utils/deleteNullsFromObject");
const { findPermissionByTitle } = require("./functions/findPermissionByTitle");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");

class PermissionController extends Controller {

    getAllPermissions = async (req, res, next) => {
        const permissions = await PermissionModel.find();
        if(!permissions || permissions.length == 0) return next(createError.NotFound('Permissions not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                permissions
            }
        })
    }

    addPermission = async (req, res, next) => {
        const { error } = addPermissionValidator(req.body);
        if(error) {
            console.log(error);
            return next(createError.BadRequest(error.message));
        }
        const { title, description } = req.body;
        const permissionExist = await findPermissionByTitle(title);
        if(permissionExist) return next(createError.Conflict('Permission with this title already exist'));
        const permission = await PermissionModel.create({ title, description });
        if(!permission) return next(createError.InternalServerError('Internal server error occured'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                permission
            }
        })
    }

    removePermission = async (req, res, next) => {
        const { id } = req.params;
        const { error } = objectIDValidator({id});
        if(error) {
            return next(createError.BadRequest(error.message));
        }
        const permission = await PermissionModel.findByIdAndRemove(id);
        if(!permission) return next(createError.InternalServerError('Permission not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Permission deleted successfully'
        })
    }

    updatePermission = async (req, res, next) => {
        const { id } = req.params;
        let { error: objectIDError } = objectIDValidator({id});
        let { error } = updatePermissionValidator(req.body);
        if(objectIDError || error) {
            return next(createError.BadRequest({dataError : error?.message, idError: objectIDError?.message}));
        }
        const data = deepCopyOfAnObject(req.body);
        deleteNullsFromObjects(data, []);
        const updateRole = await PermissionModel.findByIdAndUpdate(id, {$set: data}, { new: true }).select({__v: 0});
        if(!updateRole) return next(createError.InternalServerError('Update failed'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Permission updated successfully'
        })
    }
}

module.exports = {
    PermissionController: new PermissionController()
}
const createError = require("http-errors");
const { UserModel } = require("../../../../models/user.model");
const Controller = require("../../controller");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");
const { deleteNullsFromObjects } = require("../../../../utils/deleteNullsFromObject");
const { deepCopyOfAnObject } = require("../../../../utils/deepCopyOfAnObject");
const { updateUserValidator, setUserPermissionsValidator } = require("../../../validators/admin/user/user.validator");
const { PermissionModel } = require("../../../../models/permission.model");

class UserController extends Controller {

    getAllUsers = async (req, res, next) => {
        const { search } = req.query;
        const searchQuery = search ? { $text: { $search: new RegExp(search, 'ig')}} : {};
        const users = await UserModel.find(searchQuery, {__v: 0, password: 0, permissions: 0}).lean();
        if(!users || users.length == 0) return next(createError.NotFound('Users not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                users 
            }
        });
    }

    updateUserProfile = async (req, res, next) => {
        const userId = req.params.id;
        let { error: objectIDError } = objectIDValidator({id: userId});
        let { error } = updateUserValidator(req.body);
        if(objectIDError || error) {
            return next(createError.BadRequest({dataError : error?.message, idError: objectIDError?.message}));
        }
        const data = deepCopyOfAnObject(req.body);
        let blackListFields = ['mobile', 'otp', 'bills', 'discount_code', 'roles', 'courses', 'permissions']
        deleteNullsFromObjects(data, blackListFields);
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {$set: data}, {new: true});
        if(!updatedUser) return next(createError.NotFound('Internal server error occured'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'User updated successfully',
            updatedUser
        });
    }

    setUserPermissions = async (req, res, next) => {
        const { id } = req.params;
        let { error: objectIDError } = objectIDValidator({id});
        let { error } = setUserPermissionsValidator(req.body);
        if(objectIDError || error) {
            return next(createError.BadRequest({dataError : error?.message, idError: objectIDError?.message}));
        }
        const { permissions } = req.body;
        const foundPermissions = await PermissionModel.find({_id: {$in: permissions}}, {_id: 1});
        const updatedUser = await UserModel.findByIdAndUpdate(id, {$push: {permissions: foundPermissions}}, {new: true});
        if(!updatedUser) return next(createError.NotFound('Internal server error occured'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'User permissions updated successfully',
            updatedUser
        });
    }

    getFullUserData = async (req, res, next) => {
        const { id } = req.params;
        let { error } = objectIDValidator({id});
        if(error) {
            return next(createError.BadRequest({idError: error.message}));
        }
        const user = await UserModel.findById(id, {__v: 0, password: 0});
        if(!user) return next(createError.NotFound('User not found'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            data: {
                user
            }
        });
    }
}

module.exports = {
    UserController: new UserController()
}
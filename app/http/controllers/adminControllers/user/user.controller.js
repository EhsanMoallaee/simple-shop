const createError = require("http-errors");
const UserModel = require("../../../../models/user.model");
const Controller = require("../../controller");
const { objectIDValidator } = require("../../../validators/publicValidators/objectID.validator");
const { deleteNullsFromObjects } = require("../../../../utils/deleteNullsFromObject");
const { deepCopyOfAnObject } = require("../../../../utils/deepCopyOfAnObject");
const { updateUserValidator } = require("../../../validators/admin/user/user.validator");

class UserController extends Controller {
    getAllUsers = async (req, res, next) => {
        const { search } = req.query;
        const searchQuery = search ? { $text: { $search: new RegExp(search, 'ig')}} : {};
        const users = await UserModel.find(searchQuery).lean();
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
            console.log(error?.message || objectIDError?.message);
            deleteFilesFromPublic(req.images);
            return next(createError.BadRequest({dataError : error?.message, idError: objectIDError?.message}));
        }    
        const data = deepCopyOfAnObject(req.body);
        let blackListFields = ['mobile', 'otp', 'bills', 'discount_code', 'roles', 'courses']
        deleteNullsFromObjects(data, blackListFields);
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {$set: data}, {new: true});
        if(!updatedUser) return next(createError.NotFound('Internal server error occured'));
        return res.status(200).json({
            statusCode: 200,
            success: true,
            message: 'Course updated successfully',
            updatedUser
        });
    }
}

module.exports = {
    UserController: new UserController()
}
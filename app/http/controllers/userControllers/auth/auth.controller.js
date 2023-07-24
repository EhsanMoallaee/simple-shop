const createError = require('http-errors');
const { EXPIRES_IN, USER_ROLE } = require('../../../../utils/constants');
const { checkOtpValidator } = require('../../../validators/user/checkOtp.validator');
const { getOtpValidator } = require('../../../validators/user/getOtp.validator');
const { randomNumber } = require('../../../../utils/fiveDigitsRandomNumber');
const { UserModel } = require('../../../../models/user.model');
const { signAccessToken } = require('../../../../utils/signAndVerifyToken');

class UserAuthController {

    getOtp = async(req, res, next) => {
        const { error } = getOtpValidator(req.body);
        if(error) {
            return next(createError.BadRequest(error.message));
        }
        const {mobile} = req.body;
        const code = randomNumber();
        const result = await this.saveUser(mobile, code);
        if(!result) return next(createError.Unauthorized('Login failed'));
        return res.status(201).json({
            data: {
                statusCode: 201,
                message: 'Verification code sent to your mobile successfully',
                mobile,
                code
            }
        });
    }

    checkOtp = async(req, res, next) => {
        const { error } = checkOtpValidator(req.body);
        if(error) {
            return next(createError.BadRequest(error.message));
        }
        const {mobile, code} = req.body;
        const searchCondition = {
            mobile,
            'otp.code': code
        }
        const user = await UserModel.findOne(searchCondition);
        if(!user) {console.log(user); return next(createError.Unauthorized('Login failed'));}
        const now = Date.now();
        if(Number(user.otp.expiresIn) < now) return next(createError.Unauthorized('Code expired'));
        const payload = {
            mobile: user.mobile
        };
        const accessToken = await signAccessToken(payload);
        return res.status(200).json({
            data: {
                statusCode: 201,
                message: 'Login successfully',
                accessToken
            }
        });
    }

    saveUser = async(mobile, code) => {
        let otp = {
            code,
            expiresIn: EXPIRES_IN
        }
        const result = await this.checkUserExist(mobile);
        if(result) {
            return await this.updateUser(mobile, otp)
        }
        return !!(await UserModel.create({mobile, otp, roles: [USER_ROLE]}))
    }

    checkUserExist = async(mobile) => {
        const user = await UserModel.findOne({mobile});
        return !!user
    }

    updateUser = async(mobile, data = {}) => {
        Object.keys(data).forEach(key => {
            if(['', ' ', null, undefined, 0, '0', NaN].includes(data[key])) delete data[key];
        })
        console.log(data);
        const updatedUser = await UserModel.findOneAndUpdate(
            { mobile },
            { $set: {otp: data} },
        );
        return !!updatedUser;
    }
}
module.exports = {
    UserAuthController: new UserAuthController()
};
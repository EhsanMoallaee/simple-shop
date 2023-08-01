const createError = require('http-errors');
const Controller = require('../../controller');
const UserModel = require('../../../../models/user.model');
const { checkOtpValidator } = require('../../../validators/user/checkOtp.validator');
const { getOtpValidator } = require('../../../validators/user/getOtp.validator');
const { randomNumber } = require('../../../../utils/fiveDigitsRandomNumber');
const { ROLES } = require('../../../../utils/constants');
const { signAccessToken, verifyRefreshToken, signRefreshToken } = require('../../../../utils/signAndVerifyToken');

class UserAuthController extends Controller {

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
            statusCode: 201,
            message: 'Verification code sent to your mobile successfully',
            data: {
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
        const refreshToken = await signRefreshToken(mobile);
        return res.status(200).json({
            statusCode: 201,
            message: 'Login successfully',
            data: {
                accessToken,
                refreshToken
            }
        });
    }

    refreshToken = async(req, res, next) => {
        const { refreshToken } = req.body;
        const {mobile, user} = await verifyRefreshToken(refreshToken);
        const accessToken = await signAccessToken(mobile);
        const newRefreshToken = await signRefreshToken(mobile);
        return res.status(200).json({
            statusCode: 200,
            data: {
                accessToken,
                refreshToken: newRefreshToken
            }
        })
    }

    saveUser = async(mobile, code) => {
        let otp = {
            code,
            expiresIn: ( new Date().getTime() + 120000 )
        }
        const result = await this.checkUserExist(mobile);
        if(result) {
            return await this.updateUser(mobile, otp)
        }
        return !!(await UserModel.create({mobile, otp, roles: [ROLES.USER]}))
    }

    checkUserExist = async(mobile) => {
        const user = await UserModel.findOne({mobile});
        return !!user
    }

    updateUser = async(mobile, data = {}) => {
        Object.keys(data).forEach(key => {
            if(['', ' ', null, undefined, 0, '0', NaN].includes(data[key])) delete data[key];
        })
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
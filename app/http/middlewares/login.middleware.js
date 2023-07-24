const createError = require('http-errors');
const jwt = require('jsonwebtoken')
const { UserModel } = require('../../models/user.model');

function loginValidator(req, res, next) {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    const headers = req.headers;
    const [bearer, token] = headers?.['access-token']?.split(' ') || [];
    if(token && bearer?.toLowerCase() == 'bearer') {
        jwt.verify(token, secret, async (err, decoded) => {
            if(err) return next(createError.Unauthorized('Please login first1'));
            const { mobile } = decoded || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0, bills: 0, discount_code: 0});
            if(!user) return next(createError.Unauthorized('Please login first2'));
            req.user = user;
            return next();
        })
    }else {
        return next(createError.Unauthorized('Please login first'));
    }
}
module.exports = {
    loginValidator,
}
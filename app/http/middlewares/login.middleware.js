const createError = require('http-errors');
const jwt = require('jsonwebtoken')
const UserModel = require('../../models/user.model');

function getToken(headers) {
    const [bearer, token] = headers?.authorization?.split(' ') || [];
    if(token && bearer?.toLowerCase() == 'bearer') return token;
    throw createError.Unauthorized('Your account did\'t recognised,login first');
}

function verifyAccessToken(req, res, next) {
    try {
        const token = getToken(req.headers);
        const secret = process.env.ACCESS_TOKEN_SECRET;
        jwt.verify(token, secret, async (err, decoded) => {
            if(err) return next(createError.Unauthorized('Please login first1'));
            const {mobile} = decoded.payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0, bills: 0, discount_code: 0});
            if(!user) return next(createError.Unauthorized('Please login first2'));
            req.user = user;
            return next();
        })
    } catch (error) {
        console.log(error);
        return next(createError.Unauthorized('Please login first'));        
    }
}

function checkRole(role) {
    return function(req, res, next) {
        const user = req.user;
        if(user.roles.includes(role)) return next();
        return next(createError.Forbidden('You haven\'t right to access this route'));
    }
}

module.exports = {
    verifyAccessToken,
    checkRole
}
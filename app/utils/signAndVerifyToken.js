const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { UserModel } = require('../models/user.model');
const redisClient = require('./initRedis');

function signAccessToken(payload) {
    return new Promise(async (resolve,reject) => {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '180d'
        }
        jwt.sign({payload}, secret, options, (err, token) => {
            if(err) reject(createError.InternalServerError('Internal server error occured'));
            resolve(token);
        })
    })
}

function signRefreshToken(payload) {
    return new Promise(async (resolve, reject) => {
        const secret = process.env.REFRESH_TOKEN_SECRET;
        const options = {
            expiresIn: '1y'
        }
        jwt.sign({payload}, secret, options, async (err, token) => {
            if(err) reject(createError.InternalServerError('Internal server error occured'));
            await redisClient.SETEX(payload, (365 * 24 * 60 * 60), token);
            resolve(token);
        })
    })
}

function verifyRefreshToken(token) {
    const secret = process.env.REFRESH_TOKEN_SECRET;
    return new Promise((resolve, reject) => {
        jwt.verify(token, secret, async (err, decoded) => {
            if(err) reject(createError.Unauthorized('Please login first1'));
            const mobile = decoded.payload || {};
            const user = await UserModel.findOne({mobile}, {password: 0, otp: 0, bills: 0, discount_code: 0});
            if(!user) reject(createError.Unauthorized('Please login first2'));
            const refreshToken = await redisClient.get(user.mobile);
            if( token == refreshToken) return resolve({mobile, user});
            reject(createError.Unauthorized('Relogin with refresh token failed'));
        })
    })
}

module.exports = {
    signAccessToken,
    signRefreshToken,
    verifyRefreshToken
}
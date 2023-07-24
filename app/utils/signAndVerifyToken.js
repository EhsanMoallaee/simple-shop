const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const UserModel = require('../models/user.model');

function signAccessToken(payload) {
    return new Promise(async (resolve,reject) => {
        const secret = process.env.ACCESS_TOKEN_SECRET;
        const options = {
            expiresIn: '1h'
        }
        jwt.sign(payload, secret, options, (err, token) => {
            if(err) reject(createError.InternalServerError('Internal server error occured!'));
            resolve(token);
        })
    })
}

module.exports = {
    signAccessToken,
}
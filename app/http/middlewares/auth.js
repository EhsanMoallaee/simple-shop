const { UserModel } = require("../../models/user.model");

async function checkLogin(req, res, next) {
    try {
        const token = req.signedCookies['authorization'];
        if(token) {
            const user = await UserModel.findOne(
                { token },
                {password: 0, basket: 0, bills: 0, discount_code: 0, basket: 0, products: 0, courses: 0, permissions: 0, otp: 0}
            );
            if(user) {
                req.user = user;
                return next();
            }
        }
        return res.render('login.ejs', { error: 'You must login first'});
    } catch (error) {
        next(error);
    }
}

async function checkAccessLogin(req, res, next) {
    try {
        const token = req.signedCookies['authorization'];
        if(token) {
            const user = await UserModel.findOne(
                { token },
                {password: 0, basket: 0, bills: 0, discount_code: 0, basket: 0, products: 0, courses: 0, permissions: 0, otp: 0}
            );
            if(user) {
                req.user = user;
                return res.redirect('/support');
            }
        }
        return next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    checkLogin,
    checkAccessLogin
}
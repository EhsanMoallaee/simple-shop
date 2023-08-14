const createError = require("http-errors");
const { UserModel } = require("../../../models/user.model");
const { signAccessToken } = require("../../../utils/signAndVerifyToken");
const Controller = require("../controller");

class SupportController extends Controller {
    loginForm = (req, res, next) => {
        return res.render('login.ejs', {
            error: undefined
        });
    }

    login = async (req, res, next) => {
        const { mobile } = req.body;
        const user = await UserModel.findOne({ mobile });
        if(!user)  return res.render('login.ejs', {
            error: 'Authentiacation failed'
        })
        const token = await signAccessToken(user._id);
        user.token = token;
        await user.save();
        res.cookie(
            'authorization',
            token,
            {signed: true, httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 1)}
        );
        return res.redirect('/support');
    }

    renderChatRoom = (req, res, next) => {
        return res.render('chat.ejs');
    }
}

module.exports = {
    SupportController: new SupportController()
}
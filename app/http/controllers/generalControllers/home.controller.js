const createError = require('http-errors');
const { authValidator } = require('../../validators/user/auth.validator');
const Controller = require('../controller');

module.exports = new class HomeController extends Controller {

    indexPage = async (req, res, next) => {
        return res.status(200).json({
            message: 'Simple store index page'
        });
    }
}
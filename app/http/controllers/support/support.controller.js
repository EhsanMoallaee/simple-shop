const Controller = require("../controller");

class SupportController extends Controller {
    renderChatRoom = (req, res, next) => {
        return res.render('chat.ejs')
    }
}

module.exports = {
    SupportController: new SupportController()
}
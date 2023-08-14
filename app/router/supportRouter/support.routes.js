const { Router } = require('express');
const {SupportController} = require('../../http/controllers/support/support.controller');
const { checkLogin, checkAccessLogin } = require('../../http/middlewares/auth');
const { namespaceRouter } = require('./namespace.routes');
const { roomRouter } = require('./room.routes');
const supportRouter = Router();

supportRouter.use("/namespace", namespaceRouter);
supportRouter.use("/room", roomRouter);
supportRouter.get("/", [checkLogin], SupportController.renderChatRoom);
supportRouter.get("/login", [checkAccessLogin], SupportController.loginForm);
supportRouter.post("/login", [checkAccessLogin], SupportController.login);

module.exports = {
    supportRouter
}
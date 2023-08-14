const { Router } = require('express');
const {SupportController} = require('../../http/controllers/support/support.controller');
const { roomRouter } = require('./room.routes');
const { namespaceRouter } = require('./namespace.routes');
const supportRouter = Router();

supportRouter.use("/namespace", namespaceRouter);
supportRouter.use("/room", roomRouter);
supportRouter.get("/", SupportController.renderChatRoom);

module.exports = {
    supportRouter
}
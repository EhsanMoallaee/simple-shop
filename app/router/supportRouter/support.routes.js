const { Router } = require('express');
const {SupportController} = require('../../http/controllers/support/support.controller');
const supportRouter = Router();

supportRouter.get("/", SupportController.renderChatRoom)

module.exports = {
    supportRouter
}
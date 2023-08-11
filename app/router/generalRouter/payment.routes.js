const { Router } = require('express');
const { PaymentController } = require('../../http/controllers/generalControllers/payment.controller');
const { verifyAccessToken } = require('../../http/middlewares/login.middleware');
const paymentRouter = Router();

paymentRouter.post('/zarinPal/pay', verifyAccessToken, PaymentController.paymentGateway);
paymentRouter.get('/zarinPal/varify', PaymentController.verifyPayment);

module.exports =  {
    paymentRouter
};
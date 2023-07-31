const { Router } = require('express');
const { UserAuthController } = require('../../http/controllers/userControllers/auth/auth.controller');
const authRouter = Router();

authRouter.post('/get-otp', UserAuthController.getOtp);
authRouter.post('/check-otp', UserAuthController.checkOtp);
authRouter.post('/refresh-token', UserAuthController.refreshToken);

module.exports = {
    authRouter,
}
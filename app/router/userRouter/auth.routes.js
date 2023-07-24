const { Router } = require('express');
const { UserAuthController } = require('../../http/controllers/userControllers/auth/auth.controller');
const authRouter = Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication
 */
/**
 * @swagger
 * /user/get-otp:
 *   post:
 *     tags: [Authentication]
 *     summary: get-otp Page
 *     description: OTP get-otp
 *     parameters:
 *     -   name: mobile
 *         description: fa-IR mobile number
 *         in: formData
 *         required: true
 *         type: string
 *     responses: 
 *         201:
 *             description: Successfull get-otp
 *         400: 
 *             description: Bad request
 *         401: 
 *             description: get-otp failed - UnAuthenticated
 *         500: 
 *             description: Internal server error
 *
 */

authRouter.post('/get-otp', UserAuthController.getOtp);
/**
 * @swagger
 * /user/check-otp:
 *  post:
 *     tags: [Authentication]
 *     summary: check-otp value
 *     description: check and validate otp code (via sms and code expire is 2 min)
 *     parameters:
 *     -   name: mobile
 *         description: fa-IR mobile number
 *         in: formData
 *         required: true
 *         type: string
 *     -   name: code
 *         description: send otp code which is sent via sms
 *         in: formData
 *         required: true
 *         type: string
 *     responses: 
 *         201:
 *             description: Successfull get-otp
 *         400: 
 *             description: Bad request
 *         401: 
 *             description: get-otp failed - UnAuthenticated
 *         500: 
 *             description: Internal server error
 *
 *      
 */
authRouter.post('/check-otp', UserAuthController.checkOtp);
/**
 * @swagger
 * /user/refresh-token:
 *  post:
 *      tags: [Authentication]
 *      summary: Send refresh token to recieve new refresh token and access token
 *      description: New refresh token
 *      parameters:
 *      -   name: refreshToken
 *          in: body
 *          required: true
 *          type: string
 *      responses:
 *          200:
 *              description: Success
 */
authRouter.post('/refresh-token', UserAuthController.refreshToken);

module.exports = {
    authRouter,
}
const { Router } = require('express');
const bcrypt = require('bcrypt');
const { randomNumber } = require('../../utils/fiveDigitsRandomNumber');
const developerRouter = Router();
/**
 * @swagger
 * tags:
 *  name: Developer
 *  description: Developer routes
 */
/**
 *@swagger
 * /developer/password-hash/{password}:
 *  get:
 *      tags: [Developer]
 *      summary: Hash password
 *      description: This route hash password with bcrypt
 *      parameters:
 *      -   name: password
 *          in: path
 *          description: send password to get hash
 *          required: true
 *          type: string
 *      responses: 
 *          200:
 *              description: Successfull hash
 *
 */
developerRouter.get('/password-hash/:password', (req, res, next) => {
    const { password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)
    return res.send(hash);
})

/**
 *@swagger
 * /developer/random-number:
 *  get:
 *      tags: [Developer]
 *      summary: Get random number
 *      responses: 
 *          200:
 *              description: Successfull random number
 *
 */
developerRouter.get('/random-number', (req, res, next) => {
    const randomNum = randomNumber();
    return res.status(200).send(randomNum.toString());
})

module.exports = {
    developerRouter,
}
const { Router } = require('express');
const generalRouter = require('./generalRouter/index.routes');
const { authRouter } = require('./userRouter/auth.routes');
const router = Router();

router.use('/', generalRouter);
router.use('/user', authRouter);

module.exports = {
    router,
}
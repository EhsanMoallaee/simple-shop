const { Router } = require('express');
const { adminRouter } = require('./adminRouter/admin.routes');
const { authRouter } = require('./userRouter/auth.routes');
const { developerRouter } = require('./developerRouter/developer.routes');
const { generalRouter } = require('./generalRouter/index.routes');
const { verifyAccessToken } = require('../http/middlewares/login.middleware');
const router = Router();

router.use('/', generalRouter);
router.use('/developer', developerRouter);
router.use('/user', authRouter);
router.use('/admin', [verifyAccessToken], adminRouter);

module.exports = {
    router,
}
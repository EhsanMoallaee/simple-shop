const { Router } = require('express');
const { generalRouter } = require('./generalRouter/index.routes');
const { authRouter } = require('./userRouter/auth.routes');
const { developerRouter } = require('./developerRouter/developer.routes');
const { adminRouter } = require('./adminRouter/admin.routes');
const router = Router();

router.use('/', generalRouter);
router.use('/developer', developerRouter);
router.use('/user', authRouter);
router.use('/admin', adminRouter);

module.exports = {
    router,
}
const { Router } = require('express');
const { graphqlHTTP } = require('express-graphql');
const { adminRouter } = require('./adminRouter/admin.routes');
const { authRouter } = require('./userRouter/auth.routes');
const { developerRouter } = require('./developerRouter/developer.routes');
const { generalRouter } = require('./generalRouter/index.routes');
const { namespaceRouter } = require('./supportRouter/namespace.routes');
const { paymentRouter } = require('./generalRouter/payment.routes');
const { roomRouter } = require('./supportRouter/room.routes');
const { supportRouter } = require('./supportRouter/support.routes');
const { graphqlConfig } = require('../utils/graphql/graphql.config');
const { verifyAccessToken } = require('../http/middlewares/login.middleware');
const router = Router();

router.use('/', generalRouter);
router.use('/developer', developerRouter);
router.use('/payment', paymentRouter);
router.use('/namespace', namespaceRouter);
router.use('/room', roomRouter);
router.use('/support', supportRouter);
router.use('/user', authRouter);

router.use('/graphql', graphqlHTTP(graphqlConfig));
router.use('/admin', [verifyAccessToken], adminRouter);

module.exports = {
    router,
}
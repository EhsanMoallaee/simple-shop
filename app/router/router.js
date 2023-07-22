const { Router } = require('express');
const generalRouter = require('./generalRouter/index.routes');
const router = Router();

router.use('/', generalRouter);

module.exports = {
    router,
}
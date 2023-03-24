const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const prefix = '/api/v1/commnet'
const router = Router({prefix: prefix});

const comment = require('../models/comment');

router.get()
router.post()
router.del()

module.exports = router;
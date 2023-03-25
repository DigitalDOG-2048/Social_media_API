const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const prefix = '/api/v1/comment'
const router = Router({prefix: prefix});

const comment = require('../models/comment');

router.get('/get/:id([0-9]{1,})', comment.getComment)
router.post('/add', bodyParser(), comment.addComment)
router.del('/del/:id([0-9]{1,})', comment.delComment)

module.exports = router;
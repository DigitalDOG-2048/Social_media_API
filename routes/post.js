const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const prefix = '/api/v1/post'
const router = Router({ prefix: prefix });

const comment = require('../models/post');

router.get('/get', comment.getAllPost)
router.post('/add', bodyParser(), comment.addPost)
router.del('/del/:id([0-9]{1,})', comment.deletePost)

module.exports = router;
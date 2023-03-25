const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const prefix = '/api/v1/post'
const router = Router({ prefix: prefix });

const post = require('../models/post');

router.get('/get', post.getAllPost)
router.post('/add', bodyParser(), post.addPost)
router.del('/del/:id([0-9]{1,})', post.deletePost)

module.exports = router;
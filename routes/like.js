const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const prefix = '/api/v1/like';
const router = Router({prefix: prefix});

const like = require('../models/like');

router.get('/get/:id([0-9]{1,})', like.getLikes);
router.post('/addlike', bodyParser(), like.addLike);
router.del('/dislike', bodyParser(), like.disLike);

module.exports = router;
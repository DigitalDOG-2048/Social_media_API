const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/like';
const router = Router({prefix: prefix});

const like = require('../models/like');

router.get('/get/:id([0-9]{1,})', like.getLikes);
router.post('/addlike', auth,bodyParser(), like.addLike);
router.del('/dislike', auth, bodyParser(), like.disLike);

module.exports = router;
const Router = require('koa-router');
const auth = require('../controllers/auth')

const prefix = '/api/v1/like';
const router = Router({prefix: prefix});

const like = require('../models/like');

router.get('/get/:postId([0-9]{1,})', like.getLikes);
router.post('/:userId([0-9]{1,})/addlike/:postId([0-9]{1,})', like.addLike);
router.del('/:userId([0-9]{1,})/dislike/:postId([0-9]{1,})', like.disLike);

module.exports = router;
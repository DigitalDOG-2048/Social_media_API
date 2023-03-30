const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/comment'
const router = Router({prefix: prefix});

const comment = require('../models/comment');

router.get('/get/:postId([0-9]{1,})', comment.getComment)
router.post('/:userId([0-9]{1,})/add/:postId([0-9]{1,})', auth, bodyParser(), comment.addComment)
router.put('/update/:commentId([0-9]{1,})', auth, bodyParser(), comment.updateComment)
router.del('/del/:id([0-9]{1,})', auth, comment.delComment)

module.exports = router;
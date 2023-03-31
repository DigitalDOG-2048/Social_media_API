const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/comment'
const router = Router({prefix: prefix});

const comment = require('../models/comment');

const {validateAddComment, validateUpdateComment} = require('../controllers/validation')

router.get('/get/:postId([0-9]{1,})', comment.getComment)
router.post('/:userId([0-9]{1,})/add/:postId([0-9]{1,})', bodyParser(), validateAddComment, comment.addComment)
router.put('/update/:commentId([0-9]{1,})', bodyParser(), validateUpdateComment, comment.updateComment)
router.del('/del/:id([0-9]{1,})', comment.delComment)

module.exports = router;
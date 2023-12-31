const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/post'
const router = Router({ prefix: prefix });

const post = require('../models/post');

const {validateAddPost, validateUpdatePost} = require('../controllers/validation');

router.get('/get', post.getAllPost)
router.post('/add/:userId([0-9]{1,})', auth, bodyParser(), validateAddPost, post.addPost)
router.put('/update/:postId([0-9]{1,})', auth, bodyParser(),validateUpdatePost, post.updatePost)
router.del('/del/:postId([0-9]{1,})', auth, post.deletePost)

module.exports = router;
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/user'
const router =Router({prefix: prefix});

const user = require('../models/user');

router.get('/', auth, user.getAllUser);
router.post('/register', bodyParser(), user.register);
router.post('/login', bodyParser(), user.login)
router.post('/logout', auth, user.logout)

module.exports = router;
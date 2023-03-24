const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const prefix = '/api/v1/user'
const router =Router({prefix: prefix});

const user = require('../models/user');

router.get('/', user.getAllUser);
router.post('/register', bodyParser(), user.register);
router.post('/login', bodyParser(), user.login)

module.exports = router;
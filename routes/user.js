const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const prefix = '/api/v1/user'
const router = Router({ prefix: prefix });

const model = require('../models/user');

router.post('/register', bodyParser(), model.register);
router.post('/login', bodyParser(), model.login);

module.exports = router;
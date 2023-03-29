const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/user'
const router =Router({prefix: prefix});

const user = require('../models/user');

router.get('/', user.getAllUser);
router.post('/register', bodyParser(), user.register);
router.post('/login', bodyParser(), user.login)
router.post('/logout', user.logout)
router.put('/update/:userId([0-9]{1,})', bodyParser(), user.update);
router.del('/delete/:userId([0-9]{1,})', user.deleteUser)

module.exports = router;
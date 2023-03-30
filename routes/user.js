const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/user'
const router =Router({prefix: prefix});

const user = require('../models/user');

router.get('/', user.getAllUser);
router.post('/register', auth, bodyParser(), user.register);
router.post('/login', auth, bodyParser(), user.login)
router.post('/logout', auth, user.logout)
router.put('/update/:userId([0-9]{1,})', auth, bodyParser(), user.update);
router.del('/delete/:userId([0-9]{1,})', auth, user.deleteUser)

module.exports = router;
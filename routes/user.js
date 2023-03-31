const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const auth = require('../controllers/auth')

const prefix = '/api/v1/user'
const router =Router({prefix: prefix});

const user = require('../models/user');

const {validateLogin, validateUserRegister, validateUserUpdate} = require('../controllers/validation')

router.get('/', user.getAllUser);
router.post('/register', auth, bodyParser(), validateUserRegister, user.register);
router.post('/login', auth, bodyParser(), validateLogin, user.login)
router.post('/logout', auth, user.logout)
router.put('/update/:userId([0-9]{1,})', auth, bodyParser(), validateUserUpdate, user.update);
router.del('/delete/:userId([0-9]{1,})', auth, user.deleteUser)

module.exports = router;
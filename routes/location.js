const Router = require('koa-router');
const location = require("../Intergrations/LocationAPI")
const auth = require('../controllers/auth')

const prefix = '/api/v1/location'
const router = Router({ prefix: prefix });

router.get('/:ip_address', auth, location.getCurrentLocation)

module.exports = router;
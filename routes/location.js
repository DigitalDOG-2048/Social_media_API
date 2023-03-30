const Router = require('koa-router');
const location = require("../Intergrations/LocationAPI")

const prefix = '/api/v1/location'
const router = Router({ prefix: prefix });

router.get('/:ip_address', location.getCurrentLocation)

module.exports = router;
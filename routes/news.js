const Router = require('koa-router');
const news = require("../Intergrations/NewsAPI")
const auth = require('../controllers/auth')

const prefix = '/api/v1/news'
const router = Router({ prefix: prefix });

router.get('/live', news.getLiveNews)
router.get('/local/:country', news.getLocalNews)

module.exports = router;
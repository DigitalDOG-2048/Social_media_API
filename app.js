const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

const user = require('./routes/user.js');

app.use(user.routes());

module.exports = app;
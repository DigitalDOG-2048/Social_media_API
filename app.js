const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

const user = require('./routes/user.js');
const post = require('./routes/post.js');

app.use(user.routes());
app.use(post.routes());

module.exports = app;
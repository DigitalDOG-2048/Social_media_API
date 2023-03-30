const Koa = require('koa');
const cors = require('@koa/cors');
const app = new Koa();

app.use(cors());

//app.use(jwt({secret: 'secretkey', cookies:, debug: true}).unless({ path: [/login/] }));

const user = require('./routes/user.js');
const post = require('./routes/post.js');
const comment = require('./routes/comment.js');
const like = require('./routes/like.js');
const news = require('./routes/news.js');
const location = require('./routes/location')

app.use(user.routes());
app.use(post.routes());
app.use(comment.routes());
app.use(like.routes());
app.use(news.routes());
app.use(location.routes());

module.exports = app;
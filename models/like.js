const db = require('../helper/database')

exports.getLikes = async function getLikes(ctx) {

  const postId = ctx.params.postId;

  const query = 'SELECT COUNT(*) as likes FROM likes WHERE postID = ?';
  try {
    const result = await db.sql_query(query, postId);

    if (result.length === 0) {
      ctx.status = 404;
      ctx.body = {
        Message: 'Post not found'
      };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      Likes: result[0].likes,
      self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`,
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      Message: 'Something went wrong.'
    };
  }
};

exports.addLike = async function addLike(ctx) {

  const userId = ctx.params.userId;
  const postId = ctx.params.postId;
  const query = "SELECT * FROM likes WHERE userID=? AND postID=?";
  try {
    const like = await db.sql_query(query, [userId, postId]);
    console.log(like.length);
    if (like.length > 0) {
      ctx.status = 400;
      ctx.body = {
        Message: 'You have already liked this post'
      };
      return;
    }

    const new_query = "INSERT INTO likes SET userID=?, postID=?";
    await db.sql_query(new_query, [userId, postId]);
    ctx.status = 200;
    ctx.body = {
      PostID: postId,
      UserID: userId,
      Liked: true,
      Message: `You liked the post, with id:${userId}.`,
      self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`,
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      message: 'Something went wrong.'
    };
  }
};


exports.disLike = async function disLike(ctx) {
  const userId = ctx.params.userId;
  const postId = ctx.params.postId;
  const query = 'DELETE FROM likes WHERE userID = ? and postID = ? ';
  try {
    await db.sql_query(query, [userId, postId]);
    ctx.status = 200;
    ctx.body = {
      PostID: postId,
      UserID: userId,
      Liked: true,
      Message: 'You have removed your like from the post.',
      self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`,
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = {
      message: 'Something went wrong.'
    };
  }
};
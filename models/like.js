const db = require('../helper/database')

exports.getLikes = async function getLikes(ctx){
    const id = ctx.params.postId;   
    const query = "SELECT COUNT(*) as likes FROM likes WHERE postID = ?";
    const result = await db.sql_query(query, id);
    ctx.body = {
        Likes: result[0].Likes,
        self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    }
}


exports.addLike = async function addLike(ctx){
    const userId = ctx.params.userId;
    const postId = ctx.params.postId
    const query = "INSERT INTO likes SET userId=?, postId=?";
    await db.sql_query(query, [userId, postId])
    ctx.status = 200;
    ctx.body = {
        Message : `You liked the post, with id:${userId}.`,
        self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    }
}


exports.disLike = async function disLike(ctx){
    const userId = ctx.params.userId;
    const postId = ctx.params.postId
    const query = "DELETE FROM likes WHERE userID = ? and postID = ? ";
    await db.sql_query(query, [userId, postId]);
    ctx.status = 500;
    ctx.body = {
        Message: 'You have dislike the post.',
        self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    }

}
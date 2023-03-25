const db = require('../helper/database')

exports.getLikes = async function getLikes(ctx){
    const postID = ctx.params.id;   
    const query = "SELECT COUNT(*) as likes FROM likes WHERE postID = ?";
    const result = await db.sql_query(query, postID);
    ctx.body = result[0].likes;
}


exports.addLike = async function addLike(ctx){
    const body = ctx.request.body;
    const query = "INSERT INTO likes SET ?";
    await db.sql_query(query, body)
    ctx.status = 200;
    ctx.body = {
        Message : `You liked the post.`
    }
}


exports.disLike = async function disLike(ctx){
    const postID = ctx.request.body.postID;
    const userID = ctx.request.body.userID;
    const query = "DELETE FROM likes WHERE userID = ? and postID = ? ";
    await db.sql_query(query, [userID, postID]);
    ctx.status = 500;
    ctx.body = {
        Message: 'You dislike the post.'
    }

}
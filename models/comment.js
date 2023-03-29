const db = require('../helper/database')

exports.getComment = async function getComment(ctx) {
    const id = ctx.params.postId;
    const query = "SELECT * FROM comments WHERE postID = ?";
    const result = await db.sql_query(query, id);
    ctx.body = result;

}

exports.addComment = async function addComment(ctx) {
    const postId = ctx.params.postId;
    const userId = ctx.params.userId;
    Object.assign(ctx.request.body, {postId, userId})
    const body = ctx.request.body;
    console.log(body);
    const query = "INSERT INTO comments SET ?"
    const result = await db.sql_query(query, body)
    ctx.status = 200;
    ctx.body = {
        ID: result.insertId,
        Message: `You have commnet on post ${postId}`,
        Comment: body.comment,
    }
}

exports.delComment = async function delComment(ctx) {
    const id = ctx.params.id;
    const query = "DELETE FROM comments WHERE id = ?";
    await db.sql_query(query, id);
    ctx.status = 500;
    ctx.body = {
        id: id,
        Message: 'comment has been deleted',
    }
}

exports.updateComment = async function updateComment(ctx) {
    const id = ctx.params.commentId;
    const body = ctx.request.body;
    const query = "UPDATE comments SET? WHERE id = ?"
    console.log(body);
    try{
        await db.sql_query(query, [body, id]);
        ctx.status = 200;
        ctx.body = {
            Message: `You have update the comment with comment id:${id}`,
            newComment: body
        }
    }catch(error){
        ctx.status = 500;
        ctx.body = {
            Message: `can not update the comment with comment id:${id}`
        }
    }
}

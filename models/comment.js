const db = require('../helper/database')

exports.getComment = async function getComment(ctx) {
    const id = ctx.params.id;
    const query = "SELECT * FROM comments WHERE postID = ?";
    const result = await db.sql_query(query, id);
    ctx.body = result;

}

exports.addComment = async function addComment(ctx) {
    const body = ctx.request.body
    const query = "INSERT INTO comments SET ?"
    const result = await db.sql_query(query, body)
    ctx.status = 200;
    ctx.body = {
        ID: result.insertId,
        Message: `You have commnet on post ${body.postID}`,
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

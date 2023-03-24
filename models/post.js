const db = require('../helper/database')

exports.getAllPost = async function getAllPost(ctx) {
    const query = "SELECT * FROM posts"
    const result = await db.sql_query(query);
    ctx.body = {
        result
    };
}

exports.addPost = async function addPost(ctx) {
    const body = ctx.request.body;
    const query = "INSERT INTO posts SET ?"
    const result = await db.sql_query(query, body)
    ctx.status = 200;
    ctx.body = {
        ID: result.insertId,
        Message: `Post has been created`,
        Post: body.description,
    }
}

exports.deletePost = async function deletePost(ctx) {
    const id = ctx.params.id;
    const query = "DELETE FROM posts WHERE id = ?";
    const result = await db.sql_query(query, id);
    ctx.status = 500
    ctx.body = {
        id: id,
        Message: `post has been deleted`
    }
}
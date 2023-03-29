const db = require('../helper/database')

exports.getAllPost = async function getAllPost(ctx) {
    const query = "SELECT * FROM posts";
    const result = await db.sql_query(query);
    ctx.body = result;
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
exports.updatePost = async function updatePost(ctx){
    const id = ctx.params.postId;
    const body = ctx.request.body;
    const query = "UPDATE posts SET? WHERE id = ?"
    try{
        await db.sql_query(query, [body, id])
        ctx.status = 200;
        ctx.body = {
            Message: 'Post has been updated'
        }
    }catch(error){
        ctx.status = 500;
        ctx.body = {
            Message: "could not update the post"
        }
    }
}


exports.deletePost = async function deletePost(ctx) {
    const id = ctx.params.postId;
    const query = "DELETE FROM posts WHERE id = ?";
    await db.sql_query(query, id);
    ctx.status = 500
    ctx.body = {
        id: id,
        Message: `post has been deleted`
    }
}
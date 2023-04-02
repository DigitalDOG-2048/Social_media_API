const db = require('../helper/database')

exports.getAllPost = async function getAllPost(ctx) {
    const query = "SELECT * FROM posts";
    const result = await db.sql_query(query);
    ctx.status = 200;
    ctx.body = {
        result,
        Link: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
    }
}

exports.addPost = async function addPost(ctx) {
    const userId = ctx.params.userId
    Object.assign(ctx.request.body, {userId })
    const body = ctx.request.body;
    const query = "INSERT INTO posts SET ?"
    try {
        await db.sql_query(query, body)
        ctx.status = 201;
        ctx.body = {
            userId: body.userId,
            Message: `Post has been created`,
            Post: body.post,
            Link: "http://activeprize-cameraphantom-3000.codio-box.uk/api/v1/post/get"
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            Message: "unable to add post."
        }
    }
}
exports.updatePost = async function updatePost(ctx) {
    const id = ctx.params.postId;
    const body = ctx.request.body;
    const query = "UPDATE posts SET? WHERE id = ?"
    try {
        await db.sql_query(query, [body, id])
        ctx.status = 200;
        ctx.body = {
            id: id,
            Message: 'Post has been updated',
            body,
            Link: "http://activeprize-cameraphantom-3000.codio-box.uk/api/v1/post/get"
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            Message: "unable to update the post",
        }
    }
}


exports.deletePost = async function deletePost(ctx) {
    const id = ctx.params.postId;
    const query = "DELETE FROM posts WHERE id = ?";

    try {
        await db.sql_query(query, id);
        ctx.status = 200
        ctx.body = {
            id: id,
            deleted: true,
            Message: `post has been deleted`,
            Link: "http://activeprize-cameraphantom-3000.codio-box.uk/api/v1/post/get"
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {
            Message: "unable to delete the post"
        }
    }
}
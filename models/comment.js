const db = require('../helper/database')

exports.getComment = async function getComment(ctx) {
    const id = ctx.params.postId;
    const query = "SELECT * FROM comments WHERE postID = ?";
    try {
        const result = await db.sql_query(query, id);
        if (result.length) {
            console.log(`Success get commnet for post ${id}`);
            ctx.status = 200,
                ctx.body = {
                    result,
                    //self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
                }
        } else {
            ctx.status = 404,
                ctx.body = {
                    Message: "No comment found"
                }
        }
    } catch (error) {
        ctx.status = 500,
            ctx.body = {
                Message: "something went wrong"
            }
    }
}

exports.addComment = async function addComment(ctx) {
    try {
      const postId = ctx.params.postId;
      const userId = ctx.params.userId;
      Object.assign(ctx.request.body, { postId, userId })
      const body = ctx.request.body;
      const comment = body.comment;
  
      const query = 'INSERT INTO comments SET ?';
      const result = await db.sql_query(query, body);
  
      if (result.affectedRows > 0) {
        console.log(`user ${userId} try to add new comment to post ${postId}`);
        ctx.status = 200;
        ctx.body = {
          id: result.insertId,
          postID: postId,
          message: `Comment added to post ${postId}`,
          comment,
        };
      } else {
        console.error(`Post not found`);
        ctx.status = 404;
        ctx.body = {
          message: 'Post not found',
        };
      }
    } catch (error) {
      console.error(error);
      ctx.status = 500;
      ctx.body = {
        message: 'Failed to add comment',
      };
    }
  };

exports.delComment = async function delComment(ctx) {
    const id = ctx.params.id;
    const query = "DELETE FROM comments WHERE id = ?";
    try {
        const result = await db.sql_query(query, id);
        if (result.affectedRows > 0) {
            console.log(`comment ${id} has been deleted`);
            ctx.status = 200;
            ctx.body = {
                id: id,
                deleted: true,
                Message: 'comment has been deleted',
                self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
            };
        } else {
            ctx.status = 500;
            ctx.body = {
                Message: 'comment not found or already deleted'
            };
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            Message:  "something went wrong"
        };
    }
}

exports.updateComment = async function updateComment(ctx) {
    const id = ctx.params.commentId;
    const body = ctx.request.body;
    const query = "UPDATE comments SET? WHERE id = ?"
    console.log(body);
    try {
        await db.sql_query(query, [body, id]);
        console.log(`commnet ${id} has been update, new comment: ${body}`);
        ctx.status = 200;
        ctx.body = {
            Message: `You have update the comment with comment id:${id}`,
            newComment: body,
            //self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
        }
    } catch (error) {
        ctx.status = 500;
        ctx.body = {
            Message: `can not update the comment with comment id:${id}`,
            //self: `${ctx.protocol}://${ctx.host}${ctx.request.path}`
        }
    }
}

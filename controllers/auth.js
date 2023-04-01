/**
 * @module controllers/auth
 * @author Longhui Huang
 */

const jwt = require('jsonwebtoken');

/**
 * 
 * @param {object} ctx 
 * @param {function} next 
 */
const auth = async (ctx, next) => {
    const token = ctx.cookies.get("Token")
    try {
        jwt.verify(token, `secretkey`)
    }
    catch(error){
        ctx.status = 401
        ctx.body = {
            Code: 401,
            Message: `Unauthorised`,
            Request: `${ctx.method} ${ctx.path}`,
        }
        return
    }
    await next()
}
module.exports = auth

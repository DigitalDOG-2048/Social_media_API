const request = require('supertest')
const app = require('../app')

describe('get commnet', () => {
    it('this should get all comments', async () => {
        const res = await request(app.callback())
            .get('/api/v1/comment/get/1')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(200)
    })
    it('this should failed to get all comments', async () => {
        const res = await request(app.callback())
            .get('/api/v1/comment/get/10')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(404)
    })
    it('this should failed to get all comments', async () => {
        const res = await request(app.callback())
            .get('/api/v1/comment/get/10')
        expect(res.statusCode).toEqual(404)
    })
})

describe('add commnet', () => {
    it('this should add comment to the post', async () => {
        const res = await request(app.callback())
            .post('/api/v1/comment/1/add/1')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
            .send({
                comment: "test comment"
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('postID')
    })

    it('this should failed add comment', async () => {
        const res = await request(app.callback())
            .post('/api/v1/comment/1/add/10')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
            .send({
                comment: "test comment"
            })
        expect(res.statusCode).toEqual(404)
    })

    it('this should failed add comment', async () => {
        const res = await request(app.callback())
            .post('/api/v1/comment/1/add/1')
            .send({
                comment: "test comment"
            })
        expect(res.statusCode).toEqual(401)
    })
})

describe('edit commnet', () => {
    it('this should edit the comment of a post', async () => {
        const res = await request(app.callback())
            .put('/api/v1/comment/update/1')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
            .send({
                comment: "test comment"
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('updated', true)
    })
    it('this should faild to edit the comment of a post', async () => {
        const res = await request(app.callback())
            .put('/api/v1/comment/update/2')
            .send({
                comment: "test comment"
            })
        expect(res.statusCode).toEqual(401)
    })
})

describe('delete commnet', () => {
    it('this should delete the comment of a post', async () => {
        const res = await request(app.callback())
            .del('/api/v1/comment/del/2')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('deleted', true)
    })
    it('this should failed to delete the comment of a post', async () => {
        const res = await request(app.callback())
            .del('/api/v1/comment/del/3')
        expect(res.statusCode).toEqual(401)
    })
})
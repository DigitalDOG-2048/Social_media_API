const request = require('supertest')
const app = require('../app')

describe('Posts', () => {
    it('this should get all posts', async () => {
        const res = await request(app.callback())
            .get('/api/v1/post/get')
        expect(res.statusCode).toEqual(200)
        
    })
})

describe('add post', () => {
    it('this should allow user to add post', async () => {
        const res = await request(app.callback())
            .post('/api/v1/post/add/1')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
            .send({
                post: 'test post'
            })
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('userId')
        expect(res.body).toHaveProperty('Post')
    })
    it('this should failed to add post', async () => {
        const res = await request(app.callback())
            .post('/api/v1/post/add/1')
            .send({
                post: 'test post'
            })
        expect(res.statusCode).toEqual(401)
    })
})

describe('update post', () => {
    it('this should allow user to update post', async () => {
        const res = await request(app.callback())
            .put('/api/v1/post/update/6')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
            .send({
                post: 'test post'
            })
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('body')
    })
    it('this should failed to update post', async () => {
        const res = await request(app.callback())
            .put('/api/v1/post/update/6')
            .send({
                post: 'test post'
            })
        expect(res.statusCode).toEqual(401)
    })
})

describe('delete post', () => {
    it('this should allow user to delete post', async () => {
        const res = await request(app.callback())
            .del('/api/v1/post/del/6')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('id')
        expect(res.body).toHaveProperty('deleted', true)
    })
    it('this should failed to delete post', async () => {
        const res = await request(app.callback())
            .del('/api/v1/post/del/6')
        expect(res.statusCode).toEqual(401)

    })
})
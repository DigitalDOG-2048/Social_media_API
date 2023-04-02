const request = require('supertest')
const app = require('../app')

describe('get likes', () => {
    it('this should get the number of likes for the post', async () => {
        const res = await request(app.callback())
            .get('/api/v1/like/get/3')
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('Likes')
    })
    it('this should failed to get the likes', async () => {
        const res = await request(app.callback())
            .get('/api/v1/like/get/10')
        expect(res.statusCode).toEqual(404)
    })
})

describe('add likes', () => {
    it('this should allow user to like a post', async () => {
        const res = await request(app.callback())
            .post('/api/v1/like/1/addlike/1')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(201)
        expect(res.body).toHaveProperty('PostID')
        expect(res.body).toHaveProperty('UserID')
        expect(res.body).toHaveProperty('Liked', true)
    })
    it('this should get error when like the same post again', async () => {
        const res = await request(app.callback())
            .post('/api/v1/like/1/addlike/3')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(400)
    })
    it('this should failed to add like', async () => {
        const res = await request(app.callback())
            .post('/api/v1/like/1/addlike/2')
        expect(res.statusCode).toEqual(401)
    })
})

describe('remove likes', () => {
    it('this should allow use to remove like', async () => {
        const res = await request(app.callback())
            .del('/api/v1/like/1/dislike/1')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('PostID')
        expect(res.body).toHaveProperty('UserID')
        expect(res.body).toHaveProperty('disliked', true)
    })
    it('this should failed to remove like', async () => {
        const res = await request(app.callback())
            .del('/api/v1/like/1/dislike/2')
        expect(res.statusCode).toEqual(401)
    })
})
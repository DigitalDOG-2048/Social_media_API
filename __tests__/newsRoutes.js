const request = require('supertest')
const app = require('../app')

describe('get live news', () => {
    it('this should get live news', async () => {
        const res = await request(app.callback())
            .get('/api/v1/news/live')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result')
    })
    it('this should failed to get news', async () => {
        const res = await request(app.callback())
        .get('/api/v1/news/live')
        expect(res.statusCode).toEqual(401)
    })
})

describe('get local news', () => {
    it('this should failed to get news', async () => {
        const res = await request(app.callback())
            .get('/api/v1/news/local/agagasdfg')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(500)
    })
    it('this should local live news', async () => {
        const res = await request(app.callback())
            .get('/api/v1/news/local/gb')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result')
    })
    it('this should failed to get news', async () => {
        const res = await request(app.callback())
        .get('/api/v1/news/live')
        expect(res.statusCode).toEqual(401)
    })
})
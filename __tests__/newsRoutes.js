const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken');
const token = jwt.sign({}, "secretkey", { expiresIn: '1d' })
const Token = `Token=${token}`


describe('get live news', () => {
    it('this should get live news', async () => {
        const res = await request(app.callback())
            .get('/api/v1/news/live')
            .set("Cookie", Token)
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
            .set("Cookie", Token)
            expect(res.statusCode).toEqual(500)
    })
    it('this should local live news', async () => {
        const res = await request(app.callback())
            .get('/api/v1/news/local/gb')
            .set("Cookie", Token)
            expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result')
    })
    it('this should failed to get news', async () => {
        const res = await request(app.callback())
        .get('/api/v1/news/live')
        expect(res.statusCode).toEqual(401)
    })
})
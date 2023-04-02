const request = require('supertest')
const app = require('../app')

describe('get location based on ip address', () => {
    it('this should get location', async () => {
        const res = await request(app.callback())
            .get('/api/v1/location/167.98.216.130')
            .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result')
    })

    it('this should failed to get location', async () => {
        const res = await request(app.callback())
        .get('/api/v1/location/167.98.216')
        .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
        expect(res.statusCode).toEqual(500)
    })

    it('this should failed to get location', async () => {
        const res = await request(app.callback())
        .get('/api/v1/location/167.98.216')
        expect(res.statusCode).toEqual(401)
    })
})
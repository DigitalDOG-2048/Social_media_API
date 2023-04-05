const request = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken');
const token = jwt.sign({}, "secretkey", { expiresIn: '1d' })
const Token = `Token=${token}`


describe('get location based on ip address', () => {
    it('this should get location', async () => {
        const res = await request(app.callback())
            .get('/api/v1/location/167.98.216.130')
            .set("Cookie", Token)
            expect(res.statusCode).toEqual(200)
        expect(res.body).toHaveProperty('result')
    })

    it('this should failed to get location', async () => {
        const res = await request(app.callback())
        .get('/api/v1/location/167.98.216')
        .set("Cookie", Token)
        expect(res.statusCode).toEqual(500)
    })

    it('this should failed to get location', async () => {
        const res = await request(app.callback())
        .get('/api/v1/location/167.98.216')
        expect(res.statusCode).toEqual(401)
    })
})
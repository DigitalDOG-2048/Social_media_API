const request = require('supertest')
const app = require('../app')

describe('User', () => {
  it('should able to get all users', async () => {
    const res = await request(app.callback())
      .get('/api/v1/user/get')
      .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
    expect(res.statusCode).toEqual(200)
  })
  it('should failed to get all users', async () => {
    const res = await request(app.callback())
      .get('/api/v1/user/get')
    expect(res.statusCode).toEqual(401)
  })
})

describe('Register', () => {
  it('should register a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/register')
      .send({
        name: 'test',
        username: 'test_123',
        password: 'test_123',
        email: 'test_123@email.com'
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('ID')
    expect(res.body).toHaveProperty('registered', true)
  })

  it('should failed to register a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/register')
      .send({
        name: "test",
        username: 'danny',
        password: 'test_123',
        email: 'test_123@email.com'
      })
    expect(res.statusCode).toEqual(409)
  })

  it('should failed to register a new user', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/register')
      .send({
        username: 'test_123',
        password: 'test_123',
        email: 'test_123@email.com'
      })
    expect(res.statusCode).toEqual(400)
  })
})

describe('Login', () => {
  it('should allow user to login', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/login')
      .send({
        username: 'danny',
        password: 'password',
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('Login', true)
  })

  it('login faild', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/login')
      .send({
        username: 'danny',
        password: 'test_123',
      })
    expect(res.statusCode).toEqual(400)
  })
})

describe('Logout', () => {
  it('allow user to logout', async () => {
    const res = await request(app.callback())
      .post('/api/v1/user/logout')
      .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('Logout', true)
  })
})

describe('Update', () => {
  it('allow user to update', async () => {
    const res = await request(app.callback())
      .put('/api/v1/user/update/2')
      .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
      .send({
        password: 'test_12345'
      })
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('Updated', true)
  })

  it('this should not allow user to update', async () => {
    const res = await request(app.callback())
      .put('/api/v1/user/update/2')
      .send({
        password: 'test_12345'
      })
    expect(res.statusCode).toEqual(401)
  })
})

describe('Delete', () => {
  it('allow user to delete account', async () => {
    const res = await request(app.callback())
      .del('/api/v1/user/delete/2')
      .set("Cookie", "Token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6MSwiaWF0IjoxNjgwNDIwODUyLCJleHAiOjE2ODA1MDcyNTJ9.FrK5fYl6tmwbaxhJP8IYepUit5Z7V8F9p2ESQYEcpLw")
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('Deleted', true)
  })
  it('failed to deleted account', async () => {
    const res = await request(app.callback())
      .del('/api/v1/user/delete/2')
    expect(res.statusCode).toEqual(401)
  })
})

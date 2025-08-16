process.env.RATE_LIMIT_AUTH_WINDOW_MS = '1000';
process.env.RATE_LIMIT_AUTH_MAX = '2';
process.env.RATE_LIMIT_UPLOAD_WINDOW_MS = '1000';
process.env.RATE_LIMIT_UPLOAD_MAX = '2';

const request = require('supertest');
const app = require('../src/app');

describe('Rate limit', () => {
  it('bloqueia após exceder tentativas de login', async () => {
    await request(app).post('/api/v1/auth/login').send({});
    await request(app).post('/api/v1/auth/login').send({});
    const res = await request(app).post('/api/v1/auth/login').send({});
    expect(res.status).toBe(429);
    expect(res.body).toEqual({ message: 'Limite de requisições atingido. Tente novamente mais tarde.' });
    expect(res.headers['ratelimit-limit']).toBeDefined();
    expect(res.headers['ratelimit-remaining']).toBeDefined();
  });
});

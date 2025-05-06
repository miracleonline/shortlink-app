// Imports
const request = require('supertest');
const app = require('../app');


describe('URL Shortener API', () => {
  // Encode endpoint test
  it('should encode a long URL', async () => {
    const res = await request(app)
      .post('/api/encode')
      .send({ longUrl: 'https://indicina.co' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('shortUrl');
  });
  // Decode endpoint test
  it('should decode a short URL', async () => {
    const encodeRes = await request(app)
      .post('/api/encode')
      .send({ longUrl: 'https://indicina.co' });

    const res = await request(app)
      .post('/api/decode')
      .send({ shortUrl: encodeRes.body.shortUrl });

    expect(res.statusCode).toBe(200);
    expect(res.body.longUrl).toBe('https://indicina.co');
  });
  // Statistics Endpoint test
  it('should return stats for a short URL', async () => {
    const encodeRes = await request(app)
      .post('/api/encode')
      .send({ longUrl: 'https://indicina.co' });

    const shortId = encodeRes.body.shortUrl.split('/').pop();

    const res = await request(app).get(`/api/stats/${shortId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('visits');
    expect(res.body).toHaveProperty('createdAt');
  });
});

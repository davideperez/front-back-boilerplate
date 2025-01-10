import request from 'supertest'; // For testing HTTP endpoints
import app from '../src/index.ts';   // Import your Express app

describe('User Endpoints', () => {
  it('should fetch all users', async () => {
    const res = await request(app).get('/users');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should create a new user', async () => {
    const res = await request(app).post('/users').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@example.com',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
  });
});

import { request } from './setup';

describe('Auth API', () => {
  it('should register a user', async () => {
    const res = await request.post('/api/auth/register').send({
      name: 'Janki Patel',
      email: 'janki@example.com',
      password: 'janki123',
    });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('token');
  });

  it('should login a user', async () => {
    await request.post('/api/auth/register').send({
      name: 'Janki Patel',
      email: 'janki@example.com',
      password: 'janki123',
    });

    const res = await request.post('/api/auth/login').send({
      email: 'janki@example.com',
      password: 'janki123',
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('should not login with invalid credentials', async () => {
    const res = await request.post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'testpassword',
    });
    expect(res.status).toBe(400);
  });
});

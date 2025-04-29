import { request } from './setup';

let token: string;

beforeEach(async () => {
  const res = await request.post('/api/auth/register').send({
    name: 'Janki Patel',
    email: 'janki1@example.com',
    password: 'janki1234',
  });
  token = res.body.token;
});

describe('Category API', () => {
  it('should create a category', async () => {
    const res = await request
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Electronics' });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Electronics');
  });

  it('should fetch categories in tree format', async () => {
    await request
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Electronics' });

    const res = await request
      .get('/api/category')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a category and deactivate children', async () => {
    const parent = await request
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Electronics' });

    const child = await request
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Laptops', parent: parent.body._id });

    const update = await request
      .put(`/api/category/${parent.body._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'inactive' });

    expect(update.body.status).toBe('inactive');

    const childFetch = await request
      .get('/api/category')
      .set('Authorization', `Bearer ${token}`);

    expect(childFetch.body[0].children[0].status).toBe('inactive');
  });

  it('should delete a category and reassign subcategories', async () => {
    const parent = await request
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Electronics' });

    const child = await request
      .post('/api/category')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Phones', parent: parent.body._id });

    const del = await request
      .delete(`/api/category/${parent.body._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(del.status).toBe(200);

    const res = await request
      .get('/api/category')
      .set('Authorization', `Bearer ${token}`);

    expect(res.body[0].parent).toBe(null);
  });
});

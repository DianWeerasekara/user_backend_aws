import request from 'supertest';
import app from '../app'; // Assuming your server file is named 'server.js'

describe('CRUD API Tests', () => {
  let itemId;

  // Test POST /user
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/user')
      .send({ name: 'Test User', description: 'This is a test user' });

    expect(res.status).toBe(201);
    itemId = res.body.insertId;
  });

  // Test GET /items
  it('should retrieve all items', async () => {
    const res = await request(app)
      .get('/user');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  // Test PUT /user/:id
  it('should update an existing user', async () => {
    const res = await request(app)
      .put(`/user/${itemId}`)
      .send({ name: 'Updated User', description: 'This user has been updated' });

    expect(res.status).toBe(200);
  });

  // Test DELETE /user/:id
  it('should delete the user', async () => {
    const res = await request(app)
      .delete(`/user/${itemId}`);

    expect(res.status).toBe(200);
  });
});

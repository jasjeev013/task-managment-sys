const chai = require('chai');
const expect = chai.expect;

const request = require('supertest');
const app = require('../index');
const User = require('../models/User');
const Task = require('../models/Task');
const { connectDB, disconnectDB } = require('../config/db');

describe('Task Management API', () => {
  before(async () => {
    await connectDB();
  });

  after(async () => {
    await disconnectDB();
  });

  beforeEach(async () => {
    await User.deleteMany({});
    await Task.deleteMany({});
  });

  describe('Authentication', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: '123456',
          role: 'admin'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('token');
    });

    it('should login an existing user', async () => {
      // ✅ First register the user
      await request(app)
        .post('/api/v1/auth/register')
        .send({
          email: 'test@example.com',
          password: '123456',
          role: 'user'
        });

      // ✅ Then try to login
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'test@example.com',
          password: '123456'
        });

      expect(res.statusCode).to.equal(200);
      expect(res.body).to.have.property('token');
    });
  });


  // Add more tests for users and tasks
});
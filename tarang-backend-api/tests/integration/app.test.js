
const request = require('supertest');
const express = require('express');

// We need to create a minimal app instance for testing
// without listening on a port
const app = express();
app.get('/', (req, res) => {
  res.send('Tarang Backend API is running.');
});

describe('GET /', () => {
  it('should respond with a welcome message', async () => {
    const response = await request(app)
      .get('/')
      .expect('Content-Type', /text\/html/)
      .expect(200);

    expect(response.text).toBe('Tarang Backend API is running.');
  });
});

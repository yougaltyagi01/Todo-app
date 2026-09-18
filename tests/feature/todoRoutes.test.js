const express = require('express');
const request = require('supertest');

const todoRoutes = require('../../routes/todoRoutes');
const { clearCache } = require('../../middleware/cache');

describe('Todo API routes', () => {

  let app;
  let todos;

  beforeEach(() => {
    todos = [];

    app = express();

    app.use(express.json());

    app.use('/api/todos', todoRoutes(todos));

    clearCache();
  });

  test('GET /api/todos should return todos', async () => {
    todos.push({
      id: 1,
      text: 'Learn Jest',
      completed: false
    });

    const response = await request(app)
      .get('/api/todos');

    expect(response.status).toBe(200);

    expect(response.body).toEqual([
      {
        id: 1,
        text: 'Learn Jest',
        completed: false
      }
    ]);
  });

  test('POST /api/todos should create a todo', async () => {
    const response = await request(app)
      .post('/api/todos')
      .send({
        text: 'Learn Supertest'
      });

    expect(response.status).toBe(201);

    expect(response.body.text).toBe('Learn Supertest');
    expect(response.body.completed).toBe(false);
  });

  test('PUT /api/todos/:id should update a todo', async () => {
    todos.push({
      id: 1,
      text: 'Learn Jest',
      completed: false
    });

    const response = await request(app)
      .put('/api/todos/1')
      .send({
        completed: true
      });

    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  test('DELETE /api/todos/:id should delete a todo', async () => {
    todos.push({
      id: 1,
      text: 'Learn Jest',
      completed: false
    });

    const response = await request(app)
      .delete('/api/todos/1');

    expect(response.status).toBe(200);

    expect(response.body.message).toBe('Todo deleted');

    expect(todos).toHaveLength(0);
  });

});
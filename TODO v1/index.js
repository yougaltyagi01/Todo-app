const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let todos = [];

// GET /api/todos
app.get('/api/todos', (req, res) => res.json(todos));

// POST /api/todos - with validation
app.post('/api/todos', (req, res) => {
  if (!req.body?.text?.trim()) return res.status(400).json({ message: 'Task is required' });
  
  const newTodo = { id: Date.now(), text: req.body.text.trim(), completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT /api/todos/:id - with validation & crash protection
app.put('/api/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === Number(req.params.id));
  if (!todo) return res.status(404).json({ message: 'Todo not found' });

  todo.completed = req.body?.completed ?? !todo.completed;
  res.json(todo);
});

// DELETE /api/todos/:id - with validation
app.delete('/api/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Todo not found' });

  todos.splice(index, 1);
  res.json({ message: 'Todo deleted' });
});

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
const express = require('express');

const router = express.Router();

module.exports = (todos) => {
  router.get('/', (req, res) => {
    res.json(todos);
  });

  router.post('/', (req, res) => {
    if (!req.body?.text?.trim()) {
      return res.status(400).json({ message: 'Task is required' });
    }

    const newTodo = {
      id: Date.now(),
      text: req.body.text.trim(),
      completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
  });

  router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === Number(req.params.id));

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = req.body?.completed ?? !todo.completed;

    res.json(todo);
  });

  router.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(index, 1);

    res.json({ message: 'Todo deleted' });
  });

  return router;
};

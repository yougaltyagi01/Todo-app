const express = require('express');
const validateTodo = require('../middleware/validateTodo');
const { cacheMiddleware, clearCache } = require('../middleware/cache');

module.exports = (todos) => {
  const router = express.Router();
  
 router.get('/', cacheMiddleware(10000), (req, res) => {
  res.json(todos);
});

 router.post('/', validateTodo, (req, res) => {
  const newTodo = {
    id: Date.now(),
    text: req.body.text.trim(),
    completed: false
  };
                                            
  todos.push(newTodo);
  clearCache();
  res.status(201).json(newTodo);
});

  router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === Number(req.params.id));

    if (!todo) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todo.completed = req.body?.completed ?? !todo.completed;
    clearCache();
    res.json(todo);
  });

  router.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === Number(req.params.id));

    if (index === -1) {
      return res.status(404).json({ message: 'Todo not found' });
    }

    todos.splice(index, 1);
    clearCache();
    res.json({ message: 'Todo deleted' });
  });

  return router;
};

function validateTodo(req, res, next) {
  const { text } = req.body;

  if (!text || text.trim() === '') {
    return res.status(400).json({
      message: 'Task is required'
    });
  }

  next();
}

module.exports = validateTodo;
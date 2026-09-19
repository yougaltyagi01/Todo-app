const express = require('express');
const path = require('path');

const requestLogger = require('./middleware/requestLogger');
const requestTimer = require('./middleware/requestTimer');
const { cacheMiddleware } = require('./middleware/cache');

const todoRoutes = require('./routes/todoRoutes');

const config = require('./config/config');

const app = express();

app.use(requestLogger);
app.use(requestTimer);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let todos = [];
app.use('/api/todos', todoRoutes(todos));

app.listen(config.port, () => {
  console.log(`Server running at http://localhost:${config.port}`);
  console.log(`Environment: ${config.environment}`);
});
const express = require('express');
const path = require('path');

const requestLogger = require('./middleware/requestLogger');
const requestTimer = require('./middleware/requestTimer');

const todoRoutes = require('./routes/todoRoutes');

const app = express();

app.use(requestLogger);
app.use(requestTimer);

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let todos = [];
app.use('/api/todos', todoRoutes(todos));

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
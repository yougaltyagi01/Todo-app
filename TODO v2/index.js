const express = require('express');
const path = require('path');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let todos = [];
app.use('/api/todos', todoRoutes(todos));

app.listen(3000, () => console.log('Server running at http://localhost:3000'));
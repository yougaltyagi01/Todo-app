const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');

// GET /api/todos - Load initial data from backend
async function fetchTodos() {
  const response = await fetch('/api/todos');
  const todos = await response.json();
  todoList.innerHTML = '';
  todos.forEach(createTodoElement);
}

function createTodoElement(todo) {
  const li = document.createElement('li');
  if (todo.completed) {
    li.classList.add('completed');
  }

  const span = document.createElement('span');
  span.classList.add('todo-text');
  span.textContent = todo.text;

  // PUT /api/todos/:id - Update completion status on backend
  span.addEventListener('click', async () => {
    const response = await fetch(`/api/todos/${todo.id}`, { method: 'PUT' });
    if (response.ok) {
      todo.completed = !todo.completed;
      li.classList.toggle('completed');
    }
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.classList.add('delete-btn');

 // DELETE /api/todos/:id - Delete item from backend
  deleteBtn.addEventListener('click', async () => {
    const response = await fetch(`/api/todos/${todo.id}`, { method: 'DELETE' });
    if (response.ok) {
      li.remove();
    }
  });

  li.appendChild(span);
  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// POST /api/todos - Send new task to backend
todoForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const text = todoInput.value.trim();

  const response = await fetch('/api/todos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });

  const data = await response.json();

  if (!response.ok) {
    alert(data.message);
    return;
  }

  createTodoElement(data);
  todoInput.value = '';
});

// Run on application start
fetchTodos();
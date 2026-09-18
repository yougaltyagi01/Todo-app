const { test, expect } = require('@playwright/test');

test('Todo app should open', async ({ page }) => {
  await page.goto('http://localhost:3000');

  await expect(page).toHaveTitle(/Todo/i);
});

test('user can add a todo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const todoText = 'Playwright Add Test';

  await page.locator('#todo-input').fill(todoText);

  await page.locator('#todo-form button').click();

  const todo = page.locator('#todo-list li').filter({
    hasText: todoText
  }).last();

  await expect(todo).toBeVisible();
});

test('user can add and complete a todo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const todoText = 'Playwright Complete Test';

  await page.locator('#todo-input').fill(todoText);

  await page.locator('#todo-form button').click();

  const todo = page.locator('#todo-list li').filter({
    hasText: todoText
  }).last();

  await expect(todo).toBeVisible();

  await todo.locator('.todo-text').click();

  await expect(todo).toHaveClass(/completed/);
});

test('user can add and delete a todo', async ({ page }) => {
  await page.goto('http://localhost:3000');

  const todoText = 'Playwright Delete Test';

  await page.locator('#todo-input').fill(todoText);

  await page.locator('#todo-form button').click();

  const todo = page.locator('#todo-list li').filter({
    hasText: todoText
  }).last();

  await expect(todo).toBeVisible();

  await todo.locator('.delete-btn').click();

  await expect(todo).toBeHidden();
});
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/playwright',

  use: {
    baseURL: 'http://localhost:3000',
    headless: true
  }
});
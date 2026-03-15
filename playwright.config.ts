import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
      reporter: [ 
        ['list'], 
        ['allure-playwright', { outputFolder: 'allure-results' }], 
    ], 
  use: {
    trace: 'on',
    baseURL: 'https://www.saucedemo.com',
    navigationTimeout: 5000,
    //actionTimeout: 5000,
  },
projects: [
    // Desktop Browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true }, // Use 'true' for CI
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: false },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'], headless: false },
    },
    // Mobile Device Emulation
    {
      name: 'iPhone 13',
      use: { ...devices['iPhone 13'], headless: false },
    },
    {
      name: 'Pixel 5',
      use: { ...devices['Pixel 5'], headless: false },
    },
    // Custom Desktop Resolution (e.g., for specific responsive break points)
    {
      name: 'Desktop 1366x768',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1366, height: 768 },
        headless: false,
      },
    },
  ],

});

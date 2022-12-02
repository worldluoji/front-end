import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  // Each test is given 30 seconds
  timeout: 30000,
  // To launch a server during the tests, use the webServer option
  webServer: {
    command: 'npm run prepare:e2e',
    url: 'http://localhost:5175', // If url is specified in the config, test runner will wait for that url to return a 2xx, 3xx, 400, 401, 402, or 403 response before running the tests.
    timeout: 120 * 1000
  },
  use: {
    headless: true
  }
};

export default config;

// playwright配置参考：https://playwright.dev/docs/test-advanced#launching-a-development-web-server-during-the-tests
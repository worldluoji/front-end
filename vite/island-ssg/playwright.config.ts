import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './e2e',
  timeout: 30000,
  webServer: {
    url: 'http://localhost:5175',
    command: 'npm run prepare:e2e'
  },
  use: {
    headless: true
  }
};

export default config;
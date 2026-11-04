import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  forbidOnly: true,
  use: {
    channel: process.env.PLAYWRIGHT_CHANNEL || undefined,
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  webServer: [
    { command: 'npm run preview', url: 'http://127.0.0.1:4173', reuseExistingServer: false },
    {
      command: 'npm run dev -- --hostname 127.0.0.1 --port 4183',
      url: 'http://127.0.0.1:4183',
      env: {
        REACT_APP_SERVICE_ID: 'test-service',
        REACT_APP_TEMPLATE_ID: 'test-template',
        REACT_APP_PUBLIC_KEY: 'test-public',
        NEXT_TELEMETRY_DISABLED: '1',
      },
      reuseExistingServer: false,
    },
  ],
});

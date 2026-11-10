import { defineConfig } from '@playwright/test';

const engines = (process.env.PLAYWRIGHT_BROWSERS ?? 'chromium,webkit')
  .split(',')
  .map((name) => name.trim())
  .filter((name): name is 'chromium' | 'webkit' => ['chromium', 'webkit'].includes(name));

export default defineConfig({
  testDir: './tests',
  forbidOnly: true,
  // Shared CI runners are slower than a laptop. The homepage intro skips itself when scripts load
  // late, so a slow first load can miss it; a retry shows up as flaky in the report, not hidden.
  retries: process.env.CI ? 2 : 0,
  use: {
    baseURL: 'http://127.0.0.1:4173',
    trace: 'retain-on-failure',
  },
  // Every scenario runs in Chromium (Chrome, Edge) and WebKit (Safari). PLAYWRIGHT_BROWSERS
  // narrows the list, such as PLAYWRIGHT_BROWSERS=chromium for a quick run.
  projects: engines.map((name) => ({
    name,
    use: {
      browserName: name,
      channel: name === 'chromium' ? process.env.PLAYWRIGHT_CHANNEL || undefined : undefined,
    },
  })),
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

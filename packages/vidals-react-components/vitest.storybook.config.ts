import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [storybookTest({ configDir: fileURLToPath(new URL('./.storybook', import.meta.url)) })],
  test: {
    name: 'vidals-component-stories',
    api: { host: '127.0.0.1' },
    browser: {
      enabled: true,
      headless: true,
      provider: playwright({
        launchOptions: { channel: process.env.PLAYWRIGHT_CHANNEL || undefined },
      }),
      instances: [{ browser: 'chromium' }],
    },
  },
});

import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

const engines = (process.env.PLAYWRIGHT_BROWSERS ?? 'chromium,webkit')
  .split(',')
  .map((name) => name.trim())
  .filter((name): name is 'chromium' | 'webkit' => ['chromium', 'webkit'].includes(name));

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
      // Stories run in Chromium and WebKit (Safari); PLAYWRIGHT_BROWSERS narrows the list.
      instances: engines.map((browser) => ({ browser })),
    },
  },
});

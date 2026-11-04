import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['src/components/**/*.test.tsx'],
    setupFiles: ['./test/setup.ts'],
    restoreMocks: true,
  },
});

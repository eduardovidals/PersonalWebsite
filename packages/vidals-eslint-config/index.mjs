import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';

export const portfolioChecks = defineConfig([
  ...nextVitals,
  ...nextTs,
  { settings: { next: { rootDir: 'apps/portfolio' } } },
  prettier,
  globalIgnores([
    '**/out/**',
    '**/.next/**',
    '**/dist/**',
    '**/storybook-static/**',
    '**/.dev-private/**',
    '**/.nx/**',
    '**/next-env.d.ts',
    '**/test-results/**',
    '**/playwright-report/**',
  ]),
]);

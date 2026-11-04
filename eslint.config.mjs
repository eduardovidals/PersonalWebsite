import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import prettier from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  globalIgnores([
    'out/**',
    '.next/**',
    '.dev-private/**',
    'next-env.d.ts',
    'test-results/**',
    'playwright-report/**',
  ]),
]);

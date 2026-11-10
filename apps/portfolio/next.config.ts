import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const config: NextConfig = {
  turbopack: { root: resolve(import.meta.dirname, '../..') },
  outputFileTracingRoot: resolve(import.meta.dirname, '../..'),
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  // Each language has its own root layout (for `<html lang dir>`), so the 404 page is global.
  experimental: { globalNotFound: true },
};

export default config;

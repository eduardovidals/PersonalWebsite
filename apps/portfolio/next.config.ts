import type { NextConfig } from 'next';
import { resolve } from 'node:path';

const config: NextConfig = {
  turbopack: { root: resolve(import.meta.dirname, '../..') },
  outputFileTracingRoot: resolve(import.meta.dirname, '../..'),
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;

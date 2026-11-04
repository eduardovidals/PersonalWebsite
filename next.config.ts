import type { NextConfig } from 'next';

const config: NextConfig = {
  turbopack: { root: import.meta.dirname },
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default config;

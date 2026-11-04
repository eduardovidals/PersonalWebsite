import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';
import { mergeConfig } from 'vite';

const config = {
  core: { disableTelemetry: true },
  framework: '@storybook/react-vite',
  stories: ['../src/components/**/*.stories.tsx'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y', '@storybook/addon-vitest'],
  viteFinal: (configuration) =>
    mergeConfig(configuration, {
      plugins: [tailwindcss()],
      resolve: { dedupe: ['react', 'react-dom'] },
      server: {
        host: '127.0.0.1',
        fs: {
          deny: [
            ...(configuration.server?.fs?.deny ?? []),
            '.env',
            '.env.*',
            '*.{crt,pem,key,p12,pfx,cer,der}',
            '.npmrc',
            '**/.git/**',
            '**/.dev-private/**',
          ],
        },
      },
    }),
} satisfies StorybookConfig;

export default config;

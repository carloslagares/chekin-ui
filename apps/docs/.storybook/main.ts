import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';

const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-interactions'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config) {
    // Resolve @chekin/ui directly to source during development so we don't
    // need to rebuild on every edit.
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      '@chekin/ui': path.resolve(__dirname, '../../../packages/ui/src'),
      '@chekin/tokens': path.resolve(__dirname, '../../../packages/tokens/src'),
    };
    return config;
  },
};

export default config;

import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'dashboard',
      values: [
        { name: 'dashboard', value: '#FDFDFF' },
        { name: 'web', value: '#FFFFFF' },
        { name: 'guest', value: '#F4F6F9' },
        { name: 'dark', value: '#161643' },
      ],
    },
    layout: 'centered',
  },
};

export default preview;

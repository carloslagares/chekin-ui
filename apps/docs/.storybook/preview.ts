import type { Preview } from '@storybook/react';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: [
          'Introduction', ['Welcome', 'Installation', 'Contributing'],
          'Foundations', ['Colors', 'Typography', 'Spacing', 'Radii', 'Shadows', 'Icons'],
          'Actions',       '*',
          'Forms',         '*',
          'Data display',  '*',
          'Feedback',      '*',
          'Navigation',    '*',
          'Overlays',      '*',
          'Surfaces',      '*',
          'Charts',        '*',
          'Layouts',       '*',
          'Patterns',      '*',
          'Examples',      ['Dashboard', '*'],
        ],
      },
    },
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

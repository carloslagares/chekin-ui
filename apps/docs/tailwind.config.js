import chekinPreset from '@chekin/tokens/tailwind-preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [chekinPreset],
  content: [
    './stories/**/*.{ts,tsx}',
    './.storybook/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
  ],
};

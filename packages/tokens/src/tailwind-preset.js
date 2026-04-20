/**
 * @chekin/tokens/tailwind-preset
 *
 * Drop-in Tailwind preset that exposes Chekin tokens as Tailwind theme keys.
 * Use it by adding `presets: [require('@chekin/tokens/tailwind-preset')]` to a
 * consumer's tailwind.config.
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        chekin: {
          blue: '#385BF8',
          'blue-hover': '#5975F5',
          'blue-animation': '#294DF1',
          'blue-divider': '#5F5CF0',
          'blue-dark': '#23235D',
          dark: '#19194B',
          navy: '#161643',
          'gradient-start': '#002CFA',
          'gradient-end': '#274BF0',
          red: '#FF2467',
          'gray-1': '#6B6B95',
          'gray-2': '#9696B9',
          'gray-3': '#DEDEEB',
          'gray-separator': '#CECEDE',
          'surface-input-empty': '#F4F6F8',
          'surface-autocomplete': '#EFF6FF',
          'surface-promo': '#F4F4FD',
          'surface-pressed': '#F0F3FF',
          'surface-card': '#EFEFFF',
        },
      },
      fontFamily: {
        sans: [
          'Montserrat',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        code: ['Poppins', '-apple-system', 'BlinkMacSystemFont', 'monospace'],
      },
      fontSize: {
        'chekin-h1': ['70px', { lineHeight: '1.1', fontWeight: '700' }],
        'chekin-display': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
        'chekin-h2': ['44px', { lineHeight: '1.2', fontWeight: '400' }],
        'chekin-h3': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
        'chekin-h4': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        'chekin-body-hl': ['20px', { lineHeight: '1.5', fontWeight: '500' }],
        'chekin-body-list': ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        'chekin-body': ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'chekin-small': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
        'chekin-caption': ['12px', { lineHeight: '1.3', fontWeight: '400' }],
      },
      spacing: {
        'chekin-0-5': '4px',
        'chekin-1': '8px',
        'chekin-1-25': '10px',
        'chekin-1-375': '11px',
        'chekin-2': '16px',
        'chekin-3': '24px',
        'chekin-4': '32px',
        'chekin-5': '40px',
        'chekin-6': '48px',
      },
      borderRadius: {
        'chekin-micro': '2px',
        'chekin-small': '4px',
        'chekin-input': '6px',
        'chekin-standard': '8px',
        'chekin-button': '12px',
        'chekin-card': '14px',
        'chekin-circle': '25px',
        'chekin-pill': '51px',
      },
      boxShadow: {
        'chekin-focus': '0px 0px 0px 3px rgba(56, 91, 248, 0.2)',
        'chekin-subtle-outline': '0px 0px 0px 1px rgba(56, 91, 248, 0.2)',
        'chekin-solid-focus': '0px 0px 0px 1px #385BF8',
        'chekin-card': '0px 0px 5px rgba(26, 148, 255, 0.173)',
        'chekin-card-hover': '0px 20px 25px rgba(26, 148, 255, 0.173)',
        'chekin-dropdown': '0px 5px 15px rgba(26, 148, 255, 0.16)',
        'chekin-elevation': '0px 31px 50px rgba(26, 140, 255, 0.1)',
        'chekin-xs-button': '0px 1px 4px rgba(0, 0, 0, 0.2)',
      },
      screens: {
        'chekin-sm': '375px',
        'chekin-md': '768px',
        'chekin-lg': '1024px',
        'chekin-xl': '1280px',
        'chekin-2xl': '1440px',
      },
    },
  },
};

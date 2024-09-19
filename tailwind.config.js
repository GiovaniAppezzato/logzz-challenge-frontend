const defaultTheme = require('tailwindcss/defaultTheme');

function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`
    }
    return `rgb(var(${variable}) / ${opacityValue})`
  }
} 

/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        'primary':   withOpacityValue('--color-primary'),
        'secondary': withOpacityValue('--color-secondary'),
        'success':   withOpacityValue('--color-success'),
        'danger':    withOpacityValue('--color-danger'),
        'warning':   withOpacityValue('--color-warning'),
        'info':      withOpacityValue('--color-info'),

        'primary-active':   withOpacityValue('--color-primary-active'),
        'secondary-active': withOpacityValue('--color-secondary-active'),
        'success-active':   withOpacityValue('--color-success-active'),
        'danger-active':    withOpacityValue('--color-danger-active'),
        'warning-active':   withOpacityValue('--color-warning-active'),
        'info-active':      withOpacityValue('--color-info-active'),

        'navbar':     withOpacityValue('--color-navbar'),
        'header':     withOpacityValue('--color-header'),
        'card':       withOpacityValue('--color-card'),
        'typography': withOpacityValue('--color-typography'),
        'body':       withOpacityValue('--color-body')
      },
      opacity: {
        '15': '.15',
        '35': '.35',
        '45': '.45',
        '55': '.55',
        '65': '.65',
        '85': '.85',
      }
    },
  },
  plugins: [
    // require('@tailwindcss/forms'),
  ],
};

export default config;

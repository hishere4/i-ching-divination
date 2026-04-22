/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ink': {
          50: '#f5f5f0',
          100: '#e8e8e0',
          200: '#d0d0c0',
          300: '#a8a890',
          400: '#808060',
          500: '#585840',
          600: '#404030',
          700: '#2a2a20',
          800: '#1a1a15',
          900: '#0a0a08',
        },
        'gold': {
          50: '#fdf9e8',
          100: '#f9efc0',
          200: '#f3df80',
          300: '#e8c840',
          400: '#d4af37',
          500: '#b8941f',
          600: '#967018',
          700: '#745010',
          800: '#543808',
          900: '#382400',
        },
        'parchment': {
          50: '#fdfcf5',
          100: '#faf6e8',
          200: '#f5eccf',
          300: '#ece0b0',
          400: '#e0d08a',
          500: '#d4c068',
          600: '#c0a848',
          700: '#a89038',
          800: '#907028',
          900: '#785018',
        }
      },
      fontFamily: {
        'serif': ['"Noto Serif SC"', 'serif'],
        'sans': ['"Noto Sans SC"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

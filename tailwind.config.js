/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0b0b0f',
        foreground: '#fafafa',
        muted: '#8a8fa3',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}


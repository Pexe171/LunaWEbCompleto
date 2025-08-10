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
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'highlight-blue': 'var(--highlight-blue)',
        'highlight-blue-hover': 'var(--highlight-blue-hover)',
        'highlight-aqua': 'var(--highlight-aqua)',
        'highlight-aqua-hover': 'var(--highlight-aqua-hover)',
        'highlight-salmon': 'var(--highlight-salmon)',
        'highlight-salmon-hover': 'var(--highlight-salmon-hover)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

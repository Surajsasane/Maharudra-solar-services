/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        soft: '0 30px 60px rgba(6, 25, 18, 0.12)',
      },
      colors: {
        solar: {
          50: '#f3fbf5',
          100: '#dff7e6',
          200: '#bfeecf',
          300: '#8fe0b0',
          400: '#59cb84',
          500: '#2d9f60',
          600: '#1d7d4d',
          700: '#185f3e',
          800: '#174d35',
          900: '#123d2b',
          yellow: '#f4c548',
        },
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(16, 55, 39, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 55, 39, 0.04) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};


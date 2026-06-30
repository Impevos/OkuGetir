/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        'oku-green': {
          DEFAULT: '#2D6A4F',
          light: '#40916C',
          dark: '#1B4332',
        },
        'oku-blue': {
          DEFAULT: '#1D4E89',
          light: '#2A6CB8',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 30px rgba(45, 106, 79, 0.06)',
        'card-hover': '0 16px 40px rgba(45, 106, 79, 0.12)',
      },
    },
  },
  plugins: [],
};

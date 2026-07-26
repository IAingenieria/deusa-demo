/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        marino: {
          DEFAULT: '#1B2A5B',
          light: '#2C3E7A',
          dark: '#111C3D',
        },
        acento: {
          DEFAULT: '#E03131',
          light: '#F35555',
          dark: '#B02525',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(27,42,91,0.08), 0 1px 2px rgba(27,42,91,0.06)',
        soft: '0 4px 16px rgba(27,42,91,0.10)',
      },
    },
  },
  plugins: [],
}

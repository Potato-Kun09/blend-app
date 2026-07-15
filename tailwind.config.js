export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#1DB954',
          blue: '#4F8EF7',
          teal: '#00C9A7',
        },
        surface: {
          900: '#0A0A0F',
          800: '#111118',
          700: '#18181F',
          600: '#1E1E28',
          500: '#252532',
          400: '#2E2E3E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

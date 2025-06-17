/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Pretendard Variable', 'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'system-ui', 'sans-serif']
      },
      colors: {
        'teto': {
          50: '#eff6ff',
          500: '#667eea',
          600: '#5a67d8',
          700: '#4c51bf'
        },
        'egen': {
          50: '#fef7f7',
          500: '#f093fb',
          600: '#ec4899',
          700: '#be185d'
        }
      }
    },
  },
  plugins: [],
}

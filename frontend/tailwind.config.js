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
      fontWeight: {
        'thin': '500',      // thin을 500으로 리매핑
        'light': '500',     // light를 500으로 리매핑
        'normal': '500',    // normal을 500으로 리매핑
        'medium': '500',    // medium은 그대로 500
        'semibold': '600',  // semibold는 600
        'bold': '700',      // bold는 700
        'extrabold': '800', // extrabold는 800
        'black': '900',     // black은 900
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8fb',
          100: '#ffeff6',
          200: '#ffdff0',
          300: '#ffc0e6',
          400: '#ff9fd7',
          500: '#ff7fca',
          600: '#ff5fb8',
          700: '#ff3fa6',
          800: '#ff2a92',
          900: '#ff137f',
        },
        accent: {
          50: '#fff5f7',
          100: '#ffeef4',
          200: '#ffdce9',
          300: '#ffc0dd',
          400: '#ff9bc7',
          500: '#ff74b2',
          600: '#ff4f9c',
          700: '#ff2a86',
          800: '#ff1a72',
          900: '#ff0b5e',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}

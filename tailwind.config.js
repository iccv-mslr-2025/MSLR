// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif'],
        oswald: ['"Oswald"', 'sans-serif'],
        roboto: ['"Roboto"', 'sans-serif'],
        sharetech: ['"Share Tech"', 'sans-serif'],
      },
      colors: {
        'brand-primary': {
          light: '#38bdf8', // sky-400
          DEFAULT: '#0369a1', // sky-700
          dark: '#075985',  // sky-800
        },
        'brand-accent': {
          light: '#2dd4bf', // teal-400
          DEFAULT: '#0d9488', // teal-600
          dark: '#115e59',  // teal-800
        },
        'brand-neutral': {
          50: '#f8fafc',  // slate-50
          100: '#f1f5f9', // slate-100
          200: '#e2e8f0', // slate-200
          300: '#cbd5e1', // slate-300
          700: '#334155', // slate-700
          800: '#1e293b', // slate-800
          900: '#0f172a', // slate-900
        },
        'header-bg': 'rgba(15, 23, 42, 0.8)', // slate-900 with alpha for backdrop blur
        'header-text': '#e2e8f0', // slate-200
      },
      backgroundImage: {
        'hero-pattern': "url('/Images/hands.png')",
      },
      height: {
        'hero': 'calc(100vh - 4rem)',
      },
      minHeight: {
        'hero': '600px', // Ensure hero is not too small on short viewports
        'section': '70vh', // Default min height for content sections
      },
      animation: {
        'slide-up-fade': 'slideUpFade 0.5s ease-out forwards',
        'subtle-pulse': 'subtlePulse 2s infinite ease-in-out',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
      },
      keyframes: {
        slideUpFade: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        subtlePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideInLeft: {
          '0%': { opacity: 0, transform: 'translateX(-30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: 0, transform: 'translateX(30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
      }
    },
  },
  plugins: [],
}
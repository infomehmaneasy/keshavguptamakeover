/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F4EE',
        champagne: '#D8C09A',
        espresso: '#211B19',
        taupe: '#A3978B',
        burgundy: '#682F3B',
        white: '#FFFFFF',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.1em',
        ultra: '0.45em',
      },
      maxWidth: {
        editorial: '1400px',
      },
      keyframes: {
        'line-grow': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'line-grow': 'line-grow 1.2s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
};

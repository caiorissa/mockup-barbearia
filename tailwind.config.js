/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        barber: {
          dark: '#080808',
          surface: '#0f0f0f',
          card: '#141414',
          elevated: '#1a1a1a',
          gold: '#d4af37',
          'gold-light': '#f0d78c',
          'gold-dim': '#a68b2a',
          burgundy: '#3d1528',
          green: '#1a3a2f',
          cream: '#f8f4ee',
          muted: '#6b6b6b',
        },
      },
      fontFamily: {
        display: ['Outfit', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.03em',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translate3d(0, 0, 0)' },
          to: { transform: 'translate3d(-50%, 0, 0)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      animation: {
        marquee: 'marquee 35s linear infinite',
        'pulse-glow': 'pulse-glow 6s ease-in-out infinite',
        float: 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxury color palette
        luxury: {
          50: '#faf9f7',
          100: '#f3f1ec',
          200: '#e8e3d9',
          300: '#d9d0be',
          400: '#c7b89e',
          500: '#b89f7f',
          600: '#a68764',
          700: '#8a6f4f',
          800: '#715c42',
          900: '#5d4c37',
          950: '#322618',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },
        walnut: {
          50: '#faf8f5',
          100: '#f2ede4',
          200: '#e4d7c4',
          300: '#d1bc9d',
          400: '#bc9c73',
          500: '#a67c52',
          600: '#8b6342',
          700: '#735037',
          800: '#5f4230',
          900: '#50372b',
          950: '#2d1c17',
        },
        oak: {
          50: '#faf9f7',
          100: '#f2f0ec',
          200: '#e5e0d6',
          300: '#d4cbb8',
          400: '#c0b298',
          500: '#ad9678',
          600: '#9d8466',
          700: '#836d55',
          800: '#6b5a49',
          900: '#574b3e',
          950: '#2f2721',
        },
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
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
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
export default config

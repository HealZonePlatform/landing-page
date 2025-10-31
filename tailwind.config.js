/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          background: '#c6cbcd',
          accent: '#e19233',
          ink: '#121212',
          forest: '#60623d',
          cream: '#ffefce',
          taupe: '#a68e74',
        },
        primary: {
          50: '#ffefce',
          100: '#ffefce',
          200: '#c6cbcd',
          300: '#c6cbcd',
          400: '#e19233',
          500: '#e19233',
          600: '#e19233',
          700: '#60623d',
          800: '#60623d',
          900: '#121212',
        },
        secondary: {
          50: '#c6cbcd',
          100: '#c6cbcd',
          200: '#ffefce',
          300: '#ffefce',
          400: '#a68e74',
          500: '#a68e74',
          600: '#60623d',
          700: '#60623d',
          800: '#121212',
          900: '#121212',
        },
        gray: {
          50: '#ffefce',
          100: '#ffefce',
          200: '#ffefce',
          300: '#c6cbcd',
          400: '#c6cbcd',
          500: '#a68e74',
          600: '#a68e74',
          700: '#60623d',
          800: '#121212',
          900: '#121212',
        },
        neutral: {
          200: '#ffefce',
          300: '#c6cbcd',
          400: '#a68e74',
        },
        pink: {
          50: '#ffefce',
          100: '#ffefce',
          200: '#c6cbcd',
        },
        amber: {
          500: '#e19233',
        },
        blue: {
          600: '#60623d',
          700: '#121212',
        },
        cyan: {
          500: '#c6cbcd',
        },
        emerald: {
          500: '#60623d',
        },
        green: {
          100: '#ffefce',
          500: '#60623d',
          600: '#60623d',
          700: '#60623d',
          800: '#121212',
        },
        indigo: {
          500: '#60623d',
        },
        purple: {
          600: '#a68e74',
          700: '#60623d',
        },
        red: {
          50: '#ffefce',
          100: '#ffefce',
          200: '#c6cbcd',
          300: '#c6cbcd',
          500: '#e19233',
          600: '#e19233',
          700: '#60623d',
        },
        rose: {
          500: '#e19233',
        },
        sky: {
          500: '#c6cbcd',
        },
        slate: {
          700: '#60623d',
          800: '#121212',
        },
        yellow: {
          400: '#ffefce',
          500: '#e19233',
          600: '#e19233',
          700: '#60623d',
        },
        white: '#ffefce',
        black: '#121212',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'sans-serif'],
        heading: ['var(--font-headline)', 'serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}

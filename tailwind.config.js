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
          background: '#eef6f6',
          accent: '#fc95ae',
          ink: '#112121',
          forest: '#54a4a6',
          cream: '#f9f6ee',
          taupe: '#98c8ca',
        },
        primary: {
          50: '#eef6f6',
          100: '#ddeded',
          200: '#cce4e4',
          300: '#bbdbdb',
          400: '#98c8ca',
          500: '#76b6b8',
          600: '#54a4a6',
          700: '#438385',
          800: '#326264',
          900: '#224242',
        },
        secondary: {
          50: '#fff4f7',
          100: '#feeaef',
          200: '#fedfe7',
          300: '#fed5df',
          400: '#fdbfce',
          500: '#fc95ae',
          600: '#ca778b',
          700: '#975968',
          800: '#653c46',
          900: '#321e23',
        },
        gray: {
          50: '#fefdfc',
          100: '#fdfcfa',
          200: '#f9f6ee',
          300: '#e0ddd6',
          400: '#c7c5be',
          500: '#aeaca7',
          600: '#95948f',
          700: '#7c7b77',
          800: '#64625f',
          900: '#4b4a47',
        },
        neutral: {
          200: '#f9f6ee',
          300: '#e0ddd6',
          400: '#c7c5be',
        },
        pink: {
          50: '#fff4f7',
          100: '#feeaef',
          200: '#fdbfce',
        },
        amber: {
          500: '#fc95ae',
        },
        blue: {
          600: '#54a4a6',
          700: '#224242',
        },
        cyan: {
          500: '#98c8ca',
        },
        emerald: {
          500: '#54a4a6',
        },
        green: {
          100: '#fdfcfa',
          500: '#54a4a6',
          600: '#438385',
          700: '#326264',
          800: '#224242',
        },
        indigo: {
          500: '#438385',
        },
        purple: {
          600: '#fdbfce',
          700: '#ca778b',
        },
        red: {
          50: '#fff4f7',
          100: '#feeaef',
          200: '#fedfe7',
          300: '#fdbfce',
          500: '#fc95ae',
          600: '#ca778b',
          700: '#975968',
        },
        rose: {
          500: '#fc95ae',
        },
        sky: {
          500: '#76b6b8',
        },
        slate: {
          700: '#326264',
          800: '#224242',
        },
        yellow: {
          400: '#fdfcfa',
          500: '#f9f6ee',
          600: '#e0ddd6',
          700: '#c7c5be',
        },
        white: '#ffffff',
        black: '#112121',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'Inter', 'sans-serif'],
        heading: ['var(--font-body)', 'Inter', 'sans-serif'],
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

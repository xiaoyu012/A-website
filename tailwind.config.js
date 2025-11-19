/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 15px rgba(56, 189, 248, 0.5)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            'code': {
              color: theme('colors.pink.500'),
              fontWeight: '600',
              backgroundColor: theme('colors.gray.100'),
              paddingLeft: '0.25rem',
              paddingRight: '0.25rem',
              paddingTop: '0.125rem',
              paddingBottom: '0.125rem',
              borderRadius: '0.25rem',
            },
            '.dark code': {
              color: theme('colors.pink.400'),
              backgroundColor: theme('colors.gray.800'),
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
            'pre': {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
              overflow: 'auto',
              fontWeight: '400',
              fontSize: '0.9em',
              padding: theme('spacing.6'),
              borderRadius: theme('borderRadius.lg'),
              border: '1px solid',
              borderColor: theme('colors.gray.800'),
              maxWidth: '100%',
              overflowX: 'auto',
            },
            '.dark pre': {
              backgroundColor: theme('colors.gray.950'),
              color: theme('colors.gray.200'),
              borderColor: theme('colors.gray.700'),
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 
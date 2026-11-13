/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f5fa',
          100: '#dde8f4',
          200: '#c0d6eb',
          300: '#94bcdb',
          400: '#629cc7',
          500: '#3e80b2',
          600: '#2d6796',
          700: '#1d3a63',
          800: '#173155',
          900: '#0f2340', // brand well navy
          950: '#091527',
        },
        aqua: {
          50: '#eff8ff',
          100: '#dbeefe',
          200: '#bee0fd',
          300: '#91cdfb',
          400: '#5db0f7',
          500: '#2f74b5', // brand aquifer blue
          600: '#2563eb',
          700: '#1d4ed8',
        },
        brandRed: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ef4444',
          600: '#d7362c', // brand logo red
          700: '#b42a21',
          800: '#991b1b',
        },
        copper: {
          50: '#fcf8f4',
          100: '#f7ede2',
          200: '#ebd6bf',
          500: '#c27d42',
          600: '#b8743a', // pipe copper
          700: '#975d2b',
        },
        mist: '#eef3f8',
      },
      fontFamily: {
        sans: ['Source Sans 3', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'Arial Narrow', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'mobile-tab': '0 -4px 20px rgba(15, 35, 64, 0.08)',
        'float-btn': '0 8px 24px rgba(215, 54, 44, 0.35)',
        'card-soft': '0 4px 16px rgba(15, 35, 64, 0.06)',
      },
      borderRadius: {
        'app': '20px',
        'sheet': '28px',
      }
    },
  },
  plugins: [],
}


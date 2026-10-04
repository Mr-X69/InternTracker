/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // enable dark mode via class strategy
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface2)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        accent2: 'var(--accent2)',
        accent3: 'var(--accent3)',
        accent4: 'var(--accent4)',
        danger: 'var(--danger)',
        text: 'var(--text)',
        muted: 'var(--muted)',
      },
      fontFamily: {
        head: ['var(--font-head)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      borderRadius: {
        radius: 'var(--radius)',
        'radius-sm': 'var(--radius-sm)',
      },
      boxShadow: {
        custom: 'var(--shadow)',
      },
      keyframes: {
        'toast-progress': {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        }
      },
      animation: {
        'toast-progress': 'toast-progress linear forwards',
      }
    },
  },
  plugins: [],
}

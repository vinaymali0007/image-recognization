/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // "Light-table" palette — evokes a radiology film viewer.
        void: {
          DEFAULT: '#0B0D10',
          soft: '#12151A',
          raised: '#181C22',
        },
        line: '#242A33',
        amber: {
          DEFAULT: '#FF8A34',
          soft: '#FFB27A',
          dim: '#7A4420',
        },
        clear: '#3ECF8E',
        alert: '#E15252',
        paper: {
          DEFAULT: '#F4F1EA',
          dim: '#DCD8CF',
        },
        ink: {
          DEFAULT: '#12151A',
          soft: '#4A5260',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'scan-grid': 'linear-gradient(rgba(255,138,52,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,138,52,0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '24px 24px',
      },
      animation: {
        sweep: 'sweep 2.4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.5s ease-out both',
      },
      keyframes: {
        sweep: {
          '0%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(8px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

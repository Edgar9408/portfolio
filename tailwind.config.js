/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: {
          900: '#05060a',
          800: '#0a0c14',
          700: '#10131f',
          600: '#171a2b',
        },
        neon: {
          cyan: '#22d3ee',
          violet: '#a855f7',
          pink: '#ec4899',
          blue: '#3b82f6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'aurora': 'linear-gradient(120deg, #22d3ee, #a855f7, #ec4899)',
        'aurora-soft': 'linear-gradient(120deg, rgba(34,211,238,0.15), rgba(168,85,247,0.15), rgba(236,72,153,0.15))',
      },
      boxShadow: {
        'glow-cyan': '0 0 40px -10px rgba(34,211,238,0.5)',
        'glow-violet': '0 0 40px -10px rgba(168,85,247,0.5)',
        'glass': '0 8px 32px 0 rgba(0,0,0,0.37)',
      },
      keyframes: {
        'aurora-move': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'gradient-text': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
      animation: {
        'aurora-move': 'aurora-move 12s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-text': 'gradient-text 6s ease infinite',
        'pulse-slow': 'pulse-slow 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

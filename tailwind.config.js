/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'dream': {
          'bg-primary': '#F6EEDF',
          'bg-secondary': '#F0E6D4',
          'bg-card': '#FFFFFF',
          'bg-card-hover': '#FAF7F2',
          'accent-primary': '#1F4E4A',
          'accent-secondary': '#A8763C',
          'accent-tertiary': '#5A4A3A',
          'accent-amber': '#C97D3C',
          'accent-cream': '#F6EEDF',
          'accent-teal': '#2D6B65',
          'accent-gold': '#D4AF37',
          'text-primary': '#1F4E4A',
          'text-secondary': '#5A4A3A',
          'text-muted': '#8B7B6B',
          'border-warm': '#D4C9B8',
          'border-accent': '#A8763C',
          'border-subtle': '#E8DFD0',
          'shadow-warm': 'rgba(90, 74, 58, 0.15)',
          'shadow-accent': 'rgba(26, 78, 74, 0.2)',
        }
      },
      fontFamily: {
        'serif-sc': ['"Noto Serif SC"', '"Source Han Serif SC"', 'serif'],
        'sans-sc': ['"Noto Sans SC"', '"Source Han Sans SC"', 'sans-serif'],
        'display': ['"Playfair Display"', '"Noto Serif SC"', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'typing': 'typing 0.1s steps(1) forwards',
        'slide-up': 'slideUp 0.3s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'brush-stroke': 'brushStroke 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 10px rgba(168, 118, 60, 0.4), 0 0 20px rgba(168, 118, 60, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(168, 118, 60, 0.6), 0 0 35px rgba(168, 118, 60, 0.4)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        brushStroke: {
          '0%': { clipPath: 'inset(0 100% 0 0)', opacity: '0' },
          '100%': { clipPath: 'inset(0 0 0 0)', opacity: '1' },
        },
      },
      boxShadow: {
        'warm': '0 4px 20px rgba(90, 74, 58, 0.1)',
        'warm-lg': '0 8px 30px rgba(90, 74, 58, 0.15)',
        'warm-xl': '0 12px 40px rgba(90, 74, 58, 0.2)',
        'accent': '0 4px 20px rgba(26, 78, 74, 0.15)',
      },
    },
  },
  plugins: [],
};

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'Monaco', 'monospace'],
      },
      colors: {
        // Sistema de Colores Ultra Premium
        white: '#ffffff',
        black: '#000000',
        
        // Neutral Premium (Inspirado en Bang & Olufsen)
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        
        // Azul Océano Premium (Color Principal)
        ocean: {
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
          950: '#082f49',
        },
        
        // Dorado Luxury (Acentos Premium)
        gold: {
          50: '#fefce8',
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
        
        // Gris Platino (Backgrounds Premium)
        platinum: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        }
      },
      backgroundImage: {
        // Gradientes Ultra Premium
        'hero-premium': 'linear-gradient(135deg, #030712 0%, #111827 30%, #1f2937 60%, #374151 100%)',
        'hero-overlay': 'linear-gradient(135deg, rgba(3, 7, 18, 0.95) 0%, rgba(17, 24, 39, 0.8) 50%, rgba(31, 41, 55, 0.7) 100%)',
        'luxury-gradient': 'linear-gradient(135deg, #000000 0%, #171717 25%, #262626 50%, #404040 75%, #525252 100%)',
        'ocean-gradient': 'linear-gradient(135deg, #082f49 0%, #0c4a6e 25%, #075985 50%, #0369a1 75%, #0284c7 100%)',
        'gold-gradient': 'linear-gradient(135deg, #451a03 0%, #78350f 25%, #92400e 50%, #b45309 75%, #d97706 100%)',
        'glass-premium': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        'card-ultra': 'linear-gradient(145deg, rgba(255, 255, 255, 0.98) 0%, rgba(249, 250, 251, 0.95) 100%)',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
      },
      boxShadow: {
        // Sombras Ultra Premium
        'ultra': '0 32px 64px -12px rgba(0, 0, 0, 0.4), 0 25px 25px -5px rgba(0, 0, 0, 0.1)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'luxury': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'soft': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'inset-premium': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06), inset 0 -2px 4px 0 rgba(255, 255, 255, 0.1)',
        'text': '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 8s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(217, 119, 6, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(217, 119, 6, 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '104': '26rem',
        '128': '32rem',
      },
      fontSize: {
        '2xs': '0.625rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      letterSpacing: {
        'ultra-wide': '0.2em',
      },
      lineHeight: {
        '12': '3rem',
        '14': '3.5rem',
      },
    },
  },
  plugins: [],
}

export default config 
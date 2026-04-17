import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        tc: {
          teal: '#00D4AA',
          'teal-dark': '#00A88A',
          cyan: '#7BEAD6',
          white: '#ffffff',
          'off-white': '#FAFBFC',
          'gray-50': '#F4F5F7',
          'gray-100': '#E8EAED',
          'gray-200': '#D1D5DB',
          'gray-500': '#374151',
          'gray-900': '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['"sofia-pro"', 'SofiaProWeb', 'Helvetica', 'Arial', 'sans-serif']
      },
      fontSize: {
        'tc-label': ['0.75rem', { lineHeight: '1', letterSpacing: '0.12em', fontWeight: '600' }],
        'tc-body-sm': ['0.875rem', { lineHeight: '1.5' }],
        'tc-body': ['1rem', { lineHeight: '1.6' }],
        'tc-body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'tc-heading-sm': ['1.25rem', { lineHeight: '1.3', letterSpacing: '-0.01em' }],
        'tc-heading': ['1.5rem', { lineHeight: '1.25', letterSpacing: '-0.02em' }],
        'tc-heading-lg': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        'tc-heading-xl': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'tc-heading-2xl': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }]
      },
      spacing: {
        'tc-xs': '4px',
        'tc-sm': '8px',
        'tc-md': '16px',
        'tc-lg': '24px',
        'tc-xl': '32px',
        'tc-2xl': '48px',
        'tc-3xl': '64px',
        'tc-4xl': '96px',
        'tc-5xl': '128px'
      },
      borderRadius: {
        'tc-xs': '6px',
        'tc-sm': '12px',
        'tc-md': '16px',
        'tc-lg': '24px',
        'tc-full': '999px'
      },
      borderWidth: {
        'tc': '1.5px'
      },
      boxShadow: {
        'tc-card': '0 1px 3px rgba(0, 0, 0, 0.06)',
        'tc-card-hover': '0 4px 16px rgba(0, 0, 0, 0.08)',
        'tc-orb': '0 20px 70px rgba(0, 212, 170, 0.24)',
        'tc-focus': '0 0 0 3px rgba(0, 212, 170, 0.20)'
      },
      transitionDuration: {
        'tc': '200ms'
      },
      transitionTimingFunction: {
        'tc': 'cubic-bezier(0.4, 0, 0.2, 1)'
      },
      maxWidth: {
        'tc-content': '1200px',
        'tc-prose': '72ch',
        'tc-form': '560px',
        'tc-form-lg': '720px'
      }
    }
  },
  plugins: []
};

export default config;

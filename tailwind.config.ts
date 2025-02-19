import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        md: '376px',
        lg: '745px',
      },
      colors: {
        main: '#3853EA', 
        default: '#C2C9FF',
        solid: '#E5e7fa',
        disable: '#30333e',
        disable_text: '#4a4e5e',
        Cgray500: '#626675',
        Cgray400: '#424655',
        Cgray300: '#30333E',
        Cgray200: '#22242B',
        Cgray100: '#1B1D21',
        white: '#FFFFFF',
        black: '#000000',
        warning: '#Fb3b49',
        clear: '#00c48c',
        Cgray700: '#B4BBCE',
        Cgray800: '#D8DEE8',
        BG: '#0F0F0F',
        BG_2: '#1B1B1D',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
    fontFamily: {
      sans: ['var(--font-pretendard)', 'sans-serif'],
    },
  },
  plugins: [
    function ({ addComponents }: PluginAPI) {
      addComponents({
        '.typo-head1': {
          fontSize: '32px',
          lineHeight: '41px',
          fontWeight: '600',
        },
        '.typo-head2': {
          fontSize: '22px',
          lineHeight: '28px',
          fontWeight: '600',
        },
        '.typo-head3': {
          fontSize: '17px',
          lineHeight: '22px',
          fontWeight: '600',
        },
        '.typo-head4': {
          fontSize: '15px',
          lineHeight: '20px',
          fontWeight: '500',
        },
        '.typo-button1': {
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: '600',
        },
        '.typo-button2': {
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: '500',
        },
        '.typo-caption1': {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: '500',
        },
        '.typo-caption2': {
          fontSize: '11px',
          lineHeight: '13px',
          fontWeight: '500',
        },
        '.typo-body1': {
          fontSize: '15px',
          lineHeight: '20px',
          fontWeight: '400',
        },
        '.typo-body2': {
          fontSize: '13px',
          lineHeight: '18px',
          fontWeight: '400',
        },
        '.typo-small': {
          fontSize: '11px',
          lineHeight: '13px',
          fontWeight: '400',
        },
      });
    },
    require('tailwindcss-animate'),
  ],
} satisfies Config;

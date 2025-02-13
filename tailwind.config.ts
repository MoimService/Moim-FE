import type { Config } from 'tailwindcss';
import { PluginAPI } from 'tailwindcss/types/config';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        main: '#525FEE',
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
        BG: '#121212',
        BG_2: '1B1B1D',
      },
    },
    fontFamily: {
      sans: ['var(--font-pretendard)', 'sans-serif'],
    },
  },
  plugins: [
    function ({ addComponents }: PluginAPI) {
      addComponents({
        '.text-head1': {
          fontSize: '32px',
          lineHeight: '41px',
          fontWeight: '600',
        },
        '.text-head2': {
          fontSize: '22px',
          lineHeight: '28px',
          fontWeight: '600',
        },
        '.text-head3': {
          fontSize: '17px',
          lineHeight: '22px',
          fontWeight: '600',
        },
        '.text-head4': {
          fontSize: '15px',
          lineHeight: '20px',
          fontWeight: '500',
        },
        '.text-button1': {
          fontSize: '16px',
          lineHeight: '22px',
          fontWeight: '600',
        },
        '.text-button2': {
          fontSize: '14px',
          lineHeight: '16px',
          fontWeight: '500',
        },
        '.text-caption1': {
          fontSize: '12px',
          lineHeight: '16px',
          fontWeight: '500',
        },
        '.text-caption2': {
          fontSize: '11px',
          lineHeight: '13px',
          fontWeight: '500',
        },
        '.text-body1': {
          fontSize: '15px',
          lineHeight: '20px',
          fontWeight: '400',
        },
        '.text-body2': {
          fontSize: '13px',
          lineHeight: '18px',
          fontWeight: '400',
        },
        '.text-small': {
          fontSize: '11px',
          lineHeight: '13px',
          fontWeight: '400',
        },
      });
    },
  ],
} satisfies Config;

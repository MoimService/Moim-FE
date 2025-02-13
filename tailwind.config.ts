import type { Config } from 'tailwindcss';

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
  },
  plugins: [],
} satisfies Config;

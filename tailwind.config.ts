import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        black: {
          DEFAULT: '#000000',
          2: '#fcfcfc',
          3: '#f5f5f5',
          4: '#f0f0f0',
          5: '#d9d9d9',
          6: '#bfbfbf',
          7: '#8c8c8c',
          8: '#595959',
          9: '#454545',
          10: '#262626',
          11: '#1f1f1f',
          12: '#141414',
        },
        yellow: {
          1: '#fffbe6',
          2: '#fff5c2',
          3: '#ffed91',
          4: '#ffe55e',
          5: '#ffdd2e',
          6: '#ffd500',
          7: '#d9b500',
          8: '#b59700',
          9: '#917900',
          10: '#736000',
        },
        red: {
          1: '#ffe6e9',
          2: '#ffc2cb',
          3: '#ff91a2',
          4: '#ff5e76',
          5: '#ff2e4d',
          6: '#ff0026',
          7: '#d90020',
          8: '#b5001b',
          9: '#910016',
          10: '#730011',
        },
      },
      fontSize: {
        xs: ['12px', '16px'],
        sm: ['14px', '20px'],
        base: ['16px', '24px'],
        lg: ['18px', '28px'],
        xl: ['20px', '28px'],
        '2xl': ['24px', '32px'],
        '3xl': ['30px', '36px'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      fontFamily: {
        dunggeunmo: ['DungGeunMo', 'sans-serif'],
        pretandard: ['Pretendard', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;

module.exports = {
  extends: [
    'airbnb',
    'airbnb-typescript',
    'next/core-web-vitals',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:tailwindcss/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['import', 'tailwindcss', 'prettier', '@typescript-eslint'],
  rules: {
    'react/require-default-props': 'off',
    'no-param-reassign': ['error', { props: false }],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/lines-between-class-members': ['error', 'always'],
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/no-custom-classname': 'off',
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
  },
};

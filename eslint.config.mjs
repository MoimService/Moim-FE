import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['node_modules/', 'dist/', 'public/'],
  },
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:prettier/recommended',
    'next/core-web-vitals'
  ),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2023,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },
    plugins: {
      react: compat.plugins['react'],
      'react-hooks': compat.plugins['react-hooks'],
      '@typescript-eslint': compat.plugins['@typescript-eslint'],
      'jsx-a11y': compat.plugins['jsx-a11y'],
      prettier: compat.plugins['prettier'],
    },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'react/jsx-filename-extension': [
        'warn',
        { extensions: ['.tsx', '.jsx'] },
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          varsIgnorePattern: '^_',
        },
      ],
      'jsx-a11y/label-has-associated-control': [
        'error',
        {
          required: { some: ['nesting', 'id'] },
        },
      ],
      'no-console': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['*.tsx', '*.jsx'],
    rules: {
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
];

export default eslintConfig;

import importPlugin from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    plugins: {
      import: importPlugin,
      'simple-import-sort': simpleImportSort
    },
    settings: {
      'import/resolver': {
        typescript: true
      }
    },
    rules: {
      'import/order': 'off',

      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // 1) react / внешние
            ['^react$', '^react-dom$', '^@?\\w'],

            // 2) алиасы проекта
            ['^@/'],

            // 3) относительные
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\.(?!/?$)', '^\\./?$'],

            // 4) CSS (в конце)
            ['^.+\\.(css|scss|sass)$']
          ]
        }
      ],
      'simple-import-sort/exports': 'error',
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }]
    }
  }
]);

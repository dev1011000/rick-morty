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
            // 1) side-effect импорты (кроме css)
            ['^\\u0000'],

            // 2) react / внешние
            ['^react$', '^react-dom$', '^@?\\w'],

            // 3) алиасы проекта
            ['^@/'],

            // 4) относительные
            ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
            ['^\\.(?!/?$)', '^\\./?$'],

            // 5) CSS
            ['^.+\\.css$']
          ]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  }
]);

import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import expoConfig from 'eslint-config-expo/flat';
import prettierConfig from 'eslint-config-prettier';
import jestPlugin from "eslint-plugin-jest";

export default defineConfig( [
  // --- Global ignores ---
  globalIgnores( [
    'dist/*',
    '.expo/*',
    'scripts/*',
    'node_modules/*',
  ] ),

  // --- Base Expo and Prettier configs ---
  ...expoConfig,
  prettierConfig,

  // --- Import resolver settings ---
  {
    settings: {
      'import/resolver': {
        // Uses eslint-import-resolver-typescript automatically
        typescript: true,
        node: { extensions: [ '.js', '.jsx', '.ts', '.tsx' ] },
      },
    },
  },

  // --- General Rules for ALL Files (JS, JSX, TS, TSX) ---
  {
    files: [ '**/*.{js,jsx,ts,tsx}' ],
    rules: {
      'no-console': 'error', // Disallow console.log/error/warn

      'eqeqeq': [ 'error', 'always' ],
      'no-eval': 'error',
      'no-duplicate-imports': 'error', // Prevent importing the same module twice.
      'no-var': 'error', // Enforce let / const instead of var
      'prefer-const': 'error', // Use const when variable is never reassigned
      'no-nested-ternary': 'warn',
      'no-unused-expressions': 'error',

      'import/no-cycle': [ 'error', { maxDepth: 2 } ], // Avoid circular imports

      // --- Module boundaries ---
      'import/no-restricted-paths': [
        'error',
        {
          zones: [
            // shared → (cannot import from app, screens, or features)
            { target: './src/shared', from: './src/app' },
            { target: './src/shared', from: './src/screens' },
            { target: './src/shared', from: './src/features' },
            { target: './src/shared', from: '@/app' },
            { target: './src/shared', from: '@/features' },
            { target: './src/shared', from: '@/features-solah' },

            // features → (cannot import from app or screens)
            { target: './src/features', from: './src/app' },
            { target: './src/features', from: './src/screens' },
            { target: './src/features', from: '@/screens' },
            { target: './src/features', from: '@/app' },

            // screens → (cannot import from app)
            { target: './src/screens', from: './src/app' },
            { target: './src/screens', from: '@/app' },
          ],
        },
      ],

      // --- Import sorting and grouping ---
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
          ],
          'newlines-between': 'always',
          pathGroups: [
            { pattern: '@/shared/**', group: 'internal', position: 'before' },
            { pattern: '@/features-solah/**', group: 'internal', position: 'before' },
            { pattern: '@/features/**', group: 'internal', position: 'before' },
            { pattern: '@/screens/**', group: 'internal', position: 'before' },
            { pattern: '@/app/**', group: 'internal', position: 'after' },
          ],
          pathGroupsExcludedImportTypes: [ 'internal' ],
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      'import/no-unresolved': 'error',
      'import/extensions': [ 'error', 'never', {
        json: 'always'
      } ],
    },
  },

  // Jest Rules
  {
    files: [
      "**/__tests__/**/*.{js,jsx,ts,tsx}",
      "**/*.{test,spec}.{js,jsx,ts,tsx}",
      "jest.setup.{js,ts}",
    ],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
    rules: {
      // Start with the recommended rules for Jest tests
      ...jestPlugin.configs.recommended.rules,
    },
  },

  // --- Dedicated Rules for TS / TSX Files ---
  {
    files: [ '**/*.{ts,tsx}' ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json', // Enables type-aware linting
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Disable base rules, enable TS-aware equivalents
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [ 'error', { argsIgnorePattern: '^_' } ],

      'no-shadow': 'off',
      '@typescript-eslint/no-shadow': 'error',

      'dot-notation': 'off',
      '@typescript-eslint/dot-notation': 'error',
    },
  },
] );

import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
    jquery: true,
  },
  ignores: [
    'node_modules',
    'assets/*', // Ignore all files under assets
    'dist/*', // Ignore all files under dist
  ], // Add ignored paths if any
  files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'], // Include all relevant extensions for your project
  extends: ['airbnb-base'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['eslint.config.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-alert': 'off', // Alerts are allowed for a Chrome extension
    'import/extensions': 'off', // Must use JS extensions for assets
    'no-undef': 'off', // Allows using imported module functions
    'no-useless-escape': 'off', // Regex escape sequences were flagged
    'no-param-reassign': 'off', // OK for params to be modified
    'no-await-in-loop': 'off', // Required for critical sections
  },
});

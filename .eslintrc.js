module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
    jquery: true,
  },
  extends: 'airbnb-base',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
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
    'no-alert': 'off', // alerts are fine for a chrome extension
    'import/extensions': 'off', // must use js extensions for assets
    'no-undef': 'off', // allows using imported module functions
    'no-useless-escape': 'off', // regex escape sequences were flagged
    'no-param-reassign': 'off', // ok for params to be modified
    'no-await-in-loop': 'off', // required for critical sections
    'no-console': 'warn', // Change from error to warning
    'class-methods-use-this': 'off',
    'max-classes-per-file': 'off',
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'warn',
    'no-plusplus': 'off',
    'func-names': 'warn',
    'no-unused-vars': 'warn',
    'no-unused-expressions': 'warn',
    'max-len': ['warn', { code: 200 }],
  },
};

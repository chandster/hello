module.exports = {
  env: {
    browser: true,
    es2021: true,
    webextensions: true,
    jquery: true,
    jest: true,
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
    'import/prefer-default-export': 'off',
    'class-methods-use-this': 'off',
    'no-plusplus': 'off',
    'no-unused-expressions': 'off',
    'max-classes-per-file': 'off',
    'no-console': 'off',
    'no-use-before-define': 'off',
    'no-restricted-syntax': 'off',
    'no-unused-vars': 'off',
    'func-names': 'off',
    'max-len': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'always', // ✅ Allow JS file extensions in imports
      },
    ],
  },
};

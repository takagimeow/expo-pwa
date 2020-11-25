module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    // 'plugin:@typescript-eslint/eslint-recommended',
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'airbnb-typescript/base',
    'universe/native',
    'prettier',
  ],
  globals: {
    fetch: false,
  },
  rules: {
    indent: 'off',
    '@typescript-eslint/indent': ['off', 'tab'],
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
        trailingComma: 'all',
      },
    ],
    'no-unused-vars': 'warn',
    'no-console': 'off',
    'no-undef': 'off',
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    'import/prefer-default-export': 'off',
    //"no-unsafe-member-access": "off",
  },
};

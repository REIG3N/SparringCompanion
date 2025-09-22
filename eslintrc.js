module.exports = {
  env: {
    browser: true,
    es2021: true,
    'react-native/react-native': true,
  },
  extends: [
    'eslint:recommended',
    '@react-native-community',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'react-native',
  ],
  rules: {
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'no-unused-vars': 'warn',
    'semi': ['error', 'always'],
    'quotes': ['error', 'single'],
  },
};
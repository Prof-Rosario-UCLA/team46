module.exports = {
  env: {
    node: true,      // enable Node.js global variables like `process`
    es2021: true      // enable modern ECMAScript globals
  },
  extends: [
    'eslint:recommended',
    'plugin:node/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // Ignore unused vars whose name starts with "_"
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
  }
};

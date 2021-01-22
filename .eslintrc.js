const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react', 'import'],
  plugins: ['prettier', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    indent: [2, 2, { SwitchCase: 1 }],
    'react/jsx-filename-extension': ['.js'],
    camelcase: 0,
    "no-unused-vars": 2
  },
  settings: {
    'import/resolver': {
      "node": {
        "paths": ["src"]
      },
    },
  },
};

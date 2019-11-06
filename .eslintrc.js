module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    'arrow-parens': 'off',
    'arrow-body-style': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-useless-escape': 'off',
    'import/prefer-default-export': 'off'
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
};

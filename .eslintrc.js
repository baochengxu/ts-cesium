/*
 * @Author: your name
 * @Date: 2021-02-01 17:13:11
 * @,@LastEditTime: ,: 2021-02-02 23:18:47
 * @,@LastEditors: ,: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ts-cesuim\.eslintrc.js
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/typescript/recommended'
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-ternary': 'off',
    "no-var": 'warn',
    'no-unneeded-ternary': 'off',
    'no-nested-ternary': 'error',
    'space-before-function-paren': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/interface-name-prefix': [2, {
      prefixWithI: 'always'
    }]
  },
}
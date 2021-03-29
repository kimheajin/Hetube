module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: [
        'airbnb-base',
        'eslint:recommended',
    ],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module',
    },
    rules: {
        indent: [
            'error',
            4,
        ],
        semi: [
            'error',
            'always',
        ],
        'no-trailing-spaces': 0,
        'keyword-spacing': 0,
        'no-unused-vars': {
            commonjs: [true], 
            amd: [true]
        },
        'space-before-function-paren': 0,
        'eol-last': 0,
    },
};
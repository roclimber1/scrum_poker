module.exports = {
    extends: ['next/core-web-vitals', 'eslint:recommended'],
    rules: {
        'camelcase': ['warn', { 'properties': 'always' }],

        'comma-dangle': ['error', {
            'arrays': 'never',
            'objects': 'never',
            'imports': 'never',
            'exports': 'never',
            'functions': 'never'
        }],

        'indent': [
            'error',
            4,
            { 'SwitchCase': 1 }
        ],

        'operator-linebreak': [
            'error',
            'before'
        ],

        'quotes': [
            'error',
            'single'
        ],

        'semi': [
            'error',
            'never'
        ],

        'object-curly-spacing': ['error', 'always', {
            'arraysInObjects': false,
            'objectsInObjects': false
        }],

        'array-bracket-spacing': ['error', 'never', {
            'arraysInArrays': false,
            'objectsInArrays': false,
            'singleValue': false
        }],

        'space-infix-ops': ['error', { 'int32Hint': false }],

        'keyword-spacing': ['error'],

        'no-multi-spaces': ['error', { exceptions: { 'ImportDeclaration': true }}],

        'react/jsx-curly-spacing': [2, { 'when': 'never', 'children': true }],

        'react/jsx-closing-bracket-location': [1, 'line-aligned'],

        'react/self-closing-comp': ['error', {
            'component': true,
            'html': true
        }],

        'react/display-name': ['warn', { 'ignoreTranspilerName': false }],

        'space-before-blocks': ['error', { 'functions': 'always', 'keywords': 'always', 'classes': 'always' }],

        'jsdoc/newline-after-description': ['error' | 'warn', 'never'],

        'brace-style': 'error',

        'curly': 'error',

        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var']},
            { blankLine: 'always', prev: 'directive', next: '*' },
            { blankLine: 'any', prev: 'directive', next: 'directive' },
            { blankLine: 'always', prev: ['case', 'default'], next: '*' },
            { blankLine: 'always', prev: '*', next: ['break', 'continue']},
            { blankLine: 'always', prev: ['function', 'if', 'while', 'for', 'block-like', 'multiline-block-like', 'block'], next: '*' },
            { blankLine: 'always', prev: '*', next: ['function', 'if', 'while', 'for', 'block-like', 'multiline-block-like', 'block']}
        ],

        'no-fallthrough': ['error', { 'commentPattern': 'break[\\s\\w]*omitted' }],

        'react/jsx-tag-spacing': ['error', { 'beforeSelfClosing': 'always' }]
    }
}

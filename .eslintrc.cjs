module.exports = {
    root: true,
    env: { browser: true, es2020: true },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/strict-type-checked',
        'plugin:react-hooks/recommended',
        'plugin:@typescript-eslint/stylistic-type-checked',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime'
    ],
    ignorePatterns: ['dist', '.eslintrc.cjs', 'postcss.config.cjs', 'vite.config.ts'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: ['./tsconfig.json'],
        tsconfigRootDir: __dirname,
    },
    plugins: ['react-refresh', 'prefer-arrow', '@stylistic'],
    rules: {
        'react-refresh/only-export-components': [
            'warn',
            { allowConstantExport: true },
        ],
        'quotes': ['error', 'single'],
        'semi': ['error', 'never'],
        'comma-dangle': ['error', 'never'],
        'prefer-arrow/prefer-arrow-functions': ['warn'],
        '@typescript-eslint/no-confusing-void-expression': ['off'],
        '@typescript-eslint/consistent-type-definitions': ['off'],
        '@typescript-eslint/restrict-template-expressions': ['error', {
            allowAny: false,
            allowArray: false,
            allowBoolean: true,
            allowNever: false,
            allowNullish: true,
            allowNumber: true,
            allowRegExp: false
        }],
        '@typescript-eslint/no-non-null-assertion': ['off'],
        '@typescript-eslint/no-floating-promises': ['off'],
        '@stylistic/brace-style': ['error', '1tbs', {
            allowSingleLine: true
        }],
        'curly': ['error', 'all'],
        '@stylistic/no-multiple-empty-lines': ['error', {
            max: 1,
            maxEOF: 0,
            maxBOF: 0
        }],
        '@stylistic/eol-last': ['error', 'always'],
        'no-empty': ['error', {
            'allowEmptyCatch': true
        }],
        '@typescript-eslint/no-misused-promises': ['error', {
            checksConditionals: true,
            checksVoidReturn: {
                arguments: false
            },
            checksSpreads: true
        }],
        'no-console': ['warn'],
        'no-alert': ['warn'],
        'no-debugger': ['warn'],
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}

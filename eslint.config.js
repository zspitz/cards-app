import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import preferArrow from 'eslint-plugin-prefer-arrow'
import stylistic from '@stylistic/eslint-plugin'

export default tseslint.config(
    { ignores: ['dist'] },
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    {
        extends: [
            js.configs.recommended,
            ...tseslint.configs.strictTypeChecked,
            ...tseslint.configs.stylisticTypeChecked
        ],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'prefer-arrow': preferArrow,
            'stylistic': stylistic,
            'tseslint': tseslint
        },
        rules: {
            ...reactHooks.configs.recommended.rules,
            'react-refresh/only-export-components': [
                'warn',
                { allowConstantExport: true },
            ],
            'quotes': ['error', 'single'],
            'semi': ['error', 'never'],
            'comma-dangle': ['error', 'never'],
            'curly': ['error', 'all'],
            'prefer-arrow/prefer-arrow-functions': ['warn'],
            'no-empty': ['error', {
                'allowEmptyCatch': true
            }],
            'no-console': ['warn'],
            'no-alert': ['warn'],
            'no-debugger': ['warn'],

            'stylistic/brace-style': ['error', '1tbs', {
                allowSingleLine: true
            }],
            'stylistic/no-multiple-empty-lines': ['error', {
                max: 1,
                maxEOF: 0,
                maxBOF: 0
            }],
            'stylistic/eol-last': ['error', 'always'],

            '@typescript-eslint/no-confusing-void-expression': ['off'],
            '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
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
            '@typescript-eslint/no-misused-promises': ['error', {
                checksConditionals: true,
                checksVoidReturn: {
                    arguments: false,
                    attributes: false,
                    properties: false,
                    variables: false
                },
                checksSpreads: true
            }]
        },
    },
)

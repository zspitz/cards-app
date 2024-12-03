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
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            ecmaVersion: 2020,
            globals: globals.browser,
        },
        plugins: {
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'prefer-arrow': preferArrow,
            'stylistic': stylistic
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
            'stylistic/eol-last': ['error', 'always']


        },
    },
)

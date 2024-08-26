import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import eslintConfigPrettier from 'eslint-config-prettier' // 新增

export default [
  {
    ignores: [
      '**/dev/*',
      '**/dist/*',
      '**/tests/*',
      'tsconfig.json',
      'tailwind.config.js',
      '**/ui/**',
    ],
  },
  { files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier, // 新增
  {
    rules: {
      'react/react-in-jsx-scope': 'off', // 关闭 'React' 必须在 JSX 范围内的规则
    },
  },
  {
    settings: {
      react: {
        version: 'detect', // 自动检测 React 版本
      },
    },
  },
]

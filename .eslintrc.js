/**
 * Specific eslint rules for this app/package, extends the base rules
 * @see https://github.com/belgattitude/nextjs-monorepo-example/blob/main/docs/about-linters.md
 */

// Workaround for https://github.com/eslint/eslint/issues/3458 (re-export of @rushstack/eslint-patch)
require('./eslint-config-bases/patch/modern-module-resolution');

const { getDefaultIgnorePatterns } = require('./eslint-config-bases/helpers');

module.exports = {
  root: true,
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: 'tsconfig.json',
  },
  ignorePatterns: [...getDefaultIgnorePatterns(), '.next', '.out'],
  extends: [
    './eslint-config-bases/bases/typescript',
    './eslint-config-bases/bases/sonar',
    './eslint-config-bases/bases/regexp',
    './eslint-config-bases/bases/jest',
    './eslint-config-bases/bases/react',
    './eslint-config-bases/bases/tailwind',
    './eslint-config-bases/bases/rtl',
    // Add specific rules for nextjs
    'plugin:@next/next/core-web-vitals',
    // Apply prettier and disable incompatible rules
    './eslint-config-bases/bases/prettier',
  ],
  rules: {
    // https://github.com/vercel/next.js/discussions/16832
    '@next/next/no-img-element': 'off',
    // For the sake of example
    // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/HEAD/docs/rules/anchor-is-valid.md
    'jsx-a11y/anchor-is-valid': 'off',
  },
  overrides: [
    {
      files: ['next.config.mjs'],
      rules: {
        'import/order': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
    {
      files: ['src/pages/\\_*.{ts,tsx}'],
      rules: {
        'react/display-name': 'off',
      },
    },
    {
      files: ['src/backend/**/*graphql*schema*.ts'],
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            // Fine-tune naming convention for graphql resolvers and allow PascalCase
            selector: ['objectLiteralProperty'],
            format: ['camelCase', 'PascalCase'],
          },
        ],
      },
    },
  ],
};

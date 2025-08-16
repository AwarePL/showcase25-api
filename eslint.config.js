import tseslint from 'typescript-eslint'
import prettierConfig from 'eslint-config-prettier'

export default tseslint.config(
  // Applies ESLint's recommended rules
  {
    rules: {
      // You can add any specific ESLint rule overrides here
    },
  },

  // Applies TypeScript-ESLint's recommended rules
  ...tseslint.configs.recommended,

  // IMPORTANT: This must be the last configuration in the array.
  // It turns off all ESLint rules that are unnecessary or might conflict with Prettier.
  prettierConfig,
)

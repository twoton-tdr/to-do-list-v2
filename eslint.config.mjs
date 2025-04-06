import globals from "globals";
import tseslint from "typescript-eslint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
  ...tseslint.configs.recommended,
  {
    "rules": {
      "no-console": "error",
      "indent": ["warn", 2],
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    }

  },
  eslintConfigPrettier,
];
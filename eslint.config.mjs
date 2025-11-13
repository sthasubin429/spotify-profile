import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import globals from "globals";

export default [
  js.configs.recommended,
  prettierConfig,
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    plugins: {
      "@typescript-eslint": typescript,
      prettier: prettier,
    },
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "prettier/prettier": "warn",
      "no-console": "warn",
      "semi": "warn",
      "@typescript-eslint/no-empty-function": ["error", { allow: ["constructors"] }],
      "@typescript-eslint/explicit-function-return-type": "off",
      "space-before-blocks": "warn",
      "object-shorthand": "warn",
      "eqeqeq": "warn",
      "arrow-spacing": "warn",
      "no-useless-escape": "warn",
      "no-prototype-builtins": "warn",
      "prefer-spread": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "no-multi-spaces": ["error", { ignoreEOLComments: false }],
      "max-len": ["warn", { code: 140 }],
      "keyword-spacing": "warn",
      "arrow-parens": ["off", "always"],
      "space-before-function-paren": ["warn", { anonymous: "always", named: "never", asyncArrow: "always" }],
    },
  },
  {
    ignores: [".next/", "node_modules/", "out/", ".husky/", "*.config.js", "*.config.mjs", "*.config.ts"],
  },
];

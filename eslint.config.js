import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";
import markdown from "@eslint/markdown";
import css from "@eslint/css";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: [
      "**/*.{js,mjs,cjs,ts}"
    ],
    languageOptions:{
      parser: tsParser,
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      js, tsPlugin, complexity
    },
    extends: [
        "js/recommended", "plugin:@typescript-eslint/recommended"
      ]
  },

  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "complexity": ["error", { max: 8 }],
      "@typescript-eslint/explicit-function-return-type": "warning",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn",
        {
        argsIgnorePattern: "^_"
        }],
    }
  },

  
  {
    files: ["test/**/*.{ts,tsx,js,jsx}"],
    rules: {
      "complexity": ["warn", { max: 20 }],
      "no-console": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn",
        {
        argsIgnorePattern: "^_"
      }]
    }
  },
  tseslint.configs.recommended,
  {
    files: ["**/*.json"], plugins: { json }, language: "json/json", extends: ["json/recommended"]
  },
  {
    files: ["**/*.jsonc"], plugins: { json }, language: "json/jsonc", extends: ["json/recommended"]
  },
  {
    files: ["**/*.json5"], plugins: { json }, language: "json/json5", extends: ["json/recommended"]
  },
  {
    files: ["**/*.md"], plugins: { markdown }, language: "markdown/gfm", extends: ["markdown/recommended"]
  },
  {
    files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"]
  },
]);
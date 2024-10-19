import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": tseslint,
      react: pluginReact,
      prettier: prettierPlugin, // Activando el plugin de Prettier
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "prettier/prettier": "error", // Aplicando las reglas de Prettier
      "react/jsx-filename-extension": [1, { extensions: [".jsx", ".tsx"] }],
      "react/react-in-jsx-scope": "off",
      "no-console": "warn",
      "no-unused-vars": "warn",
    },
    settings: {
      react: {
        version: "detect", // Detecta automáticamente la versión de React
      },
    },
  },
];

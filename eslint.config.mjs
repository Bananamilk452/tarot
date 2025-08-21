import eslint from "@eslint/js";
import pluginQuery from "@tanstack/eslint-plugin-query";
import pluginRouter from "@tanstack/eslint-plugin-router";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";

const eslintConfig = [
  reactHooks.configs["recommended-latest"],
  ...pluginQuery.configs["flat/recommended"],
  ...pluginRouter.configs["flat/recommended"],
  ...tseslint.config(eslint.configs.recommended, tseslint.configs.recommended),
];

export default eslintConfig;

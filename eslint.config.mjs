import tseslint from "typescript-eslint";

export default tseslint.config([
  {
    files: ["**/*.ts"],
  },
  {
    ignores: ["**/node_modules/**", "**/dist/**"],
  },
  tseslint.configs.recommended,
  tseslint.configs.eslintRecommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
]);

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    parser: "@typescript-eslint/parser", // Ensure TypeScript parsing is enabled
    parserOptions: {
      project: "./tsconfig.json", // Make sure ESLint knows where the tsconfig is
      tsconfigRootDir: __dirname, // Helps to resolve tsconfig relative to current file
      sourceType: "module", // Treats the file as a module
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unsafe-assignment": "warn",
    },
  },
];

export default eslintConfig;

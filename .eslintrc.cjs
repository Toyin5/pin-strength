module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  env: {
    node: true,
    es2021: true
  },
  ignorePatterns: ["dist"],
  overrides: [
    {
      files: ["tests/**/*.ts"],
      env: {
        jest: true
      }
    }
  ]
};

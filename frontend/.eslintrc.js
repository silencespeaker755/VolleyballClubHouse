module.exports = {
  env: {
    browser: true,
    es2020: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier", "prettier/react"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 11,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-filename-extension": 0,
    "prettier/prettier": ["error"],
    "react/prop-types": 0,
    "no-param-reassign": 0,
    "react/no-danger": 0,
    "no-nested-ternary": 0,
    "no-bitwise": 0,
    "no-eval": 0,
    "no-unused-vars": 0,
    "react/no-array-index-key": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "import/prefer-default-export": 0,
    "no-underscore-dangle": 0,
    "react/jsx-props-no-spreading": 0,
    "import/no-unresolved": [2, { caseSensitive: false }],
    "jsx-a11y/label-has-associated-control": [
      2,
      {
        labelComponents: ["label"],
        labelAttributes: ["htmlFor"],
        controlComponents: ["input"],
      },
    ],
  },
};

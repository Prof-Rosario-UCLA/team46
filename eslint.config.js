// eslint.config.js – ESLint Flat Config for React + Prettier

import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript core rules
  js.configs.recommended,

  // React flat preset
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect", // Automatically detect React version
      },
    },
    rules: {
      // For React 17+, these are not needed
      "react/react-in-jsx-scope": "off",
      "react/jsx-uses-react": "off",
    },
  },

  // Browser globals (window, document, etc.)
  {
    languageOptions: { globals: globals.browser },
  },

  // Disable style rules that clash with Prettier – must be last
  {
    ...prettier,
  },
]);

import {
  generateBlurModeConditions,
  generateBlurModes,
} from "@/utils/blurModes";
import { generateColors } from "@/utils/colors";
import { generateThemeModeConditions } from "@/utils/themeModes";
import { generateThemeConditions } from "@/utils/themes";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  // Whether to update the .gitignore file.
  gitignore: true,
  // Whether to minify the generated CSS.
  minify: true,
  // Shorten classnames
  hash: true,

  // Where to look for css declarations
  include: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  conditions: {
    ...generateThemeModeConditions(),
    ...generateThemeConditions(),
    ...generateBlurModeConditions(),
  },

  globalCss: {
    // Global selection
    "::selection": {
      bg: "text.90",
      color: "background.100",
    },
  },

  // Useful for theme customization
  theme: {
    extend: {},
    semanticTokens: {
      blurs: generateBlurModes(),
      colors: generateColors(),
    },
  },

  // The output directory for your css system
  outdir: "styles",

  jsxFramework: "react",
});

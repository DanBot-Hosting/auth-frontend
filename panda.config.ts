import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  conditions: {
    dark: "[data-color-mode=dark] &",
    light: "[data-color-mode=light] &",
  },

  // Useful for theme customization
  theme: {
    extend: {},

    // Semantic tokens used in css, non semantic aren't used
    semanticTokens: {
      colors: {
        text: {
          value: {
            _dark: { value: "{colors.white}" },
            _light: { value: "{colors.black}" },
          },
        },
        background: {
          value: {
            _dark: { value: "{colors.black}" },
            _light: { value: "{colors.white}" },
          },
        },
        accent: {
          value: {
            _dark: { value: "{colors.ceil}" },
            _light: { value: "{colors.blurple}" },
          },
        },
        primary: { value: "{colors.dbh}" },
        secondary: {
          value: {
            _dark: { value: "{colors.eerie}" },
            _light: { value: "{colors.azure}" },
          },
        }
      },
    },
    tokens: {
      colors: {
        black: {
          5: { value: "hsla(0, 0%, 2%, 0.05)" },
          10: { value: "hsla(0, 0%, 2%, 0.1)" },
          20: { value: "hsla(0, 0%, 2%, 0.2)" },
          30: { value: "hsla(0, 0%, 2%, 0.3)" },
          40: { value: "hsla(0, 0%, 2%, 0.4)" },
          50: { value: "hsla(0, 0%, 2%, 0.5)" },
          60: { value: "hsla(0, 0%, 2%, 0.6)" },
          70: { value: "hsla(0, 0%, 2%, 0.7)" },
          80: { value: "hsla(0, 0%, 2%, 0.8)" },
          90: { value: "hsla(0, 0%, 2%, 0.9)" },
          100: { value: "hsl(0, 0%, 2%)" },
        },
        white: {
          5: { value: "hsla(0, 0%, 98%, 0.05)" },
          10: { value: "hsla(0, 0%, 98%, 0.1)" },
          20: { value: "hsla(0, 0%, 98%, 0.2)" },
          30: { value: "hsla(0, 0%, 98%, 0.3)" },
          40: { value: "hsla(0, 0%, 98%, 0.4)" },
          50: { value: "hsla(0, 0%, 98%, 0.5)" },
          60: { value: "hsla(0, 0%, 98%, 0.6)" },
          70: { value: "hsla(0, 0%, 98%, 0.7)" },
          80: { value: "hsla(0, 0%, 98%, 0.8)" },
          90: { value: "hsla(0, 0%, 98%, 0.9)" },
          100: { value: "hsl(0, 0%, 98%)" },
        },
        blurple: {
          5: { value: "hsla(225.9, 46.7%, 50%, 0.05)" },
          10: { value: "hsla(225.9, 46.7%, 50%, 0.1)" },
          20: { value: "hsla(225.9, 46.7%, 50%, 0.2)" },
          30: { value: "hsla(225.9, 46.7%, 50%, 0.3)" },
          40: { value: "hsla(225.9, 46.7%, 50%, 0.4)" },
          50: { value: "hsla(225.9, 46.7%, 50%, 0.5)" },
          60: { value: "hsla(225.9, 46.7%, 50%, 0.6)" },
          70: { value: "hsla(225.9, 46.7%, 50%, 0.7)" },
          80: { value: "hsla(225.9, 46.7%, 50%, 0.8)" },
          90: { value: "hsla(225.9, 46.7%, 50%, 0.9)" },
          100: { value: "hsl(225.9, 46.7%, 50%)" },
        },
        ceil: {
          5: { value: "hsla(226.5, 46.4%, 70%, 0.05)" },
          10: { value: "hsla(226.5, 46.4%, 70%, 0.1)" },
          20: { value: "hsla(226.5, 46.4%, 70%, 0.2)" },
          30: { value: "hsla(226.5, 46.4%, 70%, 0.3)" },
          40: { value: "hsla(226.5, 46.4%, 70%, 0.4)" },
          50: { value: "hsla(226.5, 46.4%, 70%, 0.5)" },
          60: { value: "hsla(226.5, 46.4%, 70%, 0.6)" },
          70: { value: "hsla(226.5, 46.4%, 70%, 0.7)" },
          80: { value: "hsla(226.5, 46.4%, 70%, 0.8)" },
          90: { value: "hsla(226.5, 46.4%, 70%, 0.9)" },
          100: { value: "hsl(226.5, 46.4%, 70%)" },
        },
        dbh: {
          5: { value: "hsla(225.7, 58%, 64.5%, 0.05)" },
          10: { value: "hsla(225.7, 58%, 64.5%, 0.1)" },
          20: { value: "hsla(225.7, 58%, 64.5%, 0.2)" },
          30: { value: "hsla(225.7, 58%, 64.5%, 0.3)" },
          40: { value: "hsla(225.7, 58%, 64.5%, 0.4)" },
          50: { value: "hsla(225.7, 58%, 64.5%, 0.5)" },
          60: { value: "hsla(225.7, 58%, 64.5%, 0.6)" },
          70: { value: "hsla(225.7, 58%, 64.5%, 0.7)" },
          80: { value: "hsla(225.7, 58%, 64.5%, 0.8)" },
          90: { value: "hsla(225.7, 58%, 64.5%, 0.9)" },
          100: { value: "hsl(225.7, 58%, 64.5%)" },
        },
        azure: {
          5: { value: "hsla(224.3, 45.1%, 90%, 0.05)" },
          10: { value: "hsla(224.3, 45.1%, 90%, 0.1)" },
          20: { value: "hsla(224.3, 45.1%, 90%, 0.2)" },
          30: { value: "hsla(224.3, 45.1%, 90%, 0.3)" },
          40: { value: "hsla(224.3, 45.1%, 90%, 0.4)" },
          50: { value: "hsla(224.3, 45.1%, 90%, 0.5)" },
          60: { value: "hsla(224.3, 45.1%, 90%, 0.6)" },
          70: { value: "hsla(224.3, 45.1%, 90%, 0.7)" },
          80: { value: "hsla(224.3, 45.1%, 90%, 0.8)" },
          90: { value: "hsla(224.3, 45.1%, 90%, 0.9)" },
          100: { value: "hsl(224.3, 45.1%, 90%)" },
        },
        eerie: {
          5: { value: "hsla(224.3, 45.1%, 10%, 0.05)" },
          10: { value: "hsla(224.3, 45.1%, 10%, 0.1)" },
          20: { value: "hsla(224.3, 45.1%, 10%, 0.2)" },
          30: { value: "hsla(224.3, 45.1%, 10%, 0.3)" },
          40: { value: "hsla(224.3, 45.1%, 10%, 0.4)" },
          50: { value: "hsla(224.3, 45.1%, 10%, 0.5)" },
          60: { value: "hsla(224.3, 45.1%, 10%, 0.6)" },
          70: { value: "hsla(224.3, 45.1%, 10%, 0.7)" },
          80: { value: "hsla(224.3, 45.1%, 10%, 0.8)" },
          90: { value: "hsla(224.3, 45.1%, 10%, 0.9)" },
          100: { value: "hsl(224.3, 45.1%, 10%)" },
        },
      },
      fonts: {
        body: { value: "system-ui, sans-serif" },
      },
    },
  },

  // The output directory for your css system
  outdir: "styles",
});

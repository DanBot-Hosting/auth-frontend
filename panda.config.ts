import { defineConfig } from "@pandacss/dev";

function hslToHsla(opacity: number, hsl: string) {
  return hsl.replace("hsl", "hsla").slice(0, -1) + `, ${opacity / 100})`;
}

interface OpacityColor {
  value: {
    _dark: { value: string };
    _light: { value: string };
  };
}

function generateOpacities(
  lightHsl: string,
  darkHsl: string = lightHsl,
  opacities: number[] = [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
) {
  const result: Record<number, OpacityColor> = {};

  for (let i in opacities) {
    result[opacities[i]] = {
      value: {
        _dark: { value: hslToHsla(opacities[i], darkHsl) },
        _light: { value: hslToHsla(opacities[i], lightHsl) },
      },
    };
  }

  return result;
}

export default defineConfig({
  // Whether to use css reset
  preflight: true,
  // Whether to update the .gitignore file.
  gitignore: true,
  // Whether to minify the generated CSS.
  minify: true,
  // Shorten classnames
  hash: true,

  // Where to look for your css declarations
  include: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  conditions: {
    dark: "[data-theme-mode=dark] &",
    light: "[data-theme-mode=light] &",
    dbh: "[data-theme=dbh] &",
    vampire: "[data-theme=vampire] &",
  },

  globalCss: {
    "::selection": {
      bg: "text.90",
      color: "background.100",
    }
  },

  // Useful for theme customization
  theme: {
    extend: {},
    semanticTokens: {
      colors: {
        pillbackground: generateOpacities(
          "hsl(0, 0%, 80%)",
          "hsl(0, 0%, 23.1%)",
          [30, 50, 70]
        ),
        background: generateOpacities("hsl(0, 0%, 98%)", "hsl(0, 0%, 2%)"),
        text: generateOpacities("hsl(0, 0%, 2%)", "hsl(0, 0%, 98%)"),
        accent: generateOpacities(
          "hsl(225.9, 46.7%, 50%)",
          "hsl(226.5, 46.4%, 70%)"
        ),
        primary: generateOpacities("hsl(225.7, 58%, 64.5%)"),
        secondary: generateOpacities(
          "hsl(224.3, 45.1%, 90%)",
          "hsl(224.3, 45.1%, 10%)"
        ),
        // Custom semantic token for mesh because module only accepts hex
        mesh: {
          1: {
            value: {
              _dark: { value: "#050505" },
              _light: { value: "#FAFAFA" },
            },
          },
          2: {
            value: {
              _dbh: {
                _dark: { value: "#1A1F2F" },
                _light: { value: "#DEE3F3" },
              },
              _vampire: {
                _dark: { value: "#190A0A" },
                _light: { value: "#F3DDDD" },
              },
            },
          },
          3: {
            value: {
              _dbh: {
                _dark: { value: "#050505" },
                _light: { value: "#FAFAFA" },
              },
              _vampire: {
                _dark: { value: "#050505" },
                _light: { value: "#FAFAFA" },
              },
            },
          },
        },
        // Overlay used for loading overlay & modals
        solidoverlay: {
          value: {
            _dark: { value: "hsl(0, 0%, 11%)" },
            _light: { value: "hsl(0, 0%, 88.6%)" },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styles",
});

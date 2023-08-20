import { defineConfig, defineRecipe } from "@pandacss/dev";

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
    extend: {
      // Mesh recipe to declare a non-atomic class
      // see: https://discord.com/channels/1118988919804010566/1120305029056831548/1142387960227057667
      // from: https://discord.gg/VQrkpsgSx7
      recipes: {
        mesh: {
          className: "mesh",
          base: {
            "--gradient-color-1": "token(colors.mesh.1)",
            "--gradient-color-2": "token(colors.mesh.1)",
            "--gradient-color-3": "token(colors.mesh.1)",
            "--gradient-color-4": "token(colors.mesh.2)",
          },
        },
      },
    },
    semanticTokens: {
      colors: {
        pillbackground: generateOpacities("hsl(0, 0%, 2%)", "hsl(0, 0%, 98%)"),
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
              _dark: { value: "#10121A" },
              _light: { value: "#ECEFF7" },
            },
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: "styles",
});

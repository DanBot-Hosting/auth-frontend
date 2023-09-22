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
  // Opt out of default styles config
  presets: ["@danbot-hosting/panda-preset"],
  // Eject all default presets, we only use our own
  eject: true,

  // Where to look for css declarations
  include: [
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/utils/**/*.{js,jsx,ts,tsx}",
  ],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: "styles",

  jsxFramework: "react",
});

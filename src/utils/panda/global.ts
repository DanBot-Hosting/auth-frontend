import { defineGlobalStyles } from "@pandacss/dev";

export const globalCss = defineGlobalStyles({
  // Global selection
  "::selection": {
    bg: "text.90",
    color: "background.100",
  },
});

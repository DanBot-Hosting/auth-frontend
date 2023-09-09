import { defineKeyframes } from "@pandacss/dev";

export const keyframes = defineKeyframes({
  // Loading spinning animation
  spin: {
    to: {
      transform: "rotate(360deg)",
    },
  },
});

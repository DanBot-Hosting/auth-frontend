export const themeModes = ["dark", "light"] as const;

// The type is globally imported in @/types/utils/panda/themeModes.d.ts
export type ThemeModes = (typeof themeModes)[number];

export function generateThemeModeConditions() {
  let result: Partial<Record<ThemeModes, string>> = {};

  for (let mode of themeModes) {
    result[mode] = `[data-theme-mode=${mode}] &`;
  }

  return result;
}

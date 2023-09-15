import type { Recursive, Token } from "@styles/types/composition";
import { Palette, stringify } from "cvet";
import { generateThemeColors } from "./themes";

const colors: Color[] = [
  {
    name: "Pill Background",
    value: "pillbackground",
    colors: {
      dark: new Palette("#3B3B3B", "HEX"),
      light: new Palette("#CCCCCC", "HEX"),
    },
    tokens: [30, 50, 70],
  },
  {
    name: "Background",
    value: "background",
    colors: {
      dark: new Palette("#050505", "HEX"),
      light: new Palette("#FAFAFA", "HEX"),
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Text",
    value: "text",
    colors: {
      dark: new Palette("#FAFAFA", "HEX"),
      light: new Palette("#050505", "HEX"),
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Accent",
    value: "accent",
    colors: {
      dark: new Palette("#8F9FD6", "HEX"),
      light: new Palette("#4460BB", "HEX"),
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Primary",
    value: "primary",
    colors: {
      dark: new Palette("#7089D9", "HEX"),
      light: new Palette("#7089D9", "HEX"),
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Secondary",
    value: "secondary",
    colors: {
      dark: new Palette("#0e1425", "HEX"),
      light: new Palette("#dae0f1", "HEX"),
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Mesh",
    value: "mesh",
    colors: generateThemeColors,
    tokens: [],
  },
  {
    name: "Solid Overlay",
    value: "solidoverlay",
    colors: () => ({
      value: {
        _dark: { value: stringify(new Palette("#1c1c1c", "HEX").hsl) },
        _light: { value: stringify(new Palette("#e2e2e2", "HEX").hsl) },
      },
    }),
    tokens: [],
  },
];

export function generateColors() {
  const result: Record<
    string,
    Record<number, Recursive<Token>> | Recursive<Token>
  > = {};

  for (let color of colors) {
    let part: Record<number, Recursive<Token> | Token> = {};
    const { tokens } = color;

    if (typeof color.colors === "function") {
      result[color.value] = color.colors();
      continue;
    }
    for (let mode in color.colors) {
      const modeColor = color.colors[mode];
      for (let token of tokens) {
        modeColor.color = {
          ...modeColor.color,
          a: token,
        };
        // Add missing keys
        if (!part[token]) part[token] = { value: {} };
        part[token].value[`_${mode}`] = {
          value: stringify(modeColor.hsla),
        };
      }
    }

    result[color.value] = part;
  }

  return result;
}

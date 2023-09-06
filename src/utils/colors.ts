import type { Recursive, Token } from "@styles/types/composition";
import { generateThemeColors } from "./themes";

const colors: Color[] = [
  {
    name: "Pill Background",
    value: "pillbackground",
    colors: {
      dark: "hsl(0, 0%, 23.1%)",
      light: "hsl(0, 0%, 80%)",
    },
    tokens: [30, 50, 70],
  },
  {
    name: "Background",
    value: "background",
    colors: {
      dark: "hsl(0, 0%, 2%)",
      light: "hsl(0, 0%, 98%)",
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Text",
    value: "text",
    colors: {
      dark: "hsl(0, 0%, 98%)",
      light: "hsl(0, 0%, 2%)",
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Accent",
    value: "accent",
    colors: {
      dark: "hsl(226.5, 46.4%, 70%)",
      light: "hsl(225.9, 46.7%, 50%)",
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Primary",
    value: "primary",
    colors: {
      dark: "hsl(225.7, 58%, 64.5%)",
      light: "hsl(225.7, 58%, 64.5%)",
    },
    tokens: [5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  },
  {
    name: "Secondary",
    value: "secondary",
    colors: {
      dark: "hsl(224.3, 45.1%, 10%)",
      light: "hsl(224.3, 45.1%, 90%)",
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
        _dark: { value: "hsl(0, 0%, 11%)" },
        _light: { value: "hsl(0, 0%, 88.6%)" },
      },
    }),
    tokens: [],
  },
];

function hslToHsla(hsl: string, opacity: number) {
  return hsl.replace("hsl", "hsla").slice(0, -1) + `, ${opacity / 100})`;
}

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
    for (let token of tokens) {
      let tokenValue: Recursive<Token> | Token = { value: {} };

      for (let mode in color.colors) {
        tokenValue.value[`_${mode}`] = {
          value: hslToHsla(color.colors[mode], token),
        };
      }

      part[token] = tokenValue;
    }

    result[color.value] = part;
  }

  return result;
}

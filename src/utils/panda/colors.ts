import { Palette, stringify } from "cvet";
import {
  generateThemeColors,
  modifyColor,
  extendModifiedColor,
  parseModes,
} from "@/utils/panda/themes";
import { Recursive, Token } from "@styles/types/composition";

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
    skipModification: true,
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
      dark: new Palette("#0E1425", "HEX"),
      light: new Palette("#DAE0F1", "HEX"),
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
        _dark: { value: stringify(new Palette("#1C1C1C", "HEX").hsl) },
        _light: { value: stringify(new Palette("#E2E2E2", "HEX").hsl) },
      },
    }),
    tokens: [],
  },
];

/**
 * Generates colors for `panda.config.ts`.
 *
 * @return {Recursive<Token>} The generated colors.
 */
export function generateColors() {
  const result: Recursive<Token> = {};

  for (let color of colors) {
    const { tokens } = color;

    if (typeof color.colors === "function") {
      result[color.value] = color.colors();
      continue;
    }

    let modifiedColor: ModifiedColor;
    if (color.skipModification) {
      modifiedColor = parseModes(color.colors);
    } else {
      modifiedColor = modifyColor(color.colors);
    }
    result[color.value] = extendModifiedColor(
      modifiedColor,
      tokens
    ) as Recursive<Token>;
  }

  return result;
}

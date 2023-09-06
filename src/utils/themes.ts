import { Recursive, Token } from "@styles/types/composition";
import { themeModes } from "@/utils/themeModes";

export const themes: Theme[] = [
  {
    name: "DanBot Hosting",
    value: "dbh",
    colors: {
      dark: ["#050505", "#1A1F2F", "#050505", "#050505"],
      light: ["#FAFAFA", "#DEE3F3", "#FAFAFA", "#FAFAFA"],
    },
  },
  {
    name: "Vampire",
    value: "vampire",
    colors: {
      dark: ["#050505", "#190A0A", "#050505", "#050505"],
      light: ["#FAFAFA", "#F3DDDD", "#FAFAFA", "#FAFAFA"],
    },
  },
  {
    name: "Midnight Purple",
    value: "midnightpurple",
    colors: {
      dark: ["#050505", "#140D23", "#0F0A19", "#050505"],
      light: ["#FAFAFA", "#DDD4F0", "#E4DDF3", "#FAFAFA"],
    },
  },
  {
    name: "Gainsboro",
    value: "gainsboro",
    colors: {
      dark: ["#050505", "#242424", "#0F0F0F", "#050505"],
      light: ["#FAFAFA", "#DCDCDC", "#F0F0F0", "#FAFAFA"],
    },
  },
];

export function generateThemeConditions() {
  let result: Record<string, string> = {};

  for (let i in themes) {
    result[themes[i].value] = `[data-theme=${themes[i].value}] &`;
  }

  return result;
}

export function generateThemeOptions(): SelectOption[] {
  return themes.map(({ name, value }) => ({
    label: name,
    value,
  }));
}

type Accumulator = Partial<Record<ThemeModes, Token>>;

export function generateThemeColors(): Record<
  number,
  Recursive<Token> | Token
> {
  let result: Record<number, Recursive<Token> | Token> = {};

  for (let i = 1; i < 5; i++) {
    let part: Recursive<Token> | Token = { value: {} };

    for (let theme in themes) {
      part.value[`_${themes[theme].value}`] = themeModes.reduce<Accumulator>(
        (acc, mode) => ({
          ...acc,
          [mode]: { value: themes[theme].colors.dark[i - 1] },
        }),
        {}
      );
    }

    result[i] = part;
  }

  return result;
}

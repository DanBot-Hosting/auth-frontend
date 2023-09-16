import { Recursive, Token } from "@styles/types/composition";
import { themeModes } from "@/utils/panda";
import { Filter, Palette, stringify } from "cvet";
import type { Amount, HEX } from "cvet/types";

export const themes: Theme[] = [
  {
    name: "DanBot Hosting",
    value: "dbh",
    colors: {
      dark: ["#050505", "#1A1F2F", "#10121A", "#050505"],
      light: ["#FAFAFA", "#DEE3F3", "#ECEFF7", "#FAFAFA"],
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

/**
 * A function that simply parses modes by prepending underscores.
 * Does a lot of type casting under the hood.
 * 
 * @param {Record<ThemeModes, Palette>} colors - The theme modes to parse. 
 * @returns {ModifiedColor} The modified color object.
 */
export function parseModes(colors: Record<ThemeModes, Palette>): ModifiedColor {
  return Object.keys(colors).reduce<ModifiedColor>(
    (acc, mode) => ({
      ...acc,
      // Type casting for ModifiedColor
      [`_${mode}`]: colors[mode as ThemeModes] as unknown as Record<
        string,
        import("cvet").Palette
      >,
    }),
    {}
  );
}

/**
 * Generates a modified color object based on the provided theme modes.
 * Blends initial theme values with the palette values based on the theme modes.
 * Also parses modes by prepending underscores.
 *
 * @param {Record<ThemeModes, Palette>} themeModes - The theme modes to generate modified colors for.
 * @return {ModifiedColor} The modified color object.
 */
export function modifyColor(
  themeModes: Record<ThemeModes, Palette>
): ModifiedColor {
  const result: ModifiedColor = {};

  for (const mode in themeModes) {
    result[`_${mode}`] = { base: themeModes[mode as ThemeModes] };

    for (const theme of themes) {
      const filter = new Filter(themeModes[mode as ThemeModes].rgb, "RGB");

      for (const token of theme.colors[mode as ThemeModes]) {
        filter.blend(new Palette(token as HEX, "HEX").rgb, 90);
      }

      result[`_${mode}`][`_${theme.value}`] = filter;
    }
  }

  return result;
}

/**
 * Unwraps modified color object by applying alpha channel token.
 * Then converts value to string via smart stringify method.
 *
 * @param {ModifiedColor} modifiedColor - The modified color object to be unwrapped.
 * @param {Amount} token - The alpha token to be applied to the modified color. 0-100%
 * @return {UnwrappedModifiedColor} The unwrapped modified color object.
 */
export function unwrapModifiedColor(
  modifiedColor: ModifiedColor,
  token: Amount
): UnwrappedModifiedColor {
  let result: UnwrappedModifiedColor = {};

  for (const key in modifiedColor) {
    if (modifiedColor[key] instanceof Palette) {
      // generating opacity
      const palette = modifiedColor[key] as unknown as Palette;
      const alphaPalette = new Palette({ ...palette.rgb, a: token }, "RGBA");
      result[key] = stringify(alphaPalette.hsla);

      continue;
    }
    
    result[key] = unwrapModifiedColor(
      modifiedColor[key] as ModifiedColor,
      token
    );
  }
  return result;
}

/**
 * Extends a modified color object with additional alpha channel tokens.
 * Loops through unwrapModifiedColor.
 *
 * @param {ModifiedColor} modifiedColor - The modified color to be extended.
 * @param {Amount[]} tokens - An array of alpha channel tokens.
 * @return {Record<number, UnwrappedModifiedColor>} A record of modified colors for each token.
 */
export function extendModifiedColor(
  modifiedColor: ModifiedColor,
  tokens: Amount[]
): Record<number, UnwrappedModifiedColor> {
  return tokens.reduce<Record<number, { value: UnwrappedModifiedColor}>>((acc, token) => {
    return {
      ...acc,
      [token]: {
        value: unwrapModifiedColor(modifiedColor, token),
      },
    };
  }, {});
}

/**
 * Generates and returns a record of theme conditions.
 *
 * @return {Record<string, string>} The generated theme conditions.
 */
export function generateThemeConditions() {
  let result: Record<string, string> = {};

  for (let i in themes) {
    result[themes[i].value] = `[data-theme=${themes[i].value}] &`;
  }

  return result;
}

/**
 * Generates an array of SelectOption objects based on the themes array.
 *
 * @return {SelectOption[]} An array of SelectOption objects.
 */
export function generateThemeOptions(): SelectOption[] {
  return themes.map(({ value }) => ({
    label: value,
    value,
  }));
}

/**
 * Generates the theme colors for the background of `panda.config.ts`.
 *
 * @return {Record<number, Recursive<Token> | Token>} The generated theme colors.
 */
export function generateThemeColors(): Record<
  number,
  Recursive<Token> | Token
> {
  let result: Record<number, Recursive<Token> | Token> = {};

  for (let i = 1; i < 5; i++) {
    let part: Recursive<Token> | Token = { value: {} };

    for (let theme in themes) {
      part.value[`_${themes[theme].value}`] = themeModes.reduce<GenerateThemeColorsAccumulator>(
        (acc, mode) => ({
          ...acc,
          [`_${mode}`]: { value: themes[theme].colors[mode][i - 1] },
        }),
        {}
      );
    }

    result[i] = part;
  }

  return result;
}

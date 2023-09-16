type ThemeColors = [string, string, string, string];

interface Theme {
  name: string;
  value: string;
  colors: {
    [key in ThemeModes]: ThemeColors;
  };
}

type ModifiedColor = import("@styles/types/composition").Recursive<
  Record<string, import("cvet").Palette>
>;

type UnwrappedModifiedColor = import("@styles/types/composition").Recursive<
  string | Record<string, import("@styles/types/composition").Token>
>;

type GenerateThemeColorsAccumulator = Partial<Record<`_${ThemeModes}`, Token>>;

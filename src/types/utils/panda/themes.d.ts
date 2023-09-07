type ThemeColors = [string, string, string, string];

interface Theme {
  name: string;
  value: string;
  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };
}

type ThemeColors = [string, string, string, string];

interface Theme {
  name: string;
  value: string;
  colors: {
    dark: ThemeColors;
    light: ThemeColors;
  };
}

interface PartColor {
  value: {
    [key: `_${string}`]: {
      _dark: { value: string };
      _light: { value: string };
    };
  };
}

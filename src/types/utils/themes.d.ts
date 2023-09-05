type Colors = [string, string, string, string];

interface Theme {
  name: string;
  value: string;
  colors: {
    dark: Colors;
    light: Colors;
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

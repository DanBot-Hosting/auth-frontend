interface OpacityColor {
  value: {
    _dark: { value: string };
    _light: { value: string };
  };
}

interface Color {
  name: string;
  value: string;
  colors:
    | Record<string, string>
    | (() => import("@styles/types/composition").Recursive<
        import("@styles/types/composition").Token
      >);
  tokens: number[];
}

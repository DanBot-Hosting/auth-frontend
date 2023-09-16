interface Color {
  name: string;
  value: string;
  skipModification?: boolean;
  colors:
    | Record<ThemeModes, import("cvet").Palette>
    | (() => import("@styles/types/composition").Recursive<
        import("@styles/types/composition").Token
      >);
  tokens: import("cvet/types").Amount[];
}

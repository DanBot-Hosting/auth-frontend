interface Color {
  name: string;
  value: string;
  colors:
    | Record<string, import("cvet").Palette>
    | (() => import("@styles/types/composition").Recursive<
        import("@styles/types/composition").Token
      >);
  tokens: number[];
}

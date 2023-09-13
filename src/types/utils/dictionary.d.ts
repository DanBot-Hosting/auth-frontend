type Locale = typeof import("@/utils/dictionary").locale[number]["locale"];

interface Language {
  code: string;
  script?: string | null | undefined;
  region?: string | undefined;
  quality: number;
}

interface PickOptions {
  loose?: boolean | undefined;
}

namespace Dictionary {
  type Layout = typeof import("@/utils/dictionary/en/layout.json");
  type NotFound = typeof import("@/utils/dictionary/en/not-found.json");

  namespace Settings {
    type Index = typeof import("@/utils/dictionary/en/settings/index.json");
    type Interface =
      typeof import("@/utils/dictionary/en/settings/interface.json");
    type Layout = typeof import("@/utils/dictionary/en/settings/layout.json");
  }

  type Imports =
    | "layout"
    | "not-found"
    | "settings/index"
    | "settings/interface"
    | "settings/layout";

  type Return<T extends Dictionary.Imports> = T extends "layout"
    ? Layout
    : T extends "not-found"
    ? NotFound
    : T extends "settings/index"
    ? Settings.Index
    : T extends "settings/interface"
    ? Settings.Interface
    : T extends "settings/layout"
    ? Settings.Layout
    : never;
}

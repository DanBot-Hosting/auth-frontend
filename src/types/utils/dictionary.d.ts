type Locale = typeof import("@/utils/dictionary").locale[number];

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
    type Interface = typeof import("@/utils/dictionary/en/settings/interface.json");
    type Layout = typeof import("@/utils/dictionary/en/settings/layout.json");
  }
}

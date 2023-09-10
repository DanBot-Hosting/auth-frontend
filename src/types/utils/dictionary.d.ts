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

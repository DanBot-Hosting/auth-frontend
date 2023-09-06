type Setting =
  | "theme"
  | "theme-mode"
  | "blur-mode"
  | "background-enabled"
  | "background-animate";

interface UseSettings {
  init: (setting: Setting, customValue?: string) => void;
  get: (setting: Setting) => string;
  set: (setting: Setting, value: string) => string;
}

type Setting =
  | "theme"
  | "theme-mode"
  | "blur-mode"
  | "background-enabled"
  | "background-animate"
  | "transitions";

interface UseSettings {
  init: (setting: Setting, customValue?: string) => void;
  get: (setting: Setting) => string;
  set: (setting: Setting, value: string) => string;
  handle: (setting: Setting) => () => void;
}

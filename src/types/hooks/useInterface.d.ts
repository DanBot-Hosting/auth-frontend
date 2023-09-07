interface UseInterface {
  resetSettings: () => void;
  change: {
    theme: (option: DropdownOption) => string;
    blurMode: (option: DropdownOption) => string;
    backgroundEnabled: (state: boolean) => void;
    backgroundAnimated: (state: boolean) => void;
  };
  state: {
    theme: string | null;
    blurMode: string | null;
    backgroundEnabled: boolean;
    backgroundAnimated: boolean;
  };
  ref: {
    theme: React.MutableRefObject<SelectRef | null>;
    blurMode: React.MutableRefObject<SelectRef | null>;
    backgroundEnabled: React.MutableRefObject<HTMLInputElement | null>;
    backgroundAnimated: React.MutableRefObject<HTMLInputElement | null>;
  };
  options: {
    themes: DropdownOption[];
    blurModes: DropdownOption[];
  };
  find: {
    themeIndex: () => number;
    blurModeIndex: () => number;
  };
}

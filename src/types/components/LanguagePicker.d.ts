interface LanguagePickerProps<
  T extends LanguagePickerLanguage[] = LanguagePickerLanguage[]
> extends Omit<SelectProps, "options" | "initial">,
    GlobalComponent {
  languages: LanguagePickerLanguage[];
  onTabClick?: (option: T[number]) => void;
  locale: Locale;
  translation: {
    [key in T[number]["label"]]: string;
  };
}

interface LanguagePickerLanguage {
  label: string;
  icon: JSX.Element;
  locale: Locale;
}

interface SelectProps<T extends SelectOption[] = SelectOption[]>
  extends React.HTMLAttributes<HTMLDivElement>,
    GlobalComponent {
  placeholder?: string;
  options: T;
  onChange?: (state: T[number]) => void;
  initial?: number;
  translation: {
    [key in T[number]["label"]]: string;
  };
  locale: Locale;
}

interface SelectRef {
  change: (option: SelectOption) => void;
}

type SelectOption = DropdownOption;

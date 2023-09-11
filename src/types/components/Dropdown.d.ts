interface DropdownProps<T extends DropdownOption[] = DropdownOption[]>
  extends React.HTMLAttributes<HTMLDivElement>,
    GlobalComponent {
  options: T;
  onTabClick?: (option: T[number]) => void;
  initial?: number;
  translation: {
    [key in T[number]["label"]]: string;
  };
  locale: Locale;
}

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownOptionRef extends DropdownOption {
  ref: HTMLButtonElement | null;
}

type DropdownRawRef = DropdownOptionRef["ref"];

interface DropdownRef extends DropdownRawRef {
  switch: (option: DropdownOption) => void;
}

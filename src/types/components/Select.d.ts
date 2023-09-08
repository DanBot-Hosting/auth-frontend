interface SelectProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlobalComponent {
  placeholder?: string;
  options: SelectOption[];
  onChange?: (state: SelectOption) => void;
  initial?: number;
}

interface SelectRef {
  change: (option: SelectOption) => void;
}

type SelectOption = DropdownOption;

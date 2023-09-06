interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  placeholder?: string;
  options: SelectOption[];
  onChange?: (state: SelectOption) => void;
  initial?: number;
  css?: import("@styles/types").SystemStyleObject;
}

interface SelectRef {
  change: (option: SelectOption) => void;
}

type SelectOption = DropdownOption;

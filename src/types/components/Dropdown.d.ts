interface DropdownProps
  extends React.HTMLAttributes<HTMLDivElement>,
    GlobalComponent {
  options: DropdownOption[];
  onTabClick?: (option: DropdownOption) => void;
  initial?: number;
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

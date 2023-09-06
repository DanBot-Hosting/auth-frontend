interface DropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  options: DropdownOption[];
  onTabClick?: (option: DropdownOption) => void;
  css?: import("@styles/types").SystemStyleObject;
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

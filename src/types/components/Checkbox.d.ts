interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange?: (state: boolean) => void;
  css?: CSSObject;
}

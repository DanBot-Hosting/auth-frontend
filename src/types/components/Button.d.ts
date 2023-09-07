interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pill?: boolean;
  secondary?: boolean;
  css?: import("@styles/types").SystemStyleObject;
}

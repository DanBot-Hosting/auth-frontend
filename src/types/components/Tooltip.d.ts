interface TooltipProps extends React.PropsWithChildren extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  position?: "top" | "left" | "right" | "bottom";
  css?: import("@styles/types").SystemStyleObject;
}
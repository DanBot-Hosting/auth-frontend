interface TooltipProps
  extends React.PropsWithChildren,
    React.HTMLAttributes<HTMLDivElement>,
    GlobalComponent {
  label: string;
  position?: "top" | "left" | "right" | "bottom";
}

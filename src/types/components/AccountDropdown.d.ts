interface AccountDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  links: Link[];
  onTabClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  css?: CSSObject;
}

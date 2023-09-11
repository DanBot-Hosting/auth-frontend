interface AccountDropdownProps<T extends Link[] = Link[]>
  extends React.HTMLAttributes<HTMLDivElement> {
  links: T;
  onTabClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  css?: CSSObject;
  translation: {
    [key in T[number]["label"]]: string;
  };
  locale: Locale;
}

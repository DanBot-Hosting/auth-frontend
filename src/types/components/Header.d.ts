interface UserHeaderData {
  username: string;
  avatarUrl: string;
}

interface HeaderProps extends React.PropsWithChildren, GlobalComponent {
  user?: UserHeaderData;
  links: Link[];
  dropdownLinks: Link[];
  translation: Dictionary.Layout;
  locale: Locale;
}

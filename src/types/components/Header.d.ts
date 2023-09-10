type HeaderLinks = Record<string, string>;

interface UserHeaderData {
  username: string;
  avatarUrl: string;
}

interface HeaderProps extends React.PropsWithChildren, GlobalComponent {
  user?: UserHeaderData;
  links: HeaderLinks;
  dropdownLinks: Link[];
}

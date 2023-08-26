type HeaderLinks = Record<string, string>;

interface UserHeaderData {
  username: string;
  avatarUrl: string;
}

interface HeaderProps extends React.PropsWithChildren {
  user?: UserHeaderData;
  links: HeaderLinks;
}

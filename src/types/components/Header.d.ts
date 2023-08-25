type HeaderLinks = Record<string, string>;

interface UserHeaderData {
  username: string;
  avatarUrl: string;
}

interface HeaderProps {
  user?: UserHeaderData;
  links: HeaderLinks;
}

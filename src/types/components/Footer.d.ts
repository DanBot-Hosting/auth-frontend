type FooterLinks = Record<string, Link[]>;

interface FooterProps extends React.PropsWithChildren, GlobalComponent {
  links: FooterLinks;
}

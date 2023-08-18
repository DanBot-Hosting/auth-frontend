export type FooterData = Record<string, FooterLink[]>;

interface FooterLink {
  label: string;
  link: string;
}

export const footerData: FooterData = {
  updates: [
    {
      label: "Discord",
      link: "https://discord.com/invite/dbh",
    },
    {
      label: "GitHub",
      link: "https://github.com/Danbot-Hosting",
    },
  ],
  support: [
    {
      label: "Contact",
      link: "https://danbot.host/support",
    },
    {
      label: "FAQ",
      link: "https://status.danbot.host",
    },
  ],

  legal: [
    {
      label: "Terms of Service",
      link: "https://danbot.host/terms",
    },
    {
      label: "Privacy Policy",
      link: "https://danbot.host/privacy",
    },
  ],
};

import { css, cx } from "@styles/css";
import { SimpleLogo } from "@/components/SimpleLogo";
import { Avatar } from "@/components/Avatar";
import { CaretDown } from "@/utils/icons";
import { token } from "@styles/tokens";

interface UserHeaderData {
  username: string;
  avatarUrl: string;
}

const header = css({
  display: "inline-flex",
  h: "3.75rem",
  p: "0.625rem",
  alignItems: "center",
  flexShrink: "0",
  gap: "2.5rem",

  borderRadius: "1.25rem",
  bg: "pillbackground.10",
  backdropFilter: "blur(5px)",
});

const part = css({
  display: "inline-flex",
});

const logo = css({
  display: "flex",
  height: "2.5rem",
  p: "0 1.25rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
});

const button = css({
  display: "flex",
  height: "2.5rem",
  padding: "0.625rem 1.25rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "0.625rem",
  fontWeight: "500",
});

const additionalLink = css({
  color: "text.60",
});

const signSection = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.625rem",
});

const secondaryButton = css({
  color: "text.100",
  border: "1px solid token(colors.text.50)",
});

const primaryButton = css({
  bg: "text.100",
  boxShadow: "0px 0px 8px 1px token(colors.accent.100)",
  color: "background.100",
});

export function Header({
  user = {
    username: "domin",
    avatarUrl: "https://avatars.githubusercontent.com/u/69919939",
  },
}: {
  user?: UserHeaderData;
}) {
  const signManagement = (
    <span className={cx(part, signSection)}>
      <div className={cx(secondaryButton, button)}>Sign in</div>
      <div className={cx(primaryButton, button)}>Register</div>
    </span>
  );

  const userManagement = (
    <span className={cx(part, signSection)}>
      <Avatar size={40} src={user.avatarUrl} alt={user.username} />
      <CaretDown size={18} weight="light" color={token("colors.text.50")} />
      <div />
    </span>
  );

  return (
    <div className={header}>
      <span className={part}>
        <a className={logo}>
          <SimpleLogo />
        </a>
        <a className={cx(additionalLink, button)}>Panel</a>
        <a className={cx(additionalLink, button)}>Discord</a>
      </span>
      {user ? userManagement : signManagement}
    </div>
  );
}

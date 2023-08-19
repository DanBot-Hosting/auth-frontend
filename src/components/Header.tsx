"use client";
import { css, cx } from "@styles/css";
import { SimpleLogo } from "@/components/SimpleLogo";
import { Avatar } from "@/components/Avatar";
import { CaretDown } from "@/utils/icons";
import { token } from "@styles/tokens";
import { headerData } from "@/utils/constants";
import { useRef } from "react";
import Link from "next/link";

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
  cursor: "pointer",
  transition: "filter .2s ease-in-out",

  _hover: {
    filter: "drop-shadow(0 0 8px token(colors.text.20))",
    transition: "filter .2s ease-in-out",
  },
});

const button = css({
  display: "flex",
  height: "2.5rem",
  padding: "0.625rem 1.25rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",

  borderRadius: "0.625rem",
  fontWeight: "400",
});

const additionalLink = css({
  color: "text.60",
  transition: "color .3s ease-in-out",

  _hover: {
    color: "text.90",
    transition: "color .3s ease-in-out",
  },
});

const signSection = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "0.625rem",
});

const account = css({
  cursor: "pointer",
});

const caret = css({
  color: "text.50",
  transition: "transform .15s ease-in-out",

  "&[data-active=\"true\"]": {
    // Rotate -180 degrees instead of 180 degrees
    // In order to have transition rotating
    // counter-clockwise
    transform: "rotate(-180deg)",
    transition: "transform .15s ease-in-out",
  }
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
  const caretRef = useRef<SVGSVGElement>(null);

  function showAccountDropdown() {
    const currentVisibility = caretRef.current?.getAttribute("data-active");
    caretRef.current?.setAttribute(
      "data-active",
      (!(currentVisibility === "true"))?.toString()
    );
  }

  const userManagement = (
    <span className={cx(part, signSection, account)} onClick={showAccountDropdown}>
      <Avatar width={40} height={40} src={user.avatarUrl} alt={user.username} />
      <CaretDown
        size={18}
        weight="light"
        className={caret}
        ref={caretRef}
        data-active="false"
      />
      <div />
    </span>
  );

  const signManagement = (
    <span className={cx(part, signSection)}>
      <div className={cx(secondaryButton, button)}>Sign in</div>
      <div className={cx(primaryButton, button)}>Register</div>
    </span>
  );

  return (
    <div className={header}>
      <span className={part}>
        <Link className={logo} href="/">
          <SimpleLogo />
        </Link>
        {Object.keys(headerData).map((key, i) => (
          <Link
            key={i}
            className={cx(additionalLink, button)}
            href={headerData[key]}
          >
            {key}
          </Link>
        ))}
      </span>
      {user ? userManagement : signManagement}
    </div>
  );
}

"use client";
import { css, cx } from "@styles/css";
import { SimpleLogo } from "@/components/SimpleLogo";
import { Avatar } from "@/components/Avatar";
import { AccountDropdown } from "@/components/AccountDropdown";
import { CaretDown } from "@/utils/icons";
import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * Pill-styled Header component with additional links and access to user data.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {UserHeaderData} [props.user] - The user data to be shown if signed in.
 * @param {React.ReactNode} [props.children] - The child components to be rendered within the Header.
 * @param {HeaderLinks} props.links - List of additional links in the header.
 * @returns {JSX.Element} The rendered Header component.
 */
export function Header({
  links,
  children,
  css: cssProp = {},
  user = {
    username: "domin",
    avatarUrl: "https://avatars.githubusercontent.com/u/69919939",
  },
}: HeaderProps) {
  const header = css(
    {
      display: "inline-flex",
      h: "3.75rem",
      p: "0.625rem",
      alignItems: "center",
      flexShrink: "0",
      gap: "2.5rem",

      borderRadius: "1.25rem",
      bg: "pillbackground.50",

      "@media screen and (max-width: 500px)": {
        width: "calc(100vw - 1.25rem)",
        justifyContent: "space-between",
        gap: "0",
      },

      /** @see {@link https://stackoverflow.com/q/60997948 Chrome bug} */
      _before: {
        content: "''",
        position: "absolute",
        display: "block",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backdropBlur: "limited.5",
        backdropFilter: "auto",
        zIndex: "-1",
        borderRadius: "1.25rem",
        overflow: "hidden",
      },
    },
    cssProp
  );

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
    userSelect: "none",

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

    "@media screen and (max-width: 500px)": {
      display: "none",
    },
  });

  const signSection = css({
    display: "flex",
    // justifyContent: "center",
    alignItems: "center",
    gap: "0.625rem",
  });

  const account = css({
    cursor: "pointer",
  });

  const caret = css({
    color: "text.50",
    transition: "transform .15s ease-in-out",

    "&[data-active]": {
      // Rotate -180 degrees instead of 180 degrees
      // In order to have transition rotating
      // counter-clockwise
      transform: "rotate(-180deg)",
      transition: "transform .15s ease-in-out",
    },
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

  const dropdown = css({
    position: "absolute",
    top: "calc(100% + 0.625rem)",
    right: "0",

    opacity: "0",
    scale: ".8",
    pointerEvents: "none",
    transition: "opacity .15s ease-in-out, scale .15s ease-in-out",

    '&[data-active="true"]': {
      opacity: "1",
      scale: "1",
      pointerEvents: "unset",
      transition: "opacity .15s ease-in-out, scale .15s ease-in-out",
    },
  });

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<SVGSVGElement | null>(null);
  const userSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") hideAccountDropdown();
    });

    document.body.addEventListener("click", (event) => {
      // Without the use of stopPropagation as it's not recommended
      if (userSectionRef.current?.contains(event.target as Node)) return;
      if (userSectionRef.current?.isEqualNode(event.target as Node)) return;

      hideAccountDropdown();
    });
  }, []);

  function toggleAccountDropdown() {
    const currentVisibility = caretRef.current?.getAttribute("data-active");
    if (!currentVisibility) {
      caretRef.current?.setAttribute("data-active", "true");
      dropdownRef.current?.setAttribute("data-active", "true");
      return;
    }

    caretRef.current?.removeAttribute("data-active");
    dropdownRef.current?.removeAttribute("data-active");
  }

  function hideAccountDropdown() {
    /** @see {@link https://stackoverflow.com/a/7165473/14301934 Browser bug?} */
    setTimeout(() => {
      caretRef.current?.removeAttribute("data-active");
      dropdownRef.current?.removeAttribute("data-active");
    });
  }

  const userManagement = (
    <span
      className={cx(part, signSection, account)}
      onClick={toggleAccountDropdown}
      ref={userSectionRef}
    >
      <Avatar size={40} src={user.avatarUrl} alt={user.username} />
      <CaretDown size={18} weight="light" className={caret} ref={caretRef} />
      <div />
      <div className={dropdown} ref={dropdownRef}>
        <AccountDropdown
          links={[{ label: "Settings", link: "/settings" }]}
          onTabClick={hideAccountDropdown}
          css={{
            backdropFilter: "unset",
            _before: {
              content: "''",
              position: "absolute",
              top: "0",
              left: "0",
              minWidth: "inherit",
              height: "100%",
              backdropBlur: "limited.5",
              backdropFilter: "auto",
              zIndex: "-1",
              borderRadius: "1.25rem",
              overflow: "hidden",
            },
          }}
        />
      </div>
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
        {Object.keys(links).map((key, i) => (
          <Link
            key={i}
            className={cx(additionalLink, button)}
            href={links[key]}
          >
            {key}
          </Link>
        ))}
      </span>
      {user ? userManagement : signManagement}
      {children}
    </div>
  );
}

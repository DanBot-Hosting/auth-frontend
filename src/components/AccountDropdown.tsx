"use client";
import { css } from "@styles/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHoverable } from "@/hooks/useHoverable";
import { prependLocale, normalizePath } from "@/utils/dictionary";

/**
 * A AccountDropdown menu with a list of links and buttons to interact with.
 * Uses hoverable to slide to the selected/hovered element.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {Link[]} props.links - The array of links to be displayed in the Dropdown.
 * @param {((event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void)} [props.onTabClick] -
 * The callback function to be executed when a link is clicked.
 * @returns {JSX.Element} The rendered AccountDropdown component.
 */
export function AccountDropdown({
  links,
  onTabClick,
  translation,
  locale,
  css: cssProp = {},
  ...props
}: AccountDropdownProps) {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverableElement, setHoverableElement] =
    useState<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { find, change, hide, set } = useHoverable({
    children: linksRef.current,
    hoverable: hoverableElement,
  });

  useEffect(() => {
    const element = linksRef.current.find(
      (link) => link?.pathname === pathname.slice(0, link?.pathname.length)
    );

    if (!element) return hide();
    change(element);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const manage = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      if (onTabClick) onTabClick(event);
      change(event.currentTarget);
    },
    [change, onTabClick]
  );

  const dropdown = css(
    {
      display: "flex",
      minWidth: "12.5rem",
      width: "max-content",
      p: "0.625rem",
      flexDir: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      position: "relative",

      borderRadius: "1.25rem",
      bg: "pillbackground.50",
      backdropBlur: "limited.5",
      backdropFilter: "auto",
    },
    cssProp
  );

  const option = css({
    display: "flex",
    height: "2.5rem",
    p: "0rem 0.9375rem",
    alignItems: "center",
    alignSelf: "stretch",
    zIndex: "4",
    userSelect: "none",

    borderRadius: "0.625rem",
    color: "text.60",
    fontWeight: "400",
    transition: "color 0.2s ease-in-out",

    _hover: {
      color: "text.90",
      transition: "color 0.2s ease-in-out",
    },

    "&[data-active-hoverable]": {
      color: "text.90",
      transition: "color 0.2s ease-in-out",
    },
  });

  const hoverable = css({
    position: "absolute",
    top: "0",
    left: "0",
    borderRadius: "0.625rem",
    bg: "pillbackground.70",
    zIndex: "3",
    transition: "all 0.2s ease-in-out",
  });

  return (
    <div className={dropdown} {...props}>
      <div ref={setHoverableElement} className={hoverable} />
      {/* Slot syntax breaks event handling thus we don't use million's For */}
      {links.map((link, i) => (
        <Link
          key={i}
          href={prependLocale(link.link, locale)}
          onClick={manage}
          ref={(ref) => linksRef.current.push(ref)}
          onMouseEnter={(event) => set(event.currentTarget)}
          onMouseOut={find}
          className={option}
        >
          {translation[link.label] ?? link.label}
        </Link>
      ))}
    </div>
  );
}

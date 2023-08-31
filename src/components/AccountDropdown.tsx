"use client";
import { css } from "@styles/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHoverable } from "@/hooks/useHoverable";

/**
 * A AccountDropdown menu with a list of links and buttons to interact with.
 * Uses hoverable to slide to the selected/hovered element.
 *
 * @param {Link[]} props.links - The array of links to be displayed in the Dropdown.
 * @param {((event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void)} [props.onTabClick] -
 * The callback function to be executed when a link is clicked.
 * @returns {JSX.Element} The rendered AccountDropdown component.
 */
export function AccountDropdown({ links, onTabClick, css: cssProp = {}, ...props }: AccountDropdownProps) {
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
      (link) => link?.pathname === pathname
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

  const dropdown = css({
    display: "flex",
    minWidth: "12.5rem",
    width: "max-content",
    p: "0.625rem",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "flex-start",
  
    borderRadius: "1.25rem",
    bg: "pillbackground.50",
    backdropFilter: "blur(5px)",
  }, cssProp);
  
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
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.link}
          onClick={manage}
          ref={(ref) => linksRef.current.push(ref)}
          onMouseEnter={(event) => set(event.currentTarget)}
          onMouseOut={find}
          className={option}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

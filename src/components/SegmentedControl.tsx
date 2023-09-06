"use client";
import { css } from "@styles/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useHoverable } from "@/hooks/useHoverable";
import { flush } from "@/utils/css";

const dropdown = css({
  display: "inline-flex",
  height: "3.75rem",
  width: "max-content",
  p: "0.625rem",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: "0",
  position: "relative",

  borderRadius: "1.25rem",
  bg: "pillbackground.50",
  backdropBlur: "full.5",
  backdropFilter: "auto",
});

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

/**
 * A SegmentedControl pill with a list of links and buttons to interact with.
 * Uses hoverable to slide to the selected/hovered element.
 *
 * @param {Link[]} props.links - The array of links to be displayed in the SegmentedControl.
 * @param {((event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void)} [props.onTabClick] - The callback function to be executed when a link is clicked.
 * @returns {JSX.Element} The rendered SegmentedControl component.
 */
export function SegmentedControl({ options, onTabClick }: DropdownProps) {
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const [hoverableElement, setHoverableElement] =
    useState<HTMLDivElement | null>(null);
  const pathname = usePathname();
  const { find, change, hide, set } = useHoverable({
    children: linksRef.current,
    hoverable: hoverableElement,
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const element = linksRef.current.find(
      (link) => link?.pathname === pathname
    );

    if (!element) return hide();

    if (!hoverableElement) return;
    // Transition will be cleared on set call so it's alright
    hoverableElement.style.transition = "none";
    change(element);
    flush(hoverableElement);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hoverableElement]);

  const manage = useCallback(
    (
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
      opt: DropdownOption
    ) => {
      if (onTabClick) onTabClick(opt);
      change(event.currentTarget);
    },
    [change, onTabClick]
  );

  return (
    <div className={dropdown}>
      <div ref={setHoverableElement} className={hoverable} />
      {options.map((opt, i) => (
        <Link
          key={i}
          href={opt.value}
          onClick={(event) => manage(event, opt)}
          ref={(ref) => linksRef.current.push(ref)}
          onMouseEnter={(event) => set(event.currentTarget)}
          onMouseOut={find}
          className={option}
        >
          {opt.label}
        </Link>
      ))}
    </div>
  );
}

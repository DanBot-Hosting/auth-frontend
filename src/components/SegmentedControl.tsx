"use client";
import { css } from "@styles/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const dropdown = css({
  display: "inline-flex",
  height: "3.75rem",
  width: "max-content",
  p: "0.625rem",
  justifyContent: "center",
  alignItems: "center",
  flexShrink: "0",

  borderRadius: "1.25rem",
  bg: "pillbackground.10",
  backdropFilter: "blur(5px)",
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

  "&[data-active]": {
    color: "text.90",
    transition: "color 0.2s ease-in-out",
  },
});

const focusDiv = css({
  position: "absolute",
  top: "0",
  left: "0",
  borderRadius: "0.625rem",
  bg: "pillbackground.10",
  zIndex: "3",
});

/**
 * Returns the inner space of an HTMLDivElement element.
 *
 * @param {HTMLDivElement} element - The HTMLDivElement element to calculate the inner space of.
 * @returns {number} The inner space of the HTMLDivElement element in pixels.
 */
function getElementInnerSpace(element: HTMLDivElement): number {
  const computed = getComputedStyle(element);
  let elementSpace = element.clientHeight;
  elementSpace -=
    parseFloat(computed.paddingTop) + parseFloat(computed.paddingBottom);

  return elementSpace;
}

/**
 * Returns the top offset of the inner content of the specified HTMLDivElement element.
 *
 * @param {HTMLDivElement} element - The HTMLDivElement element to get the top offset from.
 * @returns {number} The top offset of the inner content of the element in pixels.
 */
function getElementInnerTopOffset(element: HTMLDivElement): number {
  const computed = getComputedStyle(element);
  return parseFloat(computed.paddingTop);
}

/**
 * Returns the left offset of the inner content of the specified HTMLDivElement element.
 *
 * @param {HTMLDivElement} element - The HTMLDivElement element to get the left offset from.
 * @returns {number} The left offset of the inner content of the element in pixels.
 */
function getElementInnerLeftOffset(element: HTMLDivElement): number {
  const computed = getComputedStyle(element);
  return parseFloat(computed.paddingLeft);
}

/**
 * A SegmentedControl pill with a list of links and buttons to interact with.
 * Uses hoverable to slide to the selected/hovered element.
 *
 * @param {Link[]} props.links - The array of links to be displayed in the SegmentedControl.
 * @param {((event: MouseEvent<HTMLAnchorElement, MouseEvent>) => void)} [props.onTabClick] - The callback function to be executed when a link is clicked.
 * @returns {JSX.Element} The rendered SegmentedControl component.
 */
export function SegmentedControl({ links, onTabClick }: DropdownProps) {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const pathname = usePathname();
  const [position, setPosition] = useState({
    width: 0,
    height: 0,
    // translation X and Y
    translation: [0, 0],
    visible: false,
  });

  /** Resets the position of the hoverable. */
  const resetPosition = useCallback(() => {
    setPosition({
      width: 0,
      height: getElementInnerSpace(parentRef.current as HTMLDivElement),
      translation: [
        getElementInnerLeftOffset(parentRef.current as HTMLDivElement),
        getElementInnerTopOffset(parentRef.current as HTMLDivElement),
      ],
      visible: false,
    });
  }, []);

  /**
   * Updates the position of the hoverable depending on the element.
   *
   * @param {HTMLAnchorElement} element - The element to update the position to.
   */
  const changePosition = useCallback((element: HTMLAnchorElement) => {
    setPosition({
      width: element?.offsetWidth ?? 0,
      height: element?.offsetHeight ?? 0,
      translation: [element?.offsetLeft ?? 0, element?.offsetTop ?? 0],
      visible: true,
    });
  }, []);

  /** Returns the position of the hoverable. */
  const returnPosition = useCallback(() => {
    const element = linksRef.current.find(
      (link) => link?.pathname === pathname
    );

    if (!element) return resetPosition();

    for (let link in linksRef.current) {
      linksRef.current[link]?.removeAttribute("data-active");
    }

    element.dataset.active = "true";
    changePosition(element);
  }, [changePosition, pathname, resetPosition]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(returnPosition, [pathname]);

  return (
    <div className={dropdown} ref={parentRef}>
      <motion.div
        transition={{
          type: "spring",
          damping: 100,
          stiffness: 1000,
        }}
        initial={{
          display: position.visible ? "block" : "none",
        }}
        animate={{
          x: position.translation[0],
          y: position.translation[1],
          width: position.width,
          height: position.height,
        }}
        className={focusDiv}
      />
      {links.map((link, i) => (
        <Link
          key={i}
          href={link.link}
          onClick={onTabClick}
          ref={(ref) => linksRef.current.push(ref)}
          onMouseEnter={(event) => changePosition(event.currentTarget)}
          onMouseOut={returnPosition}
          className={option}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

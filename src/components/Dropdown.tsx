"use client";
import { css } from "@styles/css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface DropdownProps {
  links: Link[];
  onTabClick?: () => void;
}

const dropdown = css({
  display: "flex",
  minWidth: "12.5rem",
  width: "max-content",
  p: "0.625rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  // gap: "0.625rem",

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
  }
});

const focusDiv = css({
  position: "absolute",
  top: "0",
  left: "0",
  borderRadius: "0.625rem",
  bg: "pillbackground.10",
  zIndex: "3",
});

function getElementInnerSpace(element: HTMLDivElement): number {
  const computed = getComputedStyle(element);
  let elementSpace = element.clientWidth;
  elementSpace -=
    parseFloat(computed.paddingLeft) + parseFloat(computed.paddingRight);

  return elementSpace;
}

function getElementInnerTopOffset(element: HTMLDivElement): number {
  const computed = getComputedStyle(element);
  return parseFloat(computed.paddingTop);
}

function getElementInnerLeftOffset(element: HTMLDivElement): number {
  const computed = getComputedStyle(element);
  return parseFloat(computed.paddingLeft);
}

export function Dropdown({ links, onTabClick }: DropdownProps) {
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

  useEffect(returnPosition, [pathname]);

  function resetPosition() {
    setPosition({
      width: getElementInnerSpace(parentRef.current as HTMLDivElement),
      height: 0,
      translation: [
        getElementInnerLeftOffset(parentRef.current as HTMLDivElement),
        getElementInnerTopOffset(parentRef.current as HTMLDivElement),
      ],
      visible: false,
    });
  }

  function changePosition(element: HTMLAnchorElement) {
    setPosition({
      width: element?.offsetWidth ?? 0,
      height: element?.offsetHeight ?? 0,
      translation: [element?.offsetLeft ?? 0, element?.offsetTop ?? 0],
      visible: true,
    });
  }

  function returnPosition() {
    const element = linksRef.current.find(
      (link) => link?.pathname === pathname
    );

    if (!element) return resetPosition();

    for (let link in linksRef.current) {
      linksRef.current[link]?.removeAttribute("data-active");
    }

    element.setAttribute("data-active", "true");
    changePosition(element);
  }

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

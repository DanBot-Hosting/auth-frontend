"use client";
import { useScrollbar } from "@/hooks/useScrollbar";
import { css } from "@styles/css";
import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

export interface OverlayProps extends PropsWithChildren {
  visible: boolean;
}

const overlay = css({
  display: "inline-flex",
  position: "fixed",
  padding: "1.25rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  top: "0",
  left: "0",
  right: "0",
  bottom: "0",
  zIndex: "4",

  // Constant color not depending on the theme
  bg: "rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(3px)",

  "&[data-visible=true]": {
    opacity: "1",
    pointerEvents: "unset",
    transition: "opacity .15s ease-in-out",
  },

  "&[data-visible=false]": {
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity .15s ease-in-out",
  }
});

export function Overlay({ children, visible }: OverlayProps) {
  const { show, hide } = useScrollbar();

  useEffect(() => {
    if (visible) hide();
    else show();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return createPortal(<div className={overlay} data-visible={visible}>{children}</div>, document.body);
}

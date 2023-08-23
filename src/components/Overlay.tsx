import { css } from "@styles/css";
import { PropsWithChildren } from "react";

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

  // Constant color not depending on the theme
  bg: "rgba(0, 0, 0, 0.25)",
  backdropFilter: "blur(3px)",
});

export function Overlay({ children }: PropsWithChildren) {
  return <div className={overlay}>{children}</div>;
}

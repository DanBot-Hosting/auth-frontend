import { css } from "@styles/css";

/**
 * Overlay component as a layer on top of everything except Notifications.
 * To hide the interface with it, consider using `useOverlay`.
 * This component should not be used directly.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {React.ReactNode} [props.children] - The children to be rendered on top of the layer.
 * @returns {JSX.Element} Partially transparent dark consistent div element - layer.
 */
export function Overlay({ children, css: cssProp = {} }: OverlayProps) {
  const overlay = css(
    {
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
      backdropBlur: "full.3",
      backdropFilter: "auto",
    },
    cssProp
  );

  return <div className={overlay}>{children}</div>;
}

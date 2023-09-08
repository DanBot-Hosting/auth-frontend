import { css } from "@styles/css";

/**
 * OverlayProvider component to get Overlay attachments via `useOverlay` hook.
 * Used in Layout wrapper.
 * Adds animations for toggling visibility via dataset.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @returns {JSX.Element} The rendered OverlayProvider component with corresponding id attribute.
 * Hidden by default.
 */
export function OverlayProvider({ css: cssProp = {} }: OverlayProviderProps) {
  const animated = css(
    {
      position: "fixed",
      zIndex: "4",
      opacity: "1",
      pointerEvents: "unset",
      transition: "opacity .15s ease-in-out",

      "&[data-hidden]": {
        opacity: "0",
        pointerEvents: "none",
        transition: "opacity .15s ease-in-out",
      },
    },
    cssProp
  );

  return <div className={animated} id="overlay-provider" data-hidden />;
}

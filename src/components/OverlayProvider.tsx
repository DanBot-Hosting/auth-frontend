import { css } from "@styles/css";

const animated = css({
  position: "fixed",
  zIndex: "4",
  opacity: "1",
  pointerEvents: "unset",
  transition: "opacity .15s ease-in-out",

  "&[data-hidden]": {
    opacity: "0",
    pointerEvents: "none",
    transition: "opacity .15s ease-in-out",
  }
});

export function OverlayProvider() {
  return <div className={animated} id="overlay-provider" data-hidden />;
}

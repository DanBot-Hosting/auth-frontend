import { css } from "@styles/css";

const animated = css({
  position: "fixed",
  bottom: "1.25rem",
  right: "1.25rem",
  zIndex: "3",
  opacity: "1",
  scale: "1",
  transition: "opacity .15s ease-in-out, scale .15s ease-in-out",

  "&[data-hidden]": {
    opacity: "0",
    scale: "0.9",
    pointerEvents: "none",
    transition: "opacity .15s ease-in-out, scale .15s ease-in-out",
  },
});

export function NotificationProvider() {
  return <div className={animated} id="notification-provider" data-hidden />;
}

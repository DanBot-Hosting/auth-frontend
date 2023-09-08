import { css } from "@styles/css";

/**
 * NotificationProvider component to get Notification attachments via `useNotification` hook.
 * Used in Layout wrapper.
 * Adds animations for toggling visibility via dataset.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @returns {JSX.Element} The rendered NotificationProvider component with corresponding id attribute.
 * Hidden by default.
 */
export function NotificationProvider({ css: cssProp = {} }: NotificationProviderProps) {
  const animated = css({
    position: "fixed",
    bottom: "1.25rem",
    right: "1.25rem",
    zIndex: "5",
    opacity: "1",
    scale: "1",
    transition: "opacity .15s ease-in-out, scale .15s ease-in-out",
  
    "&[data-hidden]": {
      opacity: "0",
      scale: "0.9",
      pointerEvents: "none",
      transition: "opacity .15s ease-in-out, scale .15s ease-in-out",
    },
  }, cssProp);

  return <div className={animated} id="notification-provider" data-hidden />;
}

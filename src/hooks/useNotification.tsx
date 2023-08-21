import { NotificationProps, Notification } from "@/components/Notification";
import { css } from "@styles/css";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

const animated = css({
  position: "fixed",
  bottom: "1.25rem",
  right: "1.25rem",
  zIndex: 3,

  "&[data-hidden]": {
    opacity: 0,
    scale: 0.8,
  },
});

export function useNotification() {
  const root = useRef<Root | null>(null);

  function show(props: NotificationProps) {
    if (!root.current) {
      const provider = document.createElement("div");
      root.current = createRoot(provider);
    }

    root.current.render(
      createPortal((
        <div className={animated}>
          <Notification {...props} />
        </div>
      ), document.body)
    );
  }

  function hide() {
    root.current?.render(null);
  }

  return { show, hide };
}

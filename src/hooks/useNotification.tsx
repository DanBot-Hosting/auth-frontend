"use client";
import { NotificationProps, Notification } from "@/components/Notification";
import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

interface UseNotificationProps {
  closeAfter?: number;
}

export function useNotification() {
  const root = useRef<Root | null>(null);
  const provider = useRef<HTMLElement | null>(null);

  const hide = useCallback(() => {
    provider.current?.setAttribute("data-hidden", "");

    setTimeout(() => {
      root.current?.render(null);
      // The hide animation is set to 0.15s
    }, 300);
  }, [root, provider]);

  const show = useCallback(({
    closeAfter = 5000,
    ...props
  }: NotificationProps & UseNotificationProps) => {
    if (!provider.current) {
      const providerElement = document.getElementById("notification-provider");
      if (!providerElement) throw "No notification provider found!";
      provider.current = providerElement;
    }

    if (!root.current) {
      const rootElement = document.createElement("div");
      root.current = createRoot(rootElement);
    }

    root.current.render(
      createPortal(
        <Notification onConfirm={hide} {...props} />,
        provider.current
      )
    );

    provider.current.removeAttribute("data-hidden");

    if (closeAfter === 0) return;
    setTimeout(() => {
      hide();
    }, closeAfter);
  }, [root, provider, hide]);

  return { show, hide };
}

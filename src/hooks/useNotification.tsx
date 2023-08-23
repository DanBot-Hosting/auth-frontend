"use client";
import { NotificationProps, Notification } from "@/components/Notification";
import { useRef } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

interface UseNotificationProps {
  closeAfter?: number;
}

export function useNotification() {
  const root = useRef<Root | null>(null);
  const provider = useRef<HTMLElement | null>(null);

  function show({
    closeAfter = 5000,
    ...props
  }: NotificationProps & UseNotificationProps) {
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
  }

  function hide() {
    provider.current?.setAttribute("data-hidden", "");

    setTimeout(() => {
      root.current?.render(null);
      // The hide animation is set to 0.15s
    }, 300);
  }

  return { show, hide };
}

"use client";
import { Notification } from "@/components/Notification";
import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";

/**
 * Hook that lets interact with notification-provider by attaching Notification component to it.
 *
 * @returns {UseNotification} An object containing show and hide functions.
 */
export function useNotification(): UseNotification {
  const root = useRef<Root | null>(null);
  const provider = useRef<HTMLElement | null>(null);

  /**
   * Forces Notification to hide.
   * Will take 150ms to hide it for the user.
   * Will take 300ms to delete it from the DOM.
   *
   * @returns {void}
   */
  const hide = useCallback(() => {
    provider.current?.setAttribute("data-hidden", "");

    setTimeout(() => {
      root.current?.render(null);
      // The hide animation is set to 0.15s
    }, 300);
  }, [root, provider]);

  /**
   * Shows a notification with the given props.
   *
   * @param {NotificationProps & UseNotificationProps} props - The properties passed to the notification.
   * @param {React.ReactNode} [props.children] - The content of the notification.
   * @param {boolean} [props.withConfirm=true] - Whether to show a confirm button. Defaults to true.
   * @param {string} [props.confirmLabel="Accept"] - The label text for the confirm button. Defaults to "Accept".
   * @param {((event: MouseEvent<HTMLButtonElement, MouseEvent>) => void)} [props.onConfirm] - The function to call when the confirm button is clicked.
   * @param {number} [props.closeAfter=5000] - The number of milliseconds to wait before hiding the notification.
   * Exclusive to useNotification hook. Defaults to 5000
   *
   * @returns {void}
   */
  const show = useCallback(
    ({
      closeAfter = 5000,
      ...props
    }: NotificationProps & UseNotificationProps) => {
      if (!provider.current) {
        const providerElement = document.getElementById(
          "notification-provider"
        );
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
    },
    [root, provider, hide]
  );

  return { show, hide };
}

"use client";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Overlay } from "@/components/Overlay";
import { useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";
import { useScrollbar } from "@/hooks/useScrollbar";

/**
 * Hook that lets interact with overlay-provider by attaching custom Overlays & LoadingOverlays.
 *
 * @returns {UseOverlay} An object containing show and hide functions for displaying and hiding overlays.
 */
export function useOverlay(): UseOverlay {
  const { unlock: showScrollbar, lock: hideScrollbar } = useScrollbar();
  const root = useRef<Root | null>(null);
  const provider = useRef<HTMLElement | null>(null);
  const controller = useRef<AbortController | null>(new AbortController());

  /**
   * Hides Overlay from the DOM.
   * Will take 150ms to hide it for the user.
   * Will take 300ms to delete it from the DOM.
   *
   * @returns {void}
   */
  const hide = useCallback(() => {
    provider.current?.setAttribute("data-hidden", "");
    showScrollbar();

    setTimeout(() => {
      root.current?.render(null);
      // The hide animation is set to 0.15s
    }, 300);
  }, [provider, root, showScrollbar]);

  const closeOnClickOutside = useCallback(
    (event: Event) => {
      const element = event.target as Element;
      if (
        element.isEqualNode(
          document.getElementById("overlay-provider")?.firstChild ?? null
        )
      ) {
        controller.current?.abort();
        controller.current = new AbortController();
        hide();
      }
    },
    [hide]
  );

  const closeOnEscapeClick = useCallback(
    (event: Event) => {
      if ((event as KeyboardEvent).key === "Escape") {
        controller.current?.abort();
        controller.current = new AbortController();
        hide();
      }
    },
    [hide]
  );

  /**
   * Shows Overlay with the given props.
   *
   * @param {ShowOverlayProps} props - The properties passed to the overlay.
   * @param {React.ReactNode} [props.children] - The children to be rendered on top of the layer.
   * @param {boolean} [props.asLoading=false] - Indicates whether to render a LoadingOverlay or Overlay.
   * @param {boolean} [props.closeOnEscape=false] - Indicates whether to close the overlay on pressing escape or clicking outside.
   * @param {React.ReactNode} [props.children="Loading..."] - The content to display inside the overlay. Defaults to "Loading...".
   * Won't add dot animation at the end. Only available if asLoading set to true.
   * @param {boolean} [props.withCancel=false] - Indicates whether to display a cancel button. Defaults to false.
   * Only available if asLoading set to true.
   * @param {string} [props.cancelLabel="Cancel"] - The label for the cancel button. Defaults to "Cancel".
   * Only available if asLoading set to true.
   * @param {() => void} [props.onCancel] - The callback function to be called when the cancel button is clicked.
   * Only available if asLoading set to true.
   * @returns {void}
   */
  const show = useCallback(
    ({
      asLoading = false,
      closeOnEscape = false,
      ...props
    }: ShowOverlayProps) => {
      if (!provider.current) {
        const providerElement = document.getElementById("overlay-provider");
        if (!providerElement) throw "No overlay provider found!";
        provider.current = providerElement;
      }

      if (!root.current) {
        const rootElement = document.createElement("div");
        root.current = createRoot(rootElement);
      }

      const overlayType = asLoading ? (
        <LoadingOverlay onCancel={hide} {...props} />
      ) : (
        <Overlay {...props} />
      );

      root.current.render(createPortal(overlayType, provider.current));

      hideScrollbar();
      provider.current.removeAttribute("data-hidden");

      if (!closeOnEscape) return;

      document.body.addEventListener("click", closeOnClickOutside, {
        signal: controller.current?.signal,
      });
      document.body.addEventListener("keydown", closeOnEscapeClick, {
        signal: controller.current?.signal,
      });
    },
    [hideScrollbar, hide, closeOnClickOutside, closeOnEscapeClick]
  );

  return { show, hide };
}

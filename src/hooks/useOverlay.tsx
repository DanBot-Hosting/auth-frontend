"use client";
import {
  LoadingOverlay,
  LoadingOverlayProps,
} from "@/components/LoadingOverlay";
import { Overlay } from "@/components/Overlay";
import { PropsWithChildren, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import { Root, createRoot } from "react-dom/client";
import { useScrollbar } from "@/hooks/useScrollbar";

interface UseOverlayProps {
  asLoading?: false;
}

interface UseLoadingOverlayProps extends LoadingOverlayProps {
  asLoading?: true;
}

export function useOverlay() {
  const { show: showScrollbar, hide: hideScrollbar } = useScrollbar();
  const root = useRef<Root | null>(null);
  const provider = useRef<HTMLElement | null>(null);

  const hide = useCallback(() => {
    provider.current?.setAttribute("data-hidden", "");
    showScrollbar();

    setTimeout(() => {
      root.current?.render(null);
      // The hide animation is set to 0.15s
    }, 300);
  }, [provider, root, showScrollbar]);

  const show = useCallback(({
    asLoading = false,
    ...props
  }: PropsWithChildren & (UseOverlayProps | UseLoadingOverlayProps)) => {
    if (!provider.current) {
      const providerElement = document.getElementById("overlay-provider");
      if (!providerElement) throw "No overlay provider found!";
      provider.current = providerElement;
    }

    if (!root.current) {
      const rootElement = document.createElement("div");
      root.current = createRoot(rootElement);
    }

    if (asLoading) {
      root.current.render(
        createPortal(
          <LoadingOverlay onCancel={hide} {...props} />,
          provider.current
        )
      );
    } else {
      root.current.render(
        createPortal(<Overlay {...props} />, provider.current)
      );
    }

    hideScrollbar();
    provider.current.removeAttribute("data-hidden");
  }, [root, provider, hideScrollbar, hide]);

  return { show, hide };
}
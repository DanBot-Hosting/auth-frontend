"use client";
import { css } from "@styles/css";
import { Logo } from "@/components/Logo";
import { useFakeProgress } from "@/hooks/useFakeProgress";
import { memo, useEffect, useRef } from "react";
import { useMesh } from "@/store/useMesh";
import { useSettings } from "@/hooks/useSettings";

/**
 * WebsiteLoadingOverlay component for initial website load.
 * Only shown once and then deleted from the DOM.
 * Unlike other overlays, it is independent from provider.
 * Which means it can be used directly.
 * Used in Layout wrapper.
 * uses `useFakeProgress` hook for loading indicator.
 *
 * @returns {JSX.Element} The JSX element representing the loading overlay.
 */
export const WebsiteLoadingOverlay = memo(function WebsiteLoadingOverlay({
  css: cssProp = {},
}: WebsiteLoadingOverlayProps) {
  const background = css(
    {
      position: "fixed",
      display: "flex",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
      flexShrink: "0",
      zIndex: "100",

      bg: "radial-gradient(circle, token(colors.solidoverlay) 0%, #000 1000%)",

      "&[data-hidden]": {
        opacity: "0",
        pointerEvents: "none",
        transition: "opacity 0.25s ease-in-out",
      },
    },
    cssProp
  );

  const logo = css.raw({
    // Do not make text smaller when shifted with paddingLeft
    width: "100%",
    color: "text.80",
  });

  const percent = css({
    position: "absolute",
    left: "50%",
    bottom: "4rem",
    transform: "translateX(-50%)",

    color: "text.70",
    fontSize: "1rem",
    fontWeight: "300",
  });

  const { progress, start, stop } = useFakeProgress();
  const isExecuted = useRef(false);
  const websiteLoadingOverlayRef = useRef<HTMLDivElement | null>(null);
  const [setOptions, define, toggle] = useMesh((state) => [
    state.setOptions,
    state.define,
    state.toggle,
  ]);
  const { get } = useSettings();

  /**
   * Do not reinit whole class instance on unmount
   * @see useMesh.setOnLoad
   */
  if (!isExecuted.current) {
    isExecuted.current = true;
    setOptions({
      static: get("background-animate") === "false",
      onLoad: () => {
        const overlay = websiteLoadingOverlayRef.current;
        if (!overlay) return;

        overlay.dataset.hidden = "true";

        document.body.style.overflow = "auto";
        if (get("background-enabled") !== "true") toggle(false);

        setTimeout(() => {
          stop();
          overlay.remove();
        }, 500);
      },
    });
    // Defining class once options are set
    define();
  }

  useEffect(() => {
    start();

    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={background} ref={websiteLoadingOverlayRef} id="website-loading-overlay">
      <Logo css={logo} />
      <span className={percent}>{Math.floor(progress)}%</span>
    </div>
  );
});

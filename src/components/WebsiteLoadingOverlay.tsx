"use client";
import { css } from "@styles/css";
import { Logo } from "@/components/Logo";
import { useFakeProgress } from "@/hooks/useFakeProgress";
import { useEffect, useRef } from "react";
import { useMesh } from "@/store/useMesh";
import { useSettings } from "@/hooks/useSettings";

const background = css({
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
});

export const hiddenScrollbar = css({
  overflow: "hidden",
});

const logo = css({
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
export function WebsiteLoadingOverlay() {
  const { progress, start, stop } = useFakeProgress();
  const isExecuted = useRef(false);
  const [setOptions, define] = useMesh((state) => [state.setOptions, state.define]);
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
        const overlay = document.getElementById("website-loading-overlay");
        if (!overlay) return;

        overlay.dataset.hidden = "true";

        document.body.classList.remove(hiddenScrollbar);

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
    <div className={background} id="website-loading-overlay">
      <Logo className={logo} />
      <span className={percent}>{Math.floor(progress)}%</span>
    </div>
  );
}

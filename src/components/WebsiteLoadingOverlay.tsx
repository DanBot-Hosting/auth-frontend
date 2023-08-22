"use client";
import { css } from "@styles/css";
import { Logo } from "@/components/Logo";
import { useFakeProgress } from "@/hooks/useFakeProgress";

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

export function onWebsiteLoad() {
  const overlay = document.getElementById("website-loading-overlay");
  if (!overlay) return;

  overlay.dataset.hidden = "true";

  document.body.classList.remove(hiddenScrollbar);

  setTimeout(() => {
    overlay.remove();
  }, 500);
}

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

export function WebsiteLoadingOverlay() {
  const progress = useFakeProgress();

  return (
    <div className={background} id="website-loading-overlay">
      <Logo className={logo} />
      <span className={percent}>{Math.floor(progress)}%</span>
    </div>
  );
}
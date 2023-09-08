import { css } from "@styles/css";

export function Tooltip({
  children,
  label,
  css: cssProp = {},
  position = "top",
  ...props
}: TooltipProps) {
  const wrapper = css(
    {
      display: "flex",
      flexDir: "column",
      position: "relative",
      w: "max-content",

      _hover: {
        "& > div[role=tooltip]": {
          "&[data-position=top]": {
            transform: "scale(1) translate(-50%, -100%)",
          },
          "&[data-position=bottom]": {
            transform: "scale(1) translate(-50%, 100%)",
          },
          "&[data-position=right]": {
            transform: "scale(1) translate(100%, -50%)",
          },
          "&[data-position=left]": {
            transform: "scale(1) translate(-100%, -50%)",
          },
          opacity: "1",
          transition: "transform .1s, opacity .05s ease-in",
        },
      },
    },
    cssProp
  );

  const tooltip = css({
    pointerEvents: "none",
    position: "absolute",
    zIndex: "10",
    p: "0.5rem 1.5625rem",
    w: "max-content",

    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "&[data-position=top]": {
      top: "-30%",
      left: "50%",
      transform: "scale(.9) translate(-55%, -110%)",
    },
    "&[data-position=bottom]": {
      bottom: "-30%",
      left: "50%",
      transform: "scale(.9) translate(-55%, 90%)",
    },
    "&[data-position=right]": {
      top: "50%",
      right: "-20%",
      transform: "scale(.9) translate(100%, -55%)",
    },
    "&[data-position=left]": {
      top: "50%",
      left: "-20%",
      transform: "scale(.9) translate(-100%, -55%)",
    },
    transition: "transform .1s, opacity .05s ease-in",
    opacity: "0",

    color: "text.60",
    fontWeight: "400",
    fontSize: "1rem",
    bg: "pillbackground.30",
    backdropBlur: "limited.7",
    backdropFilter: "auto",
    borderRadius: "2rem",
  });

  return (
    <div className={wrapper} {...props}>
      <div className={tooltip} role="tooltip" data-position={position}>
        {label}
      </div>
      {children}
    </div>
  );
}

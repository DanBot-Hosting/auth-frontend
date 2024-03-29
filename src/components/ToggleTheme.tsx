"use client";
import { css } from "@styles/css";
import { Moon, Sun } from "@/utils/icons";
import { useToggleTheme } from "@/hooks/useToggleTheme";

/**
 * ToggleTheme affix component.
 * Used in Layout wrapper.
 * Use `useToggleTheme` for corresponding functionality.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @returns {JSX.Element} The rendered animated ToggleTheme button component.
 */
export function ToggleTheme({ css: cssProp = {} }: ToggleThemeProps) {
  const themeButton = css(
    {
      position: "relative",
      display: "inline-flex",
      w: "2.75rem",
      h: "2.75rem",
      flexDir: "column",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden",
      flexShrink: "0",
      cursor: "pointer",

      borderRadius: "1rem",
      border: "1px solid token(colors.text.20)",
      transition: "border .2s ease-in-out",
      bg: "background.100",

      _hover: {
        border: "1px solid token(colors.text.30)",
        transition: "border .2s ease-in-out",
      },

      _dark: {
        _hover: {
          "& #moon": {
            opacity: "0",
            pointerEvents: "none",
            top: "200%",
          },
          "& #sun": {
            opacity: "1",
            pointerEvents: "unset",
            top: "50%",
          },
        },
      },
      _light: {
        _hover: {
          "& #moon": {
            opacity: "1",
            pointerEvents: "unset",
            top: "50%",
          },
          "& #sun": {
            opacity: "0",
            pointerEvents: "none",
            top: "200%",
          },
        },
      },
    },
    cssProp
  );

  const moon = css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    transition: "all .5s ease-in-out",

    _light: {
      opacity: "0",
      pointerEvents: "none",
    },

    // Weird firefox bug not applying top property when transitions disabled
    // Also a panda css issue not allowing nested conditions, 0.13.1
    "[data-theme-mode=light][data-transitions=true] &": {
      top: "200%",
    },
  });

  const sun = css({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    transition: "all .5s ease-in-out",

    _dark: {
      opacity: "0",
      pointerEvents: "none",
    },
    
    // Weird firefox bug not applying top property when transitions disabled
    // Also a panda css issue not allowing nested conditions, 0.13.1
    "[data-theme-mode=dark][data-transitions=true] &": {
      top: "200%",
    },
  });

  const shadow = css({
    position: "absolute",
    bottom: "0",
    left: "50%",
    transform: "translateX(-50%)",
    width: "1.25rem",
    height: "0rem",
    m: "0",
    p: "0",
    flexShrink: "0",
    bg: "transparent",
    color: "transparent",
    boxShadow: "0px 2px 8px 3px token(colors.text.60)",
    transition: "box-shadow .2s ease-in-out",

    "div:hover > &": {
      boxShadow: "0px 2px 14px 5px token(colors.text.90)",
      transition: "box-shadow .2s ease-in-out",
    },
  });

  const { toggle } = useToggleTheme();

  return (
    <div className={themeButton} onClick={toggle}>
      <Moon size={24} weight="fill" className={moon} id="moon" />
      <Sun size={24} weight="fill" className={sun} id="sun" />
      <div className={shadow} />
    </div>
  );
}

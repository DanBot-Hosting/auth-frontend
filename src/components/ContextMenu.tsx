"use client";
import { css } from "@styles/css";
import { Select } from "@/components/Select";
import { Switch } from "@/components/Switch";
import { useInterface } from "@/hooks/useInterface";
import { useEffect, useRef } from "react";
import { useContextMenu } from "@/hooks/useContextMenu";

/**
 * A custom context menu that provides additional functionalities.
 *
 * @param {import("@styles/types").SystemStyleObject} [props.css={}] - 
 * Custom CSS styles to be applied to the context menu.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
export function ContextMenu({ css: cssProp = {} }: ContextMenuProps) {
  const { change, state, ref, options, find } = useInterface();
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const { init } = useContextMenu(contextMenuRef);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(init, []);

  const contextMenu = css(
    {
      display: "flex",
      maxW: "15.625rem",
      w: "100%",
      p: "0.4375rem 0.625rem",
      flexDir: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      flexShrink: "0",
      gap: "0.625rem",
      position: "absolute",
      zIndex: "200",

      borderRadius: "0.875rem",
      bg: "pillbackground.50",

      transition: "opacity 0.15s ease-in-out, scale 0.15s ease-in-out",
      opacity: "0",
      scale: "0.95",
      pointerEvents: "none",

      "&[data-active]": {
        opacity: "1",
        scale: "1",
        pointerEvents: "auto",
      },

      /** @see {@link https://stackoverflow.com/q/60997948 Chrome bug} */
      _before: {
        content: "''",
        position: "absolute",
        display: "block",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        backdropBlur: "limited.5",
        backdropFilter: "auto",
        zIndex: "-1",
        borderRadius: "0.875rem",
        overflow: "hidden",
      },
    },
    cssProp
  );

  const field = css({
    display: "flex",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: "stretch",
  });

  const label = css({
    display: "flex",
    padding: "0.3125rem 0.25rem",
    justifyContent: "center",
    alignItems: "flex-start",
    userSelect: "none",

    color: "text.40",
    fontSize: "0.875rem",
    fontWeight: "500",
  });

  const select = css.raw({
    display: "flex",
    minH: "2.5rem",
    // h: "2.5rem",
    p: "0.3125rem 0.9375rem",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "stretch",

    borderRadius: "0.4375rem",

    // Text
    "& > div": {
      fontSize: "0.875rem",
    },

    // Dropdown
    "& ~ div": {
      // Avoid wrapper
      "& > div": {
        padding: "0.4375rem",
        borderRadius: "0.4375rem",

        backdropBlur: "full.7",

        "& > div": {
          borderRadius: "0.125rem",
        },

        // Options
        "& > button": {
          fontSize: "0.875rem",
          h: "2.1875rem",
        },
      },
    },
  });

  const switchElement = css.raw({
    "& > label": {
      p: "0.3125rem 0.625rem",

      fontSize: "0.875rem",
      fontStyle: "normal",
      fontWeight: "400",
    },
  });

  /**
   * Do not render if there's a default useState value,
   * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/client-components#full-page-load Full Page Load}
   */
  if (!state.theme || !state.blurMode) return;
  return (
    <div className={contextMenu} ref={contextMenuRef}>
      <div className={field}>
        <label className={label}>Theme</label>
        <Select
          css={select}
          options={options.themes}
          initial={find.themeIndex()}
          ref={ref.theme}
          placeholder="Pick a theme..."
          onChange={change.theme}
        />
      </div>
      <div className={field}>
        <label className={label}>Blur mode</label>
        <Select
          css={select}
          options={options.blurModes}
          initial={find.blurModeIndex()}
          ref={ref.blurMode}
          placeholder="Pick blur mode..."
          onChange={change.blurMode}
        />
      </div>
      <div className={field}>
        <label className={label}>Blur mode</label>
        <Switch
          css={switchElement}
          checked={state.backgroundEnabled}
          ref={ref.backgroundEnabled}
          onChange={change.backgroundEnabled}
        >
          Show the background
        </Switch>
        <Switch
          css={switchElement}
          checked={state.backgroundAnimated}
          ref={ref.backgroundAnimated}
          onChange={change.backgroundAnimated}
        >
          Animation shaders
        </Switch>
      </div>
    </div>
  );
}

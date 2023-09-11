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
 * @param {CSSObject} [props.css={}] -
 * Custom CSS styles to be applied to the component.
 * @param {Dictionary.Settings.Interface} props.translation -
 * The translation dictionary for fields.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
export function ContextMenu({
  translation,
  locale,
  css: cssProp = {},
}: ContextMenuProps) {
  const { change, state, ref, options, find } = useInterface(translation);
  const contextMenuRef = useRef<HTMLDivElement | null>(null);
  const { init } = useContextMenu(contextMenuRef);

  useEffect(() => {
    // convert null to undefined
    init(document.getElementById("header") ?? undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      bg: "solidoverlay",

      transition: "opacity 0.15s ease-in-out, scale 0.15s ease-in-out",
      opacity: "0",
      scale: "0.95",
      pointerEvents: "none",

      "&[data-active]": {
        opacity: "1",
        scale: "1",
        pointerEvents: "auto",
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
        <label className={label}>{translation.theme.label}</label>
        <Select
          css={select}
          options={options.themes}
          initial={find.themeIndex()}
          ref={ref.theme}
          placeholder={translation.theme.selectPlaceholder}
          translation={translation.theme.themes}
          locale={locale}
          onChange={change.theme}
        />
      </div>
      <div className={field}>
        <label className={label}>{translation.blurMode.label}</label>
        <Select
          css={select}
          options={options.blurModes}
          initial={find.blurModeIndex()}
          ref={ref.blurMode}
          placeholder={translation.blurMode.selectPlaceholder}
          translation={translation.blurMode.blurModes}
          locale={locale}
          onChange={change.blurMode}
        />
      </div>
      <div className={field}>
        <label className={label}>{translation.background.label}</label>
        <Switch
          css={switchElement}
          checked={state.backgroundEnabled}
          ref={ref.backgroundEnabled}
          onChange={change.backgroundEnabled}
        >
          {translation.background.backgroundEnabledSwitch}
        </Switch>
        <Switch
          css={switchElement}
          checked={state.backgroundAnimated}
          ref={ref.backgroundAnimated}
          onChange={change.backgroundAnimated}
        >
          {translation.background.backgroundAnimatedSwitch}
        </Switch>
      </div>
      <div className={field}>
        <label className={label}>{translation.transitions.label}</label>
        <Switch
          css={switchElement}
          checked={state.transitions}
          ref={ref.transitions}
          onChange={change.transitions}
        >
          {translation.transitions.transitionsSwitch}
        </Switch>
      </div>
    </div>
  );
}

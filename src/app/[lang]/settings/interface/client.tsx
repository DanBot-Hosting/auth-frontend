"use client";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Switch } from "@/components/Switch";
import { useInterface } from "@/hooks/useInterface";
import { css } from "@styles/css";

const field = css({
  display: "flex",
  flexDir: "column",
  justifyContent: "flex-end",
  alignItems: "flex-start",
  gap: "0.625rem",
  width: "100%",
});

const fields = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "1.875rem",
  w: "100%",
});

const label = css({
  color: "text.90",
  textAlign: "right",
  fontSize: "1rem",
  fontWeight: "600",
  userSelect: "none",
  lineHeight: "1.75",
});

const select = css({
  display: "flex",
  w: "100%",
  maxW: "37.5rem",
  gap: "0.9375rem",

  "@media screen and (max-width: 500px)": {
    "& > input": {
      padding: "0.625rem 1.25rem",
    },
  },

  "& > *": {
    flex: "1 0 0",
    maxW: "100%",

    "& > *": {
      maxW: "100%",
      w: "100%",
    },
  },
});

const switches = css({
  display: "flex",
  flexDir: "column",
});

const description = css({
  color: "text.60",
  fontSize: "0.9375rem",
  fontWeight: "400",
});

export function Client({
  translation,
  locale
}: {
  translation: Dictionary.Settings.Interface;
  locale: Locale;
}) {
  const { resetSettings, change, state, ref, options, find } =
    useInterface(translation);

  /**
   * Do not render if there's a default useState value,
   * @see {@link https://nextjs.org/docs/app/building-your-application/rendering/client-components#full-page-load Full Page Load}
   */
  if (!state.theme || !state.blurMode) return;
  return (
    <div className={fields}>
      <div className={field}>
        <label className={label}>{translation.theme.label}</label>
        <div className={select}>
          <Select
            options={options.themes}
            initial={find.themeIndex()}
            ref={ref.theme}
            placeholder={translation.theme.selectPlaceholder}
            onChange={change.theme}
            translation={translation.theme.themes}
            locale={locale}
          />
        </div>
        <span className={description}>{translation.theme.description}</span>
      </div>
      <div className={field}>
        <label className={label}>{translation.blurMode.label}</label>
        <div className={select}>
          <Select
            options={options.blurModes}
            initial={find.blurModeIndex()}
            ref={ref.blurMode}
            placeholder={translation.blurMode.selectPlaceholder}
            onChange={change.blurMode}
            translation={translation.blurMode.blurModes}
            locale={locale}
          />
        </div>
        <span className={description}>{translation.blurMode.description}</span>
      </div>
      <div className={field}>
        <label className={label}>{translation.background.label}</label>
        <div className={switches}>
          <Switch
            checked={state.backgroundEnabled}
            ref={ref.backgroundEnabled}
            onChange={change.backgroundEnabled}
          >
            {translation.background.backgroundEnabledSwitch}
          </Switch>
          <Switch
            checked={state.backgroundAnimated}
            ref={ref.backgroundAnimated}
            onChange={change.backgroundAnimated}
          >
            {translation.background.backgroundAnimatedSwitch}
          </Switch>
        </div>
      </div>
      <div className={field}>
        <label className={label}>{translation.transitions.label}</label>
        <div className={switches}>
          <Switch
            checked={state.transitions}
            ref={ref.transitions}
            onChange={change.transitions}
          >
            {translation.transitions.transitionsSwitch}
          </Switch>
        </div>
      </div>
      <div className={field}>
        <Button secondary pill onClick={resetSettings}>
          {translation.resetSettings.label}
        </Button>
      </div>
    </div>
  );
}

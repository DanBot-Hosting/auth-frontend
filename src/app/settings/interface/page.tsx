"use client";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Switch } from "@/components/Switch";
import { useInterface } from "@/hooks/useInterface";
import { useSettings } from "@/hooks/useSettings";
import { css } from "@styles/css";
import { useEffect, useState } from "react";

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

export default function Interface() {
  const { get } = useSettings();
  const { resetSettings, change, state, ref, options, find } = useInterface();
  const [pickedTheme, setPickedTheme] = useState<string | null>(null);
  const [pickedBlurMode, setPickedBlurMode] = useState<string | null>(null);

  useEffect(() => {
    setPickedTheme(get("theme"));
    setPickedBlurMode(get("blur-mode"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!pickedTheme || !pickedBlurMode) return;
  return (
    <div className={fields}>
      <div className={field}>
        <label className={label}>Theme</label>
        <div className={select}>
          <Select
            options={options.themes}
            initial={find.themeIndex(pickedTheme)}
            ref={ref.theme}
            placeholder="Pick a theme..."
            onChange={change.theme}
          />
        </div>
        <span className={description}>Your theme preferences</span>
      </div>
      <div className={field}>
        <label className={label}>Blur mode</label>
        <div className={select}>
          <Select
            options={options.blurModes}
            initial={find.blurModeIndex(pickedBlurMode)}
            ref={ref.blurMode}
            placeholder="Pick blur mode..."
            onChange={change.blurMode}
          />
        </div>
        <span className={description}>
          Blur may affect performance of low end devices
        </span>
      </div>
      <div className={field}>
        <label className={label}>Background</label>
        <div className={switches}>
          <Switch
            checked={state.backgroundEnabled}
            ref={ref.backgroundEnabled}
            onChange={change.backgroundEnabled}
          >
            Show the background
          </Switch>
          <Switch
            checked={state.backgroundAnimated}
            ref={ref.backgroundAnimated}
            onChange={change.backgroundAnimated}
          >
            Animation shaders
          </Switch>
        </div>
      </div>
      <div className={field}>
        <Button secondary pill onClick={resetSettings}>
          Reset Settings
        </Button>
      </div>
    </div>
  );
}

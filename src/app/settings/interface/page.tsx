"use client";
import { Button } from "@/components/Button";
import { Select } from "@/components/Select";
import { Switch } from "@/components/Switch";
import { useCookies } from "@/hooks/useCookies";
import { useMesh } from "@/store/useMesh";
import { css } from "@styles/css";
import { useCallback } from "react";

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
  const mesh = useMesh();
  const cookieStore = useCookies();

  const themePreferences: SelectOption[] = [
    { label: "DanBot Hosting", value: "dbh" },
    { label: "Vampire", value: "vampire" },
    { label: "Midnight Purple", value: "midnightpurple" },
  ];

  const pickedTheme = cookieStore.get("theme") ?? "dbh";
  const themeIndex = themePreferences.findIndex(
    (theme) => theme.value === pickedTheme
  );

  const blurModes: SelectOption[] = [
    { label: "Full", value: "full" },
    { label: "Limited", value: "limited" },
    { label: "Disabled", value: "disabled" },
  ];

  const pickedBlurMode = cookieStore.get("blur-mode") ?? "full";
  const blurModeIndex = blurModes.findIndex(
    (blurMode) => blurMode.value === pickedBlurMode
  );

  const onThemeChange = useCallback(
    (option: SelectOption) => {
      document.documentElement.dataset.theme = option.value;
      cookieStore.set("theme", option.value);
      mesh.initializeMesh();
    },
    [cookieStore, mesh]
  );

  const onBlurModeChange = useCallback(
    (option: SelectOption) => {
      document.documentElement.dataset.blurMode = option.value;
      cookieStore.set("blur-mode", option.value);
    },
    [cookieStore]
  );

  return (
    <div className={fields}>
      <div className={field}>
        <label className={label}>Theme</label>
        <div className={select}>
          <Select
            options={themePreferences}
            initial={themeIndex}
            placeholder="Pick a theme..."
            onChange={onThemeChange}
          />
        </div>
        <span className={description}>Your theme preferences</span>
      </div>
      <div className={field}>
        <label className={label}>Blur mode</label>
        <div className={select}>
          <Select
            options={blurModes}
            initial={blurModeIndex}
            placeholder="Pick blur mode..."
            onChange={onBlurModeChange}
          />
        </div>
        <span className={description}>
          Blur may affect performance of low end devices
        </span>
      </div>
      <div className={field}>
        <label className={label}>Background</label>
        <div className={switches}>
          <Switch>Show the background</Switch>
          <Switch>Animation shaders</Switch>
        </div>
      </div>
      <div className={field}>
        <Button secondary pill>
          Reset Settings
        </Button>
      </div>
    </div>
  );
}

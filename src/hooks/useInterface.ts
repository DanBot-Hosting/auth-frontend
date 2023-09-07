import { generateBlurModeOptions, generateThemeOptions } from "@/utils/panda";
import { useCallback, useRef } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useSettings } from "@/hooks/useSettings";

/**
 * A general hook wrapper around useSettings & useCookies hooks for interface-related logic
 * 
 * @returns {UseInterface} logic, refs, states, options & finders to manipulate interface settings
 */
export function useInterface(): UseInterface {
  const { get, set } = useSettings();
  const themePreferences: SelectOption[] = generateThemeOptions();
  const blurModes: SelectOption[] = generateBlurModeOptions();

  const findThemeIndex = useCallback(
    (pickedTheme: string) =>
      themePreferences.findIndex((theme) => theme.value === pickedTheme),
    [themePreferences]
  );

  const findBlurModeIndex = useCallback(
    (pickedBlurMode: string) =>
      blurModes.findIndex((blurMode) => blurMode.value === pickedBlurMode),
    [blurModes]
  );

  const backgroundEnabled = get("background-enabled") === "true";
  const backgroundAnimated = get("background-animate") === "true";

  const enabledRef = useRef<HTMLInputElement | null>(null);
  const animatedRef = useRef<HTMLInputElement | null>(null);
  const themeRef = useRef<SelectRef | null>(null);
  const blurModeRef = useRef<SelectRef | null>(null);

  const { show } = useNotification();

  const resetSettings = useCallback(() => {
    if (get("background-enabled") !== "true") enabledRef.current?.click();
    if (get("background-animate") !== "true") animatedRef.current?.click();
    if (get("theme") !== "dbh") themeRef.current?.change(themePreferences[0]);
    if (get("blur-mode") !== "full") blurModeRef.current?.change(blurModes[0]);

    show({ children: "Settings were successfully reset!" });
  }, [blurModes, get, show, themePreferences]);

  const switchTheme = useCallback(
    (option: DropdownOption) => set("theme", option.value),
    [set]
  );

  const switchBlurMode = useCallback(
    (option: DropdownOption) => set("blur-mode", option.value),
    [set]
  );

  const switchBackgroundEnabled = useCallback(
    (state: boolean) => {
      if (get("background-animate") === "true" && !state)
        animatedRef.current?.click();
      set("background-enabled", state ? "true" : "false");
    },
    [get, set]
  );

  const switchBackgroundAnimated = useCallback(
    (state: boolean) => {
      if (get("background-enabled") === "false" && state)
        enabledRef.current?.click();
      set("background-animate", state ? "true" : "false");
    },
    [get, set]
  );

  // Callbacks
  const logic = {
    resetSettings,
    change: {
      theme: switchTheme,
      blurMode: switchBlurMode,
      backgroundEnabled: switchBackgroundEnabled,
      backgroundAnimated: switchBackgroundAnimated,
    },
  };

  // Refs and states
  const ref = {
    state: {
      backgroundEnabled,
      backgroundAnimated,
    },
    ref: {
      theme: themeRef,
      blurMode: blurModeRef,
      backgroundEnabled: enabledRef,
      backgroundAnimated: animatedRef,
    },
  };

  // Options and callbacks related to them
  const options = {
    options: {
      themes: themePreferences,
      blurModes: blurModes,
    },
    find: {
      themeIndex: findThemeIndex,
      blurModeIndex: findBlurModeIndex,
    },
  };

  return { ...logic, ...ref, ...options };
}

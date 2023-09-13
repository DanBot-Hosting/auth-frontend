import { generateBlurModeOptions, generateThemeOptions } from "@/utils/panda";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNotification } from "@/hooks/useNotification";
import { useSettings } from "@/hooks/useSettings";

/**
 * A general hook wrapper around useSettings & useCookies hooks for interface-related logic
 *
 * @param {Dictionary.Settings.Interface} translation - The translation object for resetting the settings
 * @returns {UseInterface} logic, refs, states, options & finders to manipulate interface settings
 */
export function useInterface(
  translation: Dictionary.Settings.Interface
): UseInterface {
  const { get, set } = useSettings();
  const themePreferences: SelectOption[] = generateThemeOptions();
  const blurModes: SelectOption[] = generateBlurModeOptions();

  const backgroundEnabled = get("background-enabled") === "true";
  const backgroundAnimated = get("background-animate") === "true";
  const transitions = get("transitions") === "true";
  const [pickedTheme, setPickedTheme] = useState<string | null>(null);
  const [pickedBlurMode, setPickedBlurMode] = useState<string | null>(null);

  useEffect(() => {
    // Avoiding hydration for text mismatch
    setPickedTheme(get("theme"));
    setPickedBlurMode(get("blur-mode"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const findThemeIndex = useCallback(
    () => themePreferences.findIndex((theme) => theme.value === pickedTheme),
    [pickedTheme, themePreferences]
  );

  const findBlurModeIndex = useCallback(
    () => blurModes.findIndex((blurMode) => blurMode.value === pickedBlurMode),
    [blurModes, pickedBlurMode]
  );

  const enabledRef = useRef<HTMLInputElement | null>(null);
  const animatedRef = useRef<HTMLInputElement | null>(null);
  const transitionsRef = useRef<HTMLInputElement | null>(null);
  const themeRef = useRef<SelectRef | null>(null);
  const blurModeRef = useRef<SelectRef | null>(null);

  const { show } = useNotification();

  const resetSettings = useCallback(() => {
    if (get("background-enabled") !== "true") enabledRef.current?.click();
    if (get("background-animate") !== "true") animatedRef.current?.click();
    if (get("transitions") !== "true") transitionsRef.current?.click();
    if (get("theme") !== "dbh") themeRef.current?.change(themePreferences[0]);
    if (get("blur-mode") !== "full") blurModeRef.current?.change(blurModes[0]);

    show({
      children: translation.resetSettings.notification,
      confirmLabel: translation.resetSettings.acceptNotification,
    });
  }, [
    blurModes,
    get,
    show,
    themePreferences,
    translation.resetSettings.acceptNotification,
    translation.resetSettings.notification,
  ]);

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

  const switchTransitions = useCallback(
    (state: boolean) => {
      set("transitions", state ? "true" : "false");
    },
    [set]
  );

  // Callbacks
  const logic = {
    resetSettings,
    change: {
      theme: switchTheme,
      blurMode: switchBlurMode,
      backgroundEnabled: switchBackgroundEnabled,
      backgroundAnimated: switchBackgroundAnimated,
      transitions: switchTransitions,
    },
  };

  // Refs and states
  const ref = {
    state: {
      theme: pickedTheme,
      blurMode: pickedBlurMode,
      backgroundEnabled,
      backgroundAnimated,
      transitions,
    },
    ref: {
      theme: themeRef,
      blurMode: blurModeRef,
      backgroundEnabled: enabledRef,
      backgroundAnimated: animatedRef,
      transitions: transitionsRef,
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

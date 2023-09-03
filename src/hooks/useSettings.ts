import { useMesh } from "@/store/useMesh";
import { useCookies } from "./useCookies";
import { startTransition, useCallback } from "react";

export function useSettings(): UseSettings {
  const { get: getCookie, set: setCookie } = useCookies();
  // No shallowing
  const mesh = useMesh();

  const get = useCallback(
    (setting: Setting) => {
      let defaultValue: string;
      // Getting default value
      // If changed the value has to be set in inline script as well
      switch (setting) {
        case "background-animate":
          defaultValue = "true";
          break;
        case "background-enabled":
          defaultValue = "true";
          break;
        case "blur-mode":
          defaultValue = "full";
          break;
        case "theme":
          defaultValue = "dbh";
          break;
        case "theme-mode":
          defaultValue = "light";
          break;
      }
      return getCookie(setting) ?? defaultValue;
    },
    [getCookie]
  );

  const init = useCallback(
    (setting: Setting, customValue?: string) => {
      const value = customValue ?? get(setting);

      switch (setting) {
        case "background-animate":
          const newState = useMesh.getState();
          if (value === "false") newState.mesh.pause();
          else newState.mesh.play();
          break;
        case "background-enabled":
          mesh.initializeMesh();
          startTransition(() => mesh.toggle(value === "true"));
          break;
        case "blur-mode":
          document.documentElement.dataset.blurMode = value;
          break;
        case "theme":
          document.documentElement.dataset.theme = value;
          mesh.initializeMesh();
          break;
        case "theme-mode":
          document.documentElement.dataset.themeMode = value;
          break;
      }
    },
    [get, mesh]
  );

  const set = useCallback(
    (setting: Setting, value: string) => {
      init(setting, value);
      return setCookie(setting, value);
    },
    [setCookie, init]
  );

  return { init, get, set };
}

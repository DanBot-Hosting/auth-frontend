import { useMesh } from "@/store/useMesh";
import { useCookies } from "./useCookies";
import { startTransition, useCallback } from "react";

export function useSettings(): UseSettings {
  const { get: getCookie, set: setCookie } = useCookies();
  const [initializeMesh, toggleColors, mesh] = useMesh((state) => [
    state.initializeMesh,
    state.toggle,
    state.mesh,
  ]);

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
          if (value === "false") return mesh.pause();
          initializeMesh({ static: false });
          mesh.play();
          break;
        case "background-enabled":
          initializeMesh();
          startTransition(() => toggleColors(value === "true"));
          break;
        case "blur-mode":
          document.documentElement.dataset.blurMode = value;
          break;
        case "theme":
          document.documentElement.dataset.theme = value;
          initializeMesh();
          break;
        case "theme-mode":
          document.documentElement.dataset.themeMode = value;
          break;
      }
    },
    [get, initializeMesh, mesh, toggleColors]
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

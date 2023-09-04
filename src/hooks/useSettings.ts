import { useMesh } from "@/store/useMesh";
import { useCookies } from "./useCookies";
import { startTransition, useCallback } from "react";

export function useSettings(): UseSettings {
  const { get: getCookie, set: setCookie } = useCookies();
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
          if (mesh.mesh.options.static)
            mesh.initializeMesh({ static: false });
          if (value === "true") mesh.mesh.play();
          else mesh.mesh.pause();
          break;
        case "background-enabled":
          mesh.initializeMesh();
          startTransition(() => mesh.toggle(value === "true"));
          if (value === "true") mesh.mesh.reinit();
          break;
        case "blur-mode":
          document.documentElement.dataset.blurMode = value;
          break;
        case "theme":
          document.documentElement.dataset.theme = value;
          mesh.redraw();
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

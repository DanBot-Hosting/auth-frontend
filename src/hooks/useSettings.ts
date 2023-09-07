import { useMesh } from "@/store/useMesh";
import { useCookies } from "./useCookies";
import { startTransition, useCallback } from "react";

export function useSettings(): UseSettings {
  const { get: getCookie, set: setCookie } = useCookies();

  const get = useCallback(
    (setting: Setting) => {
      // Getting default value
      // If changed the value has to be set in inline script as well
      let defaultValues: Record<Setting, string> = {
        "background-animate": "true",
        "background-enabled": "true",
        "blur-mode": "full",
        "theme": "dbh",
        "theme-mode": "light",
      };

      return getCookie(setting) ?? defaultValues[setting];
    },
    [getCookie]
  );

  const init = useCallback(
    (setting: Setting, customValue?: string) => {
      const value = customValue ?? get(setting);
      const mesh = useMesh.getState();

      switch (setting) {
        case "background-animate":
          if (mesh.mesh?.options.static) mesh.initialize({ static: false });
          if (value === "true") mesh.mesh?.play();
          else mesh.mesh?.pause();
          break;
        case "background-enabled":
          mesh.initialize();
          startTransition(() => mesh.toggle(value === "true"));
          if (value === "true") {
            init("background-animate");
            mesh.mesh?.reinit();
          };
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
          mesh.redraw();
          break;
      }
    },
    [get]
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

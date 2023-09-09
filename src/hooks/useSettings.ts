import { useMesh } from "@/store/useMesh";
import { useCookies } from "./useCookies";
import { startTransition, useCallback, useMemo } from "react";
import { useNotification } from "./useNotification";

export function useSettings(): UseSettings {
  const { get: getCookie, set: setCookie } = useCookies();
  const { show } = useNotification();

  // Getting default value
  // If changed the value has to be set in inline script as well
  const defaultValues: Record<Setting, string> = useMemo(
    () => ({
      "background-animate": "true",
      "background-enabled": "true",
      "blur-mode": "full",
      theme: "dbh",
      "theme-mode": "light",
      transitions: "true",
    }),
    []
  );

  const get = useCallback(
    (setting: Setting) => {
      return getCookie(setting) ?? defaultValues[setting];
    },
    [defaultValues, getCookie]
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
          }
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
        case "transitions":
          document.documentElement.dataset.transitions = value;
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

  const reducedMotionCallback = useCallback(
    (matches: boolean) => {
      if (!matches) return;

      show({
        children: "Reduced motion has been enabled",
      });
    },
    [show]
  );

  const handle = useCallback(
    (setting: Setting) => {
      switch (setting) {
        case "transitions":
          return () => {
            const mql = matchMedia("(prefers-reduced-motion: reduce)");
            reducedMotionCallback(mql.matches);
            mql.addEventListener("change", (event) =>
              reducedMotionCallback(event.matches)
            );
          };
      }
      return () => {};
    },
    [reducedMotionCallback]
  );

  return { init, get, set, handle };
}

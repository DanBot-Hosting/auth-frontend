import { useCookies } from "@/hooks/useCookies";
import { useMesh } from "@/store/useMesh";
import { useCallback } from "react";

export function useToggleTheme() {
  const cookieStore = useCookies();
  const mesh = useMesh();

  const toggleMode = useCallback((mode: string) => {
    document.documentElement.dataset.theme = mode;
  }, []);

  const toggle = useCallback(() => {
    const theme = cookieStore.get("theme");
    const toggled = theme === "dark" ? "light" : "dark";
    console.log(theme, toggled);

    cookieStore.set("theme", toggled);
    console.log(1);
    toggleMode(toggled);
    console.log(2)
    mesh.initializeMesh();
    console.log(3);
  }, [cookieStore, mesh, toggleMode]);

  return { toggle };
}

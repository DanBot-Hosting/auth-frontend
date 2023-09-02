import { useCookies } from "@/hooks/useCookies";
import { useMesh } from "@/store/useMesh";
import { useCallback } from "react";

/**
 * Hook for toggling the theme in client side between "dark" and "light".
 * Updates the document element's theme accordingly along with reinitializing the mesh.
 *
 * @return {UseToggleTheme} An object containing the toggle function.
 */
export function useToggleTheme(): UseToggleTheme {
  const cookieStore = useCookies();
  const mesh = useMesh();

  const toggleMode = useCallback((mode: string) => {
    document.documentElement.dataset.themeMode = mode;
  }, []);

  /**
   * Toggles the theme value by checking cookies via client side cookie store.
   * Updates the document element's theme accordingly along with reinitializing the mesh.
   * 
   * @returns {void}
   */
  const toggle = useCallback(() => {
    const theme = cookieStore.get("theme-mode");
    const toggled = theme === "dark" ? "light" : "dark";

    cookieStore.set("theme-mode", toggled);
    toggleMode(toggled);
    mesh.initializeMesh();
  }, [cookieStore, mesh, toggleMode]);

  return { toggle };
}

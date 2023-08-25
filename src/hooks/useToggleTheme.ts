import { useCookies } from "@/hooks/useCookies";
import { useMesh } from "@/store/useMesh";
import { useCallback } from "react";

/**
 * Hook for toggling the theme in client side between "dark" and "light".
 * Updates the document element's theme accordingly along with reinitializing the mesh.
 *
 * @return {{ toggle: () => void }} An object containing the toggle function.
 */
export function useToggleTheme() {
  const cookieStore = useCookies();
  const mesh = useMesh();

  const toggleMode = useCallback((mode: string) => {
    document.documentElement.dataset.theme = mode;
  }, []);

  /**
   * Toggles the theme value by checking cookies via client side cookie store.
   * Updates the document element's theme accordingly along with reinitializing the mesh.
   * 
   * @returns {void}
   */
  const toggle = useCallback(() => {
    const theme = cookieStore.get("theme");
    const toggled = theme === "dark" ? "light" : "dark";

    cookieStore.set("theme", toggled);
    toggleMode(toggled);
    mesh.initializeMesh();
  }, [cookieStore, mesh, toggleMode]);

  return { toggle };
}

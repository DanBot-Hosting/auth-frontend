import { useCookies } from "@/hooks/useCookies";
import { useMesh } from "@/store/useMesh";

export function useToggleTheme() {
  const cookieStore = useCookies();
  const mesh = useMesh();

  function toggleMode(mode: string) {
    document.documentElement.dataset.theme = mode;
  }

  function toggle() {
    const theme = cookieStore.get("theme");
    const toggled = theme === "dark" ? "light" : "dark";

    cookieStore.set("theme", toggled);
    toggleMode(toggled);
    mesh.initializeMesh();
  }

  return { toggle };
}

import { getRawToken } from "@/utils/css";
import { Gradient } from "@/utils/mesh";
import { create } from "zustand";

/**
 * Mesh store to interact with background from any part of the app.
 *
 * @return {MeshStore} The created mesh store.
 */
export const useMesh = create<MeshStore>((set, get) => ({
  /** Customize Gradient options and reinit gradient instance */
  setOptions: (options) =>
    set((state) => ({
      ...state,
      mesh: new Gradient(options),
    })),
  /** Mesh Gradient class, is type of any because module needs ts rewrite. */
  mesh: new Gradient(),
  /** Initializes the mesh without updating the position. */
  initializeMesh: (options?: Partial<DefaultOptions>) => {
    const neutral = getRawToken("colors.mesh.1");
    const accent = getRawToken("colors.mesh.2");
    const secondary = getRawToken("colors.mesh.3");
    const tertiary = getRawToken("colors.mesh.4");

    // Basically @ts-ignore but in a better way
    // since the module has no defined initGradient method
    get().mesh.connect("#mesh", {
      colors: [neutral, accent, secondary, tertiary],
      ...options,
    });
  },
  toggle: (state: boolean) => {
    const mesh = get().mesh;
    if (state) {
      mesh.getCanvas()!.style.display = "";
    } else {
      mesh.getCanvas()!.style.display = "none";
    }
  },
}));

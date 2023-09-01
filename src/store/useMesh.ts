import { getRawToken } from "@/utils/css";
import { Gradient } from "@/utils/mesh/gradient";
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
  initializeMesh: () => {
    const neutral = getRawToken("colors.mesh.1");
    const accent = getRawToken("colors.mesh.2");

    // Basically @ts-ignore but in a better way
    // since the module has no defined initGradient method
    get().mesh.connect("#mesh", {
      colors: [neutral, neutral, neutral, accent]
    });
  },
}));

import { Gradient } from "@/utils/mesh";
import { mesh } from "@styles/recipes";
import { create } from "zustand";

/**
 * Mesh store to interact with background from any part of the app.
 *
 * @return {MeshStore} The created mesh store.
 */
export const useMesh = create<MeshStore>((set, get) => ({
  /** Set onLoad callback and reinit gradient instance */
  setOnLoad: (onLoad) =>
    set((state) => ({ ...state, mesh: new Gradient(onLoad) })),
  /** Mesh Gradient class, is type of any because module needs ts rewrite. */
  mesh: new Gradient(() => {}),
  /** Mesh className in case it is needed to manipulate with canvas element. */
  className: mesh(),
  /** Initializes the mesh without updating the position. */
  initializeMesh: () => {
    const selector = get().className;

    // Basically @ts-ignore but in a better way
    // since the module has no defined initGradient method
    (get().mesh as any).initGradient(`.${selector}`);
  },
}));

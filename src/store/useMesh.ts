import { Gradient } from "@/utils/mesh";
import { mesh } from "@styles/recipes";
import { create } from "zustand";

/**
 * Mesh store to interact with background from any part of the app.
 *
 * @param {() => void} [onLoad] - An optional callback function that is called when the mesh is loaded.
 * @return {MeshStore} The created mesh store.
 */
export const useMesh = (onLoad?: () => void) =>
  create<MeshStore>((_, get) => ({
    /** Mesh Gradient class, is type of any because module needs ts rewrite */
    mesh: new Gradient(onLoad ?? (() => {})),
    /** Mesh className in case it is needed to manipulate with canvas element, " mesh" */
    className: mesh(),
    /** Initializes the mesh without updating the position */
    initializeMesh: () => {
      const selector = get().className;

      // Basically @ts-ignore but in a better way
      // since the module has no defined initGradient method
      // Slice first character because of panda-css bug returning " mesh"
      (get().mesh as any).initGradient(`.${selector.slice(1)}`);
    },
  }))();

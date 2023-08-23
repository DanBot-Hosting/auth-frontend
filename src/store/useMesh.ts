import { Gradient } from "@/utils/mesh";
import { mesh } from "@styles/recipes";
import { create } from "zustand";

interface MeshStore {
  mesh: Gradient;
  className: string;
  initializeMesh: () => void;
}

export const useMesh = (onLoad?: () => void) =>
  create<MeshStore>((_, get) => ({
    mesh: new Gradient(onLoad ?? (() => {})),
    className: mesh(),
    initializeMesh: () => {
      const selector = get().className;

      // Basically @ts-ignore but in a better way
      // since the module has no defined initGradient method
      // Slice first character because of panda-css bug returning " mesh"
      (get().mesh as any).initGradient(`.${selector.slice(1)}`);
    },
  }))();

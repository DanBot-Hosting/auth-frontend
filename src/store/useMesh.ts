import { getRawToken } from "@/utils/css";
import { Gradient } from "@/utils/mesh";
import { create } from "zustand";

/**
 * Mesh store to interact with background from any part of the app.
 *
 * @return {MeshStore} The created mesh store.
 */
export const useMesh = create<MeshStore>((set, get) => ({
  /** Options for the mesh. */
  options: {},
  /** Customize Gradient options. */
  setOptions: (options) =>
    set((state) => ({
      ...state,
      options,
    })),
  /** Destroys the mesh class instance. */
  destroy: () => set((state) => ({ ...state, mesh: null })),
  /** Redefines the mesh. */
  define: () => set((state) => ({ ...state, mesh: new Gradient(get().options) })),
  /** Mesh Gradient class. */
  mesh: null,
  /** Canvas query selector */
  canvas: "#mesh",
  /** Initializes the mesh without updating the position. */
  initialize: (options?: Partial<DefaultOptions>) => {
    const { mesh, canvas } = get();

    const neutral = getRawToken("colors.mesh.1");
    const accent = getRawToken("colors.mesh.2");
    const secondary = getRawToken("colors.mesh.3");
    const tertiary = getRawToken("colors.mesh.4");

    mesh?.connect(canvas, {
      colors: [neutral, accent, secondary, tertiary],
      ...options,
    });
  },
  /**
   * Toggles the background visibility.
   *
   * @param {boolean} state - The state to toggle.
   */
  toggle: (state: boolean) => {
    const { mesh, define, destroy, initialize, canvas } = get();
    const element = document.querySelector(canvas) as HTMLElement;

    if (state) {
      define();
      element!.style.display = "";
      initialize();
    } else {
      if (!mesh) return;
      element!.style.display = "none";
      destroy();
    }
  },
  /** Redraws a frame for background. */
  redraw: () => {
    const { mesh } = get();
    if (!mesh) return;

    const neutral = getRawToken("colors.mesh.1");
    const accent = getRawToken("colors.mesh.2");
    const secondary = getRawToken("colors.mesh.3");
    const tertiary = getRawToken("colors.mesh.4");

    mesh.options.colors = [neutral, accent, secondary, tertiary];
    mesh.reinit();
  },
}));

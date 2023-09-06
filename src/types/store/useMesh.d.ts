interface MeshStore {
  options: Partial<DefaultOptions>;
  setOptions: (options: Partial<DefaultOptions>) => void;
  destroy: () => void;
  define: () => void;
  mesh: import("@/utils/mesh/gradient").Gradient | null;
  canvas: string;
  initialize: (options?: Partial<DefaultOptions>) => void;
  toggle: (state: boolean) => void;
  redraw: () => void;
}

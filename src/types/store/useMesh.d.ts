interface MeshStore {
  setOptions: (options: Partial<DefaultOptions>) => void;
  mesh: import("@/utils/mesh/gradient").Gradient;
  initializeMesh: (options?: Partial<DefaultOptions>) => void;
  toggle: (state: boolean) => void;
}
interface MeshStore {
  mesh: import("@/utils/mesh/gradient").Gradient;
  initializeMesh: () => void;
  setOptions: (options: Partial<DefaultOptions>) => void;
}
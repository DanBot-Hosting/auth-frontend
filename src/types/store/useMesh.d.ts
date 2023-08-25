interface MeshStore {
  mesh: import("@/utils/mesh").Gradient;
  className: string;
  initializeMesh: () => void;
}
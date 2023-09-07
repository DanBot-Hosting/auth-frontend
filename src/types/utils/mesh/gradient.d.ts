interface ShaderFiles {
  fragment: string;
  vertex: string;
  blend: string;
  noise: string;
}

interface Uniforms {
  u_time: import("@/utils/mesh/uniform").Uniform;
  u_shadow_power: import("@/utils/mesh/uniform").Uniform;
  u_darken_top: import("@/utils/mesh/uniform").Uniform;
  u_active_colors: import("@/utils/mesh/uniform").Uniform;
  u_global: import("@/utils/mesh/uniform").Uniform;
  u_vertDeform: import("@/utils/mesh/uniform").Uniform;
  u_baseColor: import("@/utils/mesh/uniform").Uniform;
  u_waveLayers: import("@/utils/mesh/uniform").Uniform;
}

interface DefaultOptions {
  colors: string[];
  wireframe: boolean;
  density: number[];
  angle: number;
  amplitude: number;
  static: boolean;
  loadedClass: string;
  onLoad: () => void;
  zoom: number;
  speed: number;
  rotation: number;
}

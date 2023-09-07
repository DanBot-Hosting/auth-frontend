interface UseMouseLocation {
  detect: (event: MouseEvent) => MouseLocation;
}

interface MouseLocation {
  position: { x: number; y: number };
  direction: { x: "left" | "right"; y: "top" | "bottom" };
}

interface MouseDirection {
  x: "left" | "right";
  y: "top" | "bottom";
}

interface MousePosition {
  x: number;
  y: number;
}

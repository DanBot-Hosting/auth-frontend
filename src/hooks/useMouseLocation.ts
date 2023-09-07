import { useCallback } from "react";

/**
 * A hook that provides access to mouse location in client components.
 * 
 * @returns {UseMouseLocation} Detect callback to return client x & y with direction
 */
export function useMouseLocation(): UseMouseLocation {
  const detect = useCallback((event: MouseEvent) => {
    const position: MousePosition = { x: event.clientX, y: event.clientY };
    const direction: MouseDirection = { x: "left", y: "top" };

    if (position.x > window.innerWidth / 2) {
      direction.x = "right";
      position.x = window.innerWidth - position.x;
    };
    if (position.y > window.innerHeight / 2) {
      direction.y = "bottom";
      position.y = window.innerHeight - position.y;
    };

    // Fix overflow
    if (position.x < 0) position.x = 0;
    if (position.y < 0) position.y = 0;

    return { position, direction };
  }, []);

  return { detect };
}

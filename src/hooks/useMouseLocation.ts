import { useCallback } from "react";

/**
 * A hook that provides access to mouse location in client components.
 * 
 * @returns {UseMouseLocation} Detect callback to return client x & y with direction
 */
export function useMouseLocation(): UseMouseLocation {
  const detect = useCallback((event: MouseEvent, target: HTMLElement) => {
    const position: MousePosition = { x: event.clientX, y: event.clientY };
    const direction: MouseDirection = { x: "left", y: "top" };

    if (window.innerWidth - position.x < target.offsetWidth) {
      direction.x = "right";
      position.x = window.innerWidth - position.x;
    };
    if (window.innerHeight - position.y < target.offsetHeight) {
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

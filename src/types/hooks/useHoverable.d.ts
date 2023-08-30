interface UseHoverableProps {
  children: (HTMLElement | null)[];
  hoverable: HTMLElement | null;
}

interface UseHoverable {
  position: HoverablePosition;
  find: () => void;
  hide: () => void;
  set: (element: HTMLElement) => void;
  change: (element: HTMLElement) => void;
  init: () => void;
  watch: () => void;
}

interface HoverablePosition {
  width: number;
  height: number;
  translation: [number, number];
}

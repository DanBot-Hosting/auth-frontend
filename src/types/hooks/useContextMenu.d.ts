interface UseContextMenu {
  detect: UseMouseLocation["detect"];
  show: (event: MouseEvent) => false;
  hide: () => void;
  init: (target?: HTMLElement) => void;
}

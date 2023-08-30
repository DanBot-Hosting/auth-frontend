// Clear transitions
// apply the "transition: none" rule immediately
export function flush(element: HTMLElement) {
  // By reading the offsetHeight property, we are forcing
  // the browser to flush the pending CSS changes (which it
  // does to ensure the value obtained is accurate).
  element.offsetHeight;
};

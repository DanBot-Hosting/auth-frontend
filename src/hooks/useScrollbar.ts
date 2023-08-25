"use client";

import { useCallback, useMemo } from "react";

// Do not place functions inside or for some reason show & hide
// will be using different functions
function preventDefault(event: Event) {
  event.preventDefault();
}

function preventDefaultKeys(event: KeyboardEvent) {
  // Keys that should be ignored
  const keys = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  if (keys.indexOf(event.code) !== -1) event.preventDefault();
}

/**
 * Hook that provides limited ways to interact with scrollbar via javascript.
 * Won't disable scrolling for interacting with scrollbar.
 * Hopefully you hide it with Overlay ;)
 * `scrollbar-gutter` doesn't work in Safari so we're not able to make it css-only without hardcode shifting
 * 
 * @see {@link https://bugs.webkit.org/show_bug.cgi?id=167335 bug 167335}
 * @returns {{ lock: () => void, unlock: () => void }} An object containing the show and hide functions.
 */
export function useScrollbar() {
  // Events that should be disabled
  const events = useMemo(
    () => ["DOMMouseScroll", "wheel", "mousewheel", "touchmove"],
    []
  );

  /**
   * Unlocks the usage of scrollbar if it was locked by the hook method.
   * 
   * @returns {void}
   */
  const unlock = useCallback(() => {
    for (let event of events) {
      document.body.removeEventListener(event, preventDefault);
    }

    document.body.removeEventListener("keydown", preventDefaultKeys, false);
  }, [events]);

  /**
   * Locks the usage of scrollbar by removing wheel, touchmove events & block some keys.
   * Won't disable scrolling for interacting with scrollbar.
   * 
   * @returns {void}
   */
  const lock = useCallback(() => {
    // Disable passive to not ignore preventDefault()
    for (let event of events) {
      document.body.addEventListener(event, preventDefault, { passive: false });
    }

    document.body.addEventListener("keydown", preventDefaultKeys, false);
  }, [events]);

  return { unlock, lock };
}

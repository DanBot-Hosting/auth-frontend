"use client";

/**
 * scrollbar-gutter doesn't work in Safari so we're not able to make it css-only without hardcode shifting
 * @see {@link https://bugs.webkit.org/show_bug.cgi?id=167335 bug 167335}
 */
export function useScrollbar() {
  // Keys that should be ignored
  const keys = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
  // Events that should be disabled
  const events = ["DOMMouseScroll", "wheel", "mousewheel", "touchmove"];

  function preventDefault(event: Event) {
    event.preventDefault();
  }

  function show() {
    for (let event of events) {
      document.body.removeEventListener(event, preventDefault);
    }

    document.body.removeEventListener(
      "keydown",
      (event) => {
        if (keys.indexOf(event.code) !== -1) event.preventDefault();
      },
      false
    );
  }

  function hide() {
    // Disable events, scrollbar on the other hand is still interactable
    // Hopefully you hide it with Overlay ;)
    // Disable passive to not ignore preventDefault()
    for (let event of events) {
      document.body.addEventListener(event, preventDefault, { passive: false });
    }

    document.body.addEventListener(
      "keydown",
      (event) => {
        if (keys.indexOf(event.code) !== -1) event.preventDefault();
      },
      false
    );
  }

  return { show, hide };
}

"use client";

/**
 * scrollbar-gutter doesn't work in Safari so we're not able to make it css-only without hardcode shifting
 * @see {@link https://bugs.webkit.org/show_bug.cgi?id=167335 bug 167335}
 */
export function useScrollbar() {
  // Keys that should be ignored
  const keys = ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];

  function show() {
    document.body.removeEventListener(
      "keydown",
      (event) => {
        if (keys.indexOf(event.code) !== -1) event.preventDefault();
      },
      false
    );
  }

  function hide() {
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

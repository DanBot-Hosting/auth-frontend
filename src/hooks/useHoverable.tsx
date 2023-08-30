"use client";
import { flush } from "@/utils/css";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * A hook that that provides specific use only methods
 * to work with a hover container that follows one of the children.
 *
 * @param {UseHoverableProps} props - Required props to create the hoverable container.
 * @param {(HTMLElement | null)[]} props.children - The children for the hoverable container that should be watched.
 * Requires additional control events to work.
 * @param {HTMLElement | null} props.hoverable - The element that should be manipulated.
 * @returns {UseHoverable} - An object containing the following functions: position, find, hide, set, change, init, and watch.
 */
export function useHoverable({
  children,
  hoverable,
}: UseHoverableProps): UseHoverable {
  const [position, setPosition] = useState<HoverablePosition>({
    width: 0,
    height: 0,
    // translation X and Y
    translation: [0, 0],
  });
  const timer = useRef<number | null>(null);
  const hidden = useRef(true);

  /** Changes the position of the hoverable via inline styles */
  const watch = useCallback(() => {
    if (!hoverable) return;

    hoverable.style.left = `${position.translation[0]}px`;
    hoverable.style.top = `${position.translation[1]}px`;
    hoverable.style.width = `${position.width}px`;
    hoverable.style.height = `${position.height}px`;
  }, [hoverable, position]);

  /** Initializes the hoverable by setting some inline styles */
  const init = useCallback(() => {
    if (!hoverable) return;

    const element = children.find(
      (child) => !!child?.getAttribute("data-active-hoverable")
    );

    if (!element) hoverable.style.opacity = "0";

    watch();
  }, [hoverable, watch, children]);

  // Initialize only when the hoverable is present
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(init, [hoverable]);

  // Watch the position of the hoverable and change inline styles
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(watch, [position]);

  /** Resets the position of the hoverable. */
  const hide = useCallback(() => {
    if (!hoverable) return;

    for (let child in children) {
      children[child]?.removeAttribute("data-active-hoverable");
    }

    hoverable.style.opacity = "0";

    timer.current = window.setTimeout(() => {
      hidden.current = true;
      timer.current = null;
    }, 200);
  }, [children, hoverable]);

  /**
   * Updates the position of the hoverable depending on the element.
   *
   * @param {HTMLAnchorElement} element - The element to update the position to.
   */
  const set = useCallback(
    (element: HTMLElement) => {
      if (timer.current) {
        window.clearTimeout(timer.current);
        hidden.current = false;
      }
      // The order is important
      if (hoverable) {
        hoverable.style.transition = "";
        if (hidden.current) {
          hoverable.style.transition = "opacity .2s ease-in-out";
          // apply the "transition: opacity .2s ease-in-out" rule immediately
          flush(hoverable);
        }
        hoverable.style.opacity = "1";
      }

      setPosition({
        width: element?.offsetWidth ?? 0,
        height: element?.offsetHeight ?? 0,
        translation: [element?.offsetLeft ?? 0, element?.offsetTop ?? 0],
      });
    },
    [hoverable]
  );

  /**
   * Permanently changes the position of the hoverable.
   * Can be overriden by another set & change call.
   *
   * @param {HTMLAnchorElement} element - The element to update the position to.
   */
  const change = useCallback(
    (element: HTMLElement) => {
      set(element);
      for (let child in children) {
        children[child]?.removeAttribute("data-active-hoverable");
      }

      hidden.current = false;
      element.setAttribute("data-active-hoverable", "true");
    },
    [children, set]
  );

  /** Finds & returns the position of the hoverable. */
  const find = useCallback(() => {
    const element = children.find(
      (child) => !!child?.getAttribute("data-active-hoverable")
    );

    if (!element) return hide();

    set(element);
  }, [set, hide, children]);

  return {
    position,
    find,
    hide,
    set,
    change,
    init,
    watch,
  };
}

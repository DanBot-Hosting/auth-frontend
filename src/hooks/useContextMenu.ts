import { useMouseLocation } from "@/hooks/useMouseLocation";
import { useScrollbar } from "@/hooks/useScrollbar";
import { clearInlineStyles } from "@/utils/css";
import { useCallback } from "react";

/**
 * Context menu to convert an element into a context menu.
 * 
 * @param {React.MutableRefObject<HTMLDivElement | null>} contextMenu - The ref to the element that has to be manipulated.
 * @returns {UseContextMenu} An object containing initializer callback and additional manipulation methods.
 */
export function useContextMenu(
  contextMenu: React.MutableRefObject<HTMLDivElement | null>
): UseContextMenu {
  const { detect } = useMouseLocation();
  const { lock, unlock } = useScrollbar();

  const hide = useCallback(() => {
    // mouse down over scroll element
    contextMenu.current?.removeAttribute("data-active");
    unlock();
  }, [contextMenu, unlock]);

  const mousedown = useCallback((event: MouseEvent) => {
    // Without the use of stopPropagation as it's not recommended
    if (contextMenu.current?.contains(event.target as Node)) return;
    if (contextMenu.current?.isEqualNode(event.target as Node)) return;

    hide();
  }, [contextMenu, hide]);

  const show = useCallback(
    (event: MouseEvent) => {
      if (!contextMenu.current) return false;
      event.preventDefault();

      const value = detect(event, contextMenu.current);

      clearInlineStyles(contextMenu.current);

      contextMenu.current.style[value.direction.x] = `${value.position.x}px`;
      contextMenu.current.style[value.direction.y] = `${value.position.y}px`;
      contextMenu.current.setAttribute("data-active", "");

      lock();

      // Do not open default context menu
      return false;
    },
    [contextMenu, detect, lock]
  );

  const init = useCallback((target?: HTMLElement) => {
    document.body.addEventListener("mousedown", mousedown);
    target?.addEventListener("contextmenu", show);

    document.addEventListener("keyup", (event) => {
      if (event.key === "Escape") hide();
    });

  }, [hide, mousedown, show]);

  return { detect, show, hide, init };
}

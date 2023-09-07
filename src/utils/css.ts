import { Token, token } from "@styles/tokens";

/**
 * Flushes any pending CSS changes
 * E.g. it may refresh transitions immediately if property is reset
 * which it does to ensure the value obtained is accurate
 *
 * @param {HTMLElement} element - The element's css changes to flush
 * @returns {void}
 */
export function flush(element: HTMLElement) {
  element.offsetHeight;
}

/**
 * Clears any inline CSS style changes
 *
 * @param {HTMLElement} element - The element's css changes to clear
 * @returns {void}
 */
export function clearInlineStyles(element: HTMLElement) {
  element.style.cssText = "";
}

/**
 * Removes the additional var() syntax and returns "--varname" string
 *
 * @param cssVar - The css variable with var() syntax
 * @returns {string} The css variable name as "--varname"
 */
export function normalizeVar(cssVar: string): string {
  return cssVar.slice(4).slice(0, -1);
}

/**
 * Get raw token value from token that returns var.
 * Panda returns "var(--color)" for both token() & token.var() method
 * if there are themes/conditions.
 *
 * @param {Token} name - The token name
 * @returns {string} The token value
 */
export function getRawToken(name: Token): string {
  const style = getComputedStyle(document.documentElement);

  return style.getPropertyValue(normalizeVar(token(name)));
}

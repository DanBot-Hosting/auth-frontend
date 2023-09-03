"use client";
import { useCallback } from "react";

/**
 * A hook that provides access to cookies in client components of React.
 * For server components use next/headers `cookies`.
 *
 * @returns {UseCookies} An object with `get` and `set` functions for cookies.
 */
export function useCookies(): UseCookies {
  /**
   * Getter function to find a cookie. Returns first matching cookie.
   *
   * @param {string} key - The name of the cookie to find.
   * @returns {string} The value of the cookie.
   */
  const get = useCallback((key: string) => {
    // Server does not have document defined in build time
    // get() method is called on page load in root layout
    if (typeof document === "undefined") return;
    let cookies = document.cookie.split(/;\s*/);

    for (let cookie of cookies) {
      let map = cookie.split("=");
      let name = decodeURIComponent(map[0]);
      if (name === key) return decodeURIComponent(map[1]);
    }
  }, []);

  /**
   * Setter function to set a cookie.
   *
   * @param {string} key - The name of the cookie.
   * @param {string} value - The value of that cookie.
   * @param {SetOptions} opts - Options for the cookie.
   * @returns {string} The value of the cookie.
   */
  const set = useCallback(
    (key: string, value: string, opts: SetOptions = {}) => {
      let result = encodeURIComponent(key) + "=" + encodeURIComponent(value);

      if (opts.expires) result += "; expires=" + opts.expires;
      if (opts.path) result += "; path=" + encodeURIComponent(opts.path);
      else result += "; path=/";
      if (opts.domain) result += "; domain=" + encodeURIComponent(opts.domain);
      if (opts.secure) result += "; secure";

      console.log(result);

      document.cookie = result;

      return result;
    },
    []
  );

  return { get, set };
}

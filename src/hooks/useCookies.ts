"use client";
import { useCallback } from "react";

interface SetOptions {
  expires?: string;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export function useCookies() {
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

  const set = useCallback(
    (key: string, value: string, opts: SetOptions = {}) => {
      let result = encodeURIComponent(key) + "=" + encodeURIComponent(value);

      if (opts.expires) result += "; expires=" + opts.expires;
      if (opts.path) result += "; path=" + encodeURIComponent(opts.path);
      if (opts.domain) result += "; domain=" + encodeURIComponent(opts.domain);
      if (opts.secure) result += "; secure";

      document.cookie = result;

      return result;
    },
    []
  );

  return { get, set };
}

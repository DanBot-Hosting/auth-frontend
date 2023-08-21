interface SetOptions {
  expires?: string;
  path?: string;
  domain?: string;
  secure?: boolean;
}

export function useCookies() {
  function get(key: string) {
    if (typeof document === "undefined") return "dark";
    let cookies = document.cookie.split(/;\s*/);

    for (let cookie of cookies) {
      let map = cookie.split("=");
      let name = decodeURIComponent(map[0]);
      if (name === key) return decodeURIComponent(map[1]);
    }
  }

  function set(key: string, value: string, opts: SetOptions = {}) {
    let result = encodeURIComponent(key) + "=" + encodeURIComponent(value);

    if (opts.expires) result += "; expires=" + opts.expires;
    if (opts.path) result += "; path=" + encodeURIComponent(opts.path);
    if (opts.domain) result += "; domain=" + encodeURIComponent(opts.domain);
    if (opts.secure) result += "; secure";

    document.cookie = result;

    return result;
  }
  return { get, set };
}

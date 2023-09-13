import { FlagIconIN, FlagIconRU, FlagIconTR, FlagIconUS } from "@flagkit/react";
import { css } from "@styles/css";
import { use } from "react";

const icon = css({
  borderRadius: "0.125rem",
});

// export const locale = ["en", "ru", "hi", "tr"] as const;
export const locale = [
  {
    locale: "en",
    icon: <FlagIconUS size={14} className={icon} />,
    label: "English",
  },
  {
    locale: "ru",
    icon: <FlagIconRU size={14} className={icon} />,
    label: "Russian",
  },
  // {
  //   locale: "hi",
  //   icon: <FlagIconIN size={14} className={icon} />,
  //   label: "Hindi"
  // },
  // {
  //   locale: "tr",
  //   icon: <FlagIconTR size={14} className={icon} />,
  //   label: "Turkish"
  // },
] as const;

/**
 * Retrieves the dictionary for a given locale and path.
 *
 * @param {Locale} locale - The locale for the dictionary.
 * @param {string | string[]} path - The path to the dictionary file.
 * @returns {Promise<any>} A promise that resolves to the dictionary object.
 */
export function translate<T extends Dictionary.Imports = Dictionary.Imports>(
  path: T,
  locale: Locale
): Dictionary.Return<T> {
  return use(
    import(`@/utils/dictionary/${locale}/${path}.json`).then(
      (module) => module.default
    )
  );
}

/**
 * Parses the accept language string and returns an array of Language objects.
 *
 * @param {string} [acceptLanguage=""] - The accept language string to parse. If not provided, an empty string is used.
 * @return {Language[]} An array of Language objects representing the parsed accept language string. If the acceptLanguage parameter is empty or invalid, an empty array is returned.
 */
export function parseAcceptLanguage(acceptLanguage?: string): Language[] {
  const regex =
    /((([a-zA-Z]+(-[a-zA-Z0-9]+){0,2})|\*)(;q=[0-1](\.[0-9]+)?)?)*/g;

  const strings = (acceptLanguage || "").match(regex);
  return strings
    ?.map((m: string) => {
      const bits = m.split(";");
      const ietf = bits[0].split("-");
      const hasScript = ietf.length === 3;

      return {
        code: ietf[0],
        script: hasScript ? ietf[1] : null,
        region: hasScript ? ietf[2] : ietf[1],
        quality: bits[1] ? parseFloat(bits[1].split("=")[1]) : 1.0,
      };
    })
    .sort((a, b) => {
      return b.quality - a.quality;
    }) as Language[];
}

/**
 * Retrieves the preferred locale from a list of supported locales based on the accept language header.
 *
 * @param {string | Language[]} acceptLanguage - The accept language header or an array of language objects.
 * @param {T[]} supportedLanguages - An array of supported language objects.
 * @param {PickOptions} [options] - Optional parameters for customizing the language matching algorithm.
 * @returns {T | null} - The preferred locale or null if no matching locale is found.
 */
export function getPreferredLocale<T extends Locale>(
  acceptLanguage: string | Language[],
  supportedLanguages: T[],
  options?: PickOptions
): T | null {
  options = options || {};

  if (!supportedLanguages || !supportedLanguages.length || !acceptLanguage)
    return null;

  if (typeof acceptLanguage === "string") {
    acceptLanguage = parseAcceptLanguage(acceptLanguage);
  }

  const supported = supportedLanguages.map((support) => {
    const bits = support.split("-");
    const hasScript = bits.length === 3;

    return {
      code: bits[0],
      script: hasScript ? bits[1] : null,
      region: hasScript ? bits[2] : bits[1],
    };
  });

  for (const lang of acceptLanguage) {
    const langCode = lang.code.toLowerCase();
    const langRegion = lang.region ? lang.region.toLowerCase() : lang.region;
    const langScript = lang.script ? lang.script.toLowerCase() : lang.script;

    for (const j in supported) {
      const supportedCode = supported[j].code.toLowerCase();

      const supportedScript = supported[j].script
        ? supported[j].script?.toLowerCase()
        : supported[j].script;
      const supportedRegion = supported[j].region
        ? supported[j].region.toLowerCase()
        : supported[j].region;

      if (
        langCode === supportedCode &&
        (options.loose || !langScript || langScript === supportedScript) &&
        (options.loose || !langRegion || langRegion === supportedRegion)
      ) {
        return supportedLanguages[j];
      }
    }
  }

  return null;
}

/**
 * Normalizes a given path by removing the locale.
 *
 * @param {string} path - The path to be normalized.
 * @return {string} The normalized path.
 */
export function normalizePath(path: string): string {
  const deconstructed = path.split("/");
  // Remove first empty element & locale
  const removedLocale = deconstructed.slice(2);
  return "/" + removedLocale.join("/");
}

/**
 * Prepend the locale to the given path.
 *
 * @param {string} path - The path to prepend the locale to.
 * @param {string} [locale="en"] - The locale to prepend.
 * @return {string} - The path with the locale prepended.
 */
export function prependLocale(path: string, locale: string = "en"): string {
  // Not using URL constructor as it stops font preload script (will do font swap from times new roman)
  if (path.includes("://")) return path;
  return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
}

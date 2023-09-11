import { use } from "react";

// export const locale = ["en", "ru", "hi", "tr"] as const;
export const locale = ["en", "ru"] as const;

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

export function normalizePath(path: string): string {
  const deconstructed = path.split("/");
  // Remove first empty element & locale
  const removedLocale = deconstructed.slice(2);
  return "/" + removedLocale.join("/");
}

export function prependLocale(path: string, locale: string = "en"): string {
  if (path.includes("://")) return path;
  return `/${locale}${path.startsWith("/") ? "" : "/"}${path}`;
}

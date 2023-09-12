import { LanguagePicker } from "@/components/LanguagePicker";
import { prependLocale, locale as supportedLocales } from "@/utils/dictionary";
import { css } from "@styles/css";
import { For } from "million/react";
import Link from "next/link";

/**
 * Footer component with useful links about the service, works as a slider in Layout.
 *
 * @param {CSSObject} [props.css={}] - Custom CSS styles to be applied to the component.
 * @param {FooterLinks} props.links - Columns and their links used to render the Footer.
 * @param {React.ReactNode} [props.children] - The child components to be rendered within the Footer.
 * @param {Dictionary.Layout} props.translation - The translation dictionary for values.
 * @returns {JSX.Element} The rendered Footer component.
 */
export function Footer({
  links,
  children,
  translation,
  locale,
  css: cssProp = {},
}: FooterProps) {
  const footer = css(
    {
      display: "flex",
      padding: "5rem 0.625rem 0rem 0.625rem",
      flexDir: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "5rem",
      overflow: "hidden",
      maxH: "100vh",

      background: "pillbackground.50",

      "@media screen and (max-height: 800px) and (max-width: 650px)": {
        padding: "2rem 0.625rem",
        gap: "2rem",
      },
    },
    cssProp
  );

  const content = css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    maxW: "75rem",
    w: "100%",

    "@media screen and (max-width: 1000px)": {
      flexDir: "column",
      gap: "2rem",
    },

    "@media screen and (max-height: 800px) and (max-width: 650px)": {
      gap: "1rem",
    }
  });

  const column = css({
    display: "flex",
    padding: "0.5625rem 0.625rem",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "1.25rem",

    "@media screen and (max-width: 650px)": {
      alignItems: "center",
    },
  });

  const list = css({
    display: "flex",
    flexDir: "column",
    alignItems: "flex-start",
    gap: "0.625rem",

    "@media screen and (max-width: 650px)": {
      alignItems: "center",
    },
  });

  const footerLogo = css({
    fontSize: "12vw",
    fontWeight: "700",
    color: "text.60",
    lineHeight: "0.52381",
    userSelect: "none",
    whiteSpace: "nowrap",

    "@media screen and (min-width: 1330px)": {
      fontSize: "10.5rem",
    },

    "@media screen and (max-height: 800px) and (max-width: 650px)": {
      display: "none",
    },
  });

  const columns = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3.75rem",

    "@media screen and (max-width: 650px)": {
      flexDir: "column",
      gap: "1.5rem",
    },

    "@media screen and (max-height: 800px) and (max-width: 650px)": {
      gap: "1.4rem!",
    }
  });

  const columnTitle = css({
    color: "text.20",
    fontWeight: "300",
    fontSize: "0.875rem",
    textTransform: "uppercase",

    "@media screen and (max-width: 650px)": {
      textAlign: "center",
    },
  });

  const listItem = css({
    display: "inline-flex",
  });

  const anchor = css({
    color: "text.60",
    fontWeight: "300",
    fontSize: "0.875rem",
    transition: "color .5s ease-in-out",
    userSelect: "none",

    _hover: {
      color: "text.100",
      transition: "color .5s ease-in-out",
    },

    "@media screen and (max-width: 650px)": {
      textAlign: "center",
    },
  });

  const config = css({
    display: "flex",
    padding: "1rem 1.125rem",
    flexDir: "column",
    gap: "0.9375rem",

    "@media screen and (max-width: 650px)": {
      alignItems: "center",
    },
  });

  const motto = css({
    color: "text.90",
    fontSize: "1.125rem",
    fontWeight: "300",

    "@media screen and (max-width: 1000px)": {
      textAlign: "center",
    },
  });

  return (
    <div className={footer}>
      <div className={content}>
        <div className={config}>
          <LanguagePicker
            locale={locale}
            translation={translation.footer.languages}
            // Removing readonly
            languages={supportedLocales as unknown as LanguagePickerLanguage[]}
          />
          <span className={motto}>{translation.footer.motto}</span>
        </div>
        <div className={columns}>
          <For each={Object.keys(links)} memo>
            {(key) => (
              <div className={column}>
                <span className={columnTitle}>
                  {
                    translation.footer.categories[
                      key as keyof typeof translation.footer.categories
                    ]
                  }
                </span>
                <ul className={list}>
                  <For each={links[key]} memo>
                    {(update) => (
                      <li className={listItem}>
                        <Link
                          href={prependLocale(update.link, locale)}
                          className={anchor}
                        >
                          {
                            translation.footer.links[
                              update.label as keyof typeof translation.footer.links
                            ]
                          }
                        </Link>
                      </li>
                    )}
                  </For>
                </ul>
              </div>
            )}
          </For>
        </div>
        {children}
      </div>

      <h1 className={footerLogo}>{translation.footer.lowerCopyright}</h1>
    </div>
  );
}

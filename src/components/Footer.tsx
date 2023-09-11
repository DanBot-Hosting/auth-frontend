import { prependLocale } from "@/utils/dictionary";
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
      padding: "2.8125rem 0.625rem 0rem 0.625rem",
      flexDir: "column",
      justifyContent: "center",
      alignItems: "center",
      gap: "2.8125rem",
      overflow: "hidden",

      background: "pillbackground.50",
    },
    cssProp
  );

  const column = css({
    display: "flex",
    padding: "0.5625rem 0.625rem",
    flexDir: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "0.9375rem",

    "@media screen and (max-width: 500px)": {
      alignItems: "center",
    },
  });

  const list = css({
    display: "flex",
    flexDir: "column",
    alignItems: "flex-start",
    gap: "0.3125rem",

    "@media screen and (max-width: 500px)": {
      alignItems: "center",
    },
  });

  const footerLogo = css({
    fontSize: "12vw",
    fontWeight: 700,
    color: "text.80",
    lineHeight: "1.5625rem",
    userSelect: "none",
    whiteSpace: "nowrap",

    "@media screen and (min-width: 501px)": {
      fontSize: "4rem",
    },
  });

  const columns = css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3.75rem",

    "@media screen and (max-width: 500px)": {
      flexDir: "column",
      gap: "1.5rem",
    },
  });

  const columnTitle = css({
    color: "text.90",
    fontWeight: 300,
    fontSize: "0.875rem",
    textTransform: "uppercase",

    "@media screen and (max-width: 500px)": {
      textAlign: "center",
    },
  });

  const listItem = css({
    display: "inline-flex",
  });

  const anchor = css({
    color: "text.60",
    fontWeight: 300,
    fontSize: "0.875rem",
    transition: "color .5s ease-in-out",
    userSelect: "none",

    _hover: {
      color: "text.100",
      transition: "color .5s ease-in-out",
    },

    "@media screen and (max-width: 500px)": {
      textAlign: "center",
    },
  });

  return (
    <div className={footer}>
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
                      <Link href={prependLocale(update.link, locale)} className={anchor}>
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

      <h1 className={footerLogo}>DanBot Hosting</h1>
    </div>
  );
}

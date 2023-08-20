import { css } from "@styles/css";
import Link from "next/link";

const footer = css({
  display: "flex",
  padding: "2.8125rem 0.625rem 0rem 0.625rem",
  flexDir: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: "2.8125rem",
  overflow: "hidden",

  background: "pillbackground.10",
});

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

const links = css({
  display: "flex",
  flexDir: "column",
  alignItems: "flex-start",
  gap: "0.3125rem",

  "@media screen and (max-width: 500px)": {
    alignItems: "center",
  },
})

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

export function Footer({ footerData }: { footerData: FooterData }) {
  return (
    <div className={footer}>
      <div className={columns}>
        {Object.keys(footerData).map((key, i) => (
          <div key={i} className={column}>
            <span className={columnTitle}>{key}</span>
            <ul className={links}>
              {footerData[key as keyof FooterData].map((update, i) => (
                <li key={i} className={listItem}>
                  <Link href={update.link} className={anchor}>{update.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h1 className={footerLogo}>DanBot Hosting</h1>
    </div>
  );
}

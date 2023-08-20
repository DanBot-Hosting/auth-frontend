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
});

const links = css({
  display: "flex",
  flexDir: "column",
  alignItems: "flex-start",
  gap: "0.3125rem",
})

const footerLogo = css({
  fontSize: "4rem",
  fontWeight: 700,
  color: "text.80",
  lineHeight: "1.5625rem",
  userSelect: "none",
});

const columns = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "60px",
});

const columnTitle = css({
  color: "text.90",
  fontWeight: 300,
  fontSize: "0.875rem",
  textTransform: "uppercase",
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

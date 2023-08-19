import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { css, cx } from "@styles/css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { footerData } from "@/utils/constants";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Mesh } from "@/components/Mesh";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "DanBot Hosting",
  description: "Your free & fast hosting provider",
};

const header = css({
  position: "fixed",
  height: "auto",
  top: "1.25rem",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "3",
});

const wrapper = css({
  position: "relative",
  minHeight: "100vh",
  zIndex: "1",

  // Literally makes 200% better
  // And also is considered my personal hacky way to fix
  // "Parent element overflow hidden for position fixed child"
  clipPath: "inset(0)",

  bg: "background.100",
});

const main = css({
  paddingTop: "6.25rem",
  maxWidth: "62.5rem",
  margin: "0 auto",
  position: "relative",
  zIndex: "2",
});

const mesh = css({
  "& > canvas": {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "1",
  }
});

const footer = css({
  "& > div:nth-child(1)": {
    width: "100vw",
    position: "fixed",
    height: "auto",
    bottom: "0",
    zIndex: "0",
  },
  "& > div:nth-child(2)": {
    visibility: "hidden",
    pointerEvents: "none",
  },
});

const affix = css({
  position: "fixed",
  bottom: "1.25rem",
  left: "1.25rem",
  zIndex: "3",
});

const body = css({
  bg: "background.100",
  color: "text.100",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html lang="en" data-color-mode={theme}>
      <body className={cx(inter.className, body)}>
        <header className={header}>
          <Header />
        </header>
        <div className={wrapper}>
          <div className={mesh}>
            <Mesh />
          </div>
          <main className={main}>
            {children}
          </main>
          <div className={affix}>
            <ToggleTheme />
          </div>
        </div>
        <footer className={footer}>
          <Footer footerData={footerData} />
          <Footer footerData={footerData} />
        </footer>
      </body>
    </html>
  );
}

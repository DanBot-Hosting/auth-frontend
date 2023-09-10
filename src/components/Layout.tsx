"use client";
import { Inter } from "next/font/google";
import { css, cx } from "@styles/css";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { Footer } from "@/components/Footer";
import { ContextMenu } from "@/components/ContextMenu";
import {
  footerLinks,
  headerDropdownLinks,
  headerLinks,
} from "@/utils/constants";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Mesh } from "@/components/Mesh";
import { WebsiteLoadingOverlay } from "@/components/WebsiteLoadingOverlay";
import { NotificationProvider } from "@/components/NotificationProvider";
import { OverlayProvider } from "@/components/OverlayProvider";
import { useSettings } from "@/hooks/useSettings";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const header = css({
  position: "fixed",
  height: "auto",
  top: "1.25rem",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: "3",

  "@media screen and (max-width: 500px)": {
    top: "0.625rem",
  },
});

const progressBar = css({
  position: "absolute",
  display: "flex",
  alignItems: "flex-end",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  bottom: "0",
  left: "0",
  borderRadius: "1.25rem",
  overflow: "hidden",
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
  display: "flex",
  flexDir: "column",
  minHeight: "100vh",
  padding: "6.25rem 0.9375rem 10rem",
  maxWidth: "62.5rem",
  margin: "0 auto",
  position: "relative",
  zIndex: "2",
});

const mesh = css({
  "& > canvas": {
    position: "fixed",
    pointerEvents: "none",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "1",
  },
});

const footer = css({
  width: "100%",
  position: "sticky",
  height: "auto",
  bottom: "0",
  left: "0",
});

const affix = css({
  position: "fixed",
  bottom: "1.25rem",
  left: "1.25rem",
  zIndex: "3",
});

const scrollbar = css({
  "&::-webkit-scrollbar": {
    width: "0.5rem",
    height: "0.5rem",
  },

  "&::-webkit-scrollbar-thumb": {
    bg: "text.10",
  },

  "&::-webkit-scrollbar-track": {
    bg: "background.100",
  },

  scrollbarWidth: "thin",
  scrollbarColor: "token(colors.text.10) token(colors.background.100)",
});

const body = css({
  bg: "background.100",
  color: "text.100",

  overflow: "hidden",
  // Add scrollbar to body instead of html
  overflowY: "scroll",
  maxHeight: "100vh",

  _transitionsDisabled: {
    "& *": {
      transition: "none!",
    },
  },
});

const html = css({
  overflow: "hidden",
  maxHeight: "100vh",
  WebkitTapHighlightColor: "transparent",
});

/**
 * Layout component to interact with the DOM as client component.
 * `layout.tsx` doesn't allow the usage of client components, so we use wrapper.
 *
 * @param {React.ReactNode} [props.children] - The child components to be rendered within the layout.
 * @returns {JSX.Element} The DOM representing the layout.
 */
export function Layout({ children }: LayoutProps) {
  // Set cookies as well as inline script
  // To avoid attribute warnings
  // And document shadows
  const { get, handle } = useSettings();
  const theme = get("theme");
  const themeMode = get("theme-mode");
  const blurMode = get("blur-mode");
  const transitions = get("transitions");

  useEffect(() => handle("transitions")(), [handle]);

  return (
    <html
      lang="en"
      className={html}
      data-theme={theme}
      data-theme-mode={themeMode}
      data-blur-mode={blurMode}
      data-transitions={transitions}
    >
      <body className={cx(inter.className, scrollbar, body)}>
        <header className={header} id="header">
          <Header links={headerLinks} dropdownLinks={headerDropdownLinks}>
            <div className={progressBar}>
              <ProgressBar />
            </div>
          </Header>
        </header>
        <div className={wrapper}>
          <div className={mesh} id="background">
            <Mesh />
          </div>
          <main className={main} id="main">
            {children}
          </main>
          <div className={affix} id="toggle-theme">
            <ToggleTheme />
          </div>
        </div>
        <NotificationProvider />
        <OverlayProvider />
        <ContextMenu />
        <footer className={footer} id="footer">
          <Footer links={footerLinks} />
        </footer>
        <WebsiteLoadingOverlay />
        {/**
         * Tricky way to have themes & static site generation at the same time (no serverside)
         * @see {@link https://github.com/vercel/next.js/discussions/36502#discussioncomment-2683052 3rd party script}
         * @see {@link @/utils/settings}
         */}
        <script
          id="settings-setup"
          async
          dangerouslySetInnerHTML={{
            __html: `const cookies=document.cookie.split("; "),raw=e=>cookies.find(t=>t.startsWith(e+"=")),get=(e,t)=>{let o=raw(e);return o?o.split("=")[1]:t},set=(e,t)=>document.documentElement.dataset[e]=t;set("theme",get("theme","dbh")),set("themeMode",get("theme-mode","light")),set("blurMode",get("blur-mode","full")),set("transitions",get("transitions","true"));`,
          }}
        />
      </body>
    </html>
  );
}

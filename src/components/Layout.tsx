"use client";
import { Inter } from "next/font/google";
import { css, cx } from "@styles/css";
import { Header } from "@/components/Header";
import { ProgressBar } from "@/components/ProgressBar";
import { Footer } from "@/components/Footer";
import { footerLinks, headerLinks } from "@/utils/constants";
import { ToggleTheme } from "@/components/ToggleTheme";
import { Mesh } from "@/components/Mesh";
import {
  WebsiteLoadingOverlay,
  hiddenScrollbar,
  onWebsiteLoad,
} from "@/components/WebsiteLoadingOverlay";
import { useCookies } from "@/hooks/useCookies";
import { NotificationProvider } from "@/components/NotificationProvider";
import { OverlayProvider } from "@/components/OverlayProvider";

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

  // Add scrollbar to body instead of html
  overflowY: "scroll",
  maxHeight: "100vh",
});

const html = css({
  overflow: "hidden",
  maxHeight: "100vh",
});

/**
 * Layout component to interact with the DOM as client component.
 * `layout.tsx` doesn't allow the usage of client components, so we use wrapper.
 *
 * @param {React.ReactNode} [props.children] - The child components to be rendered within the layout.
 * @returns {JSX.Element} The DOM representing the layout.
 */
export function Layout({ children }: LayoutProps) {
  const cookieStore = useCookies();
  const theme = cookieStore.get("theme") ?? "light";

  return (
    <html lang="en" data-theme={theme} className={html}>
      <body className={cx(inter.className, scrollbar, hiddenScrollbar, body)}>
        <header className={header}>
          <Header links={headerLinks}>
            <div className={progressBar}><ProgressBar /></div>
          </Header>
        </header>
        <div className={wrapper}>
          <div className={mesh}>
            <Mesh onLoad={onWebsiteLoad} />
          </div>
          <main className={main}>{children}</main>
          <div className={affix}>
            <ToggleTheme />
          </div>
        </div>
        <NotificationProvider />
        <OverlayProvider />
        <footer className={footer}>
          <Footer links={footerLinks} />
        </footer>
        <WebsiteLoadingOverlay />
        {/**
         * Tricky way to have themes & static site generation at the same time (no serverside)
         * @see {@link https://github.com/vercel/next.js/discussions/36502#discussioncomment-2683052 3rd party script}
         */}
        <script
          id="theme-setup"
          async
          dangerouslySetInnerHTML={{
            __html: `const theme = document.cookie
          .split("; ")
          .find((row) => row.startsWith("theme="));
        const value = theme ? theme.split("=")[1] : "light";
        document.documentElement.dataset.theme = value;`,
          }}
        />
      </body>
    </html>
  );
}

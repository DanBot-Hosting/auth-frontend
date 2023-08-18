import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { css } from "@styles/css";
import { Header } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: "DanBot Hosting",
  description: "Your free & fast hosting provider",
};

const mode = css({
  bg: "background.100",
  color: "text.100",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-color-mode="dark">
      <body className={inter.className}>
        <div className={mode}>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}

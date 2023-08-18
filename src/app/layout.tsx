import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import { css } from "@styles/css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FooterData, footerData } from "@/utils/constants";

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
  const cookieStore = cookies();
  const theme = cookieStore.get("theme")?.value ?? "light";

  return (
    <html lang="en" data-color-mode={theme}>
      <body className={inter.className}>
        <div className={mode}>
          <Header />
          {children}
          <Footer footerData={footerData}/>
        </div>
      </body>
    </html>
  );
}

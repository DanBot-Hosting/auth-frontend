import "./global.css";
import type { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { getDictionary, locale } from "@/utils/dictionary";
import { use } from "react";

export const metadata: Metadata = {
  title: "DanBot Hosting",
  description: "Your free & fast hosting provider",
  icons: {
    apple: {
      url: "/favicon/apple-touch-icon.png",
      sizes: "180x180",
    },
    shortcut: "/favicon/favicon.ico",
    icon: [
      {
        url: "/favicon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/favicon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
    ],
    other: {
      url: "/favicon/safari-pinned-tab.svg",
      rel: "mask-icon",
      color: "#050505",
    },
  },
  manifest: "/favicon/site.webmanifest",
  themeColor: "#050505",
  other: {
    "msapplication-TileColor": "#050505",
    "msapplication-config": "/favicon/browserconfig.xml",
  },
};

export async function generateStaticParams() {
  return locale.map((locale) => ({ lang: locale }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const translation = use(getDictionary<[Dictionary.Layout, Dictionary.Settings.Interface]>(lang, ["layout", "settings/interface"]));
  return <Layout translation={translation} locale={lang}>{children}</Layout>;
}

import "./global.css";
import type { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { translate, locale, prependLocale } from "@/utils/dictionary";

export const metadata: Metadata = {
  title: "DanBot Hosting",
  description: "Your free & fast hosting provider",
  icons: {
    apple: {
      url: prependLocale("/favicon/apple-touch-icon.png"),
      sizes: "180x180",
    },
    shortcut: prependLocale("/favicon/favicon.ico"),
    icon: [
      {
        url: prependLocale("/favicon/favicon-32x32.png"),
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: prependLocale("/favicon/favicon-16x16.png"),
        sizes: "16x16",
        type: "image/png",
      },
    ],
    other: {
      url: prependLocale("/favicon/safari-pinned-tab.svg"),
      rel: "mask-icon",
      color: "#050505",
    },
  },
  manifest: prependLocale("/favicon/site.webmanifest"),
  themeColor: "#050505",
  other: {
    "msapplication-TileColor": "#050505",
    "msapplication-config": prependLocale("/favicon/browserconfig.xml"),
  },
};

export async function generateStaticParams() {
  return locale.map((locale) => ({ lang: locale.locale }));
}

export default function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const layout = translate("layout", lang);
  const settingsInterface = translate("settings/interface", lang);
  return (
    <Layout translation={[layout, settingsInterface]} locale={lang}>
      {children}
    </Layout>
  );
}

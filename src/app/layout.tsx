import "./global.css";
import type { Metadata } from "next";
import { Layout } from "@/components/Layout";

export const metadata: Metadata = {
  title: "DanBot Hosting",
  description: "Your free & fast hosting provider",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      {children}
    </Layout>
  );
}

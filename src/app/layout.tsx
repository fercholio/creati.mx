import type { Metadata } from "next";
import { inter, dmSans } from "@/lib/fonts";
import { metadata as siteMetadata } from "@/lib/metadata";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-sand-50 text-gray-900 min-h-screen flex flex-col">
        <JsonLd />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

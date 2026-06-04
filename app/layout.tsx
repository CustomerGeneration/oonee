import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/cookie/CookieConsent";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oonee.it"),
  title: {
    default: "oonee — Marketing Agency specializzata in Conversion Architecture",
    template: "%s — oonee",
  },
  description:
    "Non vendiamo marketing. Generiamo clienti. oonee è la marketing agency italiana specializzata in Conversion Architecture, il metodo proprietario che fa convertire davvero.",
  openGraph: {
    title: "oonee — Conversion Architecture",
    description: "Non vendiamo marketing. Generiamo clienti.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}

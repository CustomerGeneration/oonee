import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/cookie/CookieConsent";
import { COMPANY } from "@/lib/company";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const SITE = "https://www.oonee.it";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "oonee — Marketing Agency specializzata in Conversion Architecture",
    template: "%s — oonee",
  },
  description:
    "Non vendiamo marketing. Generiamo clienti. oonee è la marketing agency italiana specializzata in Conversion Architecture, il metodo proprietario che fa convertire davvero.",
  applicationName: "oonee",
  alternates: { canonical: "/" },
  openGraph: {
    title: "oonee — Conversion Architecture",
    description: "Non vendiamo marketing. Generiamo clienti.",
    type: "website",
    locale: "it_IT",
    url: SITE,
    siteName: "oonee",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630, alt: "oonee" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "oonee — Conversion Architecture",
    description: "Non vendiamo marketing. Generiamo clienti.",
    images: ["/og-default.jpg"],
  },
};

export const viewport = {
  themeColor: "#000000",
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "oonee",
  legalName: COMPANY.legalName,
  url: SITE,
  logo: `${SITE}/icon.png`,
  image: `${SITE}/og-default.jpg`,
  description:
    "Marketing agency italiana specializzata in Conversion Architecture.",
  email: COMPANY.privacyEmail,
  vatID: COMPANY.vat,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Piazza Sant'Antonio 18",
    addressLocality: "Cropalati",
    addressRegion: "CS",
    addressCountry: "IT",
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "oonee",
  url: SITE,
  inLanguage: "it-IT",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([orgJsonLd, siteJsonLd]),
          }}
        />
      </body>
    </html>
  );
}

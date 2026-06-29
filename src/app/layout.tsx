import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";
import { CookieConsentProvider } from "@/lib/cookies";
import { CookieConsent } from "@/components/CookieConsent";
import { buildRestaurantJsonLd } from "@/lib/jsonld";
import { SITE_URL, BRAND } from "@/data/socials";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Queen's Kebab Praha | Turecký kebab Žižkov, Karlín, Vršovice",
    template: "%s | Queen's Kebab Praha",
  },
  description:
    "Queen's Kebab & Grill House nabízí poctivý turecký kebab, grilované speciality, dürüm, pita kebab a box kebab na třech pobočkách v Praze.",
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  keywords: [
    "kebab Praha",
    "turecký kebab",
    "Queen's Kebab",
    "dürüm Praha",
    "Žižkov kebab",
    "Karlín kebab",
    "Vršovice kebab",
    "halal Praha",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: BRAND.name,
    title: "Queen's Kebab Praha | Turecký kebab Žižkov, Karlín, Vršovice",
    description:
      "Poctivý turecký kebab, dürüm, box a grilované speciality na třech pobočkách v Praze.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630, alt: BRAND.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Kebab Praha",
    description: "Turecký kebab, dürüm a grill v Praze.",
    images: ["/images/og.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = buildRestaurantJsonLd();
  return (
    <html lang="cs" className="scroll-smooth">
      <body className="min-h-screen bg-ink-950 text-white antialiased">
        <LanguageProvider>
          <CookieConsentProvider>
            {children}
            <CookieConsent />
          </CookieConsentProvider>
        </LanguageProvider>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LanguageProvider } from "@/lib/language";
import { CookieConsentProvider } from "@/lib/cookies";
import { CookieConsent } from "@/components/CookieConsent";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { buildRestaurantJsonLd } from "@/lib/jsonld";
import { SITE_URL, BRAND } from "@/data/socials";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Queen's Kebab Praha | Turecký kebab Karlín, Vršovice, Žižkov a Bohnice",
    template: "%s | Queen's Kebab Praha",
  },
  description:
    "Queen's Kebab & Grill House nabízí poctivý turecký kebab, grilované speciality, dürüm, pita kebab a box kebab ve čtyřech pobočkách v Praze – Karlín, Vršovice, Žižkov a Bohnice.",
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  keywords: [
    "queens kebab",
    "queen's kebab",
    "kebab Praha",
    "turecký kebab Praha",
    "kebab Karlín",
    "kebab Vršovice",
    "kebab Žižkov",
    "kebab Bohnice",
    "dürüm Praha",
    "pita kebab Praha",
    "box kebab Praha",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    alternateLocale: ["en_US"],
    url: SITE_URL,
    siteName: BRAND.name,
    title:
      "Queen's Kebab Praha | Turecký kebab Karlín, Vršovice, Žižkov a Bohnice",
    description:
      "Poctivý turecký kebab, dürüm, box a grilované speciality ve čtyřech pobočkách v Praze – Karlín, Vršovice, Žižkov a Bohnice.",
    images: [
      {
        url: "/images_optimized/fallback.jpg",
        width: 1920,
        height: 1280,
        alt: BRAND.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Queen's Kebab Praha | Turecký kebab v Praze",
    description:
      "Poctivý turecký kebab, dürüm, box a grill ve čtyřech pobočkách v Praze – Karlín, Vršovice, Žižkov a Bohnice.",
    images: ["/images_optimized/fallback.jpg"],
  },
  icons: {
    icon: [
      { url: "/logo/favicon.ico", sizes: "any" },
      { url: "/logo/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/logo/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/logo/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    apple: "/logo/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
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
            <GoogleAnalytics />
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

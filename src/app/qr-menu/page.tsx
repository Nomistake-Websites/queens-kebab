import type { Metadata, Viewport } from "next";
import { QRMenu } from "@/components/QRMenu";

export const metadata: Metadata = {
  title: "QR Menu",
  description:
    "Rychlé online menu Queen's Kebab pro zákazníky na pobočkách. Vyberte si kebab, dürüm, box, grill nebo nápoj v češtině i angličtině.",
  alternates: { canonical: "/qr-menu" },
  openGraph: {
    title: "QR Menu | Queen's Kebab Praha",
    description:
      "Naskenujte QR kód u stolu a otevřete si online menu Queen's Kebab.",
    url: "/qr-menu",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#070708",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  maximumScale: 1,
};

export default function QRMenuPage() {
  return <QRMenu />;
}

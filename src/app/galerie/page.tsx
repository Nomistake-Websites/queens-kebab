import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GalleryView } from "@/components/GalleryView";

export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotogalerie Queen's Kebab & Grill House – fotky z našich poboček, kuchyně a poctivého tureckého jídla.",
  alternates: { canonical: "/galerie" },
  openGraph: {
    title: "Galerie | Queen's Kebab Praha",
    description:
      "Fotky z poboček Queen's Kebab, kuchyně a poctivého tureckého jídla.",
    url: "/galerie",
  },
};

export default function GaleriePage() {
  return (
    <main className="bg-ink-950">
      <Header />
      <div className="pt-16 sm:pt-20">
        <GalleryView />
      </div>
      <Footer />
    </main>
  );
}

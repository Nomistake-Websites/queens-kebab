import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FullMenu } from "./FullMenu";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Prohlédněte si online menu Queen's Kebab & Grill House. Kebab, dürüm, boxy, grilované speciality, vegetariánské možnosti, přílohy a nápoje.",
  alternates: { canonical: "/menu" },
  openGraph: {
    title: "Menu | Queen's Kebab Praha",
    description:
      "Online menu Queen's Kebab & Grill House – kebab, dürüm, boxy, grill a nápoje.",
    url: "/menu",
  },
};

export default function MenuPage() {
  return (
    <main className="bg-ink-950">
      <Header />
      <div className="pt-24 sm:pt-32">
        <Suspense fallback={null}>
          <FullMenu />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}

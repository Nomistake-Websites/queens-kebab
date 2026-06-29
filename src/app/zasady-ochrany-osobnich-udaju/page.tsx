import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EMAIL, BRAND, SITE_URL } from "@/data/socials";

export const metadata: Metadata = {
  title: "Zásady ochrany osobních údajů",
  description:
    "Zásady ochrany osobních údajů Queen's Kebab & Grill House – jak nakládáme s osobními údaji a cookies.",
  alternates: { canonical: "/zasady-ochrany-osobnich-udaju" },
  robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-ink-950">
      <Header />
      <div className="pt-16 sm:pt-20">
        <section className="container-page py-16 sm:py-20 md:py-24">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-brand-red"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            Zpět na hlavní stránku
          </Link>

          <div className="mt-8 max-w-3xl">
            <span className="eyebrow">Právní informace</span>
            <h1 className="mt-3 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Zásady ochrany osobních údajů
            </h1>
            <p className="mt-4 text-base leading-relaxed text-white/65">
              Tyto zásady popisují, jak {BRAND.name} nakládá s osobními údaji
              návštěvníků webových stránek a jaké cookies používáme.
            </p>
          </div>

          <div className="mt-12 max-w-3xl space-y-10 text-sm leading-relaxed text-white/75 sm:text-base">
            <section className="space-y-3">
              <h2 className="h-display text-xl font-semibold text-white sm:text-2xl">
                1. Kdo provozuje tento web
              </h2>
              <p>
                Tyto webové stránky provozuje {BRAND.name}. V případě dotazů
                ohledně zpracování osobních údajů nás můžete kontaktovat na
                e-mailu{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-medium text-brand-red transition hover:text-brand-redSoft"
                >
                  {EMAIL}
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="h-display text-xl font-semibold text-white sm:text-2xl">
                2. Jaké údaje zpracováváme
              </h2>
              <p>
                Web slouží především k prezentaci naší nabídky a poboček.
                Pokud nás kontaktujete (např. e-mailem nebo telefonicky),
                zpracováváme údaje, které nám sami poskytnete – typicky jméno,
                e-mail nebo telefonní číslo a obsah vaší zprávy. Tyto údaje
                používáme výhradně pro vyřízení vašeho dotazu či objednávky.
              </p>
              <p>
                Objednávky přes platformy třetích stran (Wolt, Bolt Food,
                Foodora) probíhají v prostředí těchto platforem a řídí se
                jejich vlastními zásadami ochrany osobních údajů.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="h-display text-xl font-semibold text-white sm:text-2xl">
                3. Cookies
              </h2>
              <p>
                Na webu používáme následující kategorie cookies:
              </p>
              <ul className="space-y-3">
                <li className="border-l-2 border-brand-red/60 pl-4">
                  <span className="font-semibold text-white">
                    Nezbytné cookies
                  </span>{" "}
                  – nutné pro základní fungování webu a uložení vašich
                  předvoleb (například volby jazyka a nastavení cookies). Tyto
                  cookies jsou vždy aktivní a neslouží k sledování ani
                  k marketingu.
                </li>
                <li className="border-l-2 border-white/20 pl-4">
                  <span className="font-semibold text-white">
                    Analytické cookies
                  </span>{" "}
                  – pomáhají nám měřit návštěvnost (např. Google Analytics).
                  Načítají se a měří pouze tehdy, pokud k tomu udělíte souhlas.
                </li>
                <li className="border-l-2 border-white/20 pl-4">
                  <span className="font-semibold text-white">
                    Marketingové cookies
                  </span>{" "}
                  – pro případné budoucí reklamy a remarketing. Používají se
                  pouze s vaším souhlasem.
                </li>
              </ul>
              <p>
                Svůj souhlas můžete kdykoliv změnit nebo odvolat pomocí odkazu{" "}
                <span className="font-medium text-white">
                  „Nastavení cookies“
                </span>{" "}
                v patičce webu.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="h-display text-xl font-semibold text-white sm:text-2xl">
                4. Vaše práva
              </h2>
              <p>
                V souvislosti se zpracováním osobních údajů máte zejména právo na:
              </p>
              <ul className="list-disc space-y-1.5 pl-5 marker:text-brand-red">
                <li>přístup ke svým osobním údajům,</li>
                <li>opravu nepřesných nebo neúplných údajů,</li>
                <li>výmaz údajů („právo být zapomenut“),</li>
                <li>omezení zpracování,</li>
                <li>vznesení námitky proti zpracování,</li>
                <li>
                  podání stížnosti u Úřadu pro ochranu osobních údajů (ÚOOÚ).
                </li>
              </ul>
              <p>
                Pro uplatnění svých práv nás kontaktujte na{" "}
                <a
                  href={`mailto:${EMAIL}`}
                  className="font-medium text-brand-red transition hover:text-brand-redSoft"
                >
                  {EMAIL}
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="h-display text-xl font-semibold text-white sm:text-2xl">
                5. Závěr
              </h2>
              <p>
                Tyto zásady mohou být v případě potřeby aktualizovány. Aktuální
                znění je vždy dostupné na adrese{" "}
                <span className="break-all text-white/85">
                  {SITE_URL}/zasady-ochrany-osobnich-udaju
                </span>
                .
              </p>
            </section>
          </div>

          <div className="mt-14">
            <Link href="/" className="btn-primary">
              <ArrowLeft className="h-4 w-4" strokeWidth={2} />
              Zpět na hlavní stránku
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
}

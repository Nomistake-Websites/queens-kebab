"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { Logo } from "./Logo";
import { InstagramIcon, FacebookIcon } from "./icons";
import { LOCATIONS, PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL } from "@/data/locations";
import { SOCIALS, SITE_URL, BRAND } from "@/data/socials";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/5 bg-ink-950">
      <div className="container-page grid gap-12 py-16 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-white/55">
            {t(translations.footer.tagline)}
          </p>
          <p className="mt-4 text-sm text-white/55">
            <a href={`tel:${PRIMARY_PHONE_TEL}`} className="text-white hover:text-brand-red">
              {PRIMARY_PHONE_DISPLAY}
            </a>
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            {t(translations.footer.quickLinks)}
          </h3>
          <ul className="space-y-2 text-sm text-white/75">
            <li>
              <Link href="/menu" className="hover:text-white">
                {t(translations.nav.menu)}
              </Link>
            </li>
            <li>
              <Link href="/qr-menu" className="hover:text-white">
                {t(translations.nav.qrMenu)}
              </Link>
            </li>
            <li>
              <Link href="/#locations" className="hover:text-white">
                {t(translations.nav.locations)}
              </Link>
            </li>
            <li>
              <Link href="/#order" className="hover:text-white">
                {t(translations.nav.order)}
              </Link>
            </li>
            <li>
              <Link href="/#gallery" className="hover:text-white">
                {t(translations.nav.gallery)}
              </Link>
            </li>
            <li>
              <Link href="/#reviews" className="hover:text-white">
                {t(translations.nav.reviews)}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            {t(translations.footer.visit)}
          </h3>
          <ul className="space-y-3 text-sm text-white/75">
            {LOCATIONS.map((loc) => (
              <li key={loc.id}>
                <p className="flex flex-wrap items-center gap-2 font-semibold text-white">
                  {t(loc.district)}
                  {loc.comingSoon && (
                    <span className="rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cream">
                      {t(translations.common.comingSoonInline)}
                    </span>
                  )}
                </p>
                <p className="text-white/55">{loc.address}</p>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            {t(translations.footer.follow)}
          </h3>
          <div className="flex flex-col gap-2 text-sm text-white/75">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2.5 hover:text-white"
            >
              <InstagramIcon className="h-4 w-4 text-brand-red" />
              Instagram
            </a>
            <a
              href={SOCIALS.facebook}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2.5 hover:text-white"
            >
              <FacebookIcon className="h-4 w-4 text-brand-red" />
              Facebook
            </a>
            <a
              href={SITE_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2.5 hover:text-white"
            >
              <Globe className="h-4 w-4 text-brand-red" strokeWidth={1.75} />
              {BRAND.domain}
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/45 sm:flex-row">
          <p>
            © {year} {BRAND.name}. {t(translations.footer.rights)}
          </p>
          <p>
            {t({
              cs: "Vytvořeno s láskou v Praze.",
              en: "Made with love in Prague.",
            })}
          </p>
        </div>
      </div>
    </footer>
  );
}

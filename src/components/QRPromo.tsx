"use client";

import Link from "next/link";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";
import { SITE_URL } from "@/data/socials";

export function QRPromo() {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950 p-8 sm:p-12">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-red/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl"
      />
      <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div className="max-w-xl">
          <p className="eyebrow">{t(translations.sections.qrPromo.eyebrow)}</p>
          <h2 className="mt-3 h-display text-3xl font-semibold text-white sm:text-4xl">
            {t(translations.sections.qrPromo.title)}
          </h2>
          <p className="mt-3 text-white/65">{t(translations.sections.qrPromo.subtitle)}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/qr-menu" className="btn-primary">
              {t(translations.sections.qrPromo.cta)}
            </Link>
            <span
              className="inline-flex h-11 max-w-full items-center justify-center truncate rounded-full border border-white/10 bg-black/40 px-4 font-mono text-[11px] leading-none text-white/65 sm:text-xs"
              title={`${SITE_URL}/qr-menu`}
            >
              {SITE_URL}/qr-menu
            </span>
          </div>
        </div>

        {/* Stylized phone mockup */}
        <div className="relative mx-auto h-[260px] w-[180px] shrink-0 sm:h-[320px] sm:w-[220px]">
          <div className="absolute inset-0 rounded-[2rem] border-2 border-white/15 bg-black shadow-glow" />
          <div className="absolute inset-1 overflow-hidden rounded-[1.75rem] bg-ink-900 p-3">
            <div className="mx-auto h-1 w-12 rounded-full bg-white/15" />
            <div className="mt-3 flex items-center gap-2">
              <div className="h-6 w-6 rounded-full bg-brand-red" />
              <div className="h-2 w-16 rounded-full bg-white/15" />
            </div>
            <div className="mt-3 h-7 rounded-xl bg-white/5" />
            <div className="mt-3 flex gap-1.5">
              <div className="h-5 w-12 rounded-full bg-brand-red/80" />
              <div className="h-5 w-10 rounded-full bg-white/10" />
              <div className="h-5 w-8 rounded-full bg-white/10" />
            </div>
            <div className="mt-3 space-y-2">
              <div className="h-16 rounded-xl bg-gradient-to-br from-brand-red/30 to-ink-700" />
              <div className="h-16 rounded-xl bg-gradient-to-br from-ink-700 to-ink-800" />
              <div className="h-16 rounded-xl bg-gradient-to-br from-brand-gold/20 to-ink-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

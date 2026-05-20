"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { translations } from "@/data/translations";
import { GOOGLE_RATING } from "@/data/locations";

export function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] w-full items-center overflow-hidden bg-ink-950 grain-overlay"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/queens-kebab-hero.mp4" type="video/mp4" />
      </video>

      {/* Fallback / decorative gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_30%,rgba(225,10,23,0.35),transparent_55%),radial-gradient(circle_at_80%_70%,rgba(212,164,74,0.18),transparent_60%),linear-gradient(180deg,#0c0c0e_0%,#070708_60%,#0a0506_100%)]"
      />

      {/* Dark overlay */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/55 to-black/80"
      />

      <div className="container-page relative w-full pb-32 pt-24 sm:pb-32 sm:pt-32 md:pt-36">
        {/* Wrapper handles alignment: centered on mobile, left on desktop */}
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center animate-fade-up sm:mx-0 sm:items-start sm:gap-6 sm:text-left">
          {/* Eyebrow — red line both sides on mobile, only left on desktop */}
          <span className="eyebrow flex w-full items-center justify-center gap-3 sm:w-auto sm:justify-start">
            <span className="inline-block h-px w-8 flex-shrink-0 bg-brand-red" />
            <span className="whitespace-nowrap">{t(translations.hero.eyebrow)}</span>
            <span className="inline-block h-px w-8 flex-shrink-0 bg-brand-red sm:hidden" />
          </span>

          <h1 className="h-display text-[2.25rem] font-bold leading-[1.05] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t(translations.hero.title)}
            <span className="mt-3 block text-lg font-medium tracking-tight text-brand-cream/85 sm:text-2xl md:text-3xl">
              {t(translations.hero.tagline)}
            </span>
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base md:text-lg">
            {t(translations.hero.subtitle)}
          </p>

          {/* CTA buttons — narrow stack on mobile, inline on desktop */}
          <div className="mt-6 flex w-full flex-col items-center gap-2.5 sm:mt-2 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
            <Link
              href="#menu"
              className="btn-primary w-fit min-w-[260px] max-w-[90%] justify-center sm:min-w-0 sm:max-w-none"
            >
              {t(translations.hero.ctaMenu)}
            </Link>
            <Link
              href="#locations"
              className="btn-ghost w-fit min-w-[260px] max-w-[90%] justify-center sm:min-w-0 sm:max-w-none"
            >
              {t(translations.hero.ctaLocations)}
            </Link>
            <Link
              href="#order"
              className="btn-gold w-fit min-w-[260px] max-w-[90%] justify-center sm:min-w-0 sm:max-w-none"
            >
              {t(translations.hero.ctaOrder)}
            </Link>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/75 sm:mt-4 sm:justify-start sm:gap-x-5 sm:gap-y-3 sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-brand-gold text-brand-gold sm:h-4 sm:w-4"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="font-semibold text-white">
                {GOOGLE_RATING.score.toFixed(1)}
              </span>
              <span className="text-white/60">
                · {GOOGLE_RATING.reviews}+ {t(translations.common.reviewsOnGoogle)}
              </span>
            </div>
            <span className="hidden h-4 w-px bg-white/15 sm:block" />
            <span className="text-white/70">Žižkov · Karlín · Vršovice</span>
          </div>
        </div>
      </div>

      {/* Scroll cue — clearly travels almost to the bottom of the pill */}
      <a
        href="#menu"
        aria-label="Scroll down"
        className="pointer-events-auto absolute inset-x-0 bottom-5 mx-auto flex w-fit flex-col items-center gap-2 text-white/70 transition hover:text-white sm:bottom-8"
      >
        <span className="flex h-12 w-7 items-start justify-center rounded-full border border-white/30 bg-black/20 p-1.5 backdrop-blur">
          <span className="h-2 w-1 rounded-full bg-white animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}

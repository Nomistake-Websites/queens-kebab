"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { REVIEWS, GOOGLE_REVIEWS_URL, type Review } from "@/data/reviews";
import { GOOGLE_RATING } from "@/data/locations";
import { useLanguage } from "@/lib/language";
import { GoogleIcon } from "./icons";

/** Above this length the body is clamped and a Více/Méně toggle is shown. */
const LONG_TEXT = 130;

function ReviewCard({
  r,
  open,
  onToggle,
}: {
  r: Review;
  open: boolean;
  onToggle: () => void;
}) {
  const { t } = useLanguage();
  const text = t(r.body);
  const isLong = text.length > LONG_TEXT;

  return (
    <article className="card mx-3 flex min-h-[230px] w-[300px] shrink-0 flex-col gap-4 p-6 sm:w-[340px]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          {Array.from({ length: r.rating }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-brand-gold text-brand-gold"
              strokeWidth={0}
            />
          ))}
        </div>
        <GoogleIcon className="h-[18px] w-[18px]" />
      </div>

      <div className="flex flex-1 flex-col">
        <p
          className={`text-sm leading-relaxed text-white/85 transition-all ${
            open || !isLong ? "" : "line-clamp-3"
          }`}
        >
          “{text}”
        </p>
        {isLong && (
          <button
            type="button"
            onClick={onToggle}
            className="mt-2 self-start text-xs font-semibold uppercase tracking-wider text-brand-red transition hover:text-brand-redSoft"
            aria-expanded={open}
          >
            {open
              ? t({ cs: "Méně", en: "Less" })
              : t({ cs: "Více", en: "More" })}
          </button>
        )}
      </div>

      {r.aspects && (
        <p className="text-[11px] text-white/45">
          {[
            r.aspects.food != null &&
              `${t({ cs: "Jídlo", en: "Food" })}: ${r.aspects.food}/5`,
            r.aspects.service != null &&
              `${t({ cs: "Obsluha", en: "Service" })}: ${r.aspects.service}/5`,
            r.aspects.atmosphere != null &&
              `${t({ cs: "Atmosféra", en: "Atmosphere" })}: ${r.aspects.atmosphere}/5`,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between border-t border-white/5 pt-4 text-xs text-white/55">
        <span className="font-semibold text-white/90">{r.author}</span>
        {r.branch && (
          <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
            {t(r.branch)}
          </span>
        )}
      </div>
    </article>
  );
}

export function Reviews() {
  const { t } = useLanguage();
  // Track a single open card by its rendered index (only one open at a time).
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Duplicate the array so the translateX(-50%) loop is seamless
  const loop = [...REVIEWS, ...REVIEWS, ...REVIEWS, ...REVIEWS];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand-red/20 bg-gradient-to-br from-brand-red/25 via-brand-redDark/30 to-black/60 p-6 shadow-card sm:p-10">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-brand-red/40 blur-3xl"
      />

      {/* Summary header */}
      <div className="relative grid items-end gap-6 sm:grid-cols-[auto_1fr_auto] sm:gap-8">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/80">
            Google · {t({ cs: "Recenze hostů", en: "Guest reviews" })}
          </p>
          <p className="mt-2 h-display text-5xl font-semibold leading-none text-white sm:text-6xl">
            {GOOGLE_RATING.score.toFixed(1)}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-brand-gold text-brand-gold"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="text-sm text-white/80">
              {GOOGLE_RATING.reviews}+ {t(translationsReviews)}
            </span>
          </div>
        </div>
        <div className="hidden h-px w-full bg-white/10 sm:block" />
        <a
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-ghost justify-self-start text-xs sm:justify-self-end"
        >
          <GoogleIcon className="h-4 w-4" />
          {t({ cs: "Zobrazit recenze na Google", en: "See reviews on Google" })}
        </a>
      </div>

      {/* Marquee */}
      <div className="marquee group relative mt-8 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-start animate-marquee-slow group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:animate-marquee">
          {loop.map((r, i) => (
            <ReviewCard
              key={`${r.author}-${i}`}
              r={r}
              open={openIndex === i}
              onToggle={() => setOpenIndex((cur) => (cur === i ? null : i))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Keep this local since it's just one leaf used twice above
const translationsReviews = {
  cs: "ověřených recenzí",
  en: "verified reviews",
} as const;

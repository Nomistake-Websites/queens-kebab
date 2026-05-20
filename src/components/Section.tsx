"use client";

import { useLanguage } from "@/lib/language";
import type { TranslationLeaf } from "@/data/translations";
import type { ReactNode } from "react";

type Decoration = "warm" | "city";

interface SectionProps {
  id?: string;
  eyebrow?: TranslationLeaf;
  title?: TranslationLeaf;
  subtitle?: TranslationLeaf;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
  toneTop?: boolean;
  /**
   * Background decoration variant:
   *  - `warm` — soft red+gold blobs (brand atmosphere).
   *  - `city` — subtle Prague-at-night feel: dual map grid, red glow in
   *    one corner, gold in the opposite corner, vignette.
   *  - `true` is treated as `warm` for backwards compatibility.
   */
  decorated?: boolean | Decoration;
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
  align = "left",
  toneTop = false,
  decorated = false,
}: SectionProps) {
  const { t } = useLanguage();
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start";

  const variant: Decoration | null =
    decorated === true ? "warm" : decorated === false ? null : decorated;

  return (
    <section
      id={id}
      className={`relative overflow-hidden py-16 sm:py-20 md:py-28 ${className}`}
    >
      {toneTop && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
        />
      )}

      {variant === "warm" && (
        <>
          {/* Red glow — upper-left corner */}
          <div
            aria-hidden
            className="pointer-events-none absolute -left-32 -top-32 z-0 h-[420px] w-[420px] rounded-full bg-brand-red/25 blur-[120px] sm:-left-24 sm:h-[520px] sm:w-[520px]"
          />
          {/* Gold glow — lower-right corner */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-40 -right-32 z-0 h-[420px] w-[420px] rounded-full bg-brand-gold/15 blur-[120px] sm:-right-24 sm:h-[520px] sm:w-[520px]"
          />
          {/* Subtle vignette to keep text crisp */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_30%,_rgba(0,0,0,0.55)_100%)]"
          />
        </>
      )}

      {variant === "city" && (
        <>
          {/*
            City / Prague-night atmosphere.
            - Dual-density grid (major streets + minor streets) faded to centre
            - Red glow bottom-right, warm gold glow top-left (mirrored vs Why)
            - Heavier vignette to keep cards dominant
          */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.55] sm:opacity-[0.7]"
            style={{
              backgroundImage: [
                "linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)",
                "linear-gradient(rgba(255,255,255,0.022) 1px, transparent 1px)",
                "linear-gradient(90deg, rgba(255,255,255,0.022) 1px, transparent 1px)",
              ].join(","),
              backgroundSize: "96px 96px, 96px 96px, 24px 24px, 24px 24px",
              backgroundPosition: "center center",
              maskImage:
                "radial-gradient(ellipse at center, #000 35%, rgba(0,0,0,0.6) 65%, transparent 92%)",
              WebkitMaskImage:
                "radial-gradient(ellipse at center, #000 35%, rgba(0,0,0,0.6) 65%, transparent 92%)",
            }}
          />
          {/* Diagonal sweep — like a faint city light streak */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(115deg,transparent_0%,transparent_45%,rgba(255,255,255,0.025)_50%,transparent_55%,transparent_100%)]"
          />
          {/* Red pin — bottom-right */}
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -right-24 z-0 h-[380px] w-[380px] rounded-full bg-brand-red/20 blur-[110px] sm:-right-16 sm:h-[460px] sm:w-[460px]"
          />
          {/* Warm gold glow — top-left */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 -left-24 z-0 h-[340px] w-[340px] rounded-full bg-brand-gold/12 blur-[110px] sm:-left-16 sm:h-[420px] sm:w-[420px]"
          />
          {/* Soft vignette to keep edges dark and cards crisp */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_transparent_35%,_rgba(0,0,0,0.7)_100%)]"
          />
        </>
      )}

      <div className="container-page relative z-10">
        {(eyebrow || title || subtitle) && (
          <div className={`mb-10 flex max-w-3xl flex-col gap-4 ${alignment} sm:mb-14`}>
            {eyebrow && <span className="eyebrow">{t(eyebrow)}</span>}
            {title && (
              <h2 className="h-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
                {t(title)}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg">
                {t(subtitle)}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}

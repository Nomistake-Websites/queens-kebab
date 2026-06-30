"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Clock, Phone, ArrowUpRight, X } from "lucide-react";
import type { Location } from "@/data/locations";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

interface Props {
  location: Location;
  index?: number;
  /** Whether this card's photo overlay is currently open. */
  selected?: boolean;
  /** Toggle this card's photo overlay (parent enforces single-open). */
  onToggle?: () => void;
}

/** Format an E.164-ish phone for display (e.g. +420774668988 → +420 774 668 988). */
function formatPhone(raw: string): string {
  const cleaned = raw.replace(/\s+/g, "");
  const match = cleaned.match(/^(\+\d{1,3})(\d{3})(\d{3})(\d{3})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : raw;
}

export function LocationCard({ location, index, selected = false, onToggle }: Props) {
  const { t } = useLanguage();
  const coming = location.comingSoon === true;
  const hasPhoto = !coming && Boolean(location.image);

  // Clicking anywhere on the card toggles the photo — except on real
  // links/buttons, which keep their own behavior (maps, call, delivery).
  const handleCardClick = (e: React.MouseEvent) => {
    if (!hasPhoto) return;
    if ((e.target as HTMLElement).closest("a,button")) return;
    onToggle?.();
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group card relative overflow-hidden p-6 transition sm:p-7 ${
        coming
          ? "border-white/10"
          : "hover:-translate-y-1 hover:border-white/15 hover:shadow-glow"
      } ${hasPhoto ? "cursor-pointer" : ""}`}
      aria-disabled={coming || undefined}
    >
      {/* Branch photo — visible by default (darkened), a touch brighter on hover */}
      {hasPhoto && location.image && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
          <Image
            src={location.image}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover opacity-35 transition-opacity duration-500 group-hover:opacity-50"
          />
          {/* Default state prioritizes readability: dark scrim + a strong
              gradient over the text area. Photo is ~5% more visible than before
              while text stays clearly readable. */}
          <div className="absolute inset-0 bg-ink-950/62" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950/93 via-ink-950/87 to-ink-950/76" />
        </div>
      )}

      {/* Visual content — dimmed and blurred when the branch is coming soon */}
      <div
        className={`relative z-10 transition ${
          coming ? "pointer-events-none select-none opacity-40 blur-[1px] grayscale" : ""
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-red">
              {typeof index === "number" ? `0${index + 1}` : "·"} ·{" "}
              {t(location.district)}
            </span>
            <h3 className="mt-2 h-display text-xl font-semibold text-white sm:text-2xl">
              {t(location.name)}
            </h3>
          </div>
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 bg-white/5 text-white/70">
            <MapPin className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>

        <dl className="mt-5 grid gap-3 text-sm">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" strokeWidth={1.75} />
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-white/55">
                {t(translations.common.address)}
              </dt>
              <dd className="text-white/85">{location.address}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" strokeWidth={1.75} />
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-white/55">
                {t(translations.common.openingHours)}
              </dt>
              <dd className="text-white/85">{t(location.openingHours)}</dd>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" strokeWidth={1.75} />
            <div>
              <dt className="text-[11px] uppercase tracking-wider text-white/55">
                {t(translations.common.phone)}
              </dt>
              <dd>
                {coming ? (
                  <span className="text-white/85">{formatPhone(location.phone)}</span>
                ) : (
                  <a
                    href={`tel:${location.phone}`}
                    className="text-white/85 transition hover:text-brand-red"
                  >
                    {formatPhone(location.phone)}
                  </a>
                )}
              </dd>
            </div>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-2">
          {coming ? (
            <>
              <span
                aria-disabled="true"
                className="btn-ghost pointer-events-none text-xs opacity-50"
              >
                {t(translations.common.openMaps)}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </span>
              <span
                aria-disabled="true"
                className="btn-primary pointer-events-none text-xs opacity-50"
              >
                <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                {t(translations.common.callUs)}
              </span>
            </>
          ) : (
            <>
              <Link
                href={location.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-ghost text-xs"
              >
                {t(translations.common.openMaps)}
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </Link>
              <a href={`tel:${location.phone}`} className="btn-primary text-xs">
                <Phone className="h-3.5 w-3.5" strokeWidth={2} />
                {t(translations.common.callUs)}
              </a>
            </>
          )}
        </div>
      </div>

      {/* Branch photo overlay — opens on click, click again to close */}
      {hasPhoto && location.image && (
        <button
          type="button"
          onClick={onToggle}
          aria-label={t({ cs: "Skrýt fotku", en: "Hide photo" })}
          aria-pressed={selected}
          className={`absolute inset-0 z-20 block overflow-hidden rounded-2xl text-left transition-opacity duration-300 ${
            selected ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          <Image
            src={location.image}
            alt={t(location.name)}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/50 to-black/35"
          />
          <span
            aria-hidden
            className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-black/50 text-white backdrop-blur"
          >
            <X className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="absolute inset-x-0 bottom-0 p-5">
            <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-red">
              {typeof index === "number" ? `0${index + 1}` : "·"} ·{" "}
              {t(location.district)}
            </span>
            <h3 className="mt-1 h-display text-xl font-semibold text-white drop-shadow sm:text-2xl">
              {t(location.name)}
            </h3>
          </div>
        </button>
      )}

      {/* Coming-soon overlay */}
      {coming && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-ink-950/60 backdrop-blur-sm"
        >
          <span className="rounded-full border border-brand-red/40 bg-brand-red/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-glow">
            {t(translations.common.comingSoon)}
          </span>
          <span className="text-xs text-white/65">{t(location.district)}</span>
        </div>
      )}
    </article>
  );
}

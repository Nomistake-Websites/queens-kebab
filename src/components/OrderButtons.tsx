"use client";

import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import { LOCATIONS, type Location } from "@/data/locations";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

const PLATFORMS = [
  {
    id: "wolt" as const,
    label: "Wolt",
    color: "from-[#009DE0] to-[#0078b3]",
    leaf: translations.order.wolt,
  },
  {
    id: "bolt" as const,
    label: "Bolt Food",
    color: "from-[#34D186] to-[#11875b]",
    leaf: translations.order.bolt,
  },
  {
    id: "foodora" as const,
    label: "Foodora",
    color: "from-[#FF1B1C] to-[#a30810]",
    leaf: translations.order.foodora,
  },
];

export function OrderButtons() {
  const { t } = useLanguage();
  // Default to the first active (open) location so users don't land on a
  // disabled delivery panel.
  const initial = LOCATIONS.find((l) => !l.comingSoon) ?? LOCATIONS[0];
  const [active, setActive] = useState<Location>(initial);

  const activeIsComing = active.comingSoon === true;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
      <div className="card flex flex-col gap-4 p-6 sm:p-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
          {t(translations.qr.branchLabel)}
        </h3>
        <div className="flex flex-col gap-2">
          {LOCATIONS.map((loc) => {
            const isActive = active.id === loc.id;
            const isComing = loc.comingSoon === true;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setActive(loc)}
                aria-pressed={isActive}
                className={`group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-brand-red bg-brand-red/10 text-white shadow-glow"
                    : "border-white/10 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{t(loc.name)}</p>
                    {isComing && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cream">
                        <Clock className="h-2.5 w-2.5" strokeWidth={2.5} />
                        {t(translations.common.comingSoonShort)}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-white/60">{loc.address}</p>
                </div>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full transition ${
                    isActive ? "bg-white text-brand-red" : "bg-white/10 text-white/60"
                  }`}
                  aria-hidden
                >
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right column — delivery platforms (blurred when active branch is coming soon) */}
      <div className="relative">
        <div
          className={`grid gap-4 transition sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 ${
            activeIsComing ? "pointer-events-none select-none blur-sm opacity-40" : ""
          }`}
          aria-hidden={activeIsComing || undefined}
        >
          {PLATFORMS.map((p) => {
            const url = active.delivery[p.id];
            const disabled = !url;
            return (
              <a
                key={p.id}
                href={url ?? "#order"}
                target={url ? "_blank" : undefined}
                rel={url ? "noopener noreferrer" : undefined}
                aria-disabled={disabled || undefined}
                tabIndex={activeIsComing ? -1 : undefined}
                /*
                  Mobile padding stays at `p-5` (≈ 20 px). On md+ we bump
                  to `md:p-6` and on lg+ to `lg:p-7`, which makes the
                  desktop cards feel more spacious and premium without
                  resizing the mobile layout.
                */
                className={`relative flex min-h-[100px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${p.color} p-5 text-white shadow-card transition hover:shadow-glow md:min-h-[132px] md:p-6 lg:min-h-[150px] lg:p-7 ${
                  disabled ? "opacity-50 grayscale" : "hover:-translate-y-0.5"
                }`}
              >
                <div className="relative z-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {p.label}
                  </p>
                  <p className="mt-1 text-lg font-semibold md:text-xl">
                    {t(p.leaf)}
                  </p>
                  <p className="mt-1 text-xs text-white/75 md:text-sm">
                    {t(active.name)}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/20 backdrop-blur md:h-14 md:w-14"
                >
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
                </span>
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl"
                />
              </a>
            );
          })}
        </div>

        {activeIsComing && (
          <div
            role="status"
            className="absolute inset-0 flex items-center justify-center px-4"
          >
            <div className="flex max-w-md flex-col items-center gap-3 rounded-2xl border border-brand-red/30 bg-ink-900/80 px-6 py-6 text-center backdrop-blur">
              <span className="rounded-full border border-brand-red/40 bg-brand-red/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-glow">
                {t(translations.common.comingSoon)}
              </span>
              <p className="text-sm text-white/85 sm:text-base">
                {t(translations.order.comingSoonNotice)}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

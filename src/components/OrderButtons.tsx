"use client";

import { useState } from "react";
import { ArrowRight, Phone, Navigation as NavIcon } from "lucide-react";
import {
  LOCATIONS,
  PRIMARY_PHONE_DISPLAY,
  PRIMARY_PHONE_TEL,
  type Location,
} from "@/data/locations";
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
    id: "dame" as const,
    label: "Dáme jídlo",
    color: "from-[#FF1B1C] to-[#a30810]",
    leaf: translations.order.dame,
  },
];

export function OrderButtons() {
  const { t } = useLanguage();
  const [active, setActive] = useState<Location>(LOCATIONS[0]);

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
      <div className="card flex flex-col gap-4 p-6 sm:p-8">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
          {t(translations.qr.branchLabel)}
        </h3>
        <div className="flex flex-col gap-2">
          {LOCATIONS.map((loc) => {
            const isActive = active.id === loc.id;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setActive(loc)}
                className={`group flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                  isActive
                    ? "border-brand-red bg-brand-red/10 text-white shadow-glow"
                    : "border-white/10 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10"
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">{t(loc.name)}</p>
                  <p className="text-xs text-white/60">{loc.address}</p>
                </div>
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full transition ${
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

        <div className="mt-2 flex flex-col gap-2 border-t border-white/5 pt-4">
          {/* Call button — icon left, label + phone stacked on the right */}
          <a
            href={`tel:${PRIMARY_PHONE_TEL}`}
            className="action-stack-btn"
          >
            <span className="action-stack-icon">
              <Phone className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="action-stack-text">
              <span className="action-stack-label">{t(translations.order.call)}</span>
              <span className="action-stack-sub font-mono">{PRIMARY_PHONE_DISPLAY}</span>
            </span>
            <ArrowRight
              className="ml-auto h-4 w-4 shrink-0 text-white/40"
              strokeWidth={2}
            />
          </a>

          {/* Directions — same icon-left + two-line structure for alignment */}
          <a
            href={active.directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="action-stack-btn"
          >
            <span className="action-stack-icon">
              <NavIcon className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <span className="action-stack-text">
              <span className="action-stack-label">{t(translations.order.directions)}</span>
              <span className="action-stack-sub">{t(active.district)}</span>
            </span>
            <ArrowRight
              className="ml-auto h-4 w-4 shrink-0 text-white/40"
              strokeWidth={2}
            />
          </a>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
        {PLATFORMS.map((p) => {
          const url = active.delivery[p.id];
          const disabled = !url;
          return (
            <a
              key={p.id}
              href={url ?? "#order"}
              target={url ? "_blank" : undefined}
              rel={url ? "noreferrer noopener" : undefined}
              aria-disabled={disabled || undefined}
              className={`relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br ${p.color} p-5 text-white shadow-card transition hover:shadow-glow ${
                disabled ? "opacity-50 grayscale" : "hover:-translate-y-0.5"
              }`}
            >
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                  {p.label}
                </p>
                <p className="mt-1 text-lg font-semibold">{t(p.leaf)}</p>
                <p className="mt-1 text-xs text-white/75">{t(active.name)}</p>
              </div>
              <span
                aria-hidden
                className="relative z-10 grid h-12 w-12 place-items-center rounded-full bg-white/20 backdrop-blur"
              >
                <ArrowRight className="h-5 w-5" strokeWidth={2} />
              </span>
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-white/10 blur-2xl"
              />
            </a>
          );
        })}
      </div>
    </div>
  );
}

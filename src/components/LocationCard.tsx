"use client";

import Link from "next/link";
import { MapPin, Clock, Phone, ArrowUpRight } from "lucide-react";
import type { Location } from "@/data/locations";
import { PRIMARY_PHONE_DISPLAY } from "@/data/locations";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

interface Props {
  location: Location;
  index?: number;
}

export function LocationCard({ location, index }: Props) {
  const { t } = useLanguage();

  return (
    <article className="card relative overflow-hidden p-6 transition hover:-translate-y-1 hover:border-white/15 hover:shadow-glow sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-brand-red">
            {typeof index === "number" ? `0${index + 1}` : "·"} · {t(location.district)}
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
            <dt className="text-[11px] uppercase tracking-wider text-white/40">
              {t(translations.common.address)}
            </dt>
            <dd className="text-white/85">{location.address}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" strokeWidth={1.75} />
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-white/40">
              {t(translations.common.openingHours)}
            </dt>
            <dd className="text-white/85">{t(location.openingHours)}</dd>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-red" strokeWidth={1.75} />
          <div>
            <dt className="text-[11px] uppercase tracking-wider text-white/40">
              {t(translations.common.phone)}
            </dt>
            <dd>
              <a
                href={`tel:${location.phone}`}
                className="text-white/85 transition hover:text-brand-red"
              >
                {PRIMARY_PHONE_DISPLAY}
              </a>
            </dd>
          </div>
        </div>
      </dl>

      <div className="mt-6 flex flex-wrap gap-2">
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
      </div>

      {(location.delivery.wolt || location.delivery.bolt || location.delivery.dame) && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {location.delivery.wolt && (
            <a
              href={location.delivery.wolt}
              target="_blank"
              rel="noreferrer noopener"
              className="chip hover:border-white/25 hover:bg-white/10"
            >
              Wolt
            </a>
          )}
          {location.delivery.bolt && (
            <a
              href={location.delivery.bolt}
              target="_blank"
              rel="noreferrer noopener"
              className="chip hover:border-white/25 hover:bg-white/10"
            >
              Bolt Food
            </a>
          )}
          {location.delivery.dame && (
            <a
              href={location.delivery.dame}
              target="_blank"
              rel="noreferrer noopener"
              className="chip hover:border-white/25 hover:bg-white/10"
            >
              Dáme jídlo
            </a>
          )}
        </div>
      )}
    </article>
  );
}

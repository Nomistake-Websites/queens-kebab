"use client";

import { ArrowUpRight } from "lucide-react";
import { PRIMARY_PHONE_DISPLAY, PRIMARY_PHONE_TEL, LOCATIONS } from "@/data/locations";
import { SOCIALS } from "@/data/socials";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";
import { InstagramIcon, FacebookIcon } from "./icons";

export function ContactBlock() {
  const { t } = useLanguage();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="card p-6 lg:col-span-1">
        <p className="eyebrow">{t(translations.common.phone)}</p>
        <a
          href={`tel:${PRIMARY_PHONE_TEL}`}
          className="mt-2 block h-display text-3xl font-semibold text-white transition hover:text-brand-red sm:text-4xl"
        >
          {PRIMARY_PHONE_DISPLAY}
        </a>
        <p className="mt-2 text-sm text-white/55">
          {t({
            cs: "Volejte denně 10:00 – 02:00",
            en: "Call us daily 10:00 – 02:00",
          })}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost text-xs"
          >
            <InstagramIcon className="h-3.5 w-3.5" />
            Instagram
          </a>
          <a
            href={SOCIALS.facebook}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost text-xs"
          >
            <FacebookIcon className="h-3.5 w-3.5" />
            Facebook
          </a>
        </div>
      </div>

      <div className="card p-6 lg:col-span-2">
        <p className="eyebrow">{t(translations.common.address)}</p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {LOCATIONS.map((loc) => (
            <li key={loc.id} className="border-l-2 border-brand-red/60 pl-3">
              <p className="text-sm font-semibold text-white">{t(loc.name)}</p>
              <p className="text-sm text-white/65">{loc.address}</p>
              <a
                href={loc.directionsUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-red transition hover:text-brand-redSoft"
              >
                {t(translations.common.openMaps)}
                <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

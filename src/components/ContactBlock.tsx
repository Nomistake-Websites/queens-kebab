"use client";

import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { LOCATIONS } from "@/data/locations";
import { SOCIALS, EMAIL } from "@/data/socials";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";
import { InstagramIcon, FacebookIcon } from "./icons";

/** Format an E.164-ish phone for display (e.g. +420774668988 → +420 774 668 988). */
function formatPhone(raw: string): string {
  const cleaned = raw.replace(/\s+/g, "");
  const match = cleaned.match(/^(\+\d{1,3})(\d{3})(\d{3})(\d{3})$/);
  return match ? `${match[1]} ${match[2]} ${match[3]} ${match[4]}` : raw;
}

export function ContactBlock() {
  const { t } = useLanguage();
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Email + socials */}
      <div className="card p-6 lg:col-span-1">
        <p className="eyebrow">{t(translations.common.email)}</p>
        <a
          href={`mailto:${EMAIL}`}
          className="mt-2 flex items-center gap-2 break-all text-xl font-semibold text-white transition hover:text-brand-red sm:text-2xl"
        >
          <Mail className="h-5 w-5 shrink-0 text-brand-red" strokeWidth={1.75} />
          {EMAIL}
        </a>
        <p className="mt-2 text-sm text-white/55">
          {t({
            cs: "Napište nám kdykoliv, ozveme se co nejdříve.",
            en: "Email us anytime — we'll get back to you soon.",
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

      {/* Per-branch contacts: name · phone · address */}
      <div className="card p-6 lg:col-span-2">
        <p className="eyebrow">
          {t({ cs: "Pobočky a kontakty", en: "Branches & contacts" })}
        </p>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {LOCATIONS.map((loc) => {
            const coming = loc.comingSoon === true;
            return (
              <li
                key={loc.id}
                className={`border-l-2 pl-3 ${
                  coming ? "border-brand-gold/60" : "border-brand-red/60"
                }`}
              >
                <p className="text-sm font-semibold text-white">{t(loc.name)}</p>
                <p className="mt-0.5 text-sm text-white/65">{loc.address}</p>
                {coming ? (
                  <p className="mt-1 text-xs italic text-brand-cream/70">
                    ({t(translations.common.comingSoonInline)})
                  </p>
                ) : (
                  <>
                    <a
                      href={`tel:${loc.phone}`}
                      className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-white/85 transition hover:text-brand-red"
                    >
                      <Phone className="h-3.5 w-3.5 text-brand-red" strokeWidth={2} />
                      {formatPhone(loc.phone)}
                    </a>
                    <a
                      href={loc.directionsUrl}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-brand-red transition hover:text-brand-redSoft"
                    >
                      {t(translations.common.openMaps)}
                      <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
                    </a>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

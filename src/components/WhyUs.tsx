"use client";

import { Flame, Beef, MapPin, Leaf, type LucideIcon } from "lucide-react";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

const ICONS: LucideIcon[] = [Flame, Beef, MapPin, Leaf];

export function WhyUs() {
  const { t } = useLanguage();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {translations.why.items.map((item, idx) => {
        const Icon = ICONS[idx];
        return (
          <div
            key={idx}
            className="card flex flex-col gap-3 p-6 transition hover:-translate-y-1 hover:border-white/15"
          >
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-red/15 text-brand-red">
              <Icon className="h-6 w-6" strokeWidth={1.5} />
            </span>
            <h3 className="h-display text-lg font-semibold text-white">{t(item.title)}</h3>
            <p className="text-sm text-white/65">{t(item.body)}</p>
          </div>
        );
      })}
    </div>
  );
}

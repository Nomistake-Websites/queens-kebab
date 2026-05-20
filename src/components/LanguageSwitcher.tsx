"use client";

import { useLanguage } from "@/lib/language";
import type { Lang } from "@/data/translations";

interface Props {
  className?: string;
  size?: "sm" | "md";
}

export function LanguageSwitcher({ className = "", size = "md" }: Props) {
  const { lang, setLang } = useLanguage();
  const base =
    size === "sm"
      ? "h-7 px-2.5 text-[11px]"
      : "h-9 px-3 text-xs";

  const opt = (value: Lang, label: string) => {
    const active = lang === value;
    return (
      <button
        key={value}
        type="button"
        onClick={() => setLang(value)}
        aria-pressed={active}
        aria-label={`Switch language to ${label}`}
        className={`${base} font-semibold uppercase tracking-[0.18em] transition rounded-full ${
          active
            ? "bg-brand-red text-white shadow-glow"
            : "text-white/70 hover:text-white"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 backdrop-blur ${className}`}
    >
      {opt("cs", "CZ")}
      {opt("en", "EN")}
    </div>
  );
}

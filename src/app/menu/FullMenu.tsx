"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import { DishCard } from "@/components/DishCard";
import { MenuCategoryTabs } from "@/components/MenuCategoryTabs";
import {
  FOOD_IMAGE_SRCS,
  MENU_CATEGORY_ORDER,
  MENU_ITEMS,
  getBestsellers,
  type MenuCategoryId,
} from "@/data/menu";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";
import { useImagePreload } from "@/hooks/useImagePreload";

export function FullMenu() {
  const { t, lang } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<MenuCategoryId>("bestsellers");
  const [query, setQuery] = useState("");
  const hasHistoryRef = useRef(false);

  // Preload every food image immediately so category swaps and scrolling
  // feel instant. Total payload is small (12 WebPs ~ a few hundred KB).
  useImagePreload(FOOD_IMAGE_SRCS);

  useEffect(() => {
    // We can only safely use router.back() if there was a same-origin previous page.
    hasHistoryRef.current = window.history.length > 1;
  }, []);

  // Fallback target — falls back to the menu section on the landing page.
  const fallbackHref = useMemo(() => {
    const returnTo = searchParams.get("returnTo");
    if (returnTo) {
      try {
        return decodeURIComponent(returnTo);
      } catch {
        return "/#menu";
      }
    }
    const from = searchParams.get("from");
    if (from) return `/#${from}`;
    return "/#menu";
  }, [searchParams]);

  const handleBack = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Prefer browser back so we return to the exact scroll position
      if (hasHistoryRef.current && document.referrer && document.referrer.includes(window.location.host)) {
        e.preventDefault();
        router.back();
      }
      // else: let the link follow `fallbackHref`
    },
    [router],
  );

  const items = useMemo(() => {
    const base =
      category === "bestsellers"
        ? getBestsellers()
        : MENU_ITEMS.filter((i) => i.category === category);
    if (!query.trim()) return base;
    const q = query.trim().toLowerCase();
    return base.filter(
      (i) =>
        i.name[lang].toLowerCase().includes(q) ||
        i.description[lang].toLowerCase().includes(q),
    );
  }, [category, query, lang]);

  return (
    <section className="container-page pb-24">
      {/* Back link — subtle, elegant text link */}
      <Link
        href={fallbackHref}
        onClick={handleBack}
        className="group inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-brand-red"
      >
        <ArrowLeft
          className="h-4 w-4 transition group-hover:-translate-x-0.5"
          strokeWidth={2}
        />
        {t(translations.common.back)}
      </Link>

      <div className="mt-6 mb-10 flex max-w-3xl flex-col gap-4">
        <span className="eyebrow">{t(translations.sections.menuPreview.eyebrow)}</span>
        <h1 className="h-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
          {t({ cs: "Naše kompletní menu", en: "Our full menu" })}
        </h1>
        <p className="max-w-2xl text-base text-white/65 sm:text-lg">
          {t(translations.sections.menuPreview.subtitle)}
        </p>
      </div>

      <div className="sticky top-16 z-20 -mx-4 mb-8 bg-ink-950/85 px-4 py-3 backdrop-blur-xl sm:top-20 sm:rounded-2xl sm:border sm:border-white/5 sm:bg-ink-900/60 sm:px-5 sm:py-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-5">
          <div className="relative max-w-md flex-1">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(translations.qr.searchPlaceholder)}
              aria-label={t(translations.qr.searchPlaceholder)}
              className="input-dark pl-11"
            />
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              strokeWidth={2}
            />
          </div>
          <div className="flex-1">
            <MenuCategoryTabs
              categories={MENU_CATEGORY_ORDER}
              active={category}
              onSelect={setCategory}
            />
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 px-6 py-16 text-center">
          <p className="h-display text-3xl text-white">¯\\_(ツ)_/¯</p>
          <p className="text-sm text-white/60">{t(translations.qr.noResults)}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, idx) => (
            // Priority on the first 6 cards — covers the visible viewport
            // on desktop (3 cols × 2 rows) and the first ~6 on mobile too.
            <DishCard key={item.id} item={item} priority={idx < 6} />
          ))}
        </div>
      )}

      {/* Bottom return CTA */}
      <div className="mt-16 flex flex-col items-center gap-3">
        <Link
          href={fallbackHref}
          onClick={handleBack}
          className="btn-primary group min-w-[260px] justify-center"
        >
          <ArrowLeft
            className="h-4 w-4 transition group-hover:-translate-x-0.5"
            strokeWidth={2}
          />
          {t(translations.common.backToHome)}
        </Link>
      </div>
    </section>
  );
}

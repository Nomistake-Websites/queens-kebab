"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Navigation as NavIcon,
  Phone,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { DishCard } from "./DishCard";
import { MenuCategoryTabs } from "./MenuCategoryTabs";
import { BranchSelect } from "./BranchSelect";
import {
  FOOD_IMAGE_SRCS,
  MENU_ITEMS,
  MENU_CATEGORY_ORDER,
  getBestsellers,
  type MenuCategoryId,
  type MenuItem,
} from "@/data/menu";
import { LOCATIONS, PRIMARY_PHONE_TEL, type Location } from "@/data/locations";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";
import { useImagePreload } from "@/hooks/useImagePreload";

export function QRMenu() {
  const { t, lang } = useLanguage();
  const [category, setCategory] = useState<MenuCategoryId>("bestsellers");
  const [query, setQuery] = useState("");
  const [branch, setBranch] = useState<Location>(LOCATIONS[0]);

  // QR menu is mobile-first and meant to be instant — preload all food
  // images once after first paint so category switches don't stutter.
  useImagePreload(FOOD_IMAGE_SRCS);

  const items = useMemo<MenuItem[]>(() => {
    const base =
      category === "bestsellers"
        ? getBestsellers()
        : MENU_ITEMS.filter((i) => i.category === category);
    if (!query.trim()) return base;
    const q = query.trim().toLowerCase();
    return base.filter((i) => {
      const name = i.name[lang].toLowerCase();
      const desc = i.description[lang].toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [category, query, lang]);

  return (
    <div className="min-h-[100svh] bg-ink-950 pb-32">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-40 border-b border-white/5 bg-ink-950/85 backdrop-blur-xl">
        <div className="container-page flex h-14 items-center justify-between gap-3 sm:h-16">
          <Link href="/" aria-label="Queen's Kebab home" className="shrink-0">
            <Logo withWordmark={false} />
          </Link>

          {/*
            Branch selector — custom popover so we control alignment of the
            check icon and option labels on mobile (native <select> renders
            its own system UI for the option list, which can't be styled).
          */}
          <BranchSelect value={branch} onChange={setBranch} />

          <LanguageSwitcher size="sm" />
        </div>
      </header>

      {/* Hero text */}
      <section className="container-page pt-8 sm:pt-10">
        <p className="eyebrow">
          <span className="inline-block h-px w-6 bg-brand-red" />
          QR Menu
        </p>
        <h1 className="mt-3 h-display text-3xl font-semibold text-white sm:text-4xl">
          {t(translations.qr.title)}
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/65 sm:text-base">
          {t(translations.qr.subtitle)}
        </p>
      </section>

      {/*
        Sticky controls — search input + category chips.
        Sticks just below the top header (top-14 / sm:top-16).
        Mirrors the /menu page's sticky pattern so the two pages feel consistent.
      */}
      <div className="sticky top-14 z-30 mt-6 border-y border-white/5 bg-ink-950/85 backdrop-blur-xl sm:top-16">
        <div className="container-page flex flex-col gap-3 py-3 sm:py-4">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(translations.qr.searchPlaceholder)}
              className="input-dark pl-11"
              aria-label={t(translations.qr.searchPlaceholder)}
            />
            <Search
              aria-hidden
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40"
              strokeWidth={2}
            />
          </div>
          <MenuCategoryTabs
            categories={MENU_CATEGORY_ORDER}
            active={category}
            onSelect={setCategory}
          />
        </div>
      </div>

      {/* Items */}
      <section className="container-page mt-6">
        {items.length === 0 ? (
          <div className="card flex flex-col items-center gap-2 px-6 py-12 text-center">
            <p className="h-display text-2xl text-white">¯\\_(ツ)_/¯</p>
            <p className="text-sm text-white/60">{t(translations.qr.noResults)}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item, idx) => (
              // Mobile-first: priority on the first 3 cards (above the fold).
              <DishCard
                key={item.id}
                item={item}
                variant="compact"
                priority={idx < 3}
              />
            ))}
          </div>
        )}
      </section>

      {/* Review nudge */}
      <section className="container-page mt-12">
        <div className="card relative overflow-hidden p-6 sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-red/20 blur-3xl"
          />
          <div className="relative grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
            <div>
              <p className="eyebrow">Google</p>
              <h2 className="mt-2 h-display text-2xl font-semibold text-white sm:text-3xl">
                {t(translations.qr.review.title)}
              </h2>
              <p className="mt-2 text-sm text-white/70 sm:text-base">
                {t(translations.qr.review.body)}
              </p>
            </div>
            <a
              href={branch.reviewUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-primary justify-self-start sm:justify-self-end"
            >
              <Star className="h-4 w-4 fill-current" strokeWidth={0} />
              {t(translations.qr.review.cta)}
            </a>
          </div>
        </div>
      </section>

      {/*
        Sticky bottom CTA group.

        Each button uses:
          - flex-col            → icon on top, label below
          - items-center        → centres icon and label on the X axis
          - justify-center      → centres them on the Y axis inside the button
          - text-center         → centres each individual line of label text,
                                  so a wrapped two-line label ("OBJEDNAT
                                  ONLINE") stays visually balanced
          - leading-tight       → keeps wrapped lines tightly stacked
          - same py / text size → all three buttons render at identical height
      */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-white/5 bg-ink-950/95 backdrop-blur-xl">
        <div className="container-page grid grid-cols-3 gap-2 py-3 sm:gap-3">
          <a
            href={`tel:${PRIMARY_PHONE_TEL}`}
            className="btn-ghost flex-col gap-1 py-2 text-center text-[11px] leading-tight sm:text-xs"
          >
            <Phone className="h-4 w-4" strokeWidth={2} />
            <span className="block w-full text-center">
              {t(translations.qr.call)}
            </span>
          </a>
          <a
            href={branch.directionsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-ghost flex-col gap-1 py-2 text-center text-[11px] leading-tight sm:text-xs"
          >
            <NavIcon className="h-4 w-4" strokeWidth={2} />
            <span className="block w-full text-center">
              {t(translations.qr.directions)}
            </span>
          </a>
          <a
            href={
              branch.delivery.wolt ??
              branch.delivery.bolt ??
              branch.delivery.dame ??
              "#"
            }
            target="_blank"
            rel="noreferrer noopener"
            className="btn-primary flex-col gap-1 py-2 text-center text-[11px] leading-tight sm:text-xs"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={2} />
            <span className="block w-full text-center">
              {t(translations.qr.orderOnline)}
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}

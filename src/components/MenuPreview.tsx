"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { DishCard } from "./DishCard";
import { MenuCategoryTabs } from "./MenuCategoryTabs";
import {
  MENU_FILTER_ORDER,
  MENU_ITEMS,
  getBestsellers,
  type MenuCategoryId,
  type MenuItem,
} from "@/data/menu";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

/**
 * Horizontal food carousel for the landing page menu preview.
 *
 * To change which items are shown:
 *  - The carousel reads from src/data/menu.ts via getBestsellers() or
 *    MENU_ITEMS filtered by category. Edit tags / add items there.
 *  - The visible item count is determined naturally by scroll — there is
 *    no hard cap. If you'd like to limit it, slice `items` below.
 */
export function MenuPreview() {
  const { t } = useLanguage();
  const [category, setCategory] = useState<MenuCategoryId>("bestsellers");
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const items: MenuItem[] =
    category === "bestsellers"
      ? getBestsellers()
      : MENU_ITEMS.filter((i) => i.category === category);

  const updateArrows = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanPrev(scrollLeft > 4);
    setCanNext(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    // Reset scroll when switching category so users always see item 1 first
    el.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior });
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [category, updateArrows]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Roughly one card + gap. The card width is set in DishCard wrapper below.
    const amount = el.clientWidth * 0.75 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Top row: category tabs + a visible "full menu" button */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <MenuCategoryTabs
          categories={MENU_FILTER_ORDER}
          active={category}
          onSelect={setCategory}
        />
        <Link
          href="/menu"
          className="btn-ghost group shrink-0 self-start lg:self-auto"
        >
          {t(translations.sections.menuPreview.viewFullMenu)}
          <ArrowRight
            className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>

      {/* Carousel with edge fades + desktop arrows */}
      <div className="relative -mx-4 sm:mx-0">
        {/* Left fade */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-ink-950 via-ink-950/80 to-transparent transition-opacity duration-300 sm:w-16 ${
            canPrev ? "opacity-100" : "opacity-0"
          }`}
        />
        {/* Right fade — always show a hint on mobile so users sense scrollability */}
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-ink-950 via-ink-950/80 to-transparent transition-opacity duration-300 sm:w-16 ${
            canNext ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Desktop arrow buttons */}
        <button
          type="button"
          aria-label="Previous items"
          onClick={() => scrollBy(-1)}
          disabled={!canPrev}
          className={`absolute left-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/85 text-white backdrop-blur transition lg:grid ${
            canPrev ? "opacity-100 hover:bg-ink-800" : "opacity-0"
          }`}
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2} />
        </button>
        <button
          type="button"
          aria-label="Next items"
          onClick={() => scrollBy(1)}
          disabled={!canNext}
          className={`absolute right-2 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-ink-900/85 text-white backdrop-blur transition lg:grid ${
            canNext ? "opacity-100 hover:bg-ink-800" : "opacity-0"
          }`}
        >
          <ChevronRight className="h-5 w-5" strokeWidth={2} />
        </button>

        {/*
          Scroller — vertical padding (pt/pb) gives the card room to lift on
          hover without being clipped. `overflow-x:auto` forces overflow-y to
          behave like `auto` (CSS spec), so we can't just set overflow-y:visible.
          Padding is the reliable fix.
        */}
        <div
          ref={scrollerRef}
          className="hide-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-8 pt-6 sm:gap-5 sm:px-0 sm:pb-10 sm:pt-8"
          style={{ scrollPaddingLeft: "1rem" }}
        >
          {items.map((item, idx) => (
            <div
              key={item.id}
              className="relative snap-start shrink-0 basis-[82%] transition-transform hover:z-10 sm:basis-[48%] lg:basis-[32%] xl:basis-[28%]"
            >
              <DishCard item={item} priority={idx < 2} />
            </div>
          ))}
          {/* Trailing spacer so last card can snap nicely on mobile */}
          <div aria-hidden className="shrink-0 basis-2 sm:hidden" />
        </div>
      </div>

      {/* Strong CTA — directly under the carousel, never far below */}
      <div className="flex flex-col items-center gap-3 pt-1 sm:pt-2">
        <Link
          href="/menu?returnTo=%2F%23menu"
          className="btn-primary group min-w-[260px] justify-center"
        >
          {t(translations.sections.menuPreview.viewFullMenu)}
          <ArrowRight
            className="ml-1 h-4 w-4 transition group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>
    </div>
  );
}

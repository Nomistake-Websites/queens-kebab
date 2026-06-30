"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Clock, Search } from "lucide-react";
import { DishCard } from "@/components/DishCard";
import { Lightbox } from "@/components/Lightbox";
import {
  MENU_CATEGORY_ORDER,
  MENU_ITEMS,
  getBranchMenu,
  getByCategory,
  type BranchMenu,
  type MenuCategoryId,
} from "@/data/menu";
import { LOCATIONS, type Location } from "@/data/locations";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";
import { useMenuLightbox } from "@/hooks/useMenuLightbox";

const sectionId = (cat: MenuCategoryId) => `cat-${cat}`;

/** Both "back" buttons return to the landing page menu section. */
const BACK_HREF = "/#menu";

export function FullMenu() {
  const { t, lang } = useLanguage();

  const firstActive = LOCATIONS.find((l) => !l.comingSoon) ?? LOCATIONS[0];
  const [branch, setBranch] = useState<Location>(firstActive);
  const [query, setQuery] = useState("");
  const branchComing = branch.comingSoon === true;

  // Menu for the selected branch (falls back to the full Karlín menu).
  const branchMenu: BranchMenu = useMemo(
    () =>
      getBranchMenu(branch.id) ?? {
        items: MENU_ITEMS,
        categories: MENU_CATEGORY_ORDER,
      },
    [branch.id],
  );
  const branchCategories = branchMenu.categories;

  const [activeCat, setActiveCat] = useState<MenuCategoryId>(
    branchCategories[0],
  );

  // Reset the active category when the branch (and its categories) change.
  useEffect(() => {
    setActiveCat(branchCategories[0]);
  }, [branchCategories]);

  const q = query.trim().toLowerCase();
  const searching = q.length > 0;

  const searchResults = useMemo(() => {
    if (!searching) return [];
    return branchMenu.items.filter(
      (i) =>
        i.name[lang].toLowerCase().includes(q) ||
        i.description[lang].toLowerCase().includes(q),
    );
  }, [searching, q, lang, branchMenu.items]);

  // Lightbox over the currently displayed items (search results or full menu).
  const displayedItems = searching ? searchResults : branchMenu.items;
  const lb = useMenuLightbox(displayedItems);

  // Scroll-spy: highlight the category pill for the section in view.
  useEffect(() => {
    if (branchComing || searching) return;
    const sections = branchCategories
      .map((c) => document.getElementById(sectionId(c)))
      .filter((el): el is HTMLElement => !!el);
    if (sections.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.id.replace("cat-", "") as MenuCategoryId;
          setActiveCat(id);
        }
      },
      { rootMargin: "-140px 0px -65% 0px", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [branchComing, searching, branchCategories]);

  const jumpTo = (cat: MenuCategoryId) => {
    setActiveCat(cat);
    const el = document.getElementById(sectionId(cat));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="container-page pb-24">
      {/* Top back link → landing menu section */}
      <Link
        href={BACK_HREF}
        className="group inline-flex items-center gap-2 text-sm font-medium text-white/65 transition hover:text-brand-red"
      >
        <ArrowLeft
          className="h-4 w-4 transition group-hover:-translate-x-0.5"
          strokeWidth={2}
        />
        {t(translations.common.backToHome)}
      </Link>

      {/* Heading */}
      <div className="mt-6 mb-8 flex max-w-3xl flex-col gap-4">
        <span className="eyebrow">{t(translations.sections.menuPreview.eyebrow)}</span>
        <h1 className="h-display text-4xl font-semibold text-white sm:text-5xl md:text-6xl">
          {t({
            cs: "Kompletní menu Queen's Kebab",
            en: "The complete Queen's Kebab menu",
          })}
        </h1>
        <p className="max-w-2xl text-base text-white/65 sm:text-lg">
          {t({
            cs: "Vyberte si pobočku a prohlédněte si kompletní nabídku kebabů, dürümů, boxů, grilovaných specialit, pizzy, salátů, nápojů a doplňků.",
            en: "Pick a branch and browse the full selection of kebabs, dürüms, boxes, grilled specials, pizza, salads, drinks and sides.",
          })}
        </p>
      </div>

      {/* Branch selector */}
      <div className="mb-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">
          {t(translations.qr.branchLabel)}
        </p>
        <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:flex-wrap sm:px-0">
          {LOCATIONS.map((loc) => {
            const isActive = branch.id === loc.id;
            const coming = loc.comingSoon === true;
            return (
              <button
                key={loc.id}
                type="button"
                onClick={() => setBranch(loc)}
                aria-pressed={isActive}
                className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-brand-red bg-brand-red/15 text-white shadow-glow"
                    : "border-white/10 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10"
                }`}
              >
                {t(loc.district)}
                {coming && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cream">
                    <Clock className="h-2.5 w-2.5" strokeWidth={2.5} />
                    {t(translations.common.comingSoonInline)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {branchComing ? (
        /* ── Bohnice: premium "Připravujeme" state ─────────────────────── */
        <div className="card relative overflow-hidden p-10 text-center sm:p-16">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-red/20 blur-3xl"
          />
          <div className="relative mx-auto flex max-w-md flex-col items-center gap-4">
            <span className="rounded-full border border-brand-red/40 bg-brand-red/15 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-white shadow-glow">
              {t(translations.common.comingSoon)}
            </span>
            <h2 className="h-display text-3xl font-semibold text-white sm:text-4xl">
              {t(branch.name)}
            </h2>
            <p className="text-white/70">
              {t({
                cs: "Menu pro Bohnice připravujeme. Brzy se na vás budeme těšit.",
                en: "We're preparing the Bohnice menu. See you soon.",
              })}
            </p>
            <p className="text-sm text-white/50">{branch.address}</p>
            <button
              type="button"
              onClick={() => setBranch(firstActive)}
              className="btn-ghost mt-2"
            >
              {t({ cs: "Zobrazit menu jiné pobočky", en: "View another branch's menu" })}
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* Sticky controls: search + category pills */}
          <div className="sticky top-16 z-20 -mx-4 mb-10 border-y border-white/5 bg-ink-950/90 px-4 py-3 backdrop-blur-xl sm:top-20 sm:mx-0 sm:rounded-2xl sm:border sm:px-5 sm:py-4">
            <div className="flex flex-col gap-3">
              <div className="relative max-w-md">
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
              {!searching && (
                <div className="hide-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
                  {branchCategories.map((cat) => {
                    const isActive = activeCat === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => jumpTo(cat)}
                        aria-pressed={isActive}
                        className={`chip whitespace-nowrap ${
                          isActive
                            ? "chip-active"
                            : "hover:border-white/25 hover:bg-white/10"
                        }`}
                      >
                        {t(translations.categories[cat])}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {searching ? (
            searchResults.length === 0 ? (
              <div className="card flex flex-col items-center gap-2 px-6 py-16 text-center">
                <p className="h-display text-3xl text-white">¯\\_(ツ)_/¯</p>
                <p className="text-sm text-white/60">{t(translations.qr.noResults)}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((item, idx) => (
                  <DishCard
                    key={item.id}
                    item={item}
                    priority={idx < 6}
                    onImageClick={() => lb.openFor(item.id)}
                  />
                ))}
              </div>
            )
          ) : (
            <div className="space-y-14">
              {branchCategories.map((cat, catIdx) => {
                const items = getByCategory(cat, branchMenu.items);
                if (items.length === 0) return null;
                return (
                  <section
                    key={cat}
                    id={sectionId(cat)}
                    className="scroll-mt-40 sm:scroll-mt-44"
                  >
                    <div className="mb-6 flex items-end justify-between gap-4 border-b border-white/5 pb-3">
                      <h2 className="h-display text-2xl font-semibold text-white sm:text-3xl">
                        {t(translations.categories[cat])}
                      </h2>
                      <span className="shrink-0 text-xs uppercase tracking-wider text-white/40">
                        {items.length}{" "}
                        {t({ cs: "položek", en: "items" })}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {items.map((item, idx) => (
                        <DishCard
                          key={item.id}
                          item={item}
                          priority={catIdx === 0 && idx < 4}
                          onImageClick={() => lb.openFor(item.id)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}

              {/* Reduced-menu note for branches still being filled out */}
              {branchMenu.limited && (
                <p className="rounded-2xl border border-white/5 bg-white/[0.03] px-5 py-4 text-center text-sm text-white/55">
                  {t({
                    cs: "Další položky pro tuto pobočku připravujeme.",
                    en: "More items for this branch are coming soon.",
                  })}
                </p>
              )}
            </div>
          )}
        </>
      )}

      {/* Bottom CTAs — order swapped: back first, order online second */}
      <div className="mt-16 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href={BACK_HREF}
          className="btn-ghost group min-w-[220px] justify-center"
        >
          <ArrowLeft
            className="h-4 w-4 transition group-hover:-translate-x-0.5"
            strokeWidth={2}
          />
          {t(translations.common.backToHome)}
        </Link>
        <Link href="/#order" className="btn-primary group min-w-[220px] justify-center">
          {t(translations.hero.ctaOrder)}
          <ArrowRight
            className="h-4 w-4 transition group-hover:translate-x-0.5"
            strokeWidth={2}
          />
        </Link>
      </div>

      {lb.openIndex !== null && (
        <Lightbox
          images={lb.images}
          index={lb.openIndex}
          onClose={lb.close}
          onPrev={lb.prev}
          onNext={lb.next}
        />
      )}
    </section>
  );
}

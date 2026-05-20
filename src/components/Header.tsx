"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Logo } from "./Logo";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useLanguage } from "@/lib/language";
import { translations } from "@/data/translations";

type NavId = "menu" | "locations" | "order" | "gallery" | "reviews" | "contact";

interface NavItem {
  id: NavId;
  hash: string;
  labelLeaf: { cs: string; en: string };
}

const NAV_ITEMS: NavItem[] = [
  { id: "menu", hash: "#menu", labelLeaf: translations.nav.menu },
  { id: "locations", hash: "#locations", labelLeaf: translations.nav.locations },
  { id: "order", hash: "#order", labelLeaf: translations.nav.order },
  { id: "gallery", hash: "#gallery", labelLeaf: translations.nav.gallery },
  { id: "reviews", hash: "#reviews", labelLeaf: translations.nav.reviews },
  { id: "contact", hash: "#contact", labelLeaf: translations.nav.contact },
];

export function Header() {
  const { t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const onHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<NavId | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Scroll spy — only when on the homepage
  useEffect(() => {
    if (!onHome) {
      setActive(null);
      return;
    }
    const ids = NAV_ITEMS.map((n) => n.id);
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (targets.length === 0) return;

    // Track most-visible section
    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.intersectionRatio);
        }
        // Pick the one currently most in view
        let best: { id: string; ratio: number } | null = null;
        for (const [id, ratio] of ratios) {
          if (ratio > 0 && (!best || ratio > best.ratio)) {
            best = { id, ratio };
          }
        }
        if (best) {
          setActive(best.id as NavId);
        } else {
          // Nothing in view — likely hero on top, or footer with no observed id
          // Keep current active or clear if near top
          if (window.scrollY < 100) setActive(null);
        }
      },
      {
        // Trigger when the section's middle band is in the viewport
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [onHome]);

  // Build href that respects whether we're on the home page or not
  const hrefFor = useCallback(
    (hash: string) => (onHome ? hash : `/${hash}`),
    [onHome],
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: NavItem) => {
      setOpen(false);
      if (onHome) {
        // Smooth in-page scroll, also set active immediately for snappy feedback
        const el = document.getElementById(item.id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          history.replaceState(null, "", item.hash);
          setActive(item.id);
        }
      }
    },
    [onHome],
  );

  // When loading a page with a hash (e.g. /#menu), scroll to it after mount
  useEffect(() => {
    if (!onHome) return;
    if (typeof window === "undefined") return;
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    const el = document.getElementById(hash);
    if (el) {
      // Defer slightly so layout is ready
      requestAnimationFrame(() => el.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }, [onHome]);

  const navItems = useMemo(() => NAV_ITEMS, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ink-950/80 backdrop-blur-xl border-b border-white/5"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-20">
        <Link
          href="/"
          aria-label="Queen's Kebab home"
          className="shrink-0"
          onClick={() => setOpen(false)}
        >
          <Logo />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={hrefFor(item.hash)}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={isActive ? "true" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                <span className="relative">
                  {t(item.labelLeaf)}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute -bottom-1.5 left-0 h-0.5 rounded-full bg-brand-red transition-all duration-500 ease-out ${
                      isActive ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <Link
            href={hrefFor("#order")}
            onClick={(e) =>
              handleNavClick(e, {
                id: "order",
                hash: "#order",
                labelLeaf: translations.nav.order,
              })
            }
            className="btn-primary hidden sm:inline-flex"
          >
            {t(translations.nav.order)}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <div className="relative h-3 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 bg-white transition ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2.5 h-0.5 w-5 bg-white transition ${
                  open ? "-translate-y-[5px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 sm:top-20 z-40 origin-top overflow-hidden bg-ink-950/95 backdrop-blur-xl border-b border-white/5 transition-all duration-300 ${
          open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="container-page flex flex-col gap-1 py-6">
          {navItems.map((item) => {
            const isActive = active === item.id;
            return (
              <Link
                key={item.id}
                href={hrefFor(item.hash)}
                onClick={(e) => handleNavClick(e, item)}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium transition ${
                  isActive
                    ? "bg-brand-red/15 text-white"
                    : "text-white/85 hover:bg-white/5"
                }`}
              >
                <span>{t(item.labelLeaf)}</span>
                {isActive && (
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-red" />
                )}
              </Link>
            );
          })}
          <Link
            href="/qr-menu"
            onClick={() => setOpen(false)}
            className="rounded-2xl px-4 py-3 text-base font-medium text-white/85 transition hover:bg-white/5"
          >
            {t(translations.nav.qrMenu)}
          </Link>
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-white/5 pt-4">
            <LanguageSwitcher />
            <Link
              href={hrefFor("#order")}
              onClick={(e) => {
                handleNavClick(e, {
                  id: "order",
                  hash: "#order",
                  labelLeaf: translations.nav.order,
                });
                if (!onHome) router.push("/#order");
              }}
              className="btn-primary flex-1 justify-center"
            >
              {t(translations.nav.order)}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

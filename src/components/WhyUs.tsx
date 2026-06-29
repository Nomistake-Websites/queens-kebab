"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Flame, Beef, MapPin, Leaf, type LucideIcon } from "lucide-react";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";
import type { GalleryImage } from "@/data/gallery";
import { Lightbox } from "./Lightbox";

const ICONS: LucideIcon[] = [Flame, Beef, MapPin, Leaf];

/** Background/lightbox photos for the four feature cards (index-aligned). */
const FEATURE_PHOTOS: GalleryImage[] = [
  { src: "/images_optimized/fallback.jpg", alt: "Queen's Kebab – maso z grilu" },
  { src: "/images_optimized/galerie/gal0.jpg", alt: "Queen's Kebab – poctivé porce" },
  { src: "/images_optimized/pobocka-vrsovice.png", alt: "Queen's Kebab – pobočka" },
  { src: "/images_optimized/IMG_4249.jpg", alt: "Queen's Kebab – vegetariánské volby" },
];

export function WhyUs() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + FEATURE_PHOTOS.length) % FEATURE_PHOTOS.length,
      ),
    [],
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i + 1) % FEATURE_PHOTOS.length,
      ),
    [],
  );

  return (
    <>
      {/*
        Mobile: horizontal swipe carousel with snap.
        Desktop (lg+): the original 4-column grid (unchanged layout).
      */}
      <div className="hide-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:gap-4 lg:overflow-visible lg:pb-0">
        {translations.why.items.map((item, idx) => {
          const Icon = ICONS[idx];
          const photo = FEATURE_PHOTOS[idx];
          return (
            <button
              key={idx}
              type="button"
              onClick={() => open(idx)}
              aria-label={t(item.title)}
              className="group card relative flex min-h-[300px] min-w-[84%] shrink-0 snap-start flex-col justify-end gap-3 overflow-hidden p-6 text-left transition hover:-translate-y-1 hover:border-white/15 sm:min-h-[280px] sm:min-w-[46%] lg:min-h-[260px] lg:min-w-0 lg:shrink"
            >
              {/* Background photo — visible but darkened so text stays readable */}
              {photo && (
                <div aria-hidden className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
                  <Image
                    src={photo.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 80vw, 25vw"
                    className="object-cover opacity-40 transition-opacity duration-500 group-hover:opacity-55"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-950/94 via-ink-950/82 to-ink-950/62" />
                </div>
              )}

              <div className="relative z-10 flex flex-col gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand-red/15 text-brand-red backdrop-blur">
                  <Icon className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <h3 className="h-display text-lg font-semibold text-white">
                  {t(item.title)}
                </h3>
                <p className="text-sm text-white/85 lg:text-white/75">{t(item.body)}</p>
              </div>
            </button>
          );
        })}
      </div>

      {openIndex !== null && (
        <Lightbox
          images={FEATURE_PHOTOS}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

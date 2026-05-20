"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useImagePreload } from "@/hooks/useImagePreload";

interface Tile {
  src: string;
  alt: string;
  span: string;
}

/**
 * Gallery tiles. Image files live in `/public/images/gallery/*.webp`.
 * Replace `src` or reorder freely — the lightbox cycles them in this order.
 */
const TILES: Tile[] = [
  {
    src: "/images/gallery/grill-master-kebab.webp",
    alt: "Grill master preparing kebab",
    span: "col-span-2 row-span-2",
  },
  {
    src: "/images/gallery/restaurant-interior-counter.webp",
    alt: "Restaurant interior counter",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/images/gallery/kebab-plate-table.webp",
    alt: "Kebab plate on table",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/durum-preparation.webp",
    alt: "Dürüm preparation",
    span: "col-span-1 row-span-1",
  },
  {
    src: "/images/gallery/fresh-ingredients-sauces.webp",
    alt: "Fresh ingredients and sauces",
    span: "col-span-2 row-span-1",
  },
  {
    src: "/images/gallery/grilled-meat-detail.webp",
    alt: "Grilled meat detail",
    span: "col-span-2 row-span-1",
  },
];

const TILE_SRCS = TILES.map((t) => t.src);

// ---------------------------------------------------------------------------
// Grid tile (uses next/image — these are thumbnails)

function TileButton({
  tile,
  onOpen,
  index,
}: {
  tile: Tile;
  onOpen: (i: number) => void;
  index: number;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${tile.alt}`}
      className={`group relative overflow-hidden rounded-2xl bg-ink-800 transition focus:outline-none focus:ring-2 focus:ring-brand-red ${tile.span}`}
    >
      {!failed ? (
        <Image
          src={tile.src}
          alt={tile.alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="fallback-food absolute inset-0" />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 transition group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </button>
  );
}

// ---------------------------------------------------------------------------
// Lightbox — plain <img> for instant display of pre-warmed WebPs

function Lightbox({
  tiles,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  tiles: Tile[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const tile = tiles[index];
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // Reset transient state when the visible image changes
  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [index]);

  // Belt-and-braces preload of current + neighbours when the user is
  // already inside the lightbox — keeps arrow taps instant even if the
  // initial section-level preload was somehow skipped.
  const neighbourSrcs = useMemo(() => {
    const prevIdx = (index - 1 + tiles.length) % tiles.length;
    const nextIdx = (index + 1) % tiles.length;
    return [tiles[index].src, tiles[nextIdx].src, tiles[prevIdx].src];
  }, [index, tiles]);
  useImagePreload(neighbourSrcs);

  // Keyboard navigation + lock body scroll
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, onPrev, onNext]);

  // ---------------------------------------------------------------------
  // Arrow buttons.
  //
  //  Mobile  : invisible 48 × 48 tap target, white chevron with a strong
  //            drop shadow so it stays readable on dark and bright photos.
  //            No dark disc — keeps the photo unobstructed.
  //  Desktop : softer rounded button with backdrop blur, red-on-hover.
  // ---------------------------------------------------------------------
  const arrowBtn =
    "absolute top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center " +
    "rounded-full text-white transition active:scale-95 " +
    "[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.9))] " +
    // Desktop pill — kicks in at sm:
    "sm:h-14 sm:w-14 sm:border sm:border-white/20 sm:bg-black/40 " +
    "sm:backdrop-blur-md sm:[filter:none] sm:shadow-lg " +
    "sm:hover:border-brand-red sm:hover:bg-brand-red/25 sm:hover:text-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tile.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
    >
      {/* Close — keeps its disc on both mobile and desktop so it's always findable */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close"
        className="absolute right-3 top-3 z-30 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-md transition hover:bg-white/15 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" strokeWidth={2} />
      </button>

      {/* Prev */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label="Previous"
        className={`${arrowBtn} left-2 sm:left-6`}
      >
        <ChevronLeft className="h-9 w-9 sm:h-7 sm:w-7" strokeWidth={2.5} />
      </button>

      {/* Next */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label="Next"
        className={`${arrowBtn} right-2 sm:right-6`}
      >
        <ChevronRight className="h-9 w-9 sm:h-7 sm:w-7" strokeWidth={2.5} />
      </button>

      {/* Image frame */}
      <div
        className="relative flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Skeleton — only visible while the photo is still decoding */}
        {!loaded && !failed && (
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            style={{ aspectRatio: "4 / 3" }}
          >
            <div className="fallback-food absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-transparent to-black/40" />
          </div>
        )}

        {!failed ? (
          /*
           * Intentionally a plain <img> here:
           *   - The image is already an optimised WebP (~80–200 KB).
           *   - It has been preloaded into the browser cache, so the
           *     fetch is effectively zero.
           *   - Skipping the Next.js image optimisation layer means there's
           *     no extra server round trip and no flash of placeholder.
           */
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={tile.src}
            src={tile.src}
            alt={tile.alt}
            width={1600}
            height={1200}
            decoding="async"
            loading="eager"
            draggable={false}
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`block h-auto max-h-[85vh] w-auto max-w-[92vw] rounded-2xl border border-brand-red/20 object-contain shadow-2xl transition-opacity duration-200 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ aspectRatio: "4 / 3" }}
          />
        ) : (
          <div className="fallback-food h-[60vh] w-[80vw] max-w-3xl rounded-2xl" />
        )}

        <p className="absolute -bottom-10 left-0 right-0 text-center text-xs uppercase tracking-[0.25em] text-white/60">
          {tile.alt} · {index + 1} / {tiles.length}
        </p>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Gallery section

export function Gallery() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  /*
   * Preload every gallery image as soon as the Gallery mounts on the home
   * page. The total payload is small (six WebPs), and queuing the fetches
   * via `new Image()` is non-blocking — it just hands the URLs to the
   * browser's network stack. By the time the user clicks a tile or taps
   * an arrow, the bytes are already cached.
   *
   * If you ever want to defer this until the section is closer to view,
   * pass `{ triggerRef: sectionRef, rootMargin: "1200px" }` instead.
   */
  useImagePreload(TILE_SRCS);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + TILES.length) % TILES.length,
      ),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % TILES.length)),
    [],
  );

  return (
    <>
      <div
        ref={sectionRef}
        className="grid h-[520px] grid-cols-4 grid-rows-3 gap-3 sm:h-[600px]"
      >
        {TILES.map((tile, i) => (
          <TileButton key={tile.src} tile={tile} index={i} onOpen={open} />
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox
          tiles={TILES}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

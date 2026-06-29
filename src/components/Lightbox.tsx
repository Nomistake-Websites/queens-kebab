"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useImagePreload } from "@/hooks/useImagePreload";
import type { GalleryImage } from "@/data/gallery";

interface LightboxProps {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

/**
 * Shared fullscreen image viewer used by the landing-page gallery and the
 * /galerie subpage. Supports:
 *  - prev/next arrows
 *  - keyboard ← → and Esc
 *  - touch swipe left/right
 *  - body-scroll lock + neighbour preloading for instant navigation
 */
export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const img = images[index];
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Reset transient state when the visible image changes
  useEffect(() => {
    setFailed(false);
    setLoaded(false);
  }, [index]);

  // Preload current + neighbours so arrow/swipe taps feel instant
  const neighbourSrcs = useMemo(() => {
    const prevIdx = (index - 1 + images.length) % images.length;
    const nextIdx = (index + 1) % images.length;
    return [images[index].src, images[nextIdx].src, images[prevIdx].src];
  }, [index, images]);
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  };

  const arrowBtn =
    "absolute top-1/2 z-20 -translate-y-1/2 grid h-12 w-12 place-items-center " +
    "rounded-full text-white transition active:scale-95 " +
    "[filter:drop-shadow(0_2px_8px_rgba(0,0,0,0.9))] " +
    "sm:h-14 sm:w-14 sm:border sm:border-white/20 sm:bg-black/40 " +
    "sm:backdrop-blur-md sm:[filter:none] sm:shadow-lg " +
    "sm:hover:border-brand-red sm:hover:bg-brand-red/25 sm:hover:text-white";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-fade-up"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close */}
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
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
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
          {img.alt} · {index + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}

"use client";

import { type RefObject, useEffect } from "react";

interface UseImagePreloadOptions {
  /**
   * Element to observe with IntersectionObserver. When this element enters
   * the viewport (with the given rootMargin), the images preload.
   *
   * Omit to preload immediately on mount (useful inside the lightbox to warm
   * up the next/previous slide).
   */
  triggerRef?: RefObject<Element | null>;
  /**
   * IntersectionObserver rootMargin. Defaults to `800px`, so the browser
   * starts pulling images while the section is still scrolling into view.
   *
   * To preload earlier/later, change this value (e.g. `"1200px"` for earlier,
   * `"200px"` for later).
   */
  rootMargin?: string;
  /** Skip preloading entirely. */
  enabled?: boolean;
}

/** Track which URLs we've already kicked off to avoid duplicate downloads. */
const preloadCache = new Set<string>();

function preloadOne(src: string) {
  if (typeof window === "undefined") return;
  if (!src || preloadCache.has(src)) return;
  preloadCache.add(src);
  const img = new window.Image();
  img.decoding = "async";
  img.src = src;
}

/**
 * Preload a list of image URLs into the browser cache.
 *
 *   useImagePreload(srcs, { triggerRef: ref, rootMargin: "800px" })
 *     // → preloads when the ref'd section is within 800px of the viewport
 *
 *   useImagePreload(srcs)
 *     // → preloads immediately on mount
 *
 * Idempotent — each URL is fetched once per page load, even across renders
 * and across multiple components.
 */
export function useImagePreload(
  srcs: readonly string[],
  options: UseImagePreloadOptions = {},
) {
  const { triggerRef, rootMargin = "800px", enabled = true } = options;

  // Stable key so the effect only re-runs when the actual URL list changes.
  const key = srcs.join("|");

  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;
    if (srcs.length === 0) return;

    // Immediate preload (no trigger element provided).
    if (!triggerRef) {
      srcs.forEach(preloadOne);
      return;
    }

    const el = triggerRef.current;
    if (!el) return;

    // Older browsers without IntersectionObserver — just preload now.
    if (typeof IntersectionObserver === "undefined") {
      srcs.forEach(preloadOne);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            srcs.forEach(preloadOne);
            io.disconnect();
            break;
          }
        }
      },
      { rootMargin },
    );

    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, rootMargin, triggerRef, key]);
}

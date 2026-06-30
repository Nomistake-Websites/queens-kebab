"use client";

import { useCallback, useMemo, useState } from "react";
import type { MenuItem } from "@/data/menu";
import type { GalleryImage } from "@/data/gallery";

/**
 * Wires a list of menu items into the shared gallery <Lightbox>.
 *
 * Only items that actually have an image are included, so clicking never
 * crashes on a missing photo. Navigation walks through every imaged item in
 * the order they were passed (i.e. the order they're displayed).
 */
export function useMenuLightbox(items: MenuItem[]) {
  const imaged = useMemo(() => items.filter((i) => Boolean(i.image)), [items]);

  const images: GalleryImage[] = useMemo(
    () => imaged.map((i) => ({ src: i.image as string, alt: i.name.cs })),
    [imaged],
  );

  const indexById = useMemo(() => {
    const m = new Map<string, number>();
    imaged.forEach((i, idx) => m.set(i.id, idx));
    return m;
  }, [imaged]);

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const openFor = useCallback(
    (id: string) => {
      const idx = indexById.get(id);
      if (idx !== undefined) setOpenIndex(idx);
    },
    [indexById],
  );

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + images.length) % images.length,
      ),
    [images.length],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % images.length)),
    [images.length],
  );

  return { images, openIndex, openFor, close, prev, next };
}

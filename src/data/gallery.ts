export interface GalleryImage {
  src: string;
  alt: string;
}

const BASE = "/images_optimized/galerie";

/** Files are gal0..gal26.jpg, except gal8 which is a .png. */
const PNG_INDEXES = new Set<number>([8]);

function file(n: number): string {
  return `${BASE}/gal${n}.${PNG_INDEXES.has(n) ? "png" : "jpg"}`;
}

const ALTS = [
  "Queen's Kebab galerie – turecký kebab",
  "Queen's Kebab – jídlo z grilu",
  "Queen's Kebab – interiér restaurace",
  "Queen's Kebab – poctivé turecké jídlo",
];

function alt(i: number): string {
  return ALTS[i % ALTS.length];
}

/**
 * All gallery images in NUMERIC filename order (gal0, gal1, … gal26),
 * not alphabetical. Used on the /galerie subpage.
 */
export const GALLERY_ALL: GalleryImage[] = Array.from({ length: 27 }, (_, n) => ({
  src: file(n),
  alt: alt(n),
}));

/**
 * Landing-page gallery preview — explicit hand-picked order.
 * (gal1, gal0, gal2, gal9, gal25, gal5)
 */
const PREVIEW_ORDER = [1, 0, 2, 9, 25, 5];

export const GALLERY_PREVIEW: GalleryImage[] = PREVIEW_ORDER.map((n, i) => ({
  src: file(n),
  alt: alt(i),
}));

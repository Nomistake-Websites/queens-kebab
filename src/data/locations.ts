import type { TranslationLeaf } from "./translations";

export interface Location {
  id: string;
  name: TranslationLeaf;
  address: string;
  district: TranslationLeaf;
  phone: string;
  /** Opening hours placeholder – edit easily later. */
  openingHours: TranslationLeaf;
  /**
   * Machine-readable opening hours for JSON-LD (24h "HH:MM"). Optional —
   * when omitted, structured data falls back to the default 10:00–02:00.
   * Set per-branch when a branch's hours differ (e.g. Žižkov 10:00–06:00).
   */
  hours?: { opens: string; closes: string };
  /** Google Maps directions URL (replace with the exact place URL later). */
  directionsUrl: string;
  /** Google review URL placeholder – replace with the exact "write review" link per branch. */
  reviewUrl: string;
  /**
   * Delivery platform links. Use `null` (or omit) until you have the exact URL.
   *
   * Note: `foodora` was previously named `dame` (Dáme jídlo). Foodora acquired
   * Dáme jídlo in CZ, so the platform now lives under foodora.cz.
   */
  delivery: {
    wolt?: string | null;
    bolt?: string | null;
    foodora?: string | null;
  };
  /** Coordinates for JSON-LD (optional, edit to exact values). */
  geo?: { lat: number; lng: number };
  /** Branch photo shown on click in the locations section (optional). */
  image?: string;
  /**
   * When true, the branch is shown as "coming soon":
   *  - LocationCard renders an overlay with a PŘIPRAVUJEME / COMING SOON badge
   *  - Maps and Call buttons are disabled
   *  - Order section blurs the delivery platforms with a notice
   *  - Contact section adds a "(Připravujeme)" inline label
   *  - JSON-LD skips the branch
   */
  comingSoon?: boolean;
}

const PHONE = "+420799022871";
const BOHNICE_PHONE = "+420774668988";

export const LOCATIONS: Location[] = [
  {
    id: "karlin",
    name: { cs: "Queen's Kebab Karlín", en: "Queen's Kebab Karlín" },
    address: "Sokolovská 120/62, 186 00 Praha 8",
    district: { cs: "Karlín", en: "Karlín" },
    phone: PHONE,
    openingHours: {
      cs: "Po–Ne 10:00 – 02:00",
      en: "Mon–Sun 10:00 – 02:00",
    },
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Queen%27s+Kebab+Sokolovsk%C3%A1+120+Praha+8",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID_KARLIN",
    delivery: {
      wolt:
        "https://wolt.com/en/cze/prague/restaurant/queens-kebab-karlin?srsltid=AfmBOoqLgH1kesjFxELSMJ1VeiteLd-7Gpstsbis8EbW5Bhz_ZHCVGL0",
      bolt: "https://food.bolt.eu/en/271-prague/p/6649-queens-kebab-sokolovska/",
      // Foodora intentionally shared with Žižkov — same operator listing.
      foodora:
        "https://www.foodora.cz/restaurant/dcvz/queens-kebab-and-turkish-foods-dcvz",
    },
    geo: { lat: 50.0937, lng: 14.4476 },
    image: "/images_optimized/pobocka-karlin.webp",
  },
  {
    id: "vrsovice",
    name: { cs: "Queen's Kebab Vršovice", en: "Queen's Kebab Vršovice" },
    address: "U Slavie 1527/3, 100 00 Praha 10",
    district: { cs: "Vršovice", en: "Vršovice" },
    phone: PHONE,
    openingHours: {
      cs: "Po–Ne 10:00 – 02:00",
      en: "Mon–Sun 10:00 – 02:00",
    },
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Queen%27s+Kebab+U+Slavie+3+Praha+10",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID_VRSOVICE",
    delivery: {
      wolt:
        "https://wolt.com/en/cze/prague/restaurant/queens-kebab-eden?srsltid=AfmBOorYUKSqfr2IsTzyBybBkRuGgmXVO4q0QvmRbVQW1OOBF43E_jWB",
      bolt: "https://food.bolt.eu/uk-ua/271-prague/p/37816-queens-kebab-oc-eden/",
      foodora: "https://www.foodora.cz/restaurant/ph6c/queens-kebab-oc-eden",
    },
    geo: { lat: 50.0686, lng: 14.4626 },
    image: "/images_optimized/pobocka-vrsovice.webp",
  },
  {
    id: "zizkov",
    name: { cs: "Queen's Kebab Žižkov", en: "Queen's Kebab Žižkov" },
    address: "Seifertova 33, 130 00 Praha 3",
    district: { cs: "Žižkov", en: "Žižkov" },
    phone: PHONE,
    openingHours: {
      cs: "Po–Ne 10:00–06:00",
      en: "Mon–Sun 10:00–06:00",
    },
    hours: { opens: "10:00", closes: "06:00" },
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Queen%27s+Kebab+Seifertova+33+Praha+3",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID_ZIZKOV",
    delivery: {
      wolt:
        "https://wolt.com/en/cze/prague/restaurant/queens-kebab-seifertova?srsltid=AfmBOooPXb-ZAZ8X6UPQhbdc_qusSzYUCkLpUMYjI05E1gG6gVXXYf5L",
      bolt: "https://food.bolt.eu/en/271-prague/p/6650-queens-kebab-seifertova/",
      foodora:
        "https://www.foodora.cz/restaurant/dcvz/queens-kebab-and-turkish-foods-dcvz",
    },
    geo: { lat: 50.0809, lng: 14.4488 },
    image: "/images_optimized/pobocka-zizkov.webp",
  },
  {
    id: "bohnice",
    name: { cs: "Queen's Kebab Bohnice", en: "Queen's Kebab Bohnice" },
    address: "Lodžská 399/29, 181 00 Praha 8",
    district: { cs: "Bohnice", en: "Bohnice" },
    phone: BOHNICE_PHONE,
    openingHours: {
      cs: "Po–Ne 10:00 – 23:00",
      en: "Mon–Sun 10:00 – 23:00",
    },
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Lod%C5%BEsk%C3%A1+399%2F29+Praha+8",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID_BOHNICE",
    delivery: {
      wolt: null,
      bolt: null,
      foodora: null,
    },
    geo: { lat: 50.1289, lng: 14.4221 },
    comingSoon: true,
  },
];

export const PRIMARY_PHONE_DISPLAY = "+420 799 022 871";
export const PRIMARY_PHONE_TEL = PHONE;

export const BOHNICE_PHONE_DISPLAY = "+420 774 668 988";

/** Convenience: branches that are actually open for service. */
export const ACTIVE_LOCATIONS: Location[] = LOCATIONS.filter(
  (l) => !l.comingSoon,
);

export const GOOGLE_RATING = {
  score: 4.6,
  reviews: 2600,
};

import type { TranslationLeaf } from "./translations";

export interface Location {
  id: string;
  name: TranslationLeaf;
  address: string;
  district: TranslationLeaf;
  phone: string;
  /** Opening hours placeholder – edit easily later. */
  openingHours: TranslationLeaf;
  /** Google Maps directions URL (replace with the exact place URL later). */
  directionsUrl: string;
  /** Google review URL placeholder – replace with the exact "write review" link per branch. */
  reviewUrl: string;
  /** Delivery platform links. Leave as null until you have the exact URL. */
  delivery: {
    wolt?: string;
    bolt?: string;
    dame?: string;
  };
  /** Coordinates for JSON-LD (optional, edit to exact values). */
  geo?: { lat: number; lng: number };
}

const PHONE = "+420799022871";

export const LOCATIONS: Location[] = [
  {
    id: "zizkov",
    name: { cs: "Queen's Kebab Žižkov", en: "Queen's Kebab Žižkov" },
    address: "Seifertova 33, 130 00 Praha 3",
    district: { cs: "Žižkov", en: "Žižkov" },
    phone: PHONE,
    openingHours: {
      cs: "Po–Ne 10:00 – 02:00",
      en: "Mon–Sun 10:00 – 02:00",
    },
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=Queen%27s+Kebab+Seifertova+33+Praha+3",
    reviewUrl:
      "https://search.google.com/local/writereview?placeid=REPLACE_WITH_PLACE_ID_ZIZKOV",
    delivery: {
      wolt: "https://wolt.com/cs/cze/prague/restaurant/queens-kebab-zizkov",
      bolt: "https://food.bolt.eu/en-US/82/p/queens-kebab-zizkov",
      dame: "https://www.damejidlo.cz/restaurace/queens-kebab-zizkov",
    },
    geo: { lat: 50.0809, lng: 14.4488 },
  },
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
      wolt: "https://wolt.com/cs/cze/prague/restaurant/queens-kebab-karlin",
      bolt: "https://food.bolt.eu/en-US/82/p/queens-kebab-karlin",
      dame: "https://www.damejidlo.cz/restaurace/queens-kebab-karlin",
    },
    geo: { lat: 50.0937, lng: 14.4476 },
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
      wolt: "https://wolt.com/cs/cze/prague/restaurant/queens-kebab-vrsovice",
      bolt: "https://food.bolt.eu/en-US/82/p/queens-kebab-vrsovice",
      dame: "https://www.damejidlo.cz/restaurace/queens-kebab-vrsovice",
    },
    geo: { lat: 50.0686, lng: 14.4626 },
  },
];

export const PRIMARY_PHONE_DISPLAY = "+420 799 022 871";
export const PRIMARY_PHONE_TEL = PHONE;

export const GOOGLE_RATING = {
  score: 4.6,
  reviews: 776,
};

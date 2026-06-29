import type { TranslationLeaf } from "./translations";

export type MenuCategoryId =
  | "bestsellers"
  | "doner-plate"
  | "pita"
  | "durum"
  | "vegetarian"
  | "box"
  | "kofte"
  | "grill"
  | "pizza"
  | "special"
  | "salad"
  | "combo"
  | "drinks"
  | "sides";

export type MenuTag =
  | "bestseller"
  | "spicy"
  | "vegetarian"
  | "new"
  | "halal"
  | "dessert"
  | "drink";

export interface MenuItem {
  id: string;
  /** Menu number shown on the card (omit for drinks/sides). */
  number?: number;
  category: MenuCategoryId;
  name: TranslationLeaf;
  description: TranslationLeaf;
  /** Display price, e.g. "185 Kč". */
  price: string;
  /** WebP image under /public/menu. If missing, a dark placeholder shows. */
  image?: string;
  tags?: MenuTag[];
}

const IMG = (file: string) => `/menu/${file}`;

/**
 * Full Queen's Kebab menu. Edit prices / names / images here — the landing
 * preview and the /menu page both read from this file.
 *
 * Images live in /public/menu/*.webp (optimized). Reused images (e.g. the
 * plate / box photos) intentionally point at the same file.
 */
export const MENU_ITEMS: MenuItem[] = [
  // ── 1. Döner kebab talíř ────────────────────────────────────────────────
  {
    id: "maly-talir",
    number: 1,
    category: "doner-plate",
    name: { cs: "Malý talíř", en: "Small plate" },
    description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" },
    price: "185 Kč",
    image: IMG("kebab-plate.webp"),
  },
  {
    id: "maly-talir-hranolky",
    number: 2,
    category: "doner-plate",
    name: {
      cs: "Malý talíř s hranolky / rýží",
      en: "Small plate with fries / rice",
    },
    description: {
      cs: "Kebab, salát, dressing, hranolky nebo rýže",
      en: "Kebab, salad, dressing, fries or rice",
    },
    price: "205 Kč",
    image: IMG("doner-kebab-plate-with-fries.webp"),
  },
  {
    id: "velky-talir",
    number: 3,
    category: "doner-plate",
    name: { cs: "Velký talíř", en: "Large plate" },
    description: {
      cs: "Extra kebab, salát, dressing",
      en: "Extra kebab, salad, dressing",
    },
    price: "215 Kč",
    image: IMG("kebab-plate.webp"),
  },
  {
    id: "velky-talir-hranolky",
    number: 4,
    category: "doner-plate",
    name: {
      cs: "Velký talíř s hranolky / rýží",
      en: "Large plate with fries / rice",
    },
    description: {
      cs: "Extra kebab, salát, dressing, hranolky nebo rýže",
      en: "Extra kebab, salad, dressing, fries or rice",
    },
    price: "235 Kč",
    image: IMG("doner-kebab-plate-with-fries.webp"),
  },
  {
    id: "iskender-talir",
    number: 5,
    category: "doner-plate",
    name: { cs: "Iskender kebab talíř", en: "Iskender kebab plate" },
    description: {
      cs: "Kebab, jogurt, rajčata, pita, iskender dressing",
      en: "Kebab, yogurt, tomatoes, pita, iskender dressing",
    },
    price: "279 Kč",
    image: IMG("iskender-kebab-plate.webp"),
  },

  // ── 2. Kebab v pita chlebu ──────────────────────────────────────────────
  {
    id: "klasicky-kebab",
    number: 6,
    category: "pita",
    name: { cs: "Klasický kebab", en: "Classic kebab" },
    description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" },
    price: "169 Kč",
    image: IMG("pita-kebab.webp"),
    tags: ["bestseller", "halal"],
  },
  {
    id: "klasicky-kebab-syr",
    number: 7,
    category: "pita",
    name: { cs: "Klasický kebab se sýrem", en: "Classic kebab with cheese" },
    description: {
      cs: "Kebab, salát, dressing, sýr",
      en: "Kebab, salad, dressing, cheese",
    },
    price: "175 Kč",
    image: IMG("pita-kebab-with-cheese.webp"),
    tags: ["halal"],
  },
  {
    id: "mega-kebab",
    number: 8,
    category: "pita",
    name: { cs: "Mega kebab", en: "Mega kebab" },
    description: {
      cs: "Extra kebab, salát, dressing",
      en: "Extra kebab, salad, dressing",
    },
    price: "199 Kč",
    image: IMG("mega-pita-kebab.webp"),
    tags: ["halal"],
  },
  {
    id: "specialni-kebab",
    number: 9,
    category: "pita",
    name: { cs: "Speciální kebab", en: "Special kebab" },
    description: { cs: "Jen kebab a dressing", en: "Kebab and dressing only" },
    price: "199 Kč",
    image: IMG("special-kebab-pita-with-mostly-grilled-meat.webp"),
    tags: ["halal"],
  },

  // ── 3. Dürüm kebab ──────────────────────────────────────────────────────
  {
    id: "klasicky-durum",
    number: 10,
    category: "durum",
    name: { cs: "Klasický dürüm", en: "Classic dürüm" },
    description: {
      cs: "Kebab, tortilla, salát, dressing",
      en: "Kebab, tortilla, salad, dressing",
    },
    price: "169 Kč",
    image: IMG("classic-durum-kebab-wrap.webp"),
    tags: ["bestseller", "halal"],
  },
  {
    id: "klasicky-durum-syr",
    number: 11,
    category: "durum",
    name: { cs: "Klasický dürüm se sýrem", en: "Classic dürüm with cheese" },
    description: {
      cs: "Kebab, tortilla, salát, dressing, sýr",
      en: "Kebab, tortilla, salad, dressing, cheese",
    },
    price: "175 Kč",
    image: IMG("durum-kebab-wrap-with-cheese.webp"),
    tags: ["halal"],
  },
  {
    id: "mega-durum",
    number: 12,
    category: "durum",
    name: { cs: "Mega dürüm", en: "Mega dürüm" },
    description: {
      cs: "Extra kebab, tortilla, salát, dressing",
      en: "Extra kebab, tortilla, salad, dressing",
    },
    price: "199 Kč",
    image: IMG("mega-durum-kebab-wrap.webp"),
    tags: ["halal"],
  },
  {
    id: "specialni-durum",
    number: 13,
    category: "durum",
    name: { cs: "Speciální dürüm", en: "Special dürüm" },
    description: {
      cs: "Jen kebab, tortilla a dressing",
      en: "Kebab, tortilla and dressing only",
    },
    price: "205 Kč",
    image: IMG("special-durum-wrap-with-mostly-grilled-meat.webp"),
    tags: ["halal"],
  },
  {
    id: "klasicky-durum-hranolky",
    number: 14,
    category: "durum",
    name: { cs: "Klasický dürüm s hranolky", en: "Classic dürüm with fries" },
    description: {
      cs: "Kebab, tortilla, salát, dressing a hranolky",
      en: "Kebab, tortilla, salad, dressing and fries",
    },
    price: "205 Kč",
    image: IMG("durum-kebab-wrap-with-fries-inside.webp"),
    tags: ["halal"],
  },

  // ── 4. Vegetarian menu ──────────────────────────────────────────────────
  {
    id: "halloumi-durum",
    number: 15,
    category: "vegetarian",
    name: { cs: "Halloumi dürüm", en: "Halloumi dürüm" },
    description: {
      cs: "Halloumi, tortilla, salát, dressing",
      en: "Halloumi, tortilla, salad, dressing",
    },
    price: "159 Kč",
    image: IMG("halloumi-durum-wrap.webp"),
    tags: ["vegetarian"],
  },
  {
    id: "falafel-durum",
    number: 16,
    category: "vegetarian",
    name: { cs: "Falafel dürüm", en: "Falafel dürüm" },
    description: {
      cs: "Falafel, tortilla, salát, dressing",
      en: "Falafel, tortilla, salad, dressing",
    },
    price: "159 Kč",
    image: IMG("falafel-durum-wrap.webp"),
    tags: ["vegetarian"],
  },
  {
    id: "vegetarian-talir",
    number: 17,
    category: "vegetarian",
    name: { cs: "Vegetarian talíř", en: "Vegetarian plate" },
    description: {
      cs: "S falafelem, halloumi nebo veganskými kuličkami",
      en: "With falafel, halloumi or vegan köfte balls",
    },
    price: "175 Kč",
    image: IMG("vegetarian-turkish-plate.webp"),
    tags: ["vegetarian"],
  },
  {
    id: "vegan-kofte-durum",
    number: 18,
    category: "vegetarian",
    name: { cs: "Vegan köfte dürüm", en: "Vegan köfte dürüm" },
    description: {
      cs: "Vegan köfte, tortilla, salát, dressing",
      en: "Vegan köfte, tortilla, salad, dressing",
    },
    price: "159 Kč",
    image: IMG("vegan-kofte-durum-wrap.webp"),
    tags: ["vegetarian"],
  },
  {
    id: "vegetarian-box",
    number: 19,
    category: "vegetarian",
    name: { cs: "Vegetarian box", en: "Vegetarian box" },
    description: {
      cs: "Falafel nebo halloumi, salát, dressing",
      en: "Falafel or halloumi, salad, dressing",
    },
    price: "159 Kč",
    image: IMG("vegetarian-kebab-box.webp"),
    tags: ["vegetarian"],
  },

  // ── 5. Box kebab ────────────────────────────────────────────────────────
  {
    id: "maly-box",
    number: 20,
    category: "box",
    name: { cs: "Malý box", en: "Small box" },
    description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" },
    price: "145 Kč",
    image: IMG("kebab-box.webp"),
    tags: ["bestseller", "halal"],
  },
  {
    id: "maly-box-hranolky",
    number: 21,
    category: "box",
    name: { cs: "Malý box s hranolky", en: "Small box with fries" },
    description: {
      cs: "Kebab, salát, dressing a hranolky",
      en: "Kebab, salad, dressing and fries",
    },
    price: "155 Kč",
    image: IMG("kebab-box-with-fries.webp"),
    tags: ["halal"],
  },
  {
    id: "velky-box",
    number: 22,
    category: "box",
    name: { cs: "Velký box", en: "Large box" },
    description: {
      cs: "Extra kebab, salát, dressing",
      en: "Extra kebab, salad, dressing",
    },
    price: "165 Kč",
    image: IMG("kebab-box.webp"),
    tags: ["halal"],
  },
  {
    id: "velky-box-hranolky",
    number: 23,
    category: "box",
    name: { cs: "Velký box s hranolky", en: "Large box with fries" },
    description: {
      cs: "Extra kebab, salát, dressing a hranolky",
      en: "Extra kebab, salad, dressing and fries",
    },
    price: "175 Kč",
    image: IMG("kebab-box-with-fries.webp"),
    tags: ["halal"],
  },
  {
    id: "specialni-box",
    number: 24,
    category: "box",
    name: { cs: "Speciální box", en: "Special box" },
    description: {
      cs: "Kebab, hranolky, dressing",
      en: "Kebab, fries, dressing",
    },
    price: "179 Kč",
    image: IMG("special-kebab-box.webp"),
    tags: ["halal"],
  },

  // ── 6. Balkánské köfte menu ─────────────────────────────────────────────
  {
    id: "baget-kofte",
    number: 25,
    category: "kofte",
    name: { cs: "Baget köfte", en: "Köfte baguette" },
    description: {
      cs: "Hovězí köfte, baget, salát, dressing",
      en: "Beef köfte, baguette, salad, dressing",
    },
    price: "199 Kč",
    image: IMG("kofte-baguette-sandwich.webp"),
    tags: ["halal"],
  },
  {
    id: "kofte-durum",
    number: 26,
    category: "kofte",
    name: { cs: "Köfte dürüm", en: "Köfte dürüm" },
    description: {
      cs: "Hovězí köfte, tortilla, salát, dressing",
      en: "Beef köfte, tortilla, salad, dressing",
    },
    price: "209 Kč",
    image: IMG("kofte-durum-wrap.webp"),
    tags: ["halal"],
  },
  {
    id: "kofte-talir",
    number: 27,
    category: "kofte",
    name: { cs: "Köfte talíř", en: "Köfte plate" },
    description: {
      cs: "Hovězí köfte, hranolky nebo rýže, salát, dressing",
      en: "Beef köfte, fries or rice, salad, dressing",
    },
    price: "259 Kč",
    image: IMG("beef-kofte-plate.webp"),
    tags: ["halal"],
  },
  {
    id: "cockova-polevka",
    number: 28,
    category: "kofte",
    name: { cs: "Čočková polévka", en: "Lentil soup" },
    description: {
      cs: "Turecká čočková polévka",
      en: "Turkish lentil soup",
    },
    price: "89 Kč",
    image: IMG("lentil-soup.webp"),
    tags: ["vegetarian"],
  },

  // ── 7. Queen's Grill menu ───────────────────────────────────────────────
  {
    id: "adana-durum",
    number: 29,
    category: "grill",
    name: { cs: "Adana kebab dürüm", en: "Adana kebab dürüm" },
    description: { cs: "Adana kebab ve wrapu", en: "Adana kebab in a wrap" },
    price: "269 Kč",
    image: IMG("adana-kebab-durum-wrap.webp"),
    tags: ["bestseller", "halal", "spicy"],
  },
  {
    id: "adana-talir",
    number: 30,
    category: "grill",
    name: { cs: "Adana kebab talíř", en: "Adana kebab plate" },
    description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" },
    price: "289 Kč",
    image: IMG("adana-kebab-plate.webp"),
    tags: ["halal", "spicy"],
  },
  {
    id: "jehneci-sis-durum",
    number: 31,
    category: "grill",
    name: { cs: "Jehněčí šíš dürüm", en: "Lamb shish dürüm" },
    description: { cs: "Jehněčí šíš ve wrapu", en: "Lamb shish in a wrap" },
    price: "299 Kč",
    image: IMG("lamb-shish-durum-wrap.webp"),
    tags: ["halal"],
  },
  {
    id: "jehneci-sis-talir",
    number: 32,
    category: "grill",
    name: { cs: "Jehněčí šíš talíř", en: "Lamb shish plate" },
    description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" },
    price: "319 Kč",
    image: IMG("lamb-shish-plate.webp"),
    tags: ["halal"],
  },
  {
    id: "jehneci-kotlety",
    number: 33,
    category: "grill",
    name: { cs: "Jehněčí kotlety", en: "Lamb chops" },
    description: { cs: "Grilované jehněčí kotlety", en: "Grilled lamb chops" },
    price: "399 Kč",
    image: IMG("lamb-chops-plate.webp"),
    tags: ["halal"],
  },
  {
    id: "kureci-kridelka-sis",
    number: 34,
    category: "grill",
    name: { cs: "Kuřecí křidélka šíš", en: "Chicken wings shish" },
    description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" },
    price: "225 Kč",
    image: IMG("grilled-chicken-wings-shish-plate.webp"),
    tags: ["halal"],
  },
  {
    id: "kureci-sis-durum",
    number: 35,
    category: "grill",
    name: { cs: "Kuřecí šíš dürüm", en: "Chicken shish dürüm" },
    description: { cs: "Kuřecí šíš ve wrapu", en: "Chicken shish in a wrap" },
    price: "239 Kč",
    image: IMG("chicken-shish-durum-wrap.webp"),
    tags: ["halal"],
  },
  {
    id: "kureci-sis-talir",
    number: 36,
    category: "grill",
    name: { cs: "Kuřecí šíš talíř", en: "Chicken shish plate" },
    description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" },
    price: "269 Kč",
    image: IMG("chicken-shish-plate.webp"),
    tags: ["halal"],
  },
  {
    id: "mix-grill",
    number: 37,
    category: "grill",
    name: { cs: "Mix grill", en: "Mix grill" },
    description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" },
    price: "439 Kč",
    image: IMG("mix-grill-plate.webp"),
    tags: ["bestseller", "halal"],
  },

  // ── 8. Queen's Pizza ────────────────────────────────────────────────────
  {
    id: "pizza-vege",
    number: 38,
    category: "pizza",
    name: { cs: "Pizza Vege", en: "Pizza Veggie" },
    description: {
      cs: "Mozzarella, rajčatový základ, červená cibule, rajčata, žampiony",
      en: "Mozzarella, tomato base, red onion, tomatoes, mushrooms",
    },
    price: "185 Kč",
    image: IMG("vegetarian-pizza.webp"),
    tags: ["vegetarian"],
  },
  {
    id: "pizza-classico",
    number: 39,
    category: "pizza",
    name: { cs: "Pizza Classico", en: "Pizza Classico" },
    description: {
      cs: "Mozzarella, rajčatový základ, hovězí salám, červená cibule, rajčata, žampiony",
      en: "Mozzarella, tomato base, beef salami, red onion, tomatoes, mushrooms",
    },
    price: "215 Kč",
    image: IMG("classic-mixed-pizza.webp"),
  },
  {
    id: "pizza-super-mixx",
    number: 40,
    category: "pizza",
    name: { cs: "Pizza Super Mixx", en: "Pizza Super Mixx" },
    description: {
      cs: "Mozzarella, rajčatový základ, hovězí šunka, hovězí salám, černé olivy, žampiony, červená cibule, zelená paprika, rukola",
      en: "Mozzarella, tomato base, beef ham, beef salami, black olives, mushrooms, red onion, green pepper, rocket",
    },
    price: "235 Kč",
    image: IMG("loaded-mixed-meat-pizza.webp"),
  },

  // ── 9. Speciál ──────────────────────────────────────────────────────────
  {
    id: "lahmacun",
    number: 41,
    category: "special",
    name: { cs: "Lahmacun", en: "Lahmacun" },
    description: {
      cs: "Těstový základ, směs mletého hovězího masa a salátu",
      en: "Thin dough base, minced beef and salad",
    },
    price: "139 Kč",
    image: IMG("lahmacun.webp"),
  },
  {
    id: "pide-masove",
    number: 42,
    category: "special",
    name: { cs: "Pide masové", en: "Meat pide" },
    description: {
      cs: "Těstový základ, směs mletého hovězího masa a salátu",
      en: "Dough base, minced beef and salad",
    },
    price: "199 Kč",
    image: IMG("meat-pide.webp"),
  },

  // ── 10. Salát ───────────────────────────────────────────────────────────
  {
    id: "michany-salat",
    number: 43,
    category: "salad",
    name: { cs: "Míchaný salát", en: "Mixed salad" },
    description: {
      cs: "Rajčata, okurky, ledový salát, zelí, rukola, olivy, sýr, granátová šťáva, dressing",
      en: "Tomatoes, cucumber, iceberg, cabbage, rocket, olives, cheese, pomegranate, dressing",
    },
    price: "109 Kč",
    image: IMG("mixed-salad.webp"),
    tags: ["vegetarian"],
  },
  {
    id: "specialni-salat",
    number: 44,
    category: "salad",
    name: { cs: "Speciální salát", en: "Special salad" },
    description: {
      cs: "Kuřecí kebab, rajčata, okurky, ledový salát, zelí, rukola, olivy, sýr, granátová šťáva, dressing",
      en: "Chicken kebab, tomatoes, cucumber, iceberg, cabbage, rocket, olives, cheese, pomegranate, dressing",
    },
    price: "139 Kč",
    image: IMG("special-chicken-kebab-salad.webp"),
    tags: ["halal"],
  },

  // ── 11. Menu kombinace ──────────────────────────────────────────────────
  {
    id: "doner-cola",
    number: 45,
    category: "combo",
    name: { cs: "Döner kebab + Cola 330 ml", en: "Döner kebab + Cola 330 ml" },
    description: { cs: "Döner kebab s nápojem", en: "Döner kebab with a drink" },
    price: "195 Kč",
    image: IMG("doner-kebab-meal-combo.webp"),
    tags: ["bestseller"],
  },
  {
    id: "doner-cola-hranolky",
    number: 46,
    category: "combo",
    name: {
      cs: "Döner kebab + Cola 330 ml + hranolky",
      en: "Döner kebab + Cola 330 ml + fries",
    },
    description: {
      cs: "Döner kebab s nápojem a hranolkami",
      en: "Döner kebab with a drink and fries",
    },
    price: "245 Kč",
    image: IMG("doner-kebab-combo-meal-with-fries-cola.webp"),
  },
  {
    id: "durum-cola",
    number: 47,
    category: "combo",
    name: { cs: "Dürüm kebab + Cola 330 ml", en: "Dürüm kebab + Cola 330 ml" },
    description: { cs: "Dürüm kebab s nápojem", en: "Dürüm kebab with a drink" },
    price: "195 Kč",
    image: IMG("durum-kebab-combo-cola.webp"),
  },
  {
    id: "durum-cola-hranolky",
    number: 48,
    category: "combo",
    name: {
      cs: "Dürüm kebab + Cola 330 ml + hranolky",
      en: "Dürüm kebab + Cola 330 ml + fries",
    },
    description: {
      cs: "Dürüm kebab s nápojem a hranolkami",
      en: "Dürüm kebab with a drink and fries",
    },
    price: "245 Kč",
    image: IMG("durum-kebab-combo-with-fries-cola.webp"),
  },

  // ── 12. Nápoje ──────────────────────────────────────────────────────────
  {
    id: "ayran",
    category: "drinks",
    name: { cs: "Ayran", en: "Ayran" },
    description: { cs: "Jogurtový turecký nápoj", en: "Turkish yogurt drink" },
    price: "39 Kč",
    image: IMG("ayran.webp"),
    tags: ["drink"],
  },
  {
    id: "cola-fanta-male",
    category: "drinks",
    name: { cs: "Cola / Fanta malé", en: "Cola / Fanta small" },
    description: { cs: "Nealkoholický nápoj", en: "Soft drink" },
    price: "39 Kč",
    image: IMG("soft-drink-cola.webp"),
    tags: ["drink"],
  },
  {
    id: "cola-fanta-velke",
    category: "drinks",
    name: { cs: "Cola / Fanta velké", en: "Cola / Fanta large" },
    description: { cs: "Nealkoholický nápoj", en: "Soft drink" },
    price: "49 Kč",
    image: IMG("soft-drink-cola.webp"),
    tags: ["drink"],
  },
  {
    id: "pivo",
    category: "drinks",
    name: { cs: "Pivo", en: "Beer" },
    description: { cs: "Pivo", en: "Beer" },
    price: "55 Kč",
    image: IMG("beer.webp"),
    tags: ["drink"],
  },

  // ── 13. Doplňky ─────────────────────────────────────────────────────────
  {
    id: "chilli-cheddar-fries",
    category: "sides",
    name: { cs: "Chilli cheddar fries", en: "Chilli cheddar fries" },
    description: {
      cs: "Hranolky s chilli cheddar omáčkou",
      en: "Fries with chilli cheddar sauce",
    },
    price: "125 Kč",
    image: IMG("chilli-cheddar-fries.webp"),
  },
  {
    id: "hranolky-male",
    category: "sides",
    name: { cs: "Hranolky malé", en: "Fries small" },
    description: { cs: "Malá porce hranolek", en: "Small portion of fries" },
    price: "75 Kč",
    image: IMG("french-fries.webp"),
  },
  {
    id: "hranolky-velke",
    category: "sides",
    name: { cs: "Hranolky velké", en: "Fries large" },
    description: { cs: "Velká porce hranolek", en: "Large portion of fries" },
    price: "95 Kč",
    image: IMG("french-fries.webp"),
  },
  {
    id: "baklava",
    category: "sides",
    name: { cs: "Baklava za kus", en: "Baklava per piece" },
    description: { cs: "Sladká turecká baklava", en: "Sweet Turkish baklava" },
    price: "45 Kč",
    image: IMG("baklava.webp"),
    tags: ["dessert"],
  },
];

/** Items explicitly tagged as bestsellers (used by the landing preview). */
export function getBestsellers(items: MenuItem[] = MENU_ITEMS): MenuItem[] {
  return items.filter((i) => i.tags?.includes("bestseller"));
}

export function getByCategory(
  category: MenuCategoryId,
  items: MenuItem[] = MENU_ITEMS,
): MenuItem[] {
  if (category === "bestsellers") return getBestsellers(items);
  return items.filter((i) => i.category === category);
}

/**
 * Real menu categories in display order (excludes the virtual "bestsellers"
 * filter, which is prepended where a filter UI needs it).
 */
export const MENU_CATEGORY_ORDER: MenuCategoryId[] = [
  "doner-plate",
  "pita",
  "durum",
  "vegetarian",
  "box",
  "kofte",
  "grill",
  "pizza",
  "special",
  "salad",
  "combo",
  "drinks",
  "sides",
];

/** Category order including the "bestsellers" virtual filter at the front. */
export const MENU_FILTER_ORDER: MenuCategoryId[] = [
  "bestsellers",
  ...MENU_CATEGORY_ORDER,
];

/**
 * Unique list of food image URLs — available for optional cache warming.
 * Not used to bulk-preload the whole menu (that would be heavy); the /menu
 * page relies on next/image lazy loading instead.
 */
export const FOOD_IMAGE_SRCS: string[] = Array.from(
  new Set(
    MENU_ITEMS.map((i) => i.image).filter((src): src is string => Boolean(src)),
  ),
);

import type { TranslationLeaf } from "./translations";

export type MenuCategoryId =
  | "bestsellers"
  | "kebab"
  | "durum"
  | "box"
  | "grill"
  | "plates"
  | "vegetarian"
  | "sides"
  | "drinks"
  | "desserts";

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
  category: MenuCategoryId;
  name: TranslationLeaf;
  description: TranslationLeaf;
  /** Display price (string so "od 149 Kč" works). Edit freely. */
  price: string;
  /** Local image path. If file does not exist, a gradient fallback is shown. */
  image?: string;
  tags?: MenuTag[];
  /** Comma separated string or short text, easy to edit later. */
  allergens?: TranslationLeaf;
}

/**
 * Edit prices, names and descriptions here.
 * The QR menu and the /menu page both read from this file.
 *
 * Image paths point to /public/images/food/*.webp
 */
export const MENU_ITEMS: MenuItem[] = [
  {
    id: "durum-kebab",
    category: "durum",
    name: { cs: "Dürüm Kebab", en: "Dürüm Kebab" },
    description: {
      cs: "Grilované maso, čerstvá zelenina a omáčka zabalené v tortille.",
      en: "Grilled meat, fresh vegetables and sauce wrapped in a tortilla.",
    },
    price: "od 149 Kč",
    image: "/images/food/durum-kebab.webp",
    tags: ["bestseller", "halal"],
    allergens: { cs: "Lepek, mléko, sezam", en: "Gluten, milk, sesame" },
  },
  {
    id: "pita-kebab",
    category: "kebab",
    name: { cs: "Pita Kebab", en: "Pita Kebab" },
    description: {
      cs: "Tradiční turecká pita plněná masem z grilu a domácí omáčkou.",
      en: "Traditional Turkish pita filled with grilled meat and house sauce.",
    },
    price: "od 139 Kč",
    image: "/images/food/pita-kebab.webp",
    tags: ["bestseller", "halal"],
    allergens: { cs: "Lepek, mléko, sezam", en: "Gluten, milk, sesame" },
  },
  {
    id: "box-kebab",
    category: "box",
    name: { cs: "Box Kebab", en: "Box Kebab" },
    description: {
      cs: "Hranolky, maso z grilu, zelenina a omáčka v praktickém boxu.",
      en: "Fries, grilled meat, vegetables and sauce in a handy box.",
    },
    price: "od 169 Kč",
    image: "/images/food/box-kebab.webp",
    tags: ["bestseller"],
    allergens: { cs: "Lepek, mléko", en: "Gluten, milk" },
  },
  {
    id: "mix-grill",
    category: "grill",
    name: { cs: "Mix Grill Talíř", en: "Mix Grill Plate" },
    description: {
      cs: "Výběr grilovaných specialit – kuře, jehněčí, adana, bulgur a salát.",
      en: "A selection of grilled specialties – chicken, lamb, adana, bulgur and salad.",
    },
    price: "od 279 Kč",
    image: "/images/food/mix-grill-talir.webp",
    tags: ["bestseller", "halal"],
    allergens: { cs: "Lepek, mléko", en: "Gluten, milk" },
  },
  {
    id: "adana-kebab",
    category: "grill",
    name: { cs: "Adana Kebab", en: "Adana Kebab" },
    description: {
      cs: "Pikantní jehněčí kebab na špejli, grilovaný na uhlí.",
      en: "Spicy minced lamb skewer, charcoal-grilled.",
    },
    price: "od 229 Kč",
    image: "/images/food/adana-kebab.webp",
    tags: ["spicy", "halal"],
    allergens: { cs: "Mléko", en: "Milk" },
  },
  {
    id: "chicken-kebab",
    category: "kebab",
    name: { cs: "Kuřecí Kebab", en: "Chicken Kebab" },
    description: {
      cs: "Šťavnaté marinované kuřecí maso z grilu.",
      en: "Juicy marinated grilled chicken kebab.",
    },
    price: "od 149 Kč",
    image: "/images/food/kureci-kebab.webp",
    tags: ["halal"],
    allergens: { cs: "Lepek, mléko", en: "Gluten, milk" },
  },
  {
    id: "falafel-wrap",
    category: "vegetarian",
    name: { cs: "Falafel Wrap", en: "Falafel Wrap" },
    description: {
      cs: "Domácí falafel, hummus, čerstvá zelenina a tahini omáčka.",
      en: "Homemade falafel, hummus, fresh vegetables and tahini sauce.",
    },
    price: "od 149 Kč",
    image: "/images/food/falafel-wrap.webp",
    tags: ["vegetarian"],
    allergens: { cs: "Lepek, sezam", en: "Gluten, sesame" },
  },
  {
    id: "halloumi-plate",
    category: "vegetarian",
    name: { cs: "Halloumi Talíř", en: "Halloumi Plate" },
    description: {
      cs: "Grilovaný halloumi, bulgur, salát a domácí omáčky.",
      en: "Grilled halloumi, bulgur, salad and homemade sauces.",
    },
    price: "od 219 Kč",
    image: "/images/food/halloumi-talir.webp",
    tags: ["vegetarian", "new"],
    allergens: { cs: "Mléko, lepek", en: "Milk, gluten" },
  },
  {
    id: "fries",
    category: "sides",
    name: { cs: "Hranolky", en: "Fries" },
    description: {
      cs: "Křupavé hranolky s naším kořením.",
      en: "Crispy fries with our house seasoning.",
    },
    price: "od 59 Kč",
    image: "/images/food/hranolky.webp",
    allergens: { cs: "Bez alergenů", en: "Allergen-free" },
  },
  {
    id: "ayran",
    category: "drinks",
    name: { cs: "Ayran", en: "Ayran" },
    description: {
      cs: "Tradiční turecký slaný jogurtový nápoj.",
      en: "Traditional Turkish salty yogurt drink.",
    },
    price: "od 39 Kč",
    image: "/images/food/ayran.webp",
    tags: ["drink"],
    allergens: { cs: "Mléko", en: "Milk" },
  },
  {
    id: "lahmacun",
    category: "plates",
    name: { cs: "Lahmacun", en: "Lahmacun" },
    description: {
      cs: "Tenká turecká placka s mletým masem, rajčaty a bylinkami.",
      en: "Thin Turkish flatbread with minced meat, tomatoes and herbs.",
    },
    price: "od 119 Kč",
    image: "/images/food/lahmacun.webp",
    allergens: { cs: "Lepek", en: "Gluten" },
  },
  {
    id: "baklava",
    category: "desserts",
    name: { cs: "Baklava", en: "Baklava" },
    description: {
      cs: "Sladká turecká specialita s ořechy a sirupem.",
      en: "Sweet Turkish dessert with nuts and syrup.",
    },
    price: "od 49 Kč",
    image: "/images/food/baklava.webp",
    tags: ["dessert"],
    allergens: { cs: "Lepek, ořechy", en: "Gluten, nuts" },
  },
];

/** Returns bestsellers (explicit tag) plus a couple of grill favourites. */
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
 * Unique list of food image URLs — used to warm the browser cache on
 * pages that display food (landing carousel, /menu, /qr-menu).
 * Imported by `useImagePreload(...)`.
 */
export const FOOD_IMAGE_SRCS: string[] = Array.from(
  new Set(
    MENU_ITEMS
      .map((i) => i.image)
      .filter((src): src is string => Boolean(src)),
  ),
);

/**
 * Order in which categories appear in chips / tabs across the site.
 * To add a new category, add its id here and add labels in
 * `src/data/translations.ts` under `categories`.
 */
export const MENU_CATEGORY_ORDER: MenuCategoryId[] = [
  "bestsellers",
  "kebab",
  "durum",
  "box",
  "grill",
  "plates",
  "vegetarian",
  "sides",
  "drinks",
  "desserts",
];

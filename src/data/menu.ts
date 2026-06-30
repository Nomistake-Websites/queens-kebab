import type { TranslationLeaf } from "./translations";

export type MenuCategoryId =
  | "bestsellers"
  | "doner-plate"
  | "pita"
  | "durum"
  | "vegetarian"
  | "box"
  | "kofte"
  | "polevky"
  | "grill"
  | "pizza"
  | "special"
  | "salad"
  | "kebab-menu"
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

// ───────────────────────────────────────────────────────────────────────────
// Karlín — full menu
// ───────────────────────────────────────────────────────────────────────────
export const MENU_ITEMS: MenuItem[] = [
  // 1. Döner kebab talíř
  { id: "ka-maly-talir", number: 1, category: "doner-plate", name: { cs: "Malý talíř", en: "Small plate" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "185 Kč", image: IMG("kebab-plate.webp") },
  { id: "ka-maly-talir-hr", number: 2, category: "doner-plate", name: { cs: "Malý talíř s hranolky / rýží", en: "Small plate with fries / rice" }, description: { cs: "Kebab, salát, dressing, hranolky nebo rýže", en: "Kebab, salad, dressing, fries or rice" }, price: "205 Kč", image: IMG("doner-kebab-plate-with-fries.webp") },
  { id: "ka-velky-talir", number: 3, category: "doner-plate", name: { cs: "Velký talíř", en: "Large plate" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "215 Kč", image: IMG("kebab-plate.webp") },
  { id: "ka-velky-talir-hr", number: 4, category: "doner-plate", name: { cs: "Velký talíř s hranolky / rýží", en: "Large plate with fries / rice" }, description: { cs: "Extra kebab, salát, dressing, hranolky nebo rýže", en: "Extra kebab, salad, dressing, fries or rice" }, price: "235 Kč", image: IMG("doner-kebab-plate-with-fries.webp") },
  { id: "ka-iskender", number: 5, category: "doner-plate", name: { cs: "Iskender kebab talíř", en: "Iskender kebab plate" }, description: { cs: "Kebab, jogurt, rajčata, pita, iskender dressing", en: "Kebab, yogurt, tomatoes, pita, iskender dressing" }, price: "279 Kč", image: IMG("iskender-kebab-plate.webp") },

  // 2. Kebab v pita chlebu
  { id: "ka-klasicky-kebab", number: 6, category: "pita", name: { cs: "Klasický kebab", en: "Classic kebab" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "169 Kč", image: IMG("pita-kebab.webp"), tags: ["bestseller"] },
  { id: "ka-klasicky-kebab-syr", number: 7, category: "pita", name: { cs: "Klasický kebab se sýrem", en: "Classic kebab with cheese" }, description: { cs: "Kebab, salát, dressing, sýr", en: "Kebab, salad, dressing, cheese" }, price: "175 Kč", image: IMG("pita-kebab-with-cheese.webp") },
  { id: "ka-mega-kebab", number: 8, category: "pita", name: { cs: "Mega kebab", en: "Mega kebab" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "199 Kč", image: IMG("mega-pita-kebab.webp") },
  { id: "ka-specialni-kebab", number: 9, category: "pita", name: { cs: "Speciální kebab", en: "Special kebab" }, description: { cs: "Jen kebab a dressing", en: "Kebab and dressing only" }, price: "199 Kč", image: IMG("special-kebab-pita-with-mostly-grilled-meat.webp") },

  // 3. Dürüm kebab
  { id: "ka-klasicky-durum", number: 10, category: "durum", name: { cs: "Klasický dürüm", en: "Classic dürüm" }, description: { cs: "Kebab, tortilla, salát, dressing", en: "Kebab, tortilla, salad, dressing" }, price: "169 Kč", image: IMG("classic-durum-kebab-wrap.webp"), tags: ["bestseller"] },
  { id: "ka-klasicky-durum-syr", number: 11, category: "durum", name: { cs: "Klasický dürüm se sýrem", en: "Classic dürüm with cheese" }, description: { cs: "Kebab, tortilla, salát, dressing, sýr", en: "Kebab, tortilla, salad, dressing, cheese" }, price: "175 Kč", image: IMG("durum-kebab-wrap-with-cheese.webp") },
  { id: "ka-mega-durum", number: 12, category: "durum", name: { cs: "Mega dürüm", en: "Mega dürüm" }, description: { cs: "Extra kebab, tortilla, salát, dressing", en: "Extra kebab, tortilla, salad, dressing" }, price: "199 Kč", image: IMG("mega-durum-kebab-wrap.webp") },
  { id: "ka-specialni-durum", number: 13, category: "durum", name: { cs: "Speciální dürüm", en: "Special dürüm" }, description: { cs: "Jen kebab, tortilla a dressing", en: "Kebab, tortilla and dressing only" }, price: "205 Kč", image: IMG("special-durum-wrap-with-mostly-grilled-meat.webp") },
  { id: "ka-klasicky-durum-hr", number: 14, category: "durum", name: { cs: "Klasický dürüm s hranolky", en: "Classic dürüm with fries" }, description: { cs: "Kebab, tortilla, salát, dressing a hranolky", en: "Kebab, tortilla, salad, dressing and fries" }, price: "205 Kč", image: IMG("durum-kebab-wrap-with-fries-inside.webp") },

  // 4. Vegetarian menu
  { id: "ka-halloumi-durum", number: 15, category: "vegetarian", name: { cs: "Halloumi dürüm", en: "Halloumi dürüm" }, description: { cs: "Halloumi, tortilla, salát, dressing", en: "Halloumi, tortilla, salad, dressing" }, price: "159 Kč", image: IMG("halloumi-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "ka-falafel-durum", number: 16, category: "vegetarian", name: { cs: "Falafel dürüm", en: "Falafel dürüm" }, description: { cs: "Falafel, tortilla, salát, dressing", en: "Falafel, tortilla, salad, dressing" }, price: "159 Kč", image: IMG("falafel-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "ka-vegetarian-talir", number: 17, category: "vegetarian", name: { cs: "Vegetarian talíř", en: "Vegetarian plate" }, description: { cs: "S falafelem, halloumi nebo veganskými kuličkami", en: "With falafel, halloumi or vegan köfte balls" }, price: "175 Kč", image: IMG("vegetarian-turkish-plate.webp"), tags: ["vegetarian"] },
  { id: "ka-vegan-kofte-durum", number: 18, category: "vegetarian", name: { cs: "Vegan köfte dürüm", en: "Vegan köfte dürüm" }, description: { cs: "Vegan köfte, tortilla, salát, dressing", en: "Vegan köfte, tortilla, salad, dressing" }, price: "159 Kč", image: IMG("vegan-kofte-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "ka-vegetarian-box", number: 19, category: "vegetarian", name: { cs: "Vegetarian box", en: "Vegetarian box" }, description: { cs: "Falafel nebo halloumi, salát, dressing", en: "Falafel or halloumi, salad, dressing" }, price: "159 Kč", image: IMG("vegetarian-kebab-box.webp"), tags: ["vegetarian"] },

  // 5. Box kebab
  { id: "ka-maly-box", number: 20, category: "box", name: { cs: "Malý box", en: "Small box" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "145 Kč", image: IMG("kebab-box.webp"), tags: ["bestseller"] },
  { id: "ka-maly-box-hr", number: 21, category: "box", name: { cs: "Malý box s hranolky", en: "Small box with fries" }, description: { cs: "Kebab, salát, dressing a hranolky", en: "Kebab, salad, dressing and fries" }, price: "155 Kč", image: IMG("kebab-box-with-fries.webp") },
  { id: "ka-velky-box", number: 22, category: "box", name: { cs: "Velký box", en: "Large box" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "165 Kč", image: IMG("kebab-box.webp") },
  { id: "ka-velky-box-hr", number: 23, category: "box", name: { cs: "Velký box s hranolky", en: "Large box with fries" }, description: { cs: "Extra kebab, salát, dressing a hranolky", en: "Extra kebab, salad, dressing and fries" }, price: "175 Kč", image: IMG("kebab-box-with-fries.webp") },
  { id: "ka-specialni-box", number: 24, category: "box", name: { cs: "Speciální box", en: "Special box" }, description: { cs: "Kebab, hranolky, dressing", en: "Kebab, fries, dressing" }, price: "179 Kč", image: IMG("special-kebab-box.webp") },

  // 6. Balkánské köfte menu (25–27)
  { id: "ka-baget-kofte", number: 25, category: "kofte", name: { cs: "Baget köfte", en: "Köfte baguette" }, description: { cs: "Hovězí köfte, baget, salát, dressing", en: "Beef köfte, baguette, salad, dressing" }, price: "199 Kč", image: IMG("kofte-baguette-sandwich.webp") },
  { id: "ka-kofte-durum", number: 26, category: "kofte", name: { cs: "Köfte dürüm", en: "Köfte dürüm" }, description: { cs: "Hovězí köfte, tortilla, salát, dressing", en: "Beef köfte, tortilla, salad, dressing" }, price: "209 Kč", image: IMG("kofte-durum-wrap.webp") },
  { id: "ka-kofte-talir", number: 27, category: "kofte", name: { cs: "Köfte talíř", en: "Köfte plate" }, description: { cs: "Hovězí köfte, hranolky nebo rýže, salát, dressing", en: "Beef köfte, fries or rice, salad, dressing" }, price: "259 Kč", image: IMG("beef-kofte-plate.webp") },

  // Polévky (28)
  { id: "ka-cockova-polevka", number: 28, category: "polevky", name: { cs: "Čočková polévka", en: "Lentil soup" }, description: { cs: "Turecká čočková polévka", en: "Turkish lentil soup" }, price: "89 Kč", image: IMG("lentil-soup.webp"), tags: ["vegetarian"] },

  // 7. Queen's Grill (29–37)
  { id: "ka-adana-durum", number: 29, category: "grill", name: { cs: "Adana kebab dürüm", en: "Adana kebab dürüm" }, description: { cs: "Adana kebab ve wrapu", en: "Adana kebab in a wrap" }, price: "269 Kč", image: IMG("adana-kebab-durum-wrap.webp"), tags: ["bestseller", "spicy"] },
  { id: "ka-adana-talir", number: 30, category: "grill", name: { cs: "Adana kebab talíř", en: "Adana kebab plate" }, description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" }, price: "289 Kč", image: IMG("adana-kebab-plate.webp"), tags: ["spicy"] },
  { id: "ka-jehneci-sis-durum", number: 31, category: "grill", name: { cs: "Jehněčí šíš dürüm", en: "Lamb shish dürüm" }, description: { cs: "Jehněčí šíš ve wrapu", en: "Lamb shish in a wrap" }, price: "299 Kč", image: IMG("lamb-shish-durum-wrap.webp") },
  { id: "ka-jehneci-sis-talir", number: 32, category: "grill", name: { cs: "Jehněčí šíš talíř", en: "Lamb shish plate" }, description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" }, price: "319 Kč", image: IMG("lamb-shish-plate.webp") },
  { id: "ka-jehneci-kotlety", number: 33, category: "grill", name: { cs: "Jehněčí kotlety", en: "Lamb chops" }, description: { cs: "Grilované jehněčí kotlety", en: "Grilled lamb chops" }, price: "399 Kč", image: IMG("lamb-chops-plate.webp") },
  { id: "ka-kureci-kridelka-sis", number: 34, category: "grill", name: { cs: "Kuřecí křidélka šíš", en: "Chicken wings shish" }, description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" }, price: "225 Kč", image: IMG("grilled-chicken-wings-shish-plate.webp") },
  { id: "ka-kureci-sis-durum", number: 35, category: "grill", name: { cs: "Kuřecí šíš dürüm", en: "Chicken shish dürüm" }, description: { cs: "Kuřecí šíš ve wrapu", en: "Chicken shish in a wrap" }, price: "239 Kč", image: IMG("chicken-shish-durum-wrap.webp") },
  { id: "ka-kureci-sis-talir", number: 36, category: "grill", name: { cs: "Kuřecí šíš talíř", en: "Chicken shish plate" }, description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" }, price: "269 Kč", image: IMG("chicken-shish-plate.webp") },
  { id: "ka-mix-grill", number: 37, category: "grill", name: { cs: "Mix grill", en: "Mix grill" }, description: { cs: "Příloha: pita, rýže, salát", en: "Sides: pita, rice, salad" }, price: "439 Kč", image: IMG("mix-grill-plate.webp"), tags: ["bestseller"] },

  // 8. Queen's Pizza (38–40)
  { id: "ka-pizza-vege", number: 38, category: "pizza", name: { cs: "Pizza Vege", en: "Pizza Veggie" }, description: { cs: "Mozzarella, rajčatový základ, červená cibule, rajčata, žampiony", en: "Mozzarella, tomato base, red onion, tomatoes, mushrooms" }, price: "185 Kč", image: IMG("vegetarian-pizza.webp"), tags: ["vegetarian"] },
  { id: "ka-pizza-classico", number: 39, category: "pizza", name: { cs: "Pizza Classico", en: "Pizza Classico" }, description: { cs: "Mozzarella, rajčatový základ, hovězí salám, červená cibule, rajčata, žampiony", en: "Mozzarella, tomato base, beef salami, red onion, tomatoes, mushrooms" }, price: "215 Kč", image: IMG("classic-mixed-pizza.webp") },
  { id: "ka-pizza-super-mixx", number: 40, category: "pizza", name: { cs: "Pizza Super Mixx", en: "Pizza Super Mixx" }, description: { cs: "Mozzarella, rajčatový základ, hovězí šunka, hovězí salám, černé olivy, žampiony, červená cibule, zelená paprika, rukola", en: "Mozzarella, tomato base, beef ham, beef salami, black olives, mushrooms, red onion, green pepper, rocket" }, price: "235 Kč", image: IMG("loaded-mixed-meat-pizza.webp") },

  // 9. Speciál (41–42)
  { id: "ka-lahmacun", number: 41, category: "special", name: { cs: "Lahmacun", en: "Lahmacun" }, description: { cs: "Těstový základ, směs mletého hovězího masa a salátu", en: "Thin dough base, minced beef and salad" }, price: "139 Kč", image: IMG("lahmacun.webp") },
  { id: "ka-pide-masove", number: 42, category: "special", name: { cs: "Pide masové", en: "Meat pide" }, description: { cs: "Těstový základ, směs mletého hovězího masa a salátu", en: "Dough base, minced beef and salad" }, price: "199 Kč", image: IMG("meat-pide.webp") },

  // 10. Salát (43–44)
  { id: "ka-michany-salat", number: 43, category: "salad", name: { cs: "Míchaný salát", en: "Mixed salad" }, description: { cs: "Rajčata, okurky, ledový salát, zelí, rukola, olivy, sýr, granátová šťáva, dressing", en: "Tomatoes, cucumber, iceberg, cabbage, rocket, olives, cheese, pomegranate, dressing" }, price: "109 Kč", image: IMG("mixed-salad.webp"), tags: ["vegetarian"] },
  { id: "ka-specialni-salat", number: 44, category: "salad", name: { cs: "Speciální salát", en: "Special salad" }, description: { cs: "Kuřecí kebab, rajčata, okurky, ledový salát, zelí, rukola, olivy, sýr, granátová šťáva, dressing", en: "Chicken kebab, tomatoes, cucumber, iceberg, cabbage, rocket, olives, cheese, pomegranate, dressing" }, price: "139 Kč", image: IMG("special-chicken-kebab-salad.webp") },

  // 11. Kebab menu (45–48)
  { id: "ka-doner-cola", number: 45, category: "kebab-menu", name: { cs: "Döner kebab + Cola 330 ml", en: "Döner kebab + Cola 330 ml" }, description: { cs: "Döner kebab s nápojem", en: "Döner kebab with a drink" }, price: "195 Kč", image: IMG("doner-kebab-meal-combo.webp"), tags: ["bestseller"] },
  { id: "ka-doner-cola-hr", number: 46, category: "kebab-menu", name: { cs: "Döner kebab + Cola 330 ml + hranolky", en: "Döner kebab + Cola 330 ml + fries" }, description: { cs: "Döner kebab s nápojem a hranolkami", en: "Döner kebab with a drink and fries" }, price: "245 Kč", image: IMG("doner-kebab-combo-meal-with-fries-cola.webp") },
  { id: "ka-durum-cola", number: 47, category: "kebab-menu", name: { cs: "Dürüm kebab + Cola 330 ml", en: "Dürüm kebab + Cola 330 ml" }, description: { cs: "Dürüm kebab s nápojem", en: "Dürüm kebab with a drink" }, price: "195 Kč", image: IMG("durum-kebab-combo-cola.webp") },
  { id: "ka-durum-cola-hr", number: 48, category: "kebab-menu", name: { cs: "Dürüm kebab + Cola 330 ml + hranolky", en: "Dürüm kebab + Cola 330 ml + fries" }, description: { cs: "Dürüm kebab s nápojem a hranolkami", en: "Dürüm kebab with a drink and fries" }, price: "245 Kč", image: IMG("durum-kebab-combo-with-fries-cola.webp") },

  // 12. Nápoje
  { id: "ka-ayran", category: "drinks", name: { cs: "Ayran", en: "Ayran" }, description: { cs: "Jogurtový turecký nápoj", en: "Turkish yogurt drink" }, price: "39 Kč", image: IMG("ayran.webp"), tags: ["drink"] },
  { id: "ka-cola", category: "drinks", name: { cs: "Cola", en: "Cola" }, description: { cs: "Coca-Cola", en: "Coca-Cola" }, price: "od 39 Kč", image: IMG("soft-drink-cola.webp"), tags: ["drink"] },
  { id: "ka-fanta", category: "drinks", name: { cs: "Fanta", en: "Fanta" }, description: { cs: "Fanta Orange", en: "Fanta Orange" }, price: "od 39 Kč", image: IMG("fanta.webp"), tags: ["drink"] },
  { id: "ka-pivo", category: "drinks", name: { cs: "Pivo", en: "Beer" }, description: { cs: "Pivo", en: "Beer" }, price: "55 Kč", image: IMG("beer.webp"), tags: ["drink"] },

  // 13. Doplňky
  { id: "ka-chilli-cheddar-fries", category: "sides", name: { cs: "Chilli cheddar fries", en: "Chilli cheddar fries" }, description: { cs: "Hranolky s chilli cheddar omáčkou", en: "Fries with chilli cheddar sauce" }, price: "125 Kč", image: IMG("chilli-cheddar-fries.webp") },
  { id: "ka-hranolky-male", category: "sides", name: { cs: "Hranolky malé", en: "Fries small" }, description: { cs: "Malá porce hranolek", en: "Small portion of fries" }, price: "75 Kč", image: IMG("french-fries.webp") },
  { id: "ka-hranolky-velke", category: "sides", name: { cs: "Hranolky velké", en: "Fries large" }, description: { cs: "Velká porce hranolek", en: "Large portion of fries" }, price: "95 Kč", image: IMG("french-fries.webp") },
  { id: "ka-baklava", category: "sides", name: { cs: "Baklava za kus", en: "Baklava per piece" }, description: { cs: "Sladká turecká baklava", en: "Sweet Turkish baklava" }, price: "45 Kč", image: IMG("baklava.webp"), tags: ["dessert"] },
];

/** Karlín category order (full menu). */
export const MENU_CATEGORY_ORDER: MenuCategoryId[] = [
  "doner-plate",
  "pita",
  "durum",
  "vegetarian",
  "box",
  "kofte",
  "polevky",
  "grill",
  "pizza",
  "special",
  "salad",
  "kebab-menu",
  "drinks",
  "sides",
];

// ───────────────────────────────────────────────────────────────────────────
// Žižkov — confirmed categories only (no grill / pizza / speciál / salát /
// nápoje / doplňky yet)
// ───────────────────────────────────────────────────────────────────────────
export const ZIZKOV_MENU_ITEMS: MenuItem[] = [
  // Döner kebab talíř (1–5)
  { id: "zz-maly-talir", number: 1, category: "doner-plate", name: { cs: "Malý talíř", en: "Small plate" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "185 Kč", image: IMG("kebab-plate.webp") },
  { id: "zz-maly-talir-hr", number: 2, category: "doner-plate", name: { cs: "Malý talíř s hranolky / rýží", en: "Small plate with fries / rice" }, description: { cs: "Kebab, salát, dressing, hranolky nebo rýže", en: "Kebab, salad, dressing, fries or rice" }, price: "205 Kč", image: IMG("doner-kebab-plate-with-fries.webp") },
  { id: "zz-velky-talir", number: 3, category: "doner-plate", name: { cs: "Velký talíř", en: "Large plate" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "215 Kč", image: IMG("kebab-plate.webp") },
  { id: "zz-velky-talir-hr", number: 4, category: "doner-plate", name: { cs: "Velký talíř s hranolky / rýží", en: "Large plate with fries / rice" }, description: { cs: "Extra kebab, salát, dressing, hranolky nebo rýže", en: "Extra kebab, salad, dressing, fries or rice" }, price: "235 Kč", image: IMG("doner-kebab-plate-with-fries.webp") },
  { id: "zz-iskender", number: 5, category: "doner-plate", name: { cs: "Iskender kebab talíř", en: "Iskender kebab plate" }, description: { cs: "Kebab, jogurt, rajčata, pita, iskender dressing", en: "Kebab, yogurt, tomatoes, pita, iskender dressing" }, price: "279 Kč", image: IMG("iskender-kebab-plate.webp") },

  // Kebab v pita chlebu (6–9)
  { id: "zz-klasicky-kebab", number: 6, category: "pita", name: { cs: "Klasický kebab", en: "Classic kebab" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "169 Kč", image: IMG("pita-kebab.webp"), tags: ["bestseller"] },
  { id: "zz-klasicky-kebab-syr", number: 7, category: "pita", name: { cs: "Klasický kebab se sýrem", en: "Classic kebab with cheese" }, description: { cs: "Kebab, salát, dressing, sýr", en: "Kebab, salad, dressing, cheese" }, price: "175 Kč", image: IMG("pita-kebab-with-cheese.webp") },
  { id: "zz-mega-kebab", number: 8, category: "pita", name: { cs: "Mega kebab", en: "Mega kebab" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "199 Kč", image: IMG("mega-pita-kebab.webp") },
  { id: "zz-specialni-kebab", number: 9, category: "pita", name: { cs: "Speciální kebab", en: "Special kebab" }, description: { cs: "Jen kebab a dressing", en: "Kebab and dressing only" }, price: "199 Kč", image: IMG("special-kebab-pita-with-mostly-grilled-meat.webp") },

  // Dürüm kebab (10–14)
  { id: "zz-klasicky-durum", number: 10, category: "durum", name: { cs: "Klasický dürüm", en: "Classic dürüm" }, description: { cs: "Kebab, tortilla, salát, dressing", en: "Kebab, tortilla, salad, dressing" }, price: "169 Kč", image: IMG("classic-durum-kebab-wrap.webp"), tags: ["bestseller"] },
  { id: "zz-klasicky-durum-syr", number: 11, category: "durum", name: { cs: "Klasický dürüm se sýrem", en: "Classic dürüm with cheese" }, description: { cs: "Kebab, tortilla, salát, dressing, sýr", en: "Kebab, tortilla, salad, dressing, cheese" }, price: "175 Kč", image: IMG("durum-kebab-wrap-with-cheese.webp") },
  { id: "zz-mega-durum", number: 12, category: "durum", name: { cs: "Mega dürüm", en: "Mega dürüm" }, description: { cs: "Extra kebab, tortilla, salát, dressing", en: "Extra kebab, tortilla, salad, dressing" }, price: "199 Kč", image: IMG("mega-durum-kebab-wrap.webp") },
  { id: "zz-specialni-durum", number: 13, category: "durum", name: { cs: "Speciální dürüm", en: "Special dürüm" }, description: { cs: "Jen kebab, tortilla a dressing", en: "Kebab, tortilla and dressing only" }, price: "205 Kč", image: IMG("special-durum-wrap-with-mostly-grilled-meat.webp") },
  { id: "zz-klasicky-durum-hr", number: 14, category: "durum", name: { cs: "Klasický dürüm s hranolky", en: "Classic dürüm with fries" }, description: { cs: "Kebab, tortilla, salát, dressing a hranolky", en: "Kebab, tortilla, salad, dressing and fries" }, price: "205 Kč", image: IMG("durum-kebab-wrap-with-fries-inside.webp") },

  // Vegetarian menu (15–19)
  { id: "zz-vegetarian-talir", number: 15, category: "vegetarian", name: { cs: "Vegetarian talíř", en: "Vegetarian plate" }, description: { cs: "Na výběr: falafel, halloumi nebo vegan köfte", en: "Choice of: falafel, halloumi or vegan köfte" }, price: "175 Kč", image: IMG("vegetarian-turkish-plate.webp"), tags: ["vegetarian"] },
  { id: "zz-falafel-durum", number: 16, category: "vegetarian", name: { cs: "Falafel dürüm", en: "Falafel dürüm" }, description: { cs: "Falafel, tortilla, salát, dressing", en: "Falafel, tortilla, salad, dressing" }, price: "159 Kč", image: IMG("falafel-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "zz-halloumi-durum", number: 17, category: "vegetarian", name: { cs: "Halloumi dürüm", en: "Halloumi dürüm" }, description: { cs: "Halloumi, tortilla, salát, dressing", en: "Halloumi, tortilla, salad, dressing" }, price: "159 Kč", image: IMG("halloumi-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "zz-vegan-kofte-durum", number: 18, category: "vegetarian", name: { cs: "Vegan köfte dürüm", en: "Vegan köfte dürüm" }, description: { cs: "Vegan köfte, tortilla, salát, dressing", en: "Vegan köfte, tortilla, salad, dressing" }, price: "169 Kč", image: IMG("vegan-kofte-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "zz-vegetarian-box", number: 19, category: "vegetarian", name: { cs: "Vegetarian box", en: "Vegetarian box" }, description: { cs: "Falafel nebo halloumi, salát, dressing", en: "Falafel or halloumi, salad, dressing" }, price: "159 Kč", image: IMG("vegetarian-kebab-box.webp"), tags: ["vegetarian"] },

  // Box kebab (20–24)
  { id: "zz-maly-box", number: 20, category: "box", name: { cs: "Malý box", en: "Small box" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "145 Kč", image: IMG("kebab-box.webp"), tags: ["bestseller"] },
  { id: "zz-maly-box-hr", number: 21, category: "box", name: { cs: "Malý box s hranolky", en: "Small box with fries" }, description: { cs: "Kebab, salát, dressing a hranolky", en: "Kebab, salad, dressing and fries" }, price: "155 Kč", image: IMG("kebab-box-with-fries.webp") },
  { id: "zz-velky-box", number: 22, category: "box", name: { cs: "Velký box", en: "Large box" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "165 Kč", image: IMG("kebab-box.webp") },
  { id: "zz-velky-box-hr", number: 23, category: "box", name: { cs: "Velký box s hranolky", en: "Large box with fries" }, description: { cs: "Extra kebab, salát, dressing a hranolky", en: "Extra kebab, salad, dressing and fries" }, price: "175 Kč", image: IMG("kebab-box-with-fries.webp") },
  { id: "zz-specialni-box", number: 24, category: "box", name: { cs: "Speciální box", en: "Special box" }, description: { cs: "Kebab, hranolky, dressing", en: "Kebab, fries, dressing" }, price: "179 Kč", image: IMG("special-kebab-box.webp") },

  // Kebab menu (25–28)
  { id: "zz-doner-cola", number: 25, category: "kebab-menu", name: { cs: "Döner kebab + Cola 330 ml", en: "Döner kebab + Cola 330 ml" }, description: { cs: "Döner kebab s nápojem", en: "Döner kebab with a drink" }, price: "195 Kč", image: IMG("doner-kebab-meal-combo.webp"), tags: ["bestseller"] },
  { id: "zz-doner-cola-hr", number: 26, category: "kebab-menu", name: { cs: "Döner kebab + Cola 330 ml + hranolky", en: "Döner kebab + Cola 330 ml + fries" }, description: { cs: "Döner kebab s nápojem a hranolkami", en: "Döner kebab with a drink and fries" }, price: "245 Kč", image: IMG("doner-kebab-combo-meal-with-fries-cola.webp") },
  { id: "zz-durum-cola", number: 27, category: "kebab-menu", name: { cs: "Dürüm kebab + Cola 330 ml", en: "Dürüm kebab + Cola 330 ml" }, description: { cs: "Dürüm kebab s nápojem", en: "Dürüm kebab with a drink" }, price: "195 Kč", image: IMG("durum-kebab-combo-cola.webp") },
  { id: "zz-durum-cola-hr", number: 28, category: "kebab-menu", name: { cs: "Dürüm kebab + Cola 330 ml + hranolky", en: "Dürüm kebab + Cola 330 ml + fries" }, description: { cs: "Dürüm kebab s nápojem a hranolkami", en: "Dürüm kebab with a drink and fries" }, price: "245 Kč", image: IMG("durum-kebab-combo-with-fries-cola.webp") },

  // Nápoje
  { id: "zz-cola", category: "drinks", name: { cs: "Cola", en: "Cola" }, description: { cs: "Coca-Cola", en: "Coca-Cola" }, price: "od 39 Kč", image: IMG("soft-drink-cola.webp"), tags: ["drink"] },
  { id: "zz-fanta", category: "drinks", name: { cs: "Fanta", en: "Fanta" }, description: { cs: "Fanta Orange", en: "Fanta Orange" }, price: "od 39 Kč", image: IMG("fanta.webp"), tags: ["drink"] },
];

export const ZIZKOV_CATEGORY_ORDER: MenuCategoryId[] = [
  "doner-plate",
  "pita",
  "durum",
  "vegetarian",
  "box",
  "kebab-menu",
  "drinks",
];

// ───────────────────────────────────────────────────────────────────────────
// Vršovice — confirmed categories only (no grill / pizza / speciál yet)
// ───────────────────────────────────────────────────────────────────────────
export const VRSOVICE_MENU_ITEMS: MenuItem[] = [
  // Döner kebab talíř (1–5)
  { id: "vr-maly-talir", number: 1, category: "doner-plate", name: { cs: "Malý talíř", en: "Small plate" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "185 Kč", image: IMG("kebab-plate.webp") },
  { id: "vr-maly-talir-hr", number: 2, category: "doner-plate", name: { cs: "Malý talíř s hranolky / rýží", en: "Small plate with fries / rice" }, description: { cs: "Kebab, salát, dressing, hranolky nebo rýže", en: "Kebab, salad, dressing, fries or rice" }, price: "205 Kč", image: IMG("doner-kebab-plate-with-fries.webp") },
  { id: "vr-velky-talir", number: 3, category: "doner-plate", name: { cs: "Velký talíř", en: "Large plate" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "215 Kč", image: IMG("kebab-plate.webp") },
  { id: "vr-velky-talir-hr", number: 4, category: "doner-plate", name: { cs: "Velký talíř s hranolky / rýží", en: "Large plate with fries / rice" }, description: { cs: "Extra kebab, salát, dressing, hranolky nebo rýže", en: "Extra kebab, salad, dressing, fries or rice" }, price: "235 Kč", image: IMG("doner-kebab-plate-with-fries.webp") },
  { id: "vr-iskender", number: 5, category: "doner-plate", name: { cs: "Iskender kebab talíř", en: "Iskender kebab plate" }, description: { cs: "Kebab, jogurt, rajčata, pita, iskender dressing", en: "Kebab, yogurt, tomatoes, pita, iskender dressing" }, price: "279 Kč", image: IMG("iskender-kebab-plate.webp") },

  // Kebab v pita chlebu (6–9)
  { id: "vr-klasicky-kebab", number: 6, category: "pita", name: { cs: "Klasický kebab", en: "Classic kebab" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "169 Kč", image: IMG("pita-kebab.webp"), tags: ["bestseller"] },
  { id: "vr-klasicky-kebab-syr", number: 7, category: "pita", name: { cs: "Klasický kebab se sýrem", en: "Classic kebab with cheese" }, description: { cs: "Kebab, salát, dressing, sýr", en: "Kebab, salad, dressing, cheese" }, price: "175 Kč", image: IMG("pita-kebab-with-cheese.webp") },
  { id: "vr-mega-kebab", number: 8, category: "pita", name: { cs: "Mega kebab", en: "Mega kebab" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "199 Kč", image: IMG("mega-pita-kebab.webp") },
  { id: "vr-specialni-kebab", number: 9, category: "pita", name: { cs: "Speciální kebab", en: "Special kebab" }, description: { cs: "Jen kebab a dressing", en: "Kebab and dressing only" }, price: "199 Kč", image: IMG("special-kebab-pita-with-mostly-grilled-meat.webp") },

  // Dürüm kebab (10–14)
  { id: "vr-klasicky-durum", number: 10, category: "durum", name: { cs: "Klasický dürüm", en: "Classic dürüm" }, description: { cs: "Kebab, tortilla, salát, dressing", en: "Kebab, tortilla, salad, dressing" }, price: "169 Kč", image: IMG("classic-durum-kebab-wrap.webp"), tags: ["bestseller"] },
  { id: "vr-klasicky-durum-syr", number: 11, category: "durum", name: { cs: "Klasický dürüm se sýrem", en: "Classic dürüm with cheese" }, description: { cs: "Kebab, tortilla, salát, dressing, sýr", en: "Kebab, tortilla, salad, dressing, cheese" }, price: "175 Kč", image: IMG("durum-kebab-wrap-with-cheese.webp") },
  { id: "vr-mega-durum", number: 12, category: "durum", name: { cs: "Mega dürüm", en: "Mega dürüm" }, description: { cs: "Extra kebab, tortilla, salát, dressing", en: "Extra kebab, tortilla, salad, dressing" }, price: "199 Kč", image: IMG("mega-durum-kebab-wrap.webp") },
  { id: "vr-specialni-durum", number: 13, category: "durum", name: { cs: "Speciální dürüm", en: "Special dürüm" }, description: { cs: "Jen kebab, tortilla a dressing", en: "Kebab, tortilla and dressing only" }, price: "205 Kč", image: IMG("special-durum-wrap-with-mostly-grilled-meat.webp") },
  { id: "vr-klasicky-durum-hr", number: 14, category: "durum", name: { cs: "Klasický dürüm s hranolky", en: "Classic dürüm with fries" }, description: { cs: "Kebab, tortilla, salát, dressing a hranolky", en: "Kebab, tortilla, salad, dressing and fries" }, price: "205 Kč", image: IMG("durum-kebab-wrap-with-fries-inside.webp") },

  // Vegetarian menu (15–19)
  { id: "vr-vegetarian-box", number: 15, category: "vegetarian", name: { cs: "Vegetarian box", en: "Vegetarian box" }, description: { cs: "Falafel nebo halloumi, salát, dressing", en: "Falafel or halloumi, salad, dressing" }, price: "159 Kč", image: IMG("vegetarian-kebab-box.webp"), tags: ["vegetarian"] },
  { id: "vr-falafel-durum", number: 16, category: "vegetarian", name: { cs: "Falafel dürüm", en: "Falafel dürüm" }, description: { cs: "Falafel, tortilla, salát, dressing", en: "Falafel, tortilla, salad, dressing" }, price: "159 Kč", image: IMG("falafel-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "vr-halloumi-durum", number: 17, category: "vegetarian", name: { cs: "Halloumi dürüm", en: "Halloumi dürüm" }, description: { cs: "Halloumi, tortilla, salát, dressing", en: "Halloumi, tortilla, salad, dressing" }, price: "159 Kč", image: IMG("halloumi-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "vr-vegan-kofte-durum", number: 18, category: "vegetarian", name: { cs: "Vegan köfte dürüm", en: "Vegan köfte dürüm" }, description: { cs: "Vegan köfte, tortilla, salát, dressing", en: "Vegan köfte, tortilla, salad, dressing" }, price: "169 Kč", image: IMG("vegan-kofte-durum-wrap.webp"), tags: ["vegetarian"] },
  { id: "vr-vegetarian-talir", number: 19, category: "vegetarian", name: { cs: "Vegetarian talíř", en: "Vegetarian plate" }, description: { cs: "Na výběr: falafel, halloumi nebo vegan köfte", en: "Choice of: falafel, halloumi or vegan köfte" }, price: "175 Kč", image: IMG("vegetarian-turkish-plate.webp"), tags: ["vegetarian"] },

  // Box kebab (20–24)
  { id: "vr-maly-box", number: 20, category: "box", name: { cs: "Malý box", en: "Small box" }, description: { cs: "Kebab, salát, dressing", en: "Kebab, salad, dressing" }, price: "145 Kč", image: IMG("kebab-box.webp"), tags: ["bestseller"] },
  { id: "vr-maly-box-hr", number: 21, category: "box", name: { cs: "Malý box s hranolky", en: "Small box with fries" }, description: { cs: "Kebab, salát, dressing a hranolky", en: "Kebab, salad, dressing and fries" }, price: "155 Kč", image: IMG("kebab-box-with-fries.webp") },
  { id: "vr-velky-box", number: 22, category: "box", name: { cs: "Velký box", en: "Large box" }, description: { cs: "Extra kebab, salát, dressing", en: "Extra kebab, salad, dressing" }, price: "165 Kč", image: IMG("kebab-box.webp") },
  { id: "vr-velky-box-hr", number: 23, category: "box", name: { cs: "Velký box s hranolky", en: "Large box with fries" }, description: { cs: "Extra kebab, salát, dressing a hranolky", en: "Extra kebab, salad, dressing and fries" }, price: "175 Kč", image: IMG("kebab-box-with-fries.webp") },
  { id: "vr-specialni-box", number: 24, category: "box", name: { cs: "Speciální box", en: "Special box" }, description: { cs: "Kebab, hranolky, dressing", en: "Kebab, fries, dressing" }, price: "179 Kč", image: IMG("special-kebab-box.webp") },

  // Balkánské köfte menu (25–28)
  { id: "vr-baget-kofte", number: 25, category: "kofte", name: { cs: "Baget köfte", en: "Köfte baguette" }, description: { cs: "Hovězí köfte, baget, salát, dressing", en: "Beef köfte, baguette, salad, dressing" }, price: "199 Kč", image: IMG("kofte-baguette-sandwich.webp") },
  { id: "vr-kofte-durum", number: 26, category: "kofte", name: { cs: "Köfte dürüm", en: "Köfte dürüm" }, description: { cs: "Hovězí köfte, tortilla, salát, dressing", en: "Beef köfte, tortilla, salad, dressing" }, price: "209 Kč", image: IMG("kofte-durum-wrap.webp") },
  { id: "vr-kofte-talir", number: 27, category: "kofte", name: { cs: "Köfte talíř", en: "Köfte plate" }, description: { cs: "Hovězí köfte, hranolky nebo rýže, salát, dressing", en: "Beef köfte, fries or rice, salad, dressing" }, price: "249 Kč", image: IMG("beef-kofte-plate.webp") },
  { id: "vr-iskender-kofte-talir", number: 28, category: "kofte", name: { cs: "Iskender köfte talíř", en: "Iskender köfte plate" }, description: { cs: "Hovězí köfte, hranolky nebo rýže, salát, dressing", en: "Beef köfte, fries or rice, salad, dressing" }, price: "259 Kč", image: IMG("beef-kofte-plate.webp") },

  // Salát (40–41)
  { id: "vr-michany-salat", number: 40, category: "salad", name: { cs: "Míchaný salát", en: "Mixed salad" }, description: { cs: "Rajčata, okurky, ledový salát, zelí, rukola, olivy, sýr, granátová šťáva, dressing", en: "Tomatoes, cucumber, iceberg, cabbage, rocket, olives, cheese, pomegranate, dressing" }, price: "99 Kč", image: IMG("mixed-salad.webp"), tags: ["vegetarian"] },
  { id: "vr-specialni-salat", number: 41, category: "salad", name: { cs: "Speciální salát", en: "Special salad" }, description: { cs: "Kuřecí kebab, rajčata, okurky, ledový salát, zelí, rukola, olivy, sýr, granátová šťáva, dressing", en: "Chicken kebab, tomatoes, cucumber, iceberg, cabbage, rocket, olives, cheese, pomegranate, dressing" }, price: "129 Kč", image: IMG("special-chicken-kebab-salad.webp") },

  // Kebab menu (42–45)
  { id: "vr-doner-cola", number: 42, category: "kebab-menu", name: { cs: "Döner kebab + Cola 330 ml", en: "Döner kebab + Cola 330 ml" }, description: { cs: "Döner kebab s nápojem", en: "Döner kebab with a drink" }, price: "195 Kč", image: IMG("doner-kebab-meal-combo.webp"), tags: ["bestseller"] },
  { id: "vr-doner-cola-hr", number: 43, category: "kebab-menu", name: { cs: "Döner kebab + Cola 330 ml + hranolky", en: "Döner kebab + Cola 330 ml + fries" }, description: { cs: "Döner kebab s nápojem a hranolkami", en: "Döner kebab with a drink and fries" }, price: "245 Kč", image: IMG("doner-kebab-combo-meal-with-fries-cola.webp") },
  { id: "vr-durum-cola", number: 44, category: "kebab-menu", name: { cs: "Dürüm kebab + Cola 330 ml", en: "Dürüm kebab + Cola 330 ml" }, description: { cs: "Dürüm kebab s nápojem", en: "Dürüm kebab with a drink" }, price: "195 Kč", image: IMG("durum-kebab-combo-cola.webp") },
  { id: "vr-durum-cola-hr", number: 45, category: "kebab-menu", name: { cs: "Dürüm kebab + Cola 330 ml + hranolky", en: "Dürüm kebab + Cola 330 ml + fries" }, description: { cs: "Dürüm kebab s nápojem a hranolkami", en: "Dürüm kebab with a drink and fries" }, price: "245 Kč", image: IMG("durum-kebab-combo-with-fries-cola.webp") },

  // Nápoje
  { id: "vr-ayran", category: "drinks", name: { cs: "Ayran", en: "Ayran" }, description: { cs: "Jogurtový turecký nápoj", en: "Turkish yogurt drink" }, price: "35 Kč", image: IMG("ayran.webp"), tags: ["drink"] },
  { id: "vr-cola", category: "drinks", name: { cs: "Cola", en: "Cola" }, description: { cs: "Coca-Cola", en: "Coca-Cola" }, price: "od 35 Kč", image: IMG("soft-drink-cola.webp"), tags: ["drink"] },
  { id: "vr-fanta", category: "drinks", name: { cs: "Fanta", en: "Fanta" }, description: { cs: "Fanta Orange", en: "Fanta Orange" }, price: "od 35 Kč", image: IMG("fanta.webp"), tags: ["drink"] },
  { id: "vr-pivo", category: "drinks", name: { cs: "Pivo", en: "Beer" }, description: { cs: "Pivo", en: "Beer" }, price: "50 Kč", image: IMG("beer.webp"), tags: ["drink"] },

  // Doplňky
  { id: "vr-chilli-cheddar-fries", category: "sides", name: { cs: "Chilli cheddar fries", en: "Chilli cheddar fries" }, description: { cs: "Hranolky s chilli cheddar omáčkou", en: "Fries with chilli cheddar sauce" }, price: "99 Kč", image: IMG("chilli-cheddar-fries.webp") },
  { id: "vr-hranolky-male", category: "sides", name: { cs: "Hranolky malé", en: "Fries small" }, description: { cs: "Malá porce hranolek", en: "Small portion of fries" }, price: "70 Kč", image: IMG("french-fries.webp") },
  { id: "vr-hranolky-velke", category: "sides", name: { cs: "Hranolky velké", en: "Fries large" }, description: { cs: "Velká porce hranolek", en: "Large portion of fries" }, price: "90 Kč", image: IMG("french-fries.webp") },
  { id: "vr-baklava", category: "sides", name: { cs: "Baklava za kus", en: "Baklava per piece" }, description: { cs: "Sladká turecká baklava", en: "Sweet Turkish baklava" }, price: "45 Kč", image: IMG("baklava.webp"), tags: ["dessert"] },
];

export const VRSOVICE_CATEGORY_ORDER: MenuCategoryId[] = [
  "doner-plate",
  "pita",
  "durum",
  "vegetarian",
  "box",
  "kofte",
  "salad",
  "kebab-menu",
  "drinks",
  "sides",
];

// ───────────────────────────────────────────────────────────────────────────
// Helpers
// ───────────────────────────────────────────────────────────────────────────

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

/** Category order including the "bestsellers" virtual filter at the front. */
export const MENU_FILTER_ORDER: MenuCategoryId[] = [
  "bestsellers",
  ...MENU_CATEGORY_ORDER,
];

/**
 * Unique list of food image URLs — available for optional cache warming.
 * Not used to bulk-preload the whole menu; the /menu page relies on
 * next/image lazy loading instead.
 */
export const FOOD_IMAGE_SRCS: string[] = Array.from(
  new Set(
    MENU_ITEMS.map((i) => i.image).filter((src): src is string => Boolean(src)),
  ),
);

export interface BranchMenu {
  items: MenuItem[];
  /** Ordered real categories (no "bestsellers" virtual filter). */
  categories: MenuCategoryId[];
  /** True when this branch shows a reduced menu (more items coming). */
  limited?: boolean;
}

/**
 * Per-branch menu registry (keyed by Location.id). Branches without an entry
 * (e.g. Bohnice) are treated as "coming soon" by the /menu page.
 */
export const BRANCH_MENUS: Record<string, BranchMenu> = {
  karlin: { items: MENU_ITEMS, categories: MENU_CATEGORY_ORDER },
  vrsovice: {
    items: VRSOVICE_MENU_ITEMS,
    categories: VRSOVICE_CATEGORY_ORDER,
    limited: true,
  },
  zizkov: {
    items: ZIZKOV_MENU_ITEMS,
    categories: ZIZKOV_CATEGORY_ORDER,
    limited: true,
  },
};

export function getBranchMenu(branchId: string): BranchMenu | null {
  return BRANCH_MENUS[branchId] ?? null;
}

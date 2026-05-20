import type { TranslationLeaf } from "./translations";

export interface Review {
  author: string;
  rating: number;
  body: TranslationLeaf;
  branch?: TranslationLeaf;
}

/**
 * Hand-picked sample reviews for the website.
 * Replace with real Google review excerpts when you have permission.
 */
export const REVIEWS: Review[] = [
  {
    author: "Martin K.",
    rating: 5,
    body: {
      cs: "Nejlepší kebab v Praze. Maso z grilu, poctivá porce a rychlá obsluha. Vracím se každý týden.",
      en: "Best kebab in Prague. Properly grilled meat, generous portion and quick service. I come back every week.",
    },
    branch: { cs: "Žižkov", en: "Žižkov" },
  },
  {
    author: "Petra S.",
    rating: 5,
    body: {
      cs: "Dürüm jako z Istanbulu. Krásně okořeněné, čerstvá zelenina a domácí omáčka.",
      en: "Dürüm just like in Istanbul. Beautifully seasoned, fresh veggies and homemade sauce.",
    },
    branch: { cs: "Karlín", en: "Karlín" },
  },
  {
    author: "David R.",
    rating: 5,
    body: {
      cs: "Mix grill talíř je naprostá pecka. Falafel je taky výborný, manželka byla nadšená.",
      en: "The mix grill plate is unreal. Falafel is great too – my wife loved it.",
    },
    branch: { cs: "Vršovice", en: "Vršovice" },
  },
  {
    author: "Aneta H.",
    rating: 5,
    body: {
      cs: "Konečně místo, kde mají vege opravdu chutné. Halloumi talíř doporučuji.",
      en: "Finally a spot with seriously tasty veggie options. The halloumi plate is a must.",
    },
    branch: { cs: "Žižkov", en: "Žižkov" },
  },
];

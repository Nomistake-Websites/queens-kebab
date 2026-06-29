import type { TranslationLeaf } from "./translations";

export interface Review {
  author: string;
  rating: number;
  body: TranslationLeaf;
  branch?: TranslationLeaf;
  /** Optional per-aspect ratings shown on the card when present. */
  aspects?: {
    food?: number;
    service?: number;
    atmosphere?: number;
  };
}

/**
 * Real Google reviews, grouped by branch.
 * Review text is authentic, so it is shown verbatim in both languages
 * (we don't machine-translate guest reviews).
 */
const KARLIN: TranslationLeaf = { cs: "Karlín", en: "Karlín" };
const ZIZKOV: TranslationLeaf = { cs: "Žižkov", en: "Žižkov" };
const EDEN: TranslationLeaf = { cs: "Eden / Vršovice", en: "Eden / Vršovice" };

export const REVIEWS: Review[] = [
  // Karlín
  {
    author: "Syed Sameed Abbas",
    rating: 5,
    branch: KARLIN,
    body: {
      cs: "The food was amazing and hospitality is even more. Thank you we will visit again.",
      en: "The food was amazing and hospitality is even more. Thank you we will visit again.",
    },
    aspects: { food: 5, service: 5, atmosphere: 5 },
  },
  {
    author: "ali boumelit",
    rating: 5,
    branch: KARLIN,
    body: {
      cs: "Wonderful experience and the food is really delicious.",
      en: "Wonderful experience and the food is really delicious.",
    },
  },
  {
    author: "Harun Kaçan",
    rating: 5,
    branch: KARLIN,
    body: {
      cs: "Jídlo bylo vynikající, děkuji personálu.",
      en: "Jídlo bylo vynikající, děkuji personálu.",
    },
  },
  // Žižkov
  {
    author: "Zeynepece Tali",
    rating: 5,
    branch: ZIZKOV,
    body: {
      cs: "Bylo to velmi chutné a syté, rozhodně doporučuji.",
      en: "Bylo to velmi chutné a syté, rozhodně doporučuji.",
    },
  },
  {
    author: "Patrick Hewlett",
    rating: 5,
    branch: ZIZKOV,
    body: {
      cs: "Best kebab place in Prague !",
      en: "Best kebab place in Prague !",
    },
  },
  {
    author: "Verča Votočková",
    rating: 5,
    branch: ZIZKOV,
    body: {
      cs: "Můj nejoblíbenější kebab v okolí. Skvěle ochucený, tak akorát pikantní a do boxu s hranolkama přijdou všechny možné toppingy jako grilovaná zelenina, kyselé okurky, občas sýr.",
      en: "Můj nejoblíbenější kebab v okolí. Skvěle ochucený, tak akorát pikantní a do boxu s hranolkama přijdou všechny možné toppingy jako grilovaná zelenina, kyselé okurky, občas sýr.",
    },
  },
  // Eden / Vršovice
  {
    author: "Adam Soustružník",
    rating: 5,
    branch: EDEN,
    body: {
      cs: "Výborný kebab, super obsluha a hezké posezení venku. 👍 doporučuju",
      en: "Výborný kebab, super obsluha a hezké posezení venku. 👍 doporučuju",
    },
  },
  {
    author: "Melanie Müller",
    rating: 5,
    branch: EDEN,
    body: {
      cs: "Už dlouho jsem nejedl tak dobrý kebab. Děkuji!",
      en: "Už dlouho jsem nejedl tak dobrý kebab. Děkuji!",
    },
  },
  {
    author: "Saruhan Sarılı",
    rating: 5,
    branch: EDEN,
    body: {
      cs: "Všechno bylo úžasné, děkuji za vaši snahu!",
      en: "Všechno bylo úžasné, děkuji za vaši snahu!",
    },
  },
];

/** Public Google reviews link (shortened, opens a Google search). */
export const GOOGLE_REVIEWS_URL =
  "https://www.google.com/search?q=queens+kebab+reviews";

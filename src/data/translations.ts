export type Lang = "cs" | "en";

export const SUPPORTED_LANGS: Lang[] = ["cs", "en"];

export const translations = {
  nav: {
    menu: { cs: "Menu", en: "Menu" },
    locations: { cs: "Pobočky", en: "Locations" },
    order: { cs: "Objednat", en: "Order" },
    gallery: { cs: "Galerie", en: "Gallery" },
    reviews: { cs: "Recenze", en: "Reviews" },
    contact: { cs: "Kontakt", en: "Contact" },
  },
  hero: {
    eyebrow: {
      cs: "Turecká kuchyně • Praha",
      en: "Turkish cuisine • Prague",
    },
    title: {
      cs: "Queen's Kebab & Grill House",
      en: "Queen's Kebab & Grill House",
    },
    tagline: {
      cs: "Poctivý turecký kebab v Praze",
      en: "Authentic Turkish kebab in Prague",
    },
    subtitle: {
      cs:
        "Čerstvé maso z grilu, výrazná chuť, poctivé porce a čtyři pobočky v Praze – Karlín, Vršovice, Žižkov a Bohnice.",
      en:
        "Fresh grilled meat, bold flavour, generous portions and four branches in Prague – Karlín, Vršovice, Žižkov and Bohnice.",
    },
    ctaMenu: { cs: "Zobrazit menu", en: "View menu" },
    ctaLocations: { cs: "Najít pobočku", en: "Find location" },
    ctaOrder: { cs: "Objednat online", en: "Order online" },
    rating: { cs: "Hodnocení Google", en: "Google rating" },
  },
  sections: {
    bestsellers: {
      eyebrow: { cs: "Nejprodávanější", en: "Bestsellers" },
      title: { cs: "Co lidé milují nejvíc", en: "What people love most" },
      subtitle: {
        cs: "Klasika, na kterou se k nám vracejí. Vždy čerstvé, vždy poctivé.",
        en: "The classics our guests keep coming back for. Always fresh, always honest.",
      },
    },
    menuPreview: {
      eyebrow: { cs: "Menu", en: "Menu" },
      title: { cs: "Naše kuchyně", en: "Our kitchen" },
      subtitle: {
        cs: "Turecký kebab, dürüm, boxy, grilované speciality, vegetariánské volby i nápoje.",
        en: "Turkish kebab, dürüm, boxes, grill specials, vegetarian options and drinks.",
      },
      viewAll: { cs: "Celé menu", en: "Full menu" },
      viewFullMenu: { cs: "Zobrazit celé menu", en: "View full menu" },
    },
    locations: {
      eyebrow: { cs: "Pobočky", en: "Locations" },
      title: { cs: "Čtyři místa v Praze", en: "Four spots in Prague" },
      subtitle: {
        cs: "Najděte nejbližší pobočku a stavte se. Otevřeno každý den.",
        en: "Find the nearest branch and drop by. Open every day.",
      },
    },
    order: {
      eyebrow: { cs: "Objednat", en: "Order" },
      title: { cs: "Doručíme až k vám", en: "Delivered to your door" },
      subtitle: {
        cs: "Objednávejte přes Wolt, Bolt Food nebo Dáme jídlo. Nebo si jednoduše zavolejte.",
        en: "Order via Wolt, Bolt Food or Dáme jídlo. Or simply give us a call.",
      },
    },
    why: {
      eyebrow: { cs: "Proč Queen's", en: "Why Queen's" },
      title: { cs: "Poctivá turecká kuchyně", en: "Honest Turkish cuisine" },
      subtitle: {
        cs: "Bez kompromisů. Maso, koření i recepty přímo z Turecka.",
        en: "No compromises. Meat, spices and recipes straight from Turkey.",
      },
    },
    gallery: {
      eyebrow: { cs: "Galerie", en: "Gallery" },
      title: { cs: "Vůně grilu", en: "Straight from the grill" },
      subtitle: {
        cs: "Ochutnejte očima.",
        en: "A taste with your eyes.",
      },
    },
    reviews: {
      eyebrow: { cs: "Recenze", en: "Reviews" },
      title: { cs: "Hosté nám věří", en: "Loved by our guests" },
      subtitle: {
        cs: "4,6 hvězdy z 2600+ recenzí na Google.",
        en: "4.6 stars from 2600+ Google reviews.",
      },
    },
    contact: {
      eyebrow: { cs: "Kontakt", en: "Contact" },
      title: { cs: "Ozvěte se nám", en: "Get in touch" },
      subtitle: {
        cs: "Rádi odpovíme. Volejte, pište nebo sledujte na sítích.",
        en: "We're happy to chat. Call, message or follow us online.",
      },
    },
  },
  why: {
    items: [
      {
        title: { cs: "Maso z grilu", en: "Grilled meat" },
        body: {
          cs: "Marinujeme po turecku, grilujeme každý den čerstvé.",
          en: "Marinated the Turkish way, grilled fresh every day.",
        },
      },
      {
        title: { cs: "Poctivé porce", en: "Generous portions" },
        body: {
          cs: "Najíte se. Žádné šidění, žádné kompromisy.",
          en: "You'll leave full. No shortcuts, no compromises.",
        },
      },
      {
        title: { cs: "Čtyři místa v Praze", en: "Four spots in Prague" },
        body: {
          cs: "Karlín, Vršovice, Žižkov a brzy také Bohnice. Otevřeno každý den.",
          en: "Karlín, Vršovice, Žižkov and Bohnice coming soon. Open every day.",
        },
      },
      {
        title: { cs: "Vege i halal", en: "Veggie & halal" },
        body: {
          cs: "Falafel, halloumi, vegetariánské volby a halal maso.",
          en: "Falafel, halloumi, veggie options and halal meat.",
        },
      },
    ],
  },
  qr: {
    title: { cs: "Menu", en: "Menu" },
    subtitle: {
      cs: "Vyberte si – připravujeme čerstvé.",
      en: "Pick something – we're cooking fresh.",
    },
    searchPlaceholder: { cs: "Hledat v menu…", en: "Search the menu…" },
    branchLabel: { cs: "Pobočka", en: "Branch" },
    call: { cs: "Zavolat", en: "Call" },
    directions: { cs: "Trasa", en: "Directions" },
    orderOnline: { cs: "Objednat online", en: "Order online" },
    review: {
      title: { cs: "Chutnalo vám?", en: "Enjoyed your meal?" },
      body: {
        cs: "Ohodnoťte nás na Google – pomáhá nám to dělat věci ještě lépe.",
        en: "Leave us a Google review – it helps us keep getting better.",
      },
      cta: { cs: "Napsat recenzi", en: "Leave a review" },
    },
    noResults: { cs: "Nic jsme nenašli.", en: "No items found." },
    allergens: { cs: "Alergeny", en: "Allergens" },
    fromPrice: { cs: "od", en: "from" },
  },
  tags: {
    bestseller: { cs: "Bestseller", en: "Bestseller" },
    spicy: { cs: "Pikantní", en: "Spicy" },
    vegetarian: { cs: "Vegetariánské", en: "Vegetarian" },
    new: { cs: "Novinka", en: "New" },
    halal: { cs: "Halal", en: "Halal" },
    dessert: { cs: "Dezert", en: "Dessert" },
    drink: { cs: "Nápoj", en: "Drink" },
  },
  categories: {
    bestsellers: { cs: "Bestsellery", en: "Bestsellers" },
    "doner-plate": { cs: "Döner kebab talíř", en: "Döner kebab plate" },
    pita: { cs: "Kebab v pita chlebu", en: "Kebab in pita" },
    durum: { cs: "Dürüm kebab", en: "Dürüm kebab" },
    vegetarian: { cs: "Vegetarian menu", en: "Vegetarian menu" },
    box: { cs: "Box kebab", en: "Box kebab" },
    kofte: { cs: "Balkánské köfte", en: "Balkan köfte" },
    grill: { cs: "Queen's Grill", en: "Queen's Grill" },
    pizza: { cs: "Queen's Pizza", en: "Queen's Pizza" },
    special: { cs: "Speciál", en: "Specials" },
    salad: { cs: "Salát", en: "Salad" },
    combo: { cs: "Menu kombinace", en: "Combo meals" },
    drinks: { cs: "Nápoje", en: "Drinks" },
    sides: { cs: "Doplňky", en: "Sides" },
    all: { cs: "Vše", en: "All" },
  },
  order: {
    wolt: { cs: "Objednat na Wolt", en: "Order on Wolt" },
    bolt: { cs: "Objednat na Bolt Food", en: "Order on Bolt Food" },
    foodora: { cs: "Objednat na Foodora", en: "Order on Foodora" },
    call: { cs: "Zavolat na pobočku", en: "Call the branch" },
    directions: { cs: "Trasa Google Maps", en: "Google Maps directions" },
    comingSoonNotice: {
      cs: "Pro tuto pobočku rozvoz teprve připravujeme. Již brzy!",
      en: "Delivery for this branch is coming soon. Stay tuned!",
    },
  },
  footer: {
    rights: {
      cs: "Všechna práva vyhrazena.",
      en: "All rights reserved.",
    },
    tagline: {
      cs: "Turecký kebab a grill v Praze.",
      en: "Turkish kebab & grill in Prague.",
    },
    quickLinks: { cs: "Rychlé odkazy", en: "Quick links" },
    visit: { cs: "Navštivte nás", en: "Visit us" },
    follow: { cs: "Sledujte nás", en: "Follow us" },
  },
  common: {
    openingHours: { cs: "Otevírací doba", en: "Opening hours" },
    phone: { cs: "Telefon", en: "Phone" },
    email: { cs: "E-mail", en: "Email" },
    address: { cs: "Adresa", en: "Address" },
    everyDay: { cs: "Každý den", en: "Every day" },
    seeMenu: { cs: "Zobrazit menu", en: "View menu" },
    openMaps: { cs: "Otevřít v mapách", en: "Open in maps" },
    callUs: { cs: "Zavolat nám", en: "Call us" },
    reviewsOnGoogle: { cs: "recenzí na Google", en: "Google reviews" },
    backToTop: { cs: "Nahoru", en: "Back to top" },
    back: { cs: "Zpět", en: "Back" },
    backToHome: { cs: "Zpět na hlavní stránku", en: "Back to main page" },
    comingSoon: { cs: "PŘIPRAVUJEME", en: "COMING SOON" },
    comingSoonInline: { cs: "Připravujeme", en: "Coming soon" },
    comingSoonShort: { cs: "Teprve bude", en: "Coming soon" },
  },
} as const;

export type TranslationLeaf = { cs: string; en: string };

export function t(leaf: TranslationLeaf, lang: Lang): string {
  return leaf[lang];
}

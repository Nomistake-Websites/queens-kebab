import { LOCATIONS, GOOGLE_RATING } from "@/data/locations";
import { SOCIALS, SITE_URL, BRAND } from "@/data/socials";

/** LocalBusiness graph for all three branches – injected via <script type="application/ld+json"> */
export function buildRestaurantJsonLd() {
  const sameAs = [SOCIALS.instagram, SOCIALS.facebook];

  const branches = LOCATIONS.map((loc) => ({
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#${loc.id}`,
    name: `${BRAND.name} – ${loc.district.cs}`,
    image: `${SITE_URL}/images/og.jpg`,
    servesCuisine: ["Turkish", "Kebab", "Grill"],
    priceRange: "$$",
    telephone: loc.phone,
    url: SITE_URL,
    sameAs,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.split(",")[0]?.trim() ?? loc.address,
      addressLocality: "Praha",
      addressCountry: "CZ",
      postalCode: loc.address.match(/\d{3}\s?\d{2}/)?.[0] ?? "",
    },
    geo: loc.geo
      ? { "@type": "GeoCoordinates", latitude: loc.geo.lat, longitude: loc.geo.lng }
      : undefined,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "02:00",
      },
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: GOOGLE_RATING.score,
      reviewCount: GOOGLE_RATING.reviews,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": branches,
  };
}

import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Section } from "@/components/Section";
import { MenuPreview } from "@/components/MenuPreview";
import { LocationsGrid } from "@/components/LocationsGrid";
import { OrderButtons } from "@/components/OrderButtons";
import { WhyUs } from "@/components/WhyUs";
import { Gallery } from "@/components/Gallery";
import { Reviews } from "@/components/Reviews";
import { ContactBlock } from "@/components/ContactBlock";
import { Footer } from "@/components/Footer";
import { translations } from "@/data/translations";

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />

      {/* Naše kuchyně — combined bestsellers + menu preview */}
      <Section
        id="menu"
        eyebrow={translations.sections.menuPreview.eyebrow}
        title={translations.sections.menuPreview.title}
        subtitle={translations.sections.menuPreview.subtitle}
        toneTop
      >
        <MenuPreview />
      </Section>

      <Section
        id="locations"
        eyebrow={translations.sections.locations.eyebrow}
        title={translations.sections.locations.title}
        subtitle={translations.sections.locations.subtitle}
        className="bg-ink-900/40"
        decorated="city"
      >
        <LocationsGrid />
      </Section>

      <Section
        id="order"
        eyebrow={translations.sections.order.eyebrow}
        title={translations.sections.order.title}
        subtitle={translations.sections.order.subtitle}
      >
        <OrderButtons />
      </Section>

      <Section
        id="why"
        eyebrow={translations.sections.why.eyebrow}
        title={translations.sections.why.title}
        subtitle={translations.sections.why.subtitle}
        className="bg-ink-900/40"
        decorated
      >
        <WhyUs />
      </Section>

      <Section
        id="gallery"
        eyebrow={translations.sections.gallery.eyebrow}
        title={translations.sections.gallery.title}
        subtitle={translations.sections.gallery.subtitle}
      >
        <Gallery />
      </Section>

      <Section
        id="reviews"
        eyebrow={translations.sections.reviews.eyebrow}
        title={translations.sections.reviews.title}
        subtitle={translations.sections.reviews.subtitle}
        className="bg-ink-900/40"
      >
        <Reviews />
      </Section>

      <Section
        id="contact"
        eyebrow={translations.sections.contact.eyebrow}
        title={translations.sections.contact.title}
        subtitle={translations.sections.contact.subtitle}
      >
        <ContactBlock />
      </Section>

      <Footer />
    </main>
  );
}

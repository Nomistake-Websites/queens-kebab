"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { translations } from "@/data/translations";
import { GALLERY_ALL } from "@/data/gallery";
import { Lightbox } from "./Lightbox";

function GalleryTile({
  src,
  alt,
  index,
  onOpen,
  priority,
}: {
  src: string;
  alt: string;
  index: number;
  onOpen: (i: number) => void;
  priority: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${alt}`}
      className="group relative aspect-square overflow-hidden rounded-2xl bg-ink-800 transition focus:outline-none focus:ring-2 focus:ring-brand-red"
    >
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          loading={priority ? undefined : "lazy"}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="fallback-food absolute inset-0" />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-70 transition group-hover:opacity-100"
      />
    </button>
  );
}

export function GalleryView() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + GALLERY_ALL.length) % GALLERY_ALL.length,
      ),
    [],
  );
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % GALLERY_ALL.length)),
    [],
  );

  const backLabel = t(translations.common.backToHome);

  return (
    <section className="container-page py-16 sm:py-20 md:py-24">
      {/* Top back button */}
      <Link
        href="/#gallery"
        className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-brand-red"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        {backLabel}
      </Link>

      {/* Heading */}
      <div className="mt-8 max-w-2xl">
        <span className="eyebrow">{t(translations.sections.gallery.eyebrow)}</span>
        <h1 className="mt-3 h-display text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
          {t({ cs: "Galerie", en: "Gallery" })}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-white/65 sm:text-lg">
          {t({
            cs: "Fotky z našich poboček, kuchyně a poctivého tureckého jídla.",
            en: "Photos from our branches, our kitchen and honest Turkish food.",
          })}
        </p>
      </div>

      {/* Grid */}
      <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {GALLERY_ALL.map((img, i) => (
          <GalleryTile
            key={img.src}
            src={img.src}
            alt={img.alt}
            index={i}
            priority={i < 4}
            onOpen={open}
          />
        ))}
      </div>

      {/* Bottom back button */}
      <div className="mt-12 flex justify-center">
        <Link href="/#gallery" className="btn-primary">
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          {backLabel}
        </Link>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={GALLERY_ALL}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </section>
  );
}

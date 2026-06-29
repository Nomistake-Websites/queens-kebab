"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useImagePreload } from "@/hooks/useImagePreload";
import { useLanguage } from "@/lib/language";
import { GALLERY_PREVIEW } from "@/data/gallery";
import { Lightbox } from "./Lightbox";

// Bento spans for the 6 preview tiles (keeps the original landing layout).
const SPANS = [
  "col-span-2 row-span-2",
  "col-span-2 row-span-1",
  "col-span-1 row-span-1",
  "col-span-1 row-span-1",
  "col-span-2 row-span-1",
  "col-span-2 row-span-1",
];

const PREVIEW_SRCS = GALLERY_PREVIEW.map((t) => t.src);

function TileButton({
  src,
  alt,
  span,
  onOpen,
  index,
  priority,
}: {
  src: string;
  alt: string;
  span: string;
  onOpen: (i: number) => void;
  index: number;
  priority: boolean;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`Open ${alt}`}
      className={`group relative overflow-hidden rounded-2xl bg-ink-800 transition focus:outline-none focus:ring-2 focus:ring-brand-red ${span}`}
    >
      {!failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition duration-700 group-hover:scale-105"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="fallback-food absolute inset-0" />
      )}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 transition group-hover:opacity-100"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-black/50 text-white opacity-0 backdrop-blur transition group-hover:opacity-100"
      >
        <ChevronRight className="h-4 w-4" strokeWidth={2} />
      </span>
    </button>
  );
}

export function Gallery() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useImagePreload(PREVIEW_SRCS);

  const open = useCallback((i: number) => setOpenIndex(i), []);
  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i - 1 + GALLERY_PREVIEW.length) % GALLERY_PREVIEW.length,
      ),
    [],
  );
  const next = useCallback(
    () =>
      setOpenIndex((i) =>
        i === null ? null : (i + 1) % GALLERY_PREVIEW.length,
      ),
    [],
  );

  return (
    <>
      <div
        ref={sectionRef}
        className="grid h-[520px] grid-cols-4 grid-rows-3 gap-3 sm:h-[600px]"
      >
        {GALLERY_PREVIEW.map((tile, i) => (
          <TileButton
            key={tile.src}
            src={tile.src}
            alt={tile.alt}
            span={SPANS[i]}
            index={i}
            priority={i < 2}
            onOpen={open}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Link href="/galerie" className="btn-ghost">
          {t({ cs: "Zobrazit celou galerii", en: "View full gallery" })}
          <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </div>

      {openIndex !== null && (
        <Lightbox
          images={GALLERY_PREVIEW}
          index={openIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import type { MenuItem, MenuTag } from "@/data/menu";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

interface DishCardProps {
  item: MenuItem;
  variant?: "default" | "compact";
  priority?: boolean;
  /** When provided and the item has an image, the image opens a lightbox. */
  onImageClick?: () => void;
}

const TAG_STYLE: Record<MenuTag, string> = {
  bestseller: "bg-brand-red text-white",
  spicy: "bg-orange-500/20 text-orange-300 border border-orange-400/30",
  vegetarian: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/30",
  new: "bg-brand-gold/20 text-brand-cream border border-brand-gold/40",
  halal: "bg-white/10 text-white/80 border border-white/15",
  dessert: "bg-pink-500/15 text-pink-200 border border-pink-400/30",
  drink: "bg-sky-500/15 text-sky-200 border border-sky-400/30",
};

/** Tags hidden from the UI (kept in data, just not shown on cards). */
const HIDDEN_TAGS: ReadonlySet<MenuTag> = new Set<MenuTag>(["halal"]);

export function DishCard({
  item,
  variant = "default",
  priority = false,
  onImageClick,
}: DishCardProps) {
  const { t } = useLanguage();
  const [imgFailed, setImgFailed] = useState(false);
  const compact = variant === "compact";
  const hasImage = Boolean(item.image) && !imgFailed;
  const clickable = hasImage && !!onImageClick;
  const visibleTags = (item.tags ?? []).filter((tag) => !HIDDEN_TAGS.has(tag));

  return (
    <article className="group card relative overflow-hidden transition hover:-translate-y-1 hover:border-white/15 hover:shadow-glow">
      <div
        className={`relative w-full overflow-hidden ${
          compact ? "aspect-[16/10]" : "aspect-[4/3]"
        } ${clickable ? "cursor-zoom-in" : ""}`}
        {...(clickable
          ? {
              role: "button",
              tabIndex: 0,
              "aria-label": t(item.name),
              onClick: onImageClick,
              onKeyDown: (e: React.KeyboardEvent) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onImageClick();
                }
              },
            }
          : {})}
      >
        {hasImage ? (
          <Image
            src={item.image as string}
            alt={t(item.name)}
            fill
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 45vw, 30vw"
            quality={80}
            className="object-cover transition duration-700 group-hover:scale-105"
            priority={priority}
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="fallback-food absolute inset-0 flex items-center justify-center">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              className="h-10 w-10 text-white/20"
              fill="currentColor"
            >
              <path d="M2 11a10 10 0 0 1 20 0v1H2v-1zm0 3h20v2a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4v-2z" />
            </svg>
          </div>
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent"
        />

        {visibleTags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {visibleTags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${TAG_STYLE[tag]}`}
              >
                {t(translations.tags[tag])}
              </span>
            ))}
          </div>
        )}

        <div className="absolute bottom-3 right-3">
          <span className="rounded-full bg-black/65 px-3.5 py-1.5 text-sm font-bold text-white backdrop-blur sm:text-base">
            {item.price}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 p-4 sm:p-5">
        <h3 className="text-base font-semibold text-white sm:text-lg">
          {typeof item.number === "number" && (
            <span className="mr-1.5 font-mono text-sm text-brand-red">
              {item.number}.
            </span>
          )}
          {t(item.name)}
        </h3>
        <p className="line-clamp-2 text-sm text-white/65">{t(item.description)}</p>
      </div>
    </article>
  );
}

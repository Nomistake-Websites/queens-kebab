"use client";

import { translations } from "@/data/translations";
import type { MenuCategoryId } from "@/data/menu";
import { useLanguage } from "@/lib/language";

interface Props {
  categories: MenuCategoryId[];
  active: MenuCategoryId;
  onSelect: (id: MenuCategoryId) => void;
  showAll?: boolean;
}

export function MenuCategoryTabs({ categories, active, onSelect, showAll = false }: Props) {
  const { t } = useLanguage();
  const list = showAll
    ? (["bestsellers", ...categories.filter((c) => c !== "bestsellers")] as MenuCategoryId[])
    : categories;

  return (
    <div className="hide-scrollbar -mx-4 flex w-[calc(100%+2rem)] gap-2 overflow-x-auto px-4 sm:mx-0 sm:w-full sm:flex-wrap sm:px-0">
      {list.map((id) => {
        const leaf = translations.categories[id];
        const isActive = id === active;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            aria-pressed={isActive}
            className={`chip whitespace-nowrap ${isActive ? "chip-active" : "hover:border-white/25 hover:bg-white/10"}`}
          >
            {t(leaf)}
          </button>
        );
      })}
    </div>
  );
}

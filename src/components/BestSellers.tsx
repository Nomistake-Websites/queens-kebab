"use client";

import { DishCard } from "./DishCard";
import { getBestsellers } from "@/data/menu";

export function BestSellers() {
  const items = getBestsellers();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, idx) => (
        <DishCard key={item.id} item={item} priority={idx < 2} />
      ))}
    </div>
  );
}

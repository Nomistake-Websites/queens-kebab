"use client";

import { useState } from "react";
import { LocationCard } from "./LocationCard";
import { LOCATIONS } from "@/data/locations";

/**
 * Client wrapper for the locations grid. Holds which branch photo is open so
 * only one card can show its photo at a time (clicking another closes the
 * previous; clicking the same one closes it).
 */
export function LocationsGrid() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    // 1 / 2 / 2 / 4 columns — scales gracefully with 4 branches.
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {LOCATIONS.map((loc, i) => (
        <LocationCard
          key={loc.id}
          location={loc}
          index={i}
          selected={openId === loc.id}
          onToggle={() => setOpenId((cur) => (cur === loc.id ? null : loc.id))}
        />
      ))}
    </div>
  );
}

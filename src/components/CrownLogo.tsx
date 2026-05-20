interface CrownLogoProps {
  className?: string;
  size?: number;
  /** Visual padding inside the circle (in % of size). Defaults to 18. */
  innerPadding?: number;
}

/**
 * Queen's Kebab brand mark.
 *
 * - White circular background (with a soft outer ring matching the original)
 * - Red 5-point crown:
 *     · centre peak is the tallest
 *     · adjacent peaks medium
 *     · outer peaks lowest
 *     · each peak ends in a red ball
 *     · concave arches between peaks
 *     · body widens at the base, slight curve along the bottom edge
 *
 * Single source of truth. Used everywhere a logo mark appears.
 */
export function CrownLogo({
  className = "",
  size = 40,
  innerPadding = 18,
}: CrownLogoProps) {
  const innerScale = (100 - innerPadding * 2) / 100;
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center rounded-full bg-white ring-1 ring-black/10 shadow-[0_4px_18px_-6px_rgba(225,10,23,0.45)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 80"
        className="block text-brand-red"
        style={{ width: `${innerScale * 100}%`, height: "auto" }}
        fill="currentColor"
      >
        {/*
          Crown silhouette
          ----------------
          Peaks (where the balls sit):
            P1 (left)   = (10, 26)
            P2          = (32, 14)
            P3 (centre) = (50, 6)    ← tallest
            P4          = (68, 14)
            P5 (right)  = (90, 26)

          Valleys between peaks (control points of the Q arches):
            V1 (P1↔P2) = (22, 42)
            V2 (P2↔P3) = (42, 32)
            V3 (P3↔P4) = (58, 32)
            V4 (P4↔P5) = (78, 42)

          Base corners (slightly flared outward):
            BL = (4, 70)
            BR = (96, 70)
          Bottom edge has a gentle downward sag (control at (50, 78)).
        */}
        <path
          d="
            M 4 70
            Q 50 78 96 70
            L 90 26
            Q 78 42 68 14
            Q 58 32 50 6
            Q 42 32 32 14
            Q 22 42 10 26
            Z
          "
        />

        {/* Five round ball tips */}
        <circle cx="10" cy="26" r="4" />
        <circle cx="32" cy="14" r="4.2" />
        <circle cx="50" cy="6" r="4.6" />
        <circle cx="68" cy="14" r="4.2" />
        <circle cx="90" cy="26" r="4" />
      </svg>
    </span>
  );
}

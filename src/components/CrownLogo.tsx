import Image from "next/image";

interface CrownLogoProps {
  className?: string;
  size?: number;
  /**
   * Visual padding inside the circle (in % of size). Defaults to 10.
   * Lower = larger crown. At 10 the crown occupies 80% of the circle
   * (≈ 11% larger than the previous 14 / 72%).
   */
  innerPadding?: number;
  /**
   * Pass `true` for the header / above-the-fold lockup so Next.js eagerly
   * loads the logo and emits a `<link rel="preload">` hint. Defaults to true
   * because nearly every consumer is in the navbar / footer / QR header.
   */
  priority?: boolean;
}

/**
 * Queen's Kebab brand mark.
 *
 *  - White circular background with a soft outer ring (kept identical to
 *    the previous version)
 *  - Crown image (`/images/gallery/logo.png`) centered inside the circle
 *  - `object-contain` preserves aspect ratio, never stretches or crops
 *
 * Single source of truth — used by `<Logo />` everywhere a logo mark
 * appears (desktop nav, mobile nav, menu page header, QR menu header,
 * footer, …). Swap the file at the path above and the mark updates
 * everywhere at once.
 */
export function CrownLogo({
  className = "",
  size = 40,
  innerPadding = 10,
  priority = true,
}: CrownLogoProps) {
  const innerScale = (100 - innerPadding * 2) / 100;
  const innerPx = Math.round(size * innerScale);
  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-black/10 shadow-[0_4px_18px_-6px_rgba(225,10,23,0.45)] ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <Image
        src="/images/gallery/logo.png"
        alt="Queen's Kebab logo"
        width={innerPx}
        height={innerPx}
        priority={priority}
        sizes={`${innerPx}px`}
        className="block h-auto w-auto object-contain"
        style={{ maxWidth: `${innerScale * 100}%`, maxHeight: `${innerScale * 100}%` }}
        draggable={false}
      />
    </span>
  );
}

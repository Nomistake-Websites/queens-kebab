import { CrownLogo } from "./CrownLogo";

interface LogoProps {
  className?: string;
  withWordmark?: boolean;
  markSize?: number;
}

/**
 * Brand lockup = CrownLogo + wordmark.
 * Pass `withWordmark={false}` for tight contexts (mobile bars, etc.).
 */
export function Logo({ className = "", withWordmark = true, markSize = 40 }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <CrownLogo size={markSize} />
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span className="h-display text-base font-semibold tracking-[0.18em] text-white sm:text-lg">
            QUEEN&apos;S
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-white/60">
            Kebab &amp; Grill
          </span>
        </span>
      )}
    </span>
  );
}

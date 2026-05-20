import type { SVGProps } from "react";

/**
 * Brand social icons that aren't shipped by lucide-react 1.x.
 * Same stroke/size language so they match Lucide visually.
 */
export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
    </svg>
  );
}

/**
 * Google "G" logo — four-colour inline SVG matching Google's brand geometry.
 *
 *   • Red    — upper-left arc
 *   • Yellow — lower-left arc
 *   • Green  — bottom arc
 *   • Blue   — right side + horizontal bar
 *
 * The four paths are non-overlapping segments (not layered), so the colours
 * stay correct at any size.
 */
export function GoogleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      {/* Blue — right + bar */}
      <path
        fill="#4285F4"
        d="M47.532 24.5528c0-1.6485-.1488-3.2599-.4254-4.8235H24.48v9.118h12.9132c-.5571 2.9928-2.2497 5.5253-4.7842 7.2222v6.0001h7.7448c4.5305-4.1715 7.1426-10.3162 7.1426-17.5168z"
      />
      {/* Green — bottom */}
      <path
        fill="#34A853"
        d="M24.48 48c6.4762 0 11.9095-2.1318 15.8794-5.8047l-7.7448-6c-2.1547 1.4424-4.9091 2.3019-8.1346 2.3019-6.2548 0-11.5523-4.2204-13.4445-9.8862H2.9018v6.1949C6.8533 42.5253 15.0118 48 24.48 48z"
      />
      {/* Yellow — lower-left */}
      <path
        fill="#FBBC05"
        d="M11.0354 28.6019c-.4854-1.4424-.7607-2.9826-.7607-4.6019s.2753-3.1595.7607-4.6019V13.1933H2.9018C1.2375 16.5128.3 20.3403.3 24c0 3.6597.9375 7.4872 2.6018 10.8067l8.1336-6.2048z"
      />
      {/* Red — upper-left */}
      <path
        fill="#EA4335"
        d="M24.48 9.5184c3.527 0 6.6878 1.2243 9.1763 3.5919l6.8773-6.8773C36.3855 2.4513 30.9523 0 24.48 0 15.0118 0 6.8533 5.4747 2.9018 13.1933l8.1336 6.2048c1.8923-5.666 7.1898-9.8862 13.4446-9.8862z"
      />
    </svg>
  );
}

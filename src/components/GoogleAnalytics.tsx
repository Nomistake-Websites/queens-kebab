"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useCookieConsent } from "@/lib/cookies";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

/**
 * Google Analytics 4 with Consent Mode.
 *
 * - Only renders when NEXT_PUBLIC_GA_ID is set AND the user has accepted
 *   analytics cookies (necessary-only / rejected => GA never loads or fires).
 * - Consent defaults to denied; analytics is granted here because this only
 *   renders once analytics consent is true. Marketing follows its own toggle.
 * - page_view is sent manually on route change (config send_page_view:false)
 *   to avoid duplicate events.
 *
 * Note: the cookie context also calls gtag('consent','update',…) whenever the
 * user changes preferences later, so live opt-in/opt-out keeps working.
 */
export function GoogleAnalytics() {
  const { preferences } = useCookieConsent();
  const pathname = usePathname();

  const analyticsAllowed = preferences?.analytics === true;
  const marketingAllowed = preferences?.marketing === true;
  const enabled = Boolean(GA_ID) && analyticsAllowed;

  // Manual page_view on navigation (queued in dataLayer until GA loads).
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;
    const w = window as unknown as { gtag?: (...args: unknown[]) => void };
    if (typeof w.gtag !== "function") return;
    w.gtag("event", "page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [enabled, pathname]);

  if (!enabled) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: '${marketingAllowed ? "granted" : "denied"}',
            ad_user_data: '${marketingAllowed ? "granted" : "denied"}',
            ad_personalization: '${marketingAllowed ? "granted" : "denied"}'
          });
          gtag('config', '${GA_ID}', { send_page_view: false });
        `}
      </Script>
    </>
  );
}

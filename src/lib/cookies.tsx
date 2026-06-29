"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "queens_cookie_preferences";

export interface CookiePreferences {
  /** Always true — required technical functionality (saving prefs, language). */
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

interface StoredPreferences {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  /** ISO timestamp of when consent was given. */
  decidedAt: string;
}

interface CookieContextValue {
  /** Saved preferences, or null if the user hasn't decided yet. */
  preferences: StoredPreferences | null;
  /** True while the consent UI should be visible. */
  isOpen: boolean;
  /** Whether the detailed settings panel is expanded. */
  showSettings: boolean;
  open: () => void;
  close: () => void;
  setShowSettings: (v: boolean) => void;
  acceptAll: () => void;
  rejectOptional: () => void;
  save: (prefs: { analytics: boolean; marketing: boolean }) => void;
}

const CookieContext = createContext<CookieContextValue | null>(null);

/**
 * Reflect consent into Google's Consent Mode if gtag is present. This is a
 * no-op until GA is actually added — analytics/marketing stay denied by
 * default and only switch to granted when the user opts in.
 */
function syncConsent(analytics: boolean, marketing: boolean) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag !== "function") return;
  w.gtag("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied",
  });
}

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<StoredPreferences | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Load saved preference on mount; if none, open the banner.
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as StoredPreferences;
        setPreferences({ ...parsed, necessary: true });
        syncConsent(parsed.analytics, parsed.marketing);
        return;
      }
    } catch {
      /* ignore malformed storage */
    }
    setIsOpen(true);
  }, []);

  const persist = useCallback((analytics: boolean, marketing: boolean) => {
    const next: StoredPreferences = {
      necessary: true,
      analytics,
      marketing,
      decidedAt: new Date().toISOString(),
    };
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
    setPreferences(next);
    syncConsent(analytics, marketing);
    setIsOpen(false);
    setShowSettings(false);
  }, []);

  const acceptAll = useCallback(() => persist(true, true), [persist]);
  const rejectOptional = useCallback(() => persist(false, false), [persist]);
  const save = useCallback(
    (prefs: { analytics: boolean; marketing: boolean }) =>
      persist(prefs.analytics, prefs.marketing),
    [persist],
  );

  const open = useCallback(() => {
    setShowSettings(true);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => {
    // Only allow closing without a decision if one already exists.
    setIsOpen(false);
  }, []);

  const value = useMemo<CookieContextValue>(
    () => ({
      preferences,
      isOpen,
      showSettings,
      open,
      close,
      setShowSettings,
      acceptAll,
      rejectOptional,
      save,
    }),
    [preferences, isOpen, showSettings, open, close, acceptAll, rejectOptional, save],
  );

  return <CookieContext.Provider value={value}>{children}</CookieContext.Provider>;
}

export function useCookieConsent(): CookieContextValue {
  const ctx = useContext(CookieContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

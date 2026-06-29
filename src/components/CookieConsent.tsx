"use client";

import { useEffect, useState } from "react";
import { Cookie, Lock, X } from "lucide-react";
import { useLanguage } from "@/lib/language";
import { useCookieConsent } from "@/lib/cookies";

function Toggle({
  checked,
  disabled,
  onChange,
  label,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange?: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange?.(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition ${
        checked ? "bg-brand-red" : "bg-white/15"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export function CookieConsent() {
  const { t } = useLanguage();
  const {
    preferences,
    isOpen,
    showSettings,
    setShowSettings,
    close,
    acceptAll,
    rejectOptional,
    save,
  } = useCookieConsent();

  // Local draft for the settings toggles
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  // Sync draft with saved prefs whenever the panel opens
  useEffect(() => {
    if (isOpen) {
      setAnalytics(preferences?.analytics ?? false);
      setMarketing(preferences?.marketing ?? false);
    }
  }, [isOpen, preferences]);

  if (!isOpen) return null;

  const hasDecision = preferences !== null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t({ cs: "Nastavení cookies", en: "Cookie settings" })}
      className="fixed inset-x-0 bottom-0 z-[120] p-3 sm:p-4"
    >
      <div className="container-page">
        <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-brand-red/30 bg-ink-900/95 p-5 shadow-card backdrop-blur-xl sm:p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-brand-red/20 blur-3xl"
          />

          {/* Allow dismissing only after a decision exists */}
          {hasDecision && (
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/10"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>
          )}

          <div className="relative flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-red/15 text-brand-red">
              <Cookie className="h-5 w-5" strokeWidth={1.75} />
            </span>
            <div className="min-w-0">
              <h2 className="h-display text-lg font-semibold text-white">
                {t({ cs: "Nastavení cookies", en: "Cookie settings" })}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-white/65">
                {t({
                  cs: "Používáme cookies pro správné fungování webu. Analytické a marketingové cookies používáme jen s vaším souhlasem.",
                  en: "We use cookies so the site works correctly. Analytics and marketing cookies are only used with your consent.",
                })}
              </p>
            </div>
          </div>

          {/* Settings panel */}
          {showSettings && (
            <div className="relative mt-5 flex flex-col gap-3 border-t border-white/10 pt-5">
              {/* Necessary — locked */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 text-sm font-semibold text-white">
                    {t({ cs: "Nezbytné cookies", en: "Necessary cookies" })}
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/60">
                      <Lock className="h-2.5 w-2.5" strokeWidth={2.5} />
                      {t({ cs: "Vždy aktivní", en: "Always on" })}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {t({
                      cs: "Nutné pro základní fungování webu a uložení vašich předvoleb.",
                      en: "Required for basic website functionality and saving your preferences.",
                    })}
                  </p>
                </div>
                <Toggle checked disabled label="Necessary" />
              </div>

              {/* Analytics */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {t({ cs: "Analytické cookies", en: "Analytics cookies" })}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {t({
                      cs: "Pomáhají nám měřit návštěvnost (např. Google Analytics). Volitelné.",
                      en: "Help us measure traffic (e.g. Google Analytics). Optional.",
                    })}
                  </p>
                </div>
                <Toggle
                  checked={analytics}
                  onChange={setAnalytics}
                  label="Analytics"
                />
              </div>

              {/* Marketing */}
              <div className="flex items-start justify-between gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">
                    {t({ cs: "Marketingové cookies", en: "Marketing cookies" })}
                  </p>
                  <p className="mt-1 text-xs text-white/55">
                    {t({
                      cs: "Pro budoucí reklamy a remarketing. Volitelné.",
                      en: "For future ads and remarketing. Optional.",
                    })}
                  </p>
                </div>
                <Toggle
                  checked={marketing}
                  onChange={setMarketing}
                  label="Marketing"
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="relative mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <button type="button" onClick={acceptAll} className="btn-primary justify-center">
              {t({ cs: "Přijmout vše", en: "Accept all" })}
            </button>
            <button
              type="button"
              onClick={rejectOptional}
              className="btn-ghost justify-center"
            >
              {t({ cs: "Odmítnout volitelné", en: "Reject optional" })}
            </button>
            {showSettings ? (
              <button
                type="button"
                onClick={() => save({ analytics, marketing })}
                className="btn-gold justify-center"
              >
                {t({ cs: "Uložit nastavení", en: "Save settings" })}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowSettings(true)}
                className="btn-ghost justify-center"
              >
                {t({ cs: "Nastavení cookies", en: "Cookie settings" })}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

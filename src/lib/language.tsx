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
import { SUPPORTED_LANGS, type Lang, type TranslationLeaf } from "@/data/translations";

const STORAGE_KEY = "qk_lang";

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (leaf: TranslationLeaf) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function detectInitial(): Lang {
  if (typeof window === "undefined") return "cs";
  const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
  if (stored && SUPPORTED_LANGS.includes(stored)) return stored;
  const nav = window.navigator.language?.toLowerCase() ?? "";
  if (nav.startsWith("cs") || nav.startsWith("sk")) return "cs";
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("cs");

  useEffect(() => {
    const initial = detectInitial();
    setLangState(initial);
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "cs" ? "en" : "cs";
      if (typeof window !== "undefined") {
        window.localStorage.setItem(STORAGE_KEY, next);
      }
      return next;
    });
  }, []);

  const t = useCallback((leaf: TranslationLeaf) => leaf[lang], [lang]);

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}

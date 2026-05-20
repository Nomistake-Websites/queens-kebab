"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Check, ChevronDown } from "lucide-react";
import { LOCATIONS, type Location } from "@/data/locations";
import { translations } from "@/data/translations";
import { useLanguage } from "@/lib/language";

interface BranchSelectProps {
  value: Location;
  onChange: (next: Location) => void;
}

/**
 * Custom branch dropdown for the QR menu top bar.
 *
 * Built as a custom popover (not a native <select>) because native dropdown
 * UIs on iOS / Android render their own system styling for the option list
 * (including the check icon position), which we can't influence with CSS.
 *
 * Behaviour:
 *  - Click trigger to toggle
 *  - Click outside the popover to close
 *  - Escape closes
 *  - Arrow Up/Down moves focus between options
 *  - Enter / Space selects the focused option
 */
export function BranchSelect({ value, onChange }: BranchSelectProps) {
  const { t, lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState<number>(() =>
    Math.max(
      0,
      LOCATIONS.findIndex((l) => l.id === value.id),
    ),
  );

  const containerRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = useId();

  const close = useCallback(() => setOpen(false), []);

  // Outside-click + Escape
  useEffect(() => {
    if (!open) return;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      const node = containerRef.current;
      if (!node) return;
      if (!node.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        buttonRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, close]);

  // When opening, sync focus to the currently selected option
  useEffect(() => {
    if (!open) return;
    const i = LOCATIONS.findIndex((l) => l.id === value.id);
    const target = Math.max(0, i);
    setFocusIdx(target);
    // Defer focus until the popover has rendered
    requestAnimationFrame(() => {
      optionRefs.current[target]?.focus();
    });
  }, [open, value.id]);

  const handleTriggerKey = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleOptionKey = (
    e: React.KeyboardEvent<HTMLButtonElement>,
    i: number,
  ) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = (i + 1) % LOCATIONS.length;
      setFocusIdx(next);
      optionRefs.current[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = (i - 1 + LOCATIONS.length) % LOCATIONS.length;
      setFocusIdx(next);
      optionRefs.current[next]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setFocusIdx(0);
      optionRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      const last = LOCATIONS.length - 1;
      setFocusIdx(last);
      optionRefs.current[last]?.focus();
    } else if (e.key === "Tab") {
      close();
    }
  };

  const select = (loc: Location) => {
    onChange(loc);
    close();
    buttonRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={t(translations.qr.branchLabel)}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={handleTriggerKey}
        className="flex min-w-[112px] max-w-[44vw] items-center justify-center gap-2 truncate rounded-full border border-white/10 bg-white/5 py-2 pl-4 pr-3 text-xs font-medium text-white/90 transition focus:border-brand-red focus:outline-none"
      >
        <span className="truncate">{value.district[lang]}</span>
        <ChevronDown
          aria-hidden
          className={`h-3.5 w-3.5 shrink-0 text-white/55 transition ${
            open ? "rotate-180" : ""
          }`}
          strokeWidth={2.5}
        />
      </button>

      {open && (
        <div
          role="listbox"
          id={listboxId}
          aria-label={t(translations.qr.branchLabel)}
          className="absolute left-1/2 top-full z-50 mt-2 w-[180px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/10 bg-ink-900/95 p-1 shadow-card backdrop-blur-xl"
        >
          {LOCATIONS.map((loc, i) => {
            const isSelected = loc.id === value.id;
            const isFocused = i === focusIdx;
            return (
              <button
                key={loc.id}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                tabIndex={-1}
                onClick={() => select(loc)}
                onKeyDown={(e) => handleOptionKey(e, i)}
                onMouseEnter={() => setFocusIdx(i)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  isSelected
                    ? "bg-brand-red/15 text-white"
                    : isFocused
                      ? "bg-white/5 text-white"
                      : "text-white/85"
                }`}
              >
                {/*
                  Fixed-width icon column so selected and unselected rows
                  share the same text origin. The check stays inline with
                  the label, never floats off into a separate column.
                */}
                <span className="grid h-4 w-4 shrink-0 place-items-center">
                  {isSelected && (
                    <Check
                      className="h-4 w-4 text-brand-red"
                      strokeWidth={2.5}
                    />
                  )}
                </span>
                <span className="flex-1 truncate">{loc.district[lang]}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { CaretDownIcon, GlobeIcon, CheckIcon } from "@phosphor-icons/react";
import { LANGS, useLang } from "@/lib/i18n";

export function LangSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const active = LANGS.find((l) => l.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Til"
        className="inline-flex items-center gap-1.5 rounded-full border border-[#0a2540]/10 bg-white/70 px-3 py-2 text-sm font-semibold text-[#0a2540] transition-colors hover:bg-white"
      >
        <GlobeIcon size={16} weight="bold" className="text-[#0072b0]" />
        {active.label}
        <CaretDownIcon size={12} weight="bold" className={`text-[#8aa1b5] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 z-50 mt-2 w-32 overflow-hidden rounded-xl border border-[#0a2540]/10 bg-white p-1 shadow-xl">
          {LANGS.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => { setLang(l.code); setOpen(false); }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-[#0072b0]/[0.06] ${lang === l.code ? "font-semibold text-[#0072b0]" : "text-[#0a2540]"}`}
            >
              {l.label}
              {lang === l.code && <CheckIcon size={14} weight="bold" className="text-[#0072b0]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

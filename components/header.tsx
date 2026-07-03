"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ListIcon, XIcon } from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";
import { LangSwitcher } from "@/components/lang-switcher";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const t = useT();
  const [open, setOpen] = useState(false);
  const links = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.universities"), href: "/for-universities" },
    { label: t("nav.students"), href: "/for-students" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-[#0a2540]/[0.07] bg-[#f7fafd]/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src="/brand/icon.svg" alt="Univibe" className="size-9" />
          <span className="font-display text-xl font-bold tracking-tight text-[#0a2540]">
            Uni<span className="text-[#0072b0]">vibe</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 text-sm font-medium text-[#3a5a75] lg:flex">
          {links.map((l) => (
            <Link key={l.href} className="transition-colors hover:text-[#0072b0]" href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-2.5 text-sm font-medium lg:flex">
          <LangSwitcher />
          <Link
            className="rounded-full border border-[#0072b0]/25 px-5 py-2.5 font-semibold text-[#0072b0] transition-colors hover:bg-[#0072b0]/[0.06]"
            href="/contact"
          >
            {t("nav.requestDemo")}
          </Link>
          <a
            className="rounded-full bg-[#0072b0] px-5 py-2.5 font-semibold text-white shadow-lg shadow-[#0072b0]/25 transition-transform hover:-translate-y-0.5"
            href="https://students.univibe.uz"
          >
            {t("nav.dashboard")}
          </a>
        </div>

        {/* Mobile: switcher + hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LangSwitcher />
          <button
            type="button"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="relative inline-flex size-10 items-center justify-center rounded-full border border-[#0a2540]/10 bg-white/70 text-[#0a2540] transition-colors hover:bg-white"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "list"}
                initial={{ opacity: 0, rotate: -45, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 45, scale: 0.6 }}
                transition={{ duration: 0.18, ease: EASE }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {open ? <XIcon size={20} weight="bold" /> : <ListIcon size={20} weight="bold" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      <AnimatePresence>
        {open && (
          <div className="lg:hidden">
            <motion.button
              aria-hidden
              tabIndex={-1}
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: EASE }}
              className="fixed inset-0 top-[69px] z-40 cursor-default bg-[#0a2540]/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="absolute inset-x-0 top-full z-50 overflow-hidden border-t border-[#0a2540]/[0.07] bg-[#f7fafd] shadow-xl"
            >
              <motion.div
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.28, ease: EASE, delay: 0.04 }}
                className="px-5 pb-6 pt-2"
              >
                <div className="flex flex-col">
                  {links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="border-b border-[#0a2540]/[0.06] py-3.5 text-base font-medium text-[#0a2540] transition-colors hover:text-[#0072b0]"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <div className="mt-5 flex flex-col gap-3">
                  <Link
                    onClick={() => setOpen(false)}
                    className="rounded-full border border-[#0072b0]/25 px-5 py-3 text-center font-semibold text-[#0072b0]"
                    href="/contact"
                  >
                    {t("nav.requestDemo")}
                  </Link>
                  <a
                    className="rounded-full bg-[#0072b0] px-5 py-3 text-center font-semibold text-white shadow-lg shadow-[#0072b0]/25"
                    href="https://students.univibe.uz"
                  >
                    {t("nav.dashboard")}
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}

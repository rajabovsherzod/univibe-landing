"use client";

import { ChartLineUpIcon, QrCodeIcon, FileTextIcon, ShieldCheckIcon } from "@phosphor-icons/react";
import { Eyebrow, IllustrationSlot } from "@/components/sections";
import { useT } from "@/lib/i18n";

const ICONS = [ChartLineUpIcon, QrCodeIcon, FileTextIcon, ShieldCheckIcon];

export function ForUniversitiesView() {
  const t = useT();
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <IllustrationSlot src="/illustrations/for-universities.svg" alt={t("fu.eyebrow")} suggest="" />
          </div>
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <Eyebrow>{t("fu.eyebrow")}</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-4xl lg:text-5xl">
              {t("fu.title1")} <span className="text-[#0072b0]">{t("fu.title.accent")}</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#3a5a75] lg:mx-0">
              {t("fu.subtitle")}
            </p>
            <a href="/contact" className="mt-8 inline-flex rounded-full bg-[#0072b0] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#0072b0]/30 transition-transform hover:-translate-y-0.5">
              {t("fu.cta")}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ICONS.map((Icon, i) => (
            <div key={i} className="rounded-3xl border border-[#0a2540]/[0.06] bg-white p-7 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0072b0] to-[#59b0ff] text-white shadow-lg shadow-[#0072b0]/30">
                <Icon size={24} weight="fill" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#0a2540]">{t(`fu.${i + 1}.t`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3a5a75]">{t(`fu.${i + 1}.d`)}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

"use client";

import { HeroCinematic } from "@/components/hero-cinematic";
import {
  ProblemSection, FeaturesSection, HowItWorksSection, AudienceSection,
  RewardsSection, AnalyticsSection, PartnersSection, CtaSection,
} from "@/components/sections";
import { useT } from "@/lib/i18n";

export default function Home() {
  const t = useT();
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-[0.55]" style={{ background: "radial-gradient(60% 45% at 15% 8%, rgba(0,114,176,0.20), transparent 60%), radial-gradient(55% 40% at 92% 12%, rgba(89,176,255,0.18), transparent 60%)" }} />
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(#0072b0 1px, transparent 1px), linear-gradient(90deg, #0072b0 1px, transparent 1px)", backgroundSize: "48px 48px", maskImage: "radial-gradient(70% 60% at 50% 30%, black, transparent)" }} />
        </div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-24 pt-10 sm:pt-16 lg:grid-cols-2 lg:gap-10 lg:pt-20">
          <div className="text-center lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0072b0]/20 bg-white/70 px-4 py-1.5 text-xs font-semibold text-[#0072b0] shadow-sm backdrop-blur">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0072b0] opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-[#0072b0]" />
              </span>
              {t("hero.badge")}
            </div>
            <h1 className="text-balance font-display text-[2rem] font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t("hero.title1")}{" "}
              <span className="bg-gradient-to-r from-[#0072b0] to-[#59b0ff] bg-clip-text text-transparent">{t("hero.title2")}</span>.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-pretty text-lg leading-relaxed text-[#3a5a75] lg:mx-0 sm:text-xl">
              {t("hero.subtitle")}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
              <a className="w-full rounded-full bg-[#0072b0] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#0072b0]/30 transition-transform hover:-translate-y-0.5 sm:w-auto" href="https://students.univibe.uz">{t("hero.cta1")}</a>
              <a className="w-full rounded-full border border-[#0a2540]/10 bg-white/80 px-8 py-4 text-base font-semibold text-[#0a2540] backdrop-blur transition-colors hover:bg-white sm:w-auto" href="/for-universities">{t("hero.cta2")}</a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 -z-10 rounded-[32px] bg-gradient-to-b from-[#0072b0]/20 to-transparent blur-3xl" />
            <HeroCinematic />
          </div>
        </div>
      </section>

      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <AudienceSection />
      <RewardsSection />
      <AnalyticsSection />
      <PartnersSection />
      <CtaSection />
    </>
  );
}

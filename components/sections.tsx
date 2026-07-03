"use client";

import Link from "next/link";
import {
  CalendarDotsIcon, QrCodeIcon, TrophyIcon, StorefrontIcon, UsersThreeIcon,
  ChartLineUpIcon, GiftIcon, TicketIcon, SparkleIcon, ImageSquareIcon,
} from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

/** Illustration placeholder that shows a search suggestion until `src` is set. */
export function IllustrationSlot({ src, alt, suggest }: { src?: string; alt: string; suggest: string }) {
  if (src) return <img src={src} alt={alt} className="mx-auto h-auto w-full" />;
  return (
    <div className="flex aspect-[4/3] w-full flex-col items-center justify-center gap-3 rounded-3xl border-2 border-dashed border-[#0072b0]/30 bg-gradient-to-br from-[#0072b0]/[0.06] to-[#59b0ff]/[0.06] p-8 text-center">
      <div className="flex size-12 items-center justify-center rounded-2xl bg-[#0072b0]/10 text-[#0072b0]"><ImageSquareIcon size={26} weight="duotone" /></div>
      <p className="text-sm font-bold text-[#0072b0]">Illustration joyi</p>
      <p className="max-w-xs text-xs leading-relaxed text-[#3a5a75]">🔎 {suggest}</p>
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#0072b0]/20 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0072b0] shadow-sm backdrop-blur">
      <SparkleIcon size={13} weight="fill" /> {children}
    </span>
  );
}

/** Renders a title where "__" is replaced by a brand-accent span. */
function Accent({ text, accent }: { text: string; accent: string }) {
  const [before, after] = text.split("__");
  return <>{before}<span className="text-[#0072b0]">{accent}</span>{after ?? ""}</>;
}

// ── 1. Problem ──
export function ProblemSection() {
  const t = useT();
  const problems = [1, 2, 3, 4].map((i) => ({ t: t(`problem.${i}.t`), d: t(`problem.${i}.d`) }));
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <IllustrationSlot src="/illustrations/first.svg" alt="Problem" suggest="" />
        </div>
        <div className="order-1 text-center lg:order-2 lg:text-left">
          <Eyebrow>{t("problem.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-4xl lg:text-5xl">
            <Accent text={t("problem.title")} accent={t("problem.title.accent")} />
          </h2>
          <div className="mt-8 grid gap-4 text-left sm:grid-cols-2">
            {problems.map((p) => (
              <div key={p.t} className="rounded-2xl border border-[#0a2540]/[0.06] bg-white p-5 shadow-sm">
                <h3 className="font-display text-base font-bold text-[#0a2540]">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[#3a5a75]">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── 2. Features ──
export function FeaturesSection() {
  const t = useT();
  const icons = [CalendarDotsIcon, QrCodeIcon, TrophyIcon, ChartLineUpIcon, StorefrontIcon, UsersThreeIcon];
  return (
    <section id="imkoniyatlar" className="relative scroll-mt-20 bg-[#0a2540] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <Eyebrow>{t("features.eyebrow")}</Eyebrow>
        <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{t("features.title")}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60">{t("features.subtitle")}</p>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {icons.map((Icon, i) => (
            <div key={i} className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 text-left transition-colors hover:bg-white/[0.06]">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0072b0] to-[#59b0ff] text-white shadow-lg shadow-[#0072b0]/30"><Icon size={24} weight="fill" /></div>
              <h3 className="mt-5 font-display text-xl font-bold text-white">{t(`features.${i + 1}.t`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">{t(`features.${i + 1}.d`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── 3. How it works ──
export function HowItWorksSection() {
  const t = useT();
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 text-center lg:py-28">
      <Eyebrow>{t("how.eyebrow")}</Eyebrow>
      <h2 className="mx-auto mt-5 max-w-2xl text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-4xl lg:text-5xl">{t("how.title")}</h2>
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="relative rounded-3xl border border-[#0a2540]/[0.06] bg-white p-8 text-left shadow-sm">
            <div className="font-display text-5xl font-black text-[#0072b0]/15">0{i}</div>
            <h3 className="mt-3 font-display text-xl font-bold text-[#0a2540]">{t(`how.${i}.t`)}</h3>
            <p className="mt-2 text-sm leading-relaxed text-[#3a5a75]">{t(`how.${i}.d`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 4. Audience ──
export function AudienceSection() {
  const t = useT();
  const grads = ["from-[#0072b0] to-[#59b0ff]", "from-[#00a389] to-[#4fd1c5]", "from-[#7c5cff] to-[#a78bfa]", "from-[#0a2540] to-[#1e3a5f]"];
  return (
    <section id="talabalar" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20 text-center lg:py-28">
      <Eyebrow>{t("aud.eyebrow")}</Eyebrow>
      <h2 className="mx-auto mt-5 max-w-2xl text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-4xl lg:text-5xl">{t("aud.title")}</h2>
      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {grads.map((g, i) => (
          <div key={i} className={`rounded-3xl bg-gradient-to-br ${g} p-7 text-left text-white shadow-xl`}>
            <h3 className="font-display text-2xl font-extrabold">{t(`aud.${i + 1}.t`)}</h3>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{t(`aud.${i + 1}.d`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── 5. Rewards ──
export function RewardsSection() {
  const t = useT();
  const groups = [
    { icon: GiftIcon, t: t("rew.g1.t"), items: [t("rew.g1.1"), t("rew.g1.2"), t("rew.g1.3")] },
    { icon: TicketIcon, t: t("rew.g2.t"), items: [t("rew.g2.1"), t("rew.g2.2"), t("rew.g2.3")] },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="text-center lg:text-left">
          <Eyebrow>{t("rew.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-4xl lg:text-5xl">
            <Accent text={t("rew.title")} accent={t("rew.title.accent")} />
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#3a5a75]">{t("rew.subtitle")}</p>
          <div className="mt-8 grid gap-6 text-left sm:grid-cols-2">
            {groups.map((g) => (
              <div key={g.t}>
                <div className="flex items-center gap-2.5">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-[#0072b0]/10 text-[#0072b0]"><g.icon size={18} weight="fill" /></span>
                  <h3 className="font-display text-base font-bold text-[#0a2540]">{g.t}</h3>
                </div>
                <ul className="mt-3 space-y-2">
                  {g.items.map((it) => (
                    <li key={it} className="flex items-center gap-2 text-sm text-[#3a5a75]"><span className="size-1.5 rounded-full bg-[#0072b0]" />{it}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div>
          <IllustrationSlot src="/illustrations/second.svg" alt="Rewards" suggest="" />
        </div>
      </div>
    </section>
  );
}

// ── 6. Analytics ──
export function AnalyticsSection() {
  const t = useT();
  return (
    <section id="universitetlar" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-20 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="order-2 lg:order-1">
          <IllustrationSlot src="/illustrations/third.svg" alt="Analytics" suggest="" />
        </div>
        <div className="order-1 text-center lg:order-2 lg:text-left">
          <Eyebrow>{t("an.eyebrow")}</Eyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-4xl lg:text-5xl">
            <Accent text={t("an.title")} accent={t("an.title.accent")} />
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-[#3a5a75]">{t("an.subtitle")}</p>
          <ul className="mt-8 inline-block space-y-3.5 text-left">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#0072b0] text-white">
                  <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 13l4 4L19 7" /></svg>
                </span>
                <span className="text-base text-[#0a2540]">{t(`an.${i}`)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

// ── Partners ──
export function PartnersSection() {
  const t = useT();
  return (
    <section className="border-y border-[#0a2540]/[0.06] bg-white/50 py-14">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-[#8aa1b5]">{t("partners.title")}</p>
        <div className="mt-7 inline-flex flex-col items-center gap-3 rounded-2xl border border-[#0a2540]/[0.06] bg-white px-10 py-6 shadow-sm">
          <img src="/partners/al-khorazmiy.webp" alt="Al-Khwarizmi University" className="h-24 w-auto object-contain" />
          <span className="font-display text-lg font-bold text-[#0a2540]">Al-Khwarizmi University</span>
        </div>
      </div>
    </section>
  );
}

// ── 7. CTA ──
export function CtaSection() {
  const t = useT();
  return (
    <section id="aloqa" className="mx-auto max-w-7xl scroll-mt-20 px-6 py-16">
      <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#0072b0] via-[#0a6bb5] to-[#012a45] px-6 py-14 text-center shadow-2xl sm:rounded-[36px] sm:px-16 sm:py-20">
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(70% 70% at 50% 50%, black, transparent)" }} />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-balance font-display text-[1.6rem] font-extrabold leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">{t("cta.title")}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">{t("cta.subtitle")}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="https://students.univibe.uz" className="w-full rounded-full bg-white px-8 py-4 text-base font-semibold text-[#0072b0] shadow-xl transition-transform hover:-translate-y-0.5 sm:w-auto">{t("cta.1")}</a>
            <a href="/contact" className="w-full rounded-full border border-white/25 px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto">{t("cta.2")}</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const t = useT();
  return (
    <footer className="bg-[#0a2540] py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <div className="flex items-center gap-2.5">
          <img src="/brand/icon-white.svg" alt="Univibe" className="size-8" />
          <span className="font-display text-lg font-bold tracking-tight text-white">Uni<span className="text-[#59b0ff]">vibe</span></span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm font-medium text-white/60">
          <Link href="/#imkoniyatlar" className="hover:text-white">{t("nav.features")}</Link>
          <Link href="/for-students" className="hover:text-white">{t("nav.students")}</Link>
          <Link href="/for-universities" className="hover:text-white">{t("nav.universities")}</Link>
          <Link href="/contact" className="hover:text-white">{t("nav.contact")}</Link>
        </div>
        <p className="text-sm text-white">© 2026 Univibe</p>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { EnvelopeSimpleIcon, ClockIcon, CheckCircleIcon, PhoneIcon, MapPinIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useT } from "@/lib/i18n";

const inputCls = "w-full rounded-xl border border-[#0a2540]/10 bg-white px-4 py-3 text-sm text-[#0a2540] outline-none transition-colors placeholder:text-[#8aa1b5] focus:border-[#0072b0] focus:ring-2 focus:ring-[#0072b0]/15";

function RoleSelect() {
  const t = useT();
  const roles = [t("ct.role.1"), t("ct.role.2"), t("ct.role.3"), t("ct.role.4"), t("ct.role.5")];
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`${inputCls} flex items-center justify-between text-left ${value ? "text-[#0a2540]" : "text-[#8aa1b5]"}`}
      >
        {value || t("ct.f.rolePh")}
        <CaretDownIcon size={16} weight="bold" className={`shrink-0 text-[#8aa1b5] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#0a2540]/10 bg-white p-1 shadow-xl">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => { setValue(r); setOpen(false); }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-[#0072b0]/[0.06] ${value === r ? "font-semibold text-[#0072b0]" : "text-[#0a2540]"}`}
            >
              {r}
              {value === r && <CheckCircleIcon size={16} weight="fill" className="text-[#0072b0]" />}
            </button>
          ))}
        </div>
      )}
      <input type="hidden" name="role" value={value} />
    </div>
  );
}

export default function Contact() {
  const t = useT();
  const [sent, setSent] = useState(false);

  const info = [
    { icon: EnvelopeSimpleIcon, t: t("ct.email"), v: "univibe.uz@gmail.com" },
    { icon: PhoneIcon, t: t("ct.phone"), v: "+998 94 144 4517" },
    { icon: MapPinIcon, t: t("ct.address"), v: t("ct.address.v") },
    { icon: ClockIcon, t: t("ct.response"), v: t("ct.response.v") },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left: intro */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0072b0]/20 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0072b0] shadow-sm">
            {t("ct.eyebrow")}
          </span>
          <h1 className="mt-5 text-balance font-display text-3xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-4xl lg:text-5xl">
            {t("ct.title")}
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-[#3a5a75] lg:mx-0">
            {t("ct.subtitle")}
          </p>
          {/* info list — a single centered block so the icons stay aligned on mobile */}
          <div className="mt-8 inline-block space-y-4 text-left">
            {info.map((c) => (
              <div key={c.t} className="flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0072b0]/10 text-[#0072b0]"><c.icon size={20} weight="fill" /></span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#0a2540]">{c.t}</p>
                  <p className="text-sm text-[#3a5a75]">{c.v}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* right: form */}
        <div className="rounded-3xl border border-[#0a2540]/[0.06] bg-white p-7 shadow-xl sm:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <CheckCircleIcon size={56} weight="fill" className="text-[#22c55e]" />
              <h2 className="mt-4 font-display text-2xl font-extrabold text-[#0a2540]">{t("ct.success.title")}</h2>
              <p className="mt-2 text-sm text-[#3a5a75]">{t("ct.success.desc")}</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">{t("ct.f.name")}</label>
                  <input required className={inputCls} placeholder={t("ct.f.namePh")} />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">{t("ct.email")}</label>
                  <input required type="email" className={inputCls} placeholder="siz@example.com" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">{t("ct.f.org")}</label>
                <input className={inputCls} placeholder={t("ct.f.orgPh")} />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">{t("ct.f.role")}</label>
                <RoleSelect />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">{t("ct.f.msg")}</label>
                <textarea rows={4} className={inputCls} defaultValue={t("ct.f.msgDefault")} />
              </div>
              <button type="submit" className="w-full rounded-xl bg-[#0072b0] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0072b0]/25 transition-colors hover:bg-[#005a8c]">
                {t("ct.f.submit")}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

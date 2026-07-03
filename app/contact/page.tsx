"use client";

import { useEffect, useRef, useState } from "react";
import { EnvelopeSimpleIcon, ClockIcon, CheckCircleIcon, PhoneIcon, MapPinIcon, CaretDownIcon } from "@phosphor-icons/react";

const ROLES = ["Universitet administratori", "Xodim / O'qituvchi", "Talaba", "Klub rahbari", "Hamkor"];
const inputCls = "w-full rounded-xl border border-[#0a2540]/10 bg-white px-4 py-3 text-sm text-[#0a2540] outline-none transition-colors placeholder:text-[#8aa1b5] focus:border-[#0072b0] focus:ring-2 focus:ring-[#0072b0]/15";

function RoleSelect() {
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
        {value || "Rolingizni tanlang"}
        <CaretDownIcon size={16} weight="bold" className={`shrink-0 text-[#8aa1b5] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute z-20 mt-2 w-full overflow-hidden rounded-xl border border-[#0a2540]/10 bg-white p-1 shadow-xl">
          {ROLES.map((r) => (
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
  const [sent, setSent] = useState(false);

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 lg:py-24">
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        {/* left: intro */}
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0072b0]/20 bg-white/70 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-[#0072b0] shadow-sm">
            Aloqa
          </span>
          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-5xl">
            Bog&apos;lanamiz
          </h1>
          <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-[#3a5a75] lg:mx-0">
            Univibe demosini ko&apos;rmoqchimisiz yoki savolingiz bormi? Formani to&apos;ldiring — tez orada javob beramiz.
          </p>
          <div className="mt-8 space-y-4">
            {[
              { icon: EnvelopeSimpleIcon, t: "Email", v: "univibe.uz@gmail.com" },
              { icon: PhoneIcon, t: "Telefon", v: "+998 94 144 4517" },
              { icon: MapPinIcon, t: "Manzil", v: "Toshkent, O'zbekiston" },
              { icon: ClockIcon, t: "Javob vaqti", v: "Ish kunlari 24–48 soat ichida javob beramiz." },
            ].map((c) => (
              <div key={c.t} className="flex items-center justify-center gap-3 text-left lg:justify-start">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0072b0]/10 text-[#0072b0]"><c.icon size={20} weight="fill" /></span>
                <div>
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
              <h2 className="mt-4 font-display text-2xl font-extrabold text-[#0a2540]">Rahmat!</h2>
              <p className="mt-2 text-sm text-[#3a5a75]">Xabaringiz yuborildi. 24–48 soat ichida bog&apos;lanamiz.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">Ism</label>
                  <input required className={inputCls} placeholder="Ismingiz" />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">Email</label>
                  <input required type="email" className={inputCls} placeholder="siz@example.com" />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">Universitet / Tashkilot</label>
                <input className={inputCls} placeholder="Tashkilotingiz nomi" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">Rolingiz</label>
                <RoleSelect />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-[#0a2540]">Xabar</label>
                <textarea rows={4} className={inputCls} defaultValue="Men Univibe demosini ko'rmoqchiman" />
              </div>
              <button type="submit" className="w-full rounded-xl bg-[#0072b0] py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0072b0]/25 transition-colors hover:bg-[#005a8c]">
                Yuborish
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

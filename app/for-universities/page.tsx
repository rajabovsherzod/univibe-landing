import { ChartLineUpIcon, QrCodeIcon, FileTextIcon, ShieldCheckIcon } from "@phosphor-icons/react/dist/ssr";
import { Eyebrow, IllustrationSlot } from "@/components/sections";

export const metadata = { title: "Universitetlar uchun — Univibe" };

const features = [
  { icon: ChartLineUpIcon, t: "Real vaqt tahlili", d: "Fakultet, kafedra va klub bo'yicha qatnashuvni jonli kuzating." },
  { icon: QrCodeIcon, t: "QR-davomat", d: "Tadbirlarda davomat QR orqali avtomatik, aniq va soxtalashtirib bo'lmaydigan." },
  { icon: FileTextIcon, t: "Eksport hisobotlar", d: "Rahbariyat va akkreditatsiya uchun tayyor, eksport qilinadigan hisobotlar." },
  { icon: ShieldCheckIcon, t: "Yagona tizim", d: "Tadbirlar, ballar, klublar va tahlil — hammasi bitta boshqaruv panelida." },
];

export default function ForUniversities() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <IllustrationSlot src="/illustrations/for-universities.svg" alt="Universitet boshqaruv paneli" suggest="" />
          </div>
          <div className="order-1 text-center lg:order-2 lg:text-left">
            <Eyebrow>Universitetlar uchun</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-5xl">
              Butun kampus faolligi — <span className="text-[#0072b0]">bitta tizimda</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#3a5a75] lg:mx-0">
              Taxminlar emas, aniq ma&apos;lumot bilan qaror qabul qiling. Tadbir yarating, davomat oling va ta&apos;sirni o&apos;lchang.
            </p>
            <a href="/contact" className="mt-8 inline-flex rounded-full bg-[#0072b0] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#0072b0]/30 transition-transform hover:-translate-y-0.5">
              Demo so&apos;rash
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.t} className="rounded-3xl border border-[#0a2540]/[0.06] bg-white p-7 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0072b0] to-[#59b0ff] text-white shadow-lg shadow-[#0072b0]/30">
                <f.icon size={24} weight="fill" />
              </div>
              <h3 className="mt-5 font-display text-lg font-bold text-[#0a2540]">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3a5a75]">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

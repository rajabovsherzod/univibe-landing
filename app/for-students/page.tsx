import { CalendarDotsIcon, CoinsIcon, IdentificationCardIcon, GiftIcon } from "@phosphor-icons/react/dist/ssr";
import { Eyebrow, IllustrationSlot } from "@/components/sections";

export const metadata = { title: "Talabalar uchun — Univibe" };

const features = [
  { icon: CalendarDotsIcon, t: "Tadbir va klublarni kashf eting", d: "Universitetdagi barcha tadbirlarni ko'ring, ro'yxatdan o'ting va qiziqishingizga mos klublarga qo'shiling." },
  { icon: CoinsIcon, t: "Ishtirok uchun coin yig'ing", d: "Har bir tadbirda qatnashish, faollik va yutuqlar uchun coin oling." },
  { icon: IdentificationCardIcon, t: "Profil va portfolio quring", d: "Faolligingiz avtomatik yoziladi — rezyume uchun tayyor portfolio." },
  { icon: GiftIcon, t: "Mukofotlarni almashtiring", d: "To'plangan coinlarni brend mahsulot, imtiyoz va maxsus imkoniyatlarga almashtiring." },
];

export default function ForStudents() {
  return (
    <>
      <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="text-center lg:text-left">
            <Eyebrow>Talabalar uchun</Eyebrow>
            <h1 className="mt-5 text-balance font-display text-4xl font-extrabold leading-tight tracking-tight text-[#0a2540] sm:text-5xl">
              Universitet hayotini yasha va <span className="text-[#0072b0]">mukofot ol</span>
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-[#3a5a75] lg:mx-0">
              Tadbirlarni kashf eting, jamoalarga qo&apos;shiling, coin yig&apos;ing va sovg&apos;alar yuting — barchasi bitta ilovada.
            </p>
            <a href="https://students.univibe.uz" className="mt-8 inline-flex rounded-full bg-[#0072b0] px-8 py-4 text-base font-semibold text-white shadow-xl shadow-[#0072b0]/30 transition-transform hover:-translate-y-0.5">
              Ilovaga kirish
            </a>
          </div>
          <IllustrationSlot src="/illustrations/for-students.svg" alt="Talaba ilovadan foydalanmoqda" suggest="" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2">
          {features.map((f) => (
            <div key={f.t} className="rounded-3xl border border-[#0a2540]/[0.06] bg-white p-7 shadow-sm">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0072b0] to-[#59b0ff] text-white shadow-lg shadow-[#0072b0]/30">
                <f.icon size={24} weight="fill" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-[#0a2540]">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#3a5a75]">{f.d}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Lang = "uz" | "en" | "ru";
export const LANGS: { code: Lang; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
];

/** Flat key → per-language string. Add keys here; components read them via t(). */
const DICT: Record<string, Record<Lang, string>> = {
  // ── nav ──
  "nav.home": { uz: "Bosh sahifa", en: "Home", ru: "Главная" },
  "nav.features": { uz: "Imkoniyatlar", en: "Features", ru: "Возможности" },
  "nav.universities": { uz: "Universitetlar uchun", en: "For Universities", ru: "Для университетов" },
  "nav.students": { uz: "Talabalar uchun", en: "For Students", ru: "Для студентов" },
  "nav.contact": { uz: "Aloqa", en: "Contact", ru: "Контакты" },
  "nav.requestDemo": { uz: "Demo so'rash", en: "Request demo", ru: "Запросить демо" },
  "nav.dashboard": { uz: "Talabalar dashboardi", en: "Student dashboard", ru: "Дашборд студента" },

  // ── hero ──
  "hero.badge": { uz: "Universitet talabalar platformasi", en: "University student platform", ru: "Платформа для студентов" },
  "hero.title1": { uz: "Universitetingiz", en: "Your university", ru: "Твой университет" },
  "hero.title2": { uz: "bitta ilovada", en: "in one app", ru: "в одном приложении" },
  "hero.subtitle": {
    uz: "Tadbirlar, QR-davomat, ball to'plash, reyting va do'kon — talabalar hayotini bitta chiroyli platformada birlashtiramiz.",
    en: "Events, QR attendance, coins, leaderboards and a shop — we bring student life into one beautiful platform.",
    ru: "Мероприятия, QR-посещаемость, баллы, рейтинг и магазин — вся студенческая жизнь на одной красивой платформе.",
  },
  "hero.cta1": { uz: "Bepul boshlash", en: "Get started free", ru: "Начать бесплатно" },
  "hero.cta2": { uz: "Demoni ko'rish", en: "See the demo", ru: "Смотреть демо" },

  // ── problem ──
  "problem.eyebrow": { uz: "Muammo", en: "The problem", ru: "Проблема" },
  "problem.title": { uz: "Universitet hayoti bugun __ va o'lchab bo'lmaydigan.", en: "University life today is __ and unmeasurable.", ru: "Университетская жизнь сегодня __ и неизмерима." },
  "problem.title.accent": { uz: "tarqoq", en: "scattered", ru: "разрозненная" },
  "problem.1.t": { uz: "Tadbirlar tarqoq", en: "Scattered events", ru: "Разрозненные события" },
  "problem.1.d": { uz: "E'lonlar Telegram, e'lon taxtasi va og'zaki tarqaladi — talaba ko'pini o'tkazib yuboradi.", en: "Announcements spread across Telegram, boards and word of mouth — students miss most of them.", ru: "Объявления в Telegram, на досках и устно — студенты пропускают большинство." },
  "problem.2.t": { uz: "Qatnashuv o'lchanmaydi", en: "No participation tracking", ru: "Нет учёта участия" },
  "problem.2.d": { uz: "Xodimlar va kafedralar haqiqiy ishtirok va faollikni kuzata olmaydi.", en: "Staff and departments can't track real participation and engagement.", ru: "Сотрудники и кафедры не видят реального участия." },
  "problem.3.t": { uz: "Klublar o'sa olmaydi", en: "Clubs struggle to grow", ru: "Клубам трудно расти" },
  "problem.3.d": { uz: "Klublar o'z faoliyatini targ'ib qilish va ta'sirini isbotlashda qiynaladi.", en: "Clubs struggle to promote activities and prove their impact.", ru: "Клубам сложно продвигать активности и доказывать пользу." },
  "problem.4.t": { uz: "Ma'lumot yo'q", en: "No engagement data", ru: "Нет данных о вовлечённости" },
  "problem.4.d": { uz: "Talaba faolligi bo'yicha yagona, ishonchli tahlil manbasi mavjud emas.", en: "There's no single, reliable source of student engagement analytics.", ru: "Нет единого надёжного источника аналитики." },

  // ── features ──
  "features.eyebrow": { uz: "Imkoniyatlar", en: "Features", ru: "Возможности" },
  "features.title": { uz: "Talaba hayoti uchun kerak bo'lgan hamma narsa", en: "Everything student life needs", ru: "Всё, что нужно для студенческой жизни" },
  "features.subtitle": { uz: "Bitta chiroyli platformada birlashtirilgan.", en: "United in one beautiful platform.", ru: "Объединено в одной красивой платформе." },
  "features.1.t": { uz: "Tadbirlar", en: "Events", ru: "Мероприятия" },
  "features.1.d": { uz: "Barcha universitet tadbirlari bitta joyda — ko'ring va ro'yxatdan o'ting.", en: "All university events in one place — browse and register.", ru: "Все события в одном месте — смотрите и регистрируйтесь." },
  "features.2.t": { uz: "QR-davomat", en: "QR attendance", ru: "QR-посещаемость" },
  "features.2.d": { uz: "Telefon orqali QR skanerlab, davomat bir soniyada tasdiqlanadi.", en: "Scan a QR with your phone — attendance is confirmed instantly.", ru: "Сканируйте QR телефоном — посещаемость мгновенно." },
  "features.3.t": { uz: "Ball to'plash", en: "Earn coins", ru: "Копите баллы" },
  "features.3.d": { uz: "Faollik uchun coin yig'ing — har bir ishtirok mukofotlanadi.", en: "Earn coins for activity — every bit of participation is rewarded.", ru: "Зарабатывайте баллы за активность." },
  "features.4.t": { uz: "Reyting", en: "Leaderboard", ru: "Рейтинг" },
  "features.4.d": { uz: "Fakultet va universitet bo'ylab eng faol talabalar reytingi.", en: "Rankings of the most active students by faculty and university.", ru: "Рейтинг самых активных студентов." },
  "features.5.t": { uz: "Do'kon", en: "Shop", ru: "Магазин" },
  "features.5.d": { uz: "To'plangan coinlarni brend mahsulot va imtiyozlarga almashtiring.", en: "Redeem your coins for branded merch and perks.", ru: "Обменивайте баллы на мерч и привилегии." },
  "features.6.t": { uz: "Klublar", en: "Clubs", ru: "Клубы" },
  "features.6.d": { uz: "Klublarga qo'shiling, boshqaring va faoliyatingizni rivojlantiring.", en: "Join clubs, manage them and grow your activities.", ru: "Вступайте в клубы, управляйте и развивайтесь." },

  // ── how it works ──
  "how.eyebrow": { uz: "Qanday ishlaydi", en: "How it works", ru: "Как это работает" },
  "how.title": { uz: "Uch oddiy qadam", en: "Three simple steps", ru: "Три простых шага" },
  "how.1.t": { uz: "Yarating va e'lon qiling", en: "Create & publish", ru: "Создайте и опубликуйте" },
  "how.1.d": { uz: "Xodimlar va klublar tadbir, dastur va tashabbuslarni bir necha daqiqada yaratadi.", en: "Staff and clubs create events and programs in minutes.", ru: "Сотрудники и клубы создают события за минуты." },
  "how.2.t": { uz: "Talabalar qatnashadi", en: "Students join", ru: "Студенты участвуют" },
  "how.2.d": { uz: "Talabalar nima bo'layotganini ko'radi, ro'yxatdan o'tadi va faollik profilini quradi.", en: "Students discover, register, attend and build their profile.", ru: "Студенты находят, регистрируются и строят профиль." },
  "how.3.t": { uz: "Ta'sirni o'lchang", en: "Measure impact", ru: "Измеряйте результат" },
  "how.3.d": { uz: "Universitet real vaqt tahlili orqali qatnashuv va faollikni kuzatadi.", en: "Universities track participation with real-time analytics.", ru: "Университеты отслеживают участие в реальном времени." },

  // ── audience ──
  "aud.eyebrow": { uz: "Kim uchun", en: "Who it's for", ru: "Для кого" },
  "aud.title": { uz: "Har bir kampus a'zosi uchun", en: "For every campus member", ru: "Для каждого участника кампуса" },
  "aud.1.t": { uz: "Talabalar", en: "Students", ru: "Студенты" },
  "aud.1.d": { uz: "Tadbirlarni kashf eting, jamoalarga qo'shiling, coin yig'ing va sovg'alar yuting.", en: "Discover events, join communities, earn coins, win rewards.", ru: "Находите события, вступайте в сообщества, копите баллы." },
  "aud.2.t": { uz: "Xodimlar", en: "Staff & Faculty", ru: "Сотрудники" },
  "aud.2.d": { uz: "Tadbir yarating, davomatni QR bilan oling va faollikni o'lchang.", en: "Create events, take QR attendance and measure engagement.", ru: "Создавайте события, QR-посещаемость и аналитика." },
  "aud.3.t": { uz: "Klublar", en: "Clubs", ru: "Клубы" },
  "aud.3.d": { uz: "A'zolarni boshqaring, faoliyatni targ'ib qiling va o'sishni ko'ring.", en: "Manage members, promote activities and see growth.", ru: "Управляйте участниками и продвигайте активности." },
  "aud.4.t": { uz: "Universitet", en: "University", ru: "Университет" },
  "aud.4.d": { uz: "Butun kampus faolligi bo'yicha yagona tahlil va hisobotlar.", en: "Unified analytics and reports across the whole campus.", ru: "Единая аналитика и отчёты по всему кампусу." },

  // ── rewards ──
  "rew.eyebrow": { uz: "Mukofotlar", en: "Rewards", ru: "Награды" },
  "rew.title": { uz: "Haqiqiy ishtirokni __ mukofot tsikli", en: "A reward loop that __ real participation", ru: "Цикл наград, который __ участие" },
  "rew.title.accent": { uz: "rag'batlantiradigan", en: "drives", ru: "стимулирует" },
  "rew.subtitle": { uz: "Talabalar faollik uchun coin yig'adi va ularni haqiqiy qiymatga ega mukofotlarga almashtiradi.", en: "Students earn coins for activity and redeem them for real-value rewards.", ru: "Студенты зарабатывают баллы и обменивают их на реальные награды." },
  "rew.g1.t": { uz: "Universitet imtiyozlari", en: "University perks", ru: "Университетские привилегии" },
  "rew.g1.1": { uz: "Brend mahsulot", en: "Branded merch", ru: "Брендовый мерч" },
  "rew.g1.2": { uz: "Oshxona krediti", en: "Cafeteria credits", ru: "Кредиты в столовой" },
  "rew.g1.3": { uz: "Ustuvor ro'yxatdan o'tish", en: "Priority registration", ru: "Приоритетная запись" },
  "rew.g2.t": { uz: "Maxsus imkoniyatlar", en: "Experiences", ru: "Особые возможности" },
  "rew.g2.1": { uz: "Konferensiya chiptalari", en: "Conference tickets", ru: "Билеты на конференции" },
  "rew.g2.2": { uz: "Sayohat vaucherlari", en: "Travel vouchers", ru: "Тревел-ваучеры" },
  "rew.g2.3": { uz: "Eksklyuziv tadbirlar", en: "Exclusive events", ru: "Эксклюзивные события" },

  // ── analytics ──
  "an.eyebrow": { uz: "Universitetlar uchun", en: "For universities", ru: "Для университетов" },
  "an.title": { uz: "Har bir qaror ortida __", en: "Real __ behind every decision", ru: "__ за каждым решением" },
  "an.title.accent": { uz: "real ma'lumot", en: "data", ru: "Реальные данные" },
  "an.subtitle": { uz: "Kampusdagi faollikni jonli tahlil qiling — taxminlar emas, aniq raqamlar bilan.", en: "Analyze campus engagement live — with exact numbers, not guesses.", ru: "Анализируйте вовлечённость вживую — точными цифрами." },
  "an.1": { uz: "Fakultet, kafedra va klub bo'yicha qatnashuv", en: "Participation by faculty, department and club", ru: "Участие по факультетам, кафедрам и клубам" },
  "an.2": { uz: "Vaqt bo'yicha tadbir davomati tendensiyalari", en: "Event attendance trends over time", ru: "Тренды посещаемости во времени" },
  "an.3": { uz: "Talaba faollik ballari va o'sishi", en: "Student engagement scores and growth", ru: "Баллы вовлечённости и рост" },
  "an.4": { uz: "Rahbariyat uchun eksport qilinadigan hisobotlar", en: "Exportable reports for leadership", ru: "Экспортируемые отчёты для руководства" },

  // ── partners / cta / footer ──
  "partners.title": { uz: "Hamkorimiz", en: "Our partner", ru: "Наш партнёр" },
  "cta.title": { uz: "Universitetingizni bugun jonlantiring", en: "Bring your university to life today", ru: "Оживите свой университет сегодня" },
  "cta.subtitle": { uz: "Tadbirlar, davomat, ballar va tahlil — hammasi Univibe bilan.", en: "Events, attendance, coins and analytics — all with Univibe.", ru: "События, посещаемость, баллы и аналитика — всё с Univibe." },
  "cta.1": { uz: "Bepul boshlash", en: "Get started free", ru: "Начать бесплатно" },
  "cta.2": { uz: "Biz bilan bog'lanish", en: "Contact us", ru: "Связаться с нами" },
};

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "uz", setLang: () => {} });

function readCookie(): Lang {
  if (typeof document === "undefined") return "uz";
  const m = document.cookie.match(/(?:^|;\s*)lang=(uz|en|ru)/);
  return (m?.[1] as Lang) ?? "uz";
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("uz");
  useEffect(() => setLangState(readCookie()), []);
  const setLang = (l: Lang) => {
    document.cookie = `lang=${l}; path=/; max-age=31536000`;
    setLangState(l);
    document.documentElement.lang = l;
  };
  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}

/** t("key") → translated string for the active language, with __accent__ support. */
export function useT() {
  const { lang } = useLang();
  return (key: string) => DICT[key]?.[lang] ?? DICT[key]?.uz ?? key;
}

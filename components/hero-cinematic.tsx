"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { QRCodeSVG } from "qrcode.react";
import { SuccessConfetti } from "@/components/framecn/success-confetti";
import { CoinPill } from "@/components/coin-pill";
import { IPhoneMockupSvg } from "@/components/iphone-mockup";

/**
 * HeroCinematic — a looping product film, fully responsive via a fixed 1200×750
 * "stage" scaled to its container (so everything shrinks together). Scenes:
 * brand intro → browser boots (Univibe splash while the URL types + loads) →
 * home → events → QR attendance (confetti + coin) → shop exchange (confetti) →
 * iPhone finale → seamless loop.
 */

const BASE_W = 1200;
const BASE_H = 750;
const DOMAIN = "student.univibe.uz";

const SCENES = ["intro", "home", "events", "eventreg", "eventattend", "qrscan", "qrdone", "backevents", "shop", "shopmodal", "shopdone", "phone"] as const;
type Scene = (typeof SCENES)[number];
const DUR: Record<Scene, number> = {
  intro: 2400,
  home: 3400, // splash (~1.7s) + page
  events: 2300,
  eventreg: 2800, // real event page → cursor clicks the "Ro'yxatdan o'tish" button
  eventattend: 2600, // real page after registering (success toast) → cursor clicks "Davomatni tasdiqlash"
  qrscan: 2100,
  qrdone: 2600, // coin + confetti
  backevents: 2000, // back on events, cursor heads to "Do'kon"
  shop: 2400, // shop grid, cursor moves to the hoodie
  shopmodal: 2600, // exchange modal, cursor clicks "Almashtirish"
  shopdone: 2800, // success + confetti
  phone: 2900,
};

const EVENT_REGISTER_SHOT = "/app-shots/d-event-register.png"; // real page, "Ro'yxatdan o'tish" button
const EVENT_ATTEND_SHOT = "/app-shots/d-event-attend.png"; // real page after registering, "Davomatni tasdiqlash" button + success toast
const SHOP_SHOT = "/app-shots/d-shop.png";
const EVENTS_SHOT = "/app-shots/d-events.png";
const SHOTS: Partial<Record<Scene, string>> = {
  home: "/app-shots/d-home.png",
  events: EVENTS_SHOT,
  eventreg: EVENT_REGISTER_SHOT,
  eventattend: EVENT_ATTEND_SHOT,
  qrscan: EVENT_ATTEND_SHOT,
  qrdone: EVENT_ATTEND_SHOT,
  backevents: EVENTS_SHOT,
  shop: SHOP_SHOT,
  shopmodal: SHOP_SHOT,
  shopdone: SHOP_SHOT,
};
const PATHS: Partial<Record<Scene, string>> = {
  home: "",
  events: "/tadbirlar",
  eventreg: "/tadbir",
  eventattend: "/tadbir",
  qrscan: "/tadbir",
  qrdone: "/tadbir",
  backevents: "/tadbirlar",
  shop: "/dokon",
  shopmodal: "/dokon",
  shopdone: "/dokon",
};
const CURSOR: Partial<Record<Scene, { x: number; y: number }>> = {
  home: { x: 9, y: 27 },
  events: { x: 42, y: 62 },
  eventreg: { x: 83, y: 63 }, // real "Ro'yxatdan o'tish" button (right card)
  eventattend: { x: 83, y: 63 }, // real "Davomatni tasdiqlash" button (same spot, right card)
  qrscan: { x: 46, y: 55 },
  qrdone: { x: 9, y: 45 },
  backevents: { x: 9, y: 45 }, // toward the "Do'kon" sidebar item (below Reyting)
  shop: { x: 62, y: 76 }, // toward the hoodie product
  shopmodal: { x: 50, y: 64 }, // on the "Almashtirish" button
  shopdone: { x: 50, y: 78 },
};
const BROWSER_SCENES: Scene[] = ["home", "events", "eventreg", "eventattend", "qrscan", "qrdone", "backevents", "shop", "shopmodal", "shopdone"];
const EASE = [0.16, 1, 0.3, 1] as const;

// ── hooks ────────────────────────────────────────────────────────────────
function useScale(ref: React.RefObject<HTMLDivElement | null>) {
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / BASE_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);
  return scale;
}

function useSceneLoop() {
  const [scene, setScene] = useState<Scene>("intro");
  const idx = useRef(0);
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const run = () => {
      t = setTimeout(() => {
        idx.current = (idx.current + 1) % SCENES.length;
        setScene(SCENES[idx.current]);
        run();
      }, DUR[SCENES[idx.current]]);
    };
    run();
    return () => clearTimeout(t);
  }, []);
  return scene;
}

function useCountUp(to: number, run: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!run) return;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      const p = Math.min(1, (now - start) / 900);
      setN(Math.round((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [to, run]);
  return n;
}

// ── main ─────────────────────────────────────────────────────────────────
export function HeroCinematic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useScale(containerRef);
  const scene = useSceneLoop();
  const inBrowser = BROWSER_SCENES.includes(scene);

  // "home" boots with a splash while the URL types + loads, then the page reveals.
  const [homeReady, setHomeReady] = useState(false);
  useEffect(() => {
    if (scene !== "home") return;
    // Replay the boot splash each time the loop re-enters "home".
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHomeReady(false);
    const t = setTimeout(() => setHomeReady(true), 1750);
    return () => clearTimeout(t);
  }, [scene]);

  const nextCursor = CURSOR[scene] ?? { x: 9, y: 27 };

  return (
    <div ref={containerRef} data-scene={scene} data-ready={homeReady ? "1" : "0"} className="relative w-full overflow-hidden rounded-[24px] border border-white/10 shadow-[0_60px_140px_-40px_rgba(0,60,100,0.6)]" style={{ aspectRatio: `${BASE_W} / ${BASE_H}` }}>
      <div style={{ width: BASE_W, height: BASE_H, transform: `scale(${scale})`, transformOrigin: "top left" }} className="absolute left-0 top-0">
        {/* ── living brand mesh background ── */}
        <div className="absolute inset-0 bg-[#03436b]" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(50% 55% at 20% 20%, #0a8fd6 0%, transparent 60%), radial-gradient(55% 60% at 85% 25%, #0072b0 0%, transparent 55%), radial-gradient(60% 60% at 50% 100%, #012a45 0%, transparent 60%)", animation: "hc-mesh 12s ease-in-out infinite alternate" }} />
        <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)", backgroundSize: "40px 40px", maskImage: "radial-gradient(80% 80% at 50% 50%, black, transparent)" }} />

        <AnimatePresence mode="wait">
          {/* ── INTRO ── */}
          {scene === "intro" && (
            <motion.div key="intro" className="absolute inset-0 flex flex-col items-center justify-center" exit={{ opacity: 0, scale: 1.08, filter: "blur(6px)" }} transition={{ duration: 0.6, ease: EASE }}>
              <motion.img src="/brand/icon-white.svg" alt="Univibe" className="w-[110px] drop-shadow-[0_10px_40px_rgba(0,0,0,0.35)]" initial={{ scale: 1.35, opacity: 0, y: 6 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 1.1, ease: EASE }} />
              <motion.div className="mt-6 font-display text-[56px] font-extrabold tracking-tight text-white" initial={{ opacity: 0, y: 16, filter: "blur(10px)" }} animate={{ opacity: 1, y: 0, filter: "blur(0px)" }} transition={{ duration: 0.8, delay: 0.5, ease: EASE }}>Univibe</motion.div>
              <motion.div className="mt-2 text-[19px] font-medium text-white/70" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9, ease: EASE }}>Universiteting — bitta ilovada</motion.div>
            </motion.div>
          )}

          {/* ── BROWSER scenes ── */}
          {inBrowser && (
            <motion.div key="browser" className="absolute inset-0 flex items-center justify-center p-[40px]" initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.6, ease: EASE }}>
              <div className="relative flex aspect-[1440/860] w-full max-w-[1000px] flex-col overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0c] shadow-2xl">
                {/* chrome */}
                <div className="flex h-[44px] shrink-0 items-center gap-3 border-b border-white/[0.06] bg-[#141418]/95 px-4">
                  <div className="flex items-center gap-1.5">{["#ff5f57", "#febc2e", "#28c840"].map((c) => (<span key={c} className="size-[11px] rounded-full" style={{ background: c, opacity: 0.9 }} />))}</div>
                  <div className="relative ml-2 flex h-[26px] flex-1 items-center gap-2 rounded-full border border-[#78a0ff]/30 bg-white/[0.06] px-3 font-mono text-[13px] text-white/85">
                    <span className="text-white/40">⌕</span>
                    <span className="overflow-hidden whitespace-nowrap">
                      <span className="inline-block overflow-hidden align-bottom" style={{ animation: "hc-type 1.2s steps(20) 0.2s backwards", whiteSpace: "nowrap" }}>{DOMAIN}</span>
                      <span className="text-white/40">{PATHS[scene] ?? ""}</span>
                    </span>
                  </div>
                </div>
                {/* viewport */}
                <div className="relative flex-1 overflow-hidden bg-[#eef4fb]">
                  {/* screenshot (hidden during home splash) */}
                  <AnimatePresence mode="popLayout">
                    {!(scene === "home" && !homeReady) && (
                      <motion.img key={SHOTS[scene] ?? scene} src={SHOTS[scene]} alt="" className="absolute inset-0 size-full object-cover object-top" variants={variants[scene as keyof typeof variants] ?? variants.fade} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5, ease: EASE }} />
                    )}
                  </AnimatePresence>

                  {/* loading bar flashes on each page change */}
                  <motion.div key={"lb-" + (SHOTS[scene] ?? scene)} className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-gradient-to-r from-[#0072b0] to-[#59b0ff]" initial={{ scaleX: 0, opacity: 1 }} animate={{ scaleX: 1, opacity: 0 }} transition={{ duration: 0.7, ease: EASE }} />

                  {/* HOME splash — Univibe icon + wordmark while the page boots */}
                  <AnimatePresence>
                    {scene === "home" && !homeReady && (
                      <motion.div key="splash" className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-b from-[#f4f9ff] to-[#e6f1fb]" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45, ease: EASE }}>
                        <motion.img src="/brand/icon.svg" alt="" className="w-[64px]" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, ease: EASE }} />
                        <motion.div className="mt-3 font-display text-[26px] font-extrabold tracking-tight text-[#0a2540]" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>Univibe</motion.div>
                        <motion.div className="mt-4 h-[3px] w-[120px] overflow-hidden rounded-full bg-[#0072b0]/15">
                          <motion.div className="h-full bg-[#0072b0]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, ease: "easeInOut" }} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Event register + attendance use the real screenshots
                      (d-event-register → d-event-attend); the cursor clicks the real
                      buttons. On eventreg a success toast pops after the click, then
                      the scene changes to the attendance state. The QR scanner only
                      opens on the qrscan scene. */}
                  {scene === "eventreg" && <RegisterToast />}
                  {scene === "qrscan" && <QrScanCard />}
                  {scene === "qrdone" && <QrSuccessCard />}

                  {/* Shop exchange beat: shop (grid) → shopmodal (modal) → shopdone (success) */}
                  {scene === "shopmodal" && <ExchangeModal />}
                  {scene === "shopdone" && <ExchangeSuccess />}

                  {/* cursor */}
                  {!(scene === "home" && !homeReady) && (
                    <motion.div className="pointer-events-none absolute z-30" initial={{ left: "50%", top: "50%" }} animate={{ left: `${nextCursor.x}%`, top: `${nextCursor.y}%` }} transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.45))" }}>
                      <motion.span key={"rp-" + scene} className="absolute -left-1 -top-1 block size-7 rounded-full border-2 border-[#0072b0]" initial={{ scale: 0, opacity: 0.7 }} animate={{ scale: 1.7, opacity: 0 }} transition={{ duration: 0.7, delay: 1.4, ease: "easeOut" }} />
                      <svg width="22" height="28" viewBox="0 0 22 28" fill="none"><path d="M2 2L2 22L7 17.5L10.5 25L13.5 23.5L10 16L17 16L2 2Z" fill="white" stroke="black" strokeWidth="1.5" strokeLinejoin="round" /></svg>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* ── PHONE finale ── */}
          {scene === "phone" && (
            <motion.div key="phone" className="absolute inset-0 flex items-center justify-center gap-[70px] px-[60px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: EASE }}>
              <motion.div className="w-[250px]" initial={{ scale: 0.7, opacity: 0, rotateY: 16 }} animate={{ scale: 1, opacity: 1, rotateY: 0 }} transition={{ duration: 0.9, ease: EASE }}>
                <IPhoneMockupSvg image="/app-shots/m-home.png" />
              </motion.div>
              <motion.div className="flex max-w-[340px] flex-col items-center text-center" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3, ease: EASE }}>
                <img src="/brand/icon-white.svg" alt="" className="w-[60px]" />
                <div className="mt-5 font-display text-[48px] font-extrabold tracking-tight text-white">Univibe</div>
                <div className="mt-2 text-[19px] leading-relaxed text-white/70">Talabalar hayoti — cho&apos;ntagingizda.</div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>{`
          @keyframes hc-type { from { width: 0 } to { width: ${DOMAIN.length}ch } }
          @keyframes hc-mesh { from { transform: scale(1) translate(0,0) } to { transform: scale(1.15) translate(-3%, -2%) } }
        `}</style>
      </div>
    </div>
  );
}

const variants = {
  fade: { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } },
  events: { initial: { x: "40%", opacity: 0 }, animate: { x: 0, opacity: 1 }, exit: { x: "-30%", opacity: 0 } },
  qrscan: { initial: { opacity: 0, scale: 1.03 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0 } },
  shop: { initial: { scale: 0.92, opacity: 0 }, animate: { scale: 1, opacity: 1 }, exit: { scale: 1.05, opacity: 0 } },
} as const;

// ── beat components ────────────────────────────────────────────────────────
const OVERLAY = "absolute inset-0 z-40 flex items-center justify-center bg-black/35 backdrop-blur-[2px]";
const CARD = "relative flex w-[300px] flex-col items-center rounded-2xl bg-white p-5 shadow-2xl";
const bigConfetti = { count: 220, velocity: 22, gravity: 0.55, colors: ["#0072b0", "#59b0ff", "#facc15", "#22c55e", "#ff6b6b", "#a855f7", "#ffffff"], background: "transparent", text: "", durationInFrames: 100 };
const checkSvg = (<svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>);

/** Real app's success toast, replayed after the cursor "clicks" Ro'yxatdan o'tish. */
function RegisterToast() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 1550); // just after the click ripple
    return () => clearTimeout(t);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="regtoast"
          className="absolute left-1/2 top-4 z-40 -translate-x-1/2"
          initial={{ y: -18, opacity: 0, scale: 0.92 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 22 }}
        >
          <div className="flex items-center gap-2 rounded-xl border border-[#22c55e]/25 bg-white px-4 py-2.5 text-sm font-semibold text-[#15803d] shadow-xl">
            <span className="flex size-5 items-center justify-center rounded-full bg-[#22c55e] text-white">
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7" /></svg>
            </span>
            Tadbirga muvaffaqiyatli ro&apos;yxatdan o&apos;tdingiz
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function QrScanCard() {
  return (
    <div className={OVERLAY}>
      <motion.div className={CARD} initial={{ scale: 0.8, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-[#0072b0]">Davomat QR</div>
        <div className="relative rounded-xl bg-white p-3 shadow-inner ring-1 ring-black/5">
          <QRCodeSVG value="https://univibe.uz/attendance/azizbek-rahmonov" size={132} level="M" fgColor="#0a2540" bgColor="#ffffff" imageSettings={{ src: "/brand/icon.svg", height: 30, width: 26, excavate: true }} />
          <motion.div className="absolute inset-x-3 h-8 rounded bg-gradient-to-b from-[#0072b0]/0 via-[#0072b0]/30 to-[#0072b0]/0" initial={{ top: "12px" }} animate={{ top: ["12px", "108px", "12px"] }} transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }} />
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-sm font-semibold text-[#0a2540]"><span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0072b0]/60" /><span className="relative inline-flex size-2 rounded-full bg-[#0072b0]" /></span>Skanerlanmoqda…</div>
      </motion.div>
    </div>
  );
}

function QrSuccessCard() {
  const coins = useCountUp(50, true);
  return (
    <div className={OVERLAY}>
      <SuccessConfetti className="absolute inset-0" {...bigConfetti} />
      <motion.div className={CARD} initial={{ scale: 0.8, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <motion.div className="mb-2 flex size-14 items-center justify-center rounded-full bg-[#22c55e] text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 16 }}>{checkSvg}</motion.div>
        <div className="font-display text-[19px] font-extrabold text-[#0a2540]">Qatnashdingiz! 🎉</div>
        <div className="mt-1 text-xs text-[#3a5a75]">Davomatingiz belgilandi</div>
        <motion.div className="mt-3 flex items-center gap-2" initial={{ scale: 0.6, opacity: 0, y: 8 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 15 }}><span className="text-lg font-black text-[#f59e0b]">+</span><CoinPill amount={coins} size="md" variant="gold" /></motion.div>
      </motion.div>
    </div>
  );
}

function ExchangeModal() {
  return (
    <div className={OVERLAY}>
      <motion.div className={CARD} initial={{ scale: 0.8, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <div className="mb-3 aspect-square w-[150px] overflow-hidden rounded-xl">
          <img src="/app-shots/product-hoodie.png" alt="" className="size-full object-cover" onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }} />
        </div>
        <div className="font-display text-[17px] font-bold text-[#0a2540]">Univibe Ko&apos;k Hoodie</div>
        <div className="mt-3 flex w-full items-center justify-between rounded-xl bg-[#f4f8fc] px-4 py-2.5">
          <span className="text-sm font-medium text-[#3a5a75]">Narxi</span>
          <CoinPill amount={350} size="sm" variant="primary" />
        </div>
        <motion.button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#0072b0] py-2.5 text-sm font-semibold text-white" initial={{ scale: 1 }} animate={{ scale: [1, 0.97, 1] }} transition={{ duration: 0.5, delay: 1.4, ease: EASE }}>Almashtirish</motion.button>
      </motion.div>
    </div>
  );
}

function ExchangeSuccess() {
  return (
    <div className={OVERLAY}>
      <SuccessConfetti className="absolute inset-0" {...bigConfetti} />
      <motion.div className={CARD} initial={{ scale: 0.8, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }}>
        <motion.div className="mb-2 flex size-14 items-center justify-center rounded-full bg-[#22c55e] text-white" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 320, damping: 16 }}>{checkSvg}</motion.div>
        <div className="text-center font-display text-[19px] font-extrabold leading-snug text-[#0a2540]">Muvaffaqiyatli almashtirildi! 🎉</div>
        <div className="mt-1.5 text-center text-xs text-[#3a5a75]">Univibe Ko&apos;k Hoodie sizniki. Buyurtmangiz tayyorlanmoqda.</div>
      </motion.div>
    </div>
  );
}

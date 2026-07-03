"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

/**
 * AppFlow — a live browser mockup that types the Univibe URL, then walks
 * through REAL student-app screenshots with an animated cursor that "clicks"
 * the sidebar to move between screens. Pure client-side (CSS/Motion), no video.
 */

type Step = {
  img: string;
  path: string;
  /** cursor target as % of the viewport (where the click that opens this screen lands) */
  cursor: { x: number; y: number };
};

const STEPS: Step[] = [
  { img: "/app-shots/d-home.png", path: "", cursor: { x: 9, y: 22 } },
  { img: "/app-shots/d-events.png", path: "/tadbirlar", cursor: { x: 9, y: 27 } },
  { img: "/app-shots/d-event-detail.png", path: "/tadbir", cursor: { x: 42, y: 46 } },
  { img: "/app-shots/d-leaderboard.png", path: "/reyting", cursor: { x: 9, y: 36 } },
  { img: "/app-shots/d-clubs.png", path: "/klublar", cursor: { x: 9, y: 31 } },
];

const HOLD = 3000; // ms per screen
const DOMAIN = "student.univibe.uz";

export function AppFlow() {
  const [i, setI] = useState(0);
  const [started, setStarted] = useState(false);

  // Kick off after the URL-typing intro, then advance on a loop.
  useEffect(() => {
    const intro = setTimeout(() => setStarted(true), 2200);
    return () => clearTimeout(intro);
  }, []);

  useEffect(() => {
    if (!started) return;
    const t = setInterval(() => setI((v) => (v + 1) % STEPS.length), HOLD);
    return () => clearInterval(t);
  }, [started]);

  const next = STEPS[(i + 1) % STEPS.length];
  const current = STEPS[i];

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0c] shadow-[0_50px_120px_-20px_rgba(0,40,70,0.55)] ring-1 ring-black/5">
      {/* ── Chrome ── */}
      <div className="flex h-11 items-center gap-3 border-b border-white/[0.06] bg-[#141418]/95 px-4">
        <div className="flex items-center gap-2">
          {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
            <span key={c} className="size-3 rounded-full" style={{ background: c, opacity: 0.9 }} />
          ))}
        </div>
        <div className="ml-2 hidden text-white/30 sm:flex sm:gap-1.5">
          <span>‹</span>
          <span>›</span>
        </div>
        {/* URL bar */}
        <div className="relative ml-1 flex h-7 flex-1 items-center gap-2 rounded-full border border-[#78a0ff]/40 bg-white/[0.06] px-3 font-mono text-[11px] text-white/85 shadow-[0_0_0_3px_rgba(120,160,255,0.10)] sm:text-[13px]">
          <span className="text-white/40">⌕</span>
          <span className="overflow-hidden whitespace-nowrap">
            <span
              className="inline-block overflow-hidden align-bottom"
              style={{ animation: "af-type 1.4s steps(20) 0.3s backwards", whiteSpace: "nowrap" }}
            >
              {DOMAIN}
            </span>
            <span className="text-white/40">{current.path}</span>
          </span>
        </div>
        <div className="w-8" />
        {/* loading bar flashes on every screen change */}
        <motion.div
          key={i}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-[#0072b0] to-[#59b0ff]"
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      {/* ── Viewport ── */}
      <div className="relative aspect-[1440/900] w-full bg-[#eef4fb]">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={current.img}
            src={current.img}
            alt="Univibe student app"
            className="absolute inset-0 size-full object-cover object-top"
            initial={{ opacity: 0, scale: 1.015 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          />
        </AnimatePresence>

        {/* animated cursor heading to the next click target */}
        {started && (
          <motion.div
            className="pointer-events-none absolute z-20"
            initial={false}
            animate={{ left: `${next.cursor.x}%`, top: `${next.cursor.y}%` }}
            transition={{ duration: 2.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.45))" }}
          >
            {/* click ripple pulses right as the next screen loads */}
            <motion.span
              key={i}
              className="absolute -left-1 -top-1 block size-8 rounded-full border-2 border-[#0072b0]"
              initial={{ scale: 0, opacity: 0.7 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <svg width="24" height="30" viewBox="0 0 22 28" fill="none">
              <path
                d="M2 2L2 22L7 17.5L10.5 25L13.5 23.5L10 16L17 16L2 2Z"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        )}
      </div>

      <style>{`@keyframes af-type { from { width: 0 } to { width: ${DOMAIN.length}ch } }`}</style>
    </div>
  );
}

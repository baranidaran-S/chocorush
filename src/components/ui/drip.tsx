"use client";

import { useId, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { mulberry32 } from "@/lib/random";

const WIDTH = 1440;
const BAND = 18;

// Flat chocolate band with rounded drips hanging off it, laid out once with a fixed seed.
const DRIP_PATH = (() => {
  const rand = mulberry32(7);
  const drips: { x: number; r: number; len: number }[] = [];
  for (let x = 40 + rand() * 40; x < WIDTH - 40; ) {
    const r = 7 + rand() * 9;
    drips.push({ x, r, len: 12 + rand() * 72 });
    x += r * 2 + 34 + rand() * 80;
  }

  const f = 8;
  const n = (v: number) => v.toFixed(1);
  let d = `M0 0H${WIDTH}V${BAND}`;
  for (const { x, r, len } of drips.reverse()) {
    const bottom = BAND + len;
    d += `L${n(x + r + f)} ${BAND}Q${n(x + r)} ${BAND} ${n(x + r)} ${BAND + f}`;
    d += `V${n(bottom)}A${n(r)} ${n(r)} 0 0 1 ${n(x - r)} ${n(bottom)}V${BAND + f}`;
    d += `Q${n(x - r)} ${BAND} ${n(x - r - f)} ${BAND}`;
  }
  return `${d}H0Z`;
})();

/** Chocolate drip edge that hangs into the next section and stretches as you scroll past. */
export function Drip({ className, colors = ["#3b2116", "#24130c"] }: { className?: string; colors?: [string, string] }) {
  const ref = useRef<HTMLDivElement>(null);
  const gradientId = useId();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0.75, 1.45]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none overflow-x-clip ${className ?? ""}`}>
      <motion.svg
        viewBox={`0 0 ${WIDTH} 120`}
        style={{ scaleY: reduce ? 1 : scaleY }}
        className="relative left-1/2 block h-auto w-[max(100%,1440px)] origin-top -translate-x-1/2"
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={colors[0]} />
            <stop offset="1" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        <path d={DRIP_PATH} fill={`url(#${gradientId})`} />
      </motion.svg>
    </div>
  );
}

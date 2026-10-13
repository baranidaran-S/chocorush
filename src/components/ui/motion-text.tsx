"use client";

// Scroll-triggered text animations shared by the section headings.
import type { ReactNode } from "react";
import { motion } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Rises into view when the parent heading animates to "show". */
export function RisingWords({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom">
      <motion.span
        className={`inline-block ${className ?? ""}`}
        variants={{ hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE, delay } } }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/** Hand-drawn underline that draws itself in. */
export function Squiggle() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 300 24"
      preserveAspectRatio="none"
      className="pointer-events-none absolute -bottom-1 left-0 h-[0.28em] w-full text-berry-400"
    >
      <motion.path
        d="M4 16C40 6 70 6 100 13S160 22 200 12S260 4 296 10"
        fill="none"
        stroke="currentColor"
        strokeWidth={5}
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          show: {
            pathLength: 1,
            opacity: 1,
            transition: { pathLength: { duration: 1.1, ease: EASE, delay: 0.7 }, opacity: { duration: 0.01, delay: 0.7 } },
          },
        }}
      />
    </svg>
  );
}

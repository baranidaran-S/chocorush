"use client";

import { useSyncExternalStore } from "react";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";
import "lenis/dist/lenis.css";

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const query = window.matchMedia(REDUCED_MOTION);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

export function Providers({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );

  return (
    <MotionConfig reducedMotion="user">
      {reducedMotion ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.1, smoothWheel: true, anchors: true }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}

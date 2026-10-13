"use client";

import { useRef, type CSSProperties, type PointerEvent, type ReactNode } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { ChocoChunkIllustration, StrawberryIllustration } from "@/components/illustrations";
import { SmartImage } from "@/components/ui/smart-image";
import { DeliveryLinks } from "@/components/delivery-links";
import { mulberry32, round } from "@/lib/random";
import { whatsappLink } from "@/lib/site";

const SPRINKLE_COLORS = ["bg-berry-400", "bg-caramel-400", "bg-cocoa-600", "bg-berry-300", "bg-caramel-500"];
const SPRINKLES = (() => {
  const rand = mulberry32(42);
  return Array.from({ length: 26 }, (_, i) => ({
    left: round(rand() * 100),
    duration: round(9 + rand() * 9),
    delay: round(-rand() * 18),
    rotate: round(rand() * 360),
    drift: round((rand() - 0.5) * 80),
    length: round(10 + rand() * 8),
    color: SPRINKLE_COLORS[i % SPRINKLE_COLORS.length],
  }));
})();

type Floater = {
  kind: "strawberry" | "chunk";
  className: string;
  depth: number;
  rotate: number;
  bob: number;
};

// depth > 1 sits in front of the cake and moves the most; < 0.5 sits far behind, blurred.
const FLOATERS: Floater[] = [
  { kind: "strawberry", className: "left-[1%] bottom-[4%] z-40 w-[clamp(64px,10vw,150px)] sm:left-[6%]", depth: 1.2, rotate: -18, bob: 7 },
  { kind: "chunk", className: "right-[2%] top-[2%] z-0 w-[clamp(56px,8vw,120px)] blur-[1.5px] sm:right-[8%]", depth: 0.5, rotate: 22, bob: 8 },
  { kind: "chunk", className: "right-[1%] bottom-[14%] z-40 w-[clamp(52px,7vw,110px)] sm:right-[6%]", depth: 1, rotate: -14, bob: 6.5 },
  { kind: "strawberry", className: "hidden md:block left-[30%] top-[-6%] z-0 w-[clamp(40px,4.5vw,72px)] blur-[2px]", depth: 0.35, rotate: 28, bob: 9 },
  { kind: "chunk", className: "hidden md:block left-[11%] top-[4%] z-0 w-[clamp(36px,4vw,64px)] blur-[2.5px]", depth: 0.3, rotate: 40, bob: 10 },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scroll progress across the pinned stretch of the hero.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const chocoX = useTransform(scrollYProgress, (v) => `${v * -32}vw`);
  const rushX = useTransform(scrollYProgress, (v) => `${v * 32}vw`);
  const cakeScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const cakeRotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.55], [0, -48]);

  // Mouse position, -0.5..0.5 on each axis, smoothed.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 18, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 18, mass: 0.6 });
  const cakeX = useTransform(springX, (v) => v * 24);
  const cakeY = useTransform(springY, (v) => v * 16);
  const cakeTilt = useTransform(springX, (v) => v * 6);

  function handlePointerMove(e: PointerEvent) {
    if (reduce || e.pointerType !== "mouse") return;
    mouseX.set(e.clientX / window.innerWidth - 0.5);
    mouseY.set(e.clientY / window.innerHeight - 0.5);
  }

  return (
    <section ref={containerRef} id="home" className="relative h-[150svh]">
      <div onPointerMove={handlePointerMove} className="sticky top-0 h-svh overflow-hidden bg-cream-50">
        <Backdrop />

        <div className="relative mx-auto flex h-full max-w-7xl flex-col px-4 pb-8 pt-24 sm:px-8 lg:pb-10 lg:pt-28">
          {/* Stage: CHOCO behind the cake, RUSH in front of it */}
          <div className="relative flex flex-1 items-center justify-center [--fs:min(21vw,17svh)] lg:[--fs:min(15vw,21svh)]">
            <div
              aria-hidden
              className="flex select-none flex-col items-center font-display text-[length:var(--fs)] font-black leading-[0.8] tracking-[-0.045em] [font-variation-settings:'SOFT'_100,'WONK'_1]"
            >
              <motion.div style={{ x: reduce ? 0 : chocoX }} className="relative z-10 text-cocoa-800">
                <RisingLetters text="CHOCO" delay={0.05} />
              </motion.div>
              <motion.div
                style={{ x: reduce ? 0 : rushX }}
                className="relative z-30 text-berry-500 drop-shadow-[0_12px_28px_rgb(42_23_15/0.25)]"
              >
                <RisingLetters text="RUSH" delay={0.2} />
              </motion.div>
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 size-[calc(var(--fs)*2.5)] -translate-x-1/2 -translate-y-[40%] lg:size-[calc(var(--fs)*1.95)]">
              <motion.div style={{ scale: reduce ? 1 : cakeScale, rotate: reduce ? 0 : cakeRotate }} className="size-full">
                <motion.div style={{ x: cakeX, y: cakeY, rotate: cakeTilt }} className="size-full">
                  <div className="relative size-full motion-safe:animate-cake-drop" style={{ animationDelay: "0.25s" }}>
                    <div className="absolute inset-x-[16%] bottom-[2%] h-[7%] rounded-[50%] bg-cocoa-900/35 blur-xl motion-safe:animate-shadow-pulse" />
                    <div className="relative size-full motion-safe:animate-bob">
                      {/* Plain image (no fade-in) so it shows the moment it arrives */}
                      <Image
                        src="/images/hero/hero-cake.png"
                        alt="Chocolate drip cake topped with strawberries, truffles and chocolate shards"
                        width={1254}
                        height={1254}
                        sizes="(min-width: 1024px) 45vw, 80vw"
                        preload
                        className="size-full object-contain"
                      />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {FLOATERS.map((floater, i) => (
              <FloatingTreat key={i} floater={floater} index={i} mouseX={springX} mouseY={springY} progress={scrollYProgress} />
            ))}
          </div>

          {/* Headline + calls to action, centred under the composition */}
          <motion.div
            style={{ opacity: contentOpacity, y: reduce ? 0 : contentY }}
            className="relative z-40 flex flex-col items-center text-center"
          >
            <FadeUp delay={0.4} className="mb-3 hidden [@media(min-height:820px)]:block">
              <span className="inline-flex items-center gap-2 rounded-full bg-cream-100/80 px-3 py-1 text-xs font-medium text-cocoa-700 ring-1 ring-cocoa-800/10 backdrop-blur">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-berry-400 opacity-75 motion-safe:animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-berry-500" />
                </span>
                Custom birthday cakes, made to order
              </span>
            </FadeUp>
            <h1 className="flex flex-wrap justify-center gap-x-[0.28em] font-display text-[clamp(2.25rem,min(6.2vw,9svh),5.5rem)] font-semibold leading-[1.02] tracking-tight text-cocoa-900 [font-variation-settings:'SOFT'_50]">
              <RisingWords delay={0.45}>Happiness,</RisingWords>
              <RisingWords delay={0.55} className="italic text-berry-500">
                freshly baked.
              </RisingWords>
            </h1>
            <FadeUp delay={0.65}>
              <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-cocoa-600 sm:text-lg">
                Cakes, custom birthday cakes, waffles, brownies, brownie tubs and shakes — baked fresh for every
                celebration, big or small.
              </p>
            </FadeUp>
            <FadeUp delay={0.75} className="mt-5 flex flex-col items-center gap-3">
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-cocoa-900 px-5 py-3.5 text-sm font-semibold text-cream-50 shadow-lg shadow-cocoa-900/25 transition hover:-translate-y-0.5 hover:bg-cocoa-800 hover:shadow-xl sm:px-7 sm:text-base"
                >
                  <WhatsAppIcon className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                  <span className="sm:hidden">Order now</span>
                  <span className="hidden sm:inline">Order on WhatsApp</span>
                </a>
                <a
                  href="#custom-cake"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-cream-50/70 px-5 py-3.5 text-sm font-semibold text-cocoa-900 ring-1 ring-cocoa-900/15 backdrop-blur transition hover:-translate-y-0.5 hover:bg-cream-100 sm:px-7 sm:text-base"
                >
                  See custom cakes
                  <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-cocoa-500">
                <span>Also on</span>
                <DeliveryLinks />
              </div>
            </FadeUp>
          </motion.div>
        </div>
      </div>

    </section>
  );
}

function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[45%] size-[72vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-berry-300/35 blur-[90px]" />
      <div className="absolute -bottom-[12%] -left-[10%] size-[52vmin] rounded-full bg-caramel-400/25 blur-[90px]" />
      <div className="absolute -right-[8%] top-[4%] size-[42vmin] rounded-full bg-cream-300/70 blur-[80px]" />
      {SPRINKLES.map((s, i) => (
        <span
          key={i}
          className={`absolute top-0 w-[5px] rounded-full opacity-70 motion-safe:animate-sprinkle motion-reduce:hidden ${s.color}`}
          style={
            {
              left: `${s.left}%`,
              height: s.length,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              "--rot": `${s.rotate}deg`,
              "--drift": `${s.drift}px`,
            } as CSSProperties
          }
        />
      ))}
      {/* Fade to plain cream at the bottom so the waves below rise into it without an edge */}
      <div className="absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-b from-cream-50/0 to-cream-50 to-80%" />
    </div>
  );
}

function RisingLetters({ text, delay }: { text: string; delay: number }) {
  return (
    // Clipped so letters can rise from below; side padding keeps the tightly tracked last letter from being sliced.
    <span className="-mx-[0.1em] -my-[0.06em] flex overflow-hidden px-[0.1em] py-[0.06em]">
      {text.split("").map((char, i) => (
        <span key={i} className="inline-block motion-safe:animate-rise" style={{ animationDelay: `${delay + i * 0.05}s` }}>
          {char}
        </span>
      ))}
    </span>
  );
}

function RisingWords({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <span className="-mx-[0.1em] -mb-[0.14em] inline-block overflow-hidden px-[0.1em] pb-[0.14em]">
      <span className={`inline-block motion-safe:animate-rise ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
        {children}
      </span>
    </span>
  );
}

function FadeUp({ children, delay, className }: { children: ReactNode; delay: number; className?: string }) {
  return (
    <div className={`motion-safe:animate-fade-up ${className ?? ""}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}

function FloatingTreat({
  floater,
  index,
  mouseX,
  mouseY,
  progress,
}: {
  floater: Floater;
  index: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  progress: MotionValue<number>;
}) {
  const reduce = useReducedMotion();
  const x = useTransform(mouseX, (v) => v * floater.depth * 70);
  const y = useTransform(mouseY, (v) => v * floater.depth * 50);
  const scrollY = useTransform(progress, (v) => v * floater.depth * -240);

  const isBerry = floater.kind === "strawberry";
  const Fallback = isBerry ? StrawberryIllustration : ChocoChunkIllustration;
  const shadow = "drop-shadow-[0_18px_22px_rgb(42_23_15/0.28)]";

  return (
    <motion.div aria-hidden style={reduce ? undefined : { y: scrollY }} className={`pointer-events-none absolute ${floater.className}`}>
      <motion.div style={reduce ? undefined : { x, y }}>
        <motion.div
          initial={{ scale: 0, opacity: 0, rotate: floater.rotate - 60 }}
          animate={{ scale: 1, opacity: 1, rotate: floater.rotate }}
          transition={{ type: "spring", stiffness: 160, damping: 12, delay: 0.45 + index * 0.06 }}
        >
          <div
            className="motion-safe:animate-bob"
            style={{ animationDuration: `${floater.bob}s`, animationDelay: `${-index * 1.3}s` }}
          >
            <SmartImage
              src={isBerry ? "/images/hero/strawberry.png" : "/images/hero/choco-chunk.png"}
              alt=""
              width={512}
              height={512}
              sizes="150px"
              className={`h-auto w-full ${shadow}`}
              fallback={<Fallback className={`h-auto w-full ${shadow}`} />}
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

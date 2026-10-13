"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo, type Variants } from "motion/react";
import { WhatsAppIcon } from "@/components/icons";
import { EASE, Reveal, RisingWords, Squiggle } from "@/components/ui/motion-text";
import { SmartImage } from "@/components/ui/smart-image";
import { DeliveryLinks } from "@/components/delivery-links";
import { Wave } from "@/components/ui/wave";
import { whatsappLink } from "@/lib/site";

const TREATS = [
  {
    id: "waffles",
    name: "Waffles",
    word: "WAFFLES",
    image: "/images/categories/waffle.png",
    line: "Crispy, golden and generously drizzled with chocolate.",
    tags: ["Crispy outside", "Soft inside", "Loaded toppings"],
    order: "Hi ChocoRush! I'd like to order waffles.",
    glow: "#c98a4b",
  },
  {
    id: "brownies",
    name: "Brownies",
    word: "BROWNIES",
    image: "/images/categories/brownie.png",
    line: "Thick, fudgy squares with a crackly top and a gooey middle.",
    tags: ["Fudgy", "Crackly top", "Gooey centre"],
    order: "Hi ChocoRush! I'd like to order brownies.",
    glow: "#e5607f",
  },
  {
    id: "brownie-tubs",
    name: "Brownie Tubs",
    word: "TUBS",
    image: "/images/categories/brownie-tub.png",
    line: "Brownie chunks drowned in chocolate and toppings, packed in a tub.",
    tags: ["Brownie chunks", "Chocolate sauce", "Crunchy toppings"],
    order: "Hi ChocoRush! I'd like to order a brownie tub.",
    glow: "#e0a96d",
  },
];

const AUTOPLAY_MS = 5000;

// New product spins in from the side it's coming from; the old one spins out the other way.
const productVariants: Variants = {
  enter: (dir: number) => ({ x: dir * 160, rotate: dir * 25, scale: 0.7, opacity: 0 }),
  center: { x: 0, rotate: 0, scale: 1, opacity: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
  exit: (dir: number) => ({ x: dir * -160, rotate: dir * -25, scale: 0.7, opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }),
};

const DROPS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2 + 0.3;
  const distance = 120 + (i % 3) * 40;
  return {
    x: Math.round(Math.cos(angle) * distance),
    y: Math.round(Math.sin(angle) * distance * 0.6),
    size: 6 + (i % 4) * 3,
  };
});

export function Treats() {
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [autoplay, setAutoplay] = useState(true);
  const treat = TREATS[active];

  function go(index: number, dir: number) {
    setDirection(dir);
    setActive((index + TREATS.length) % TREATS.length);
  }

  function choose(index: number) {
    setAutoplay(false);
    if (index !== active) go(index, index > active ? 1 : -1);
  }

  // Cycle through the treats while the section is on screen, until the visitor takes over.
  useEffect(() => {
    if (!autoplay || !inView || reduce) return;
    const timer = window.setTimeout(() => {
      setDirection(1);
      setActive((a) => (a + 1) % TREATS.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [active, autoplay, inView, reduce]);

  function handleTabKeys(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (active + (e.key === "ArrowRight" ? 1 : -1) + TREATS.length) % TREATS.length;
    choose(next);
    document.getElementById(`treat-tab-${TREATS[next].id}`)?.focus();
  }

  function handleSwipe(_: PointerEvent, info: PanInfo) {
    if (Math.abs(info.offset.x) < 50 || Math.abs(info.offset.x) < Math.abs(info.offset.y)) return;
    setAutoplay(false);
    go(active + (info.offset.x < 0 ? 1 : -1), info.offset.x < 0 ? 1 : -1);
  }

  return (
    <section ref={sectionRef} id="treats" className="relative bg-cocoa-950 pb-24 pt-20 text-cream-50 sm:pb-32 sm:pt-24">
      {/* Melted chocolate flowing along the top edge */}
      <Wave back="text-cocoa-800" front="text-cocoa-950" />

      {/* Glow that takes on each treat's colour */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute left-1/2 top-[55%] size-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-[100px] transition-colors duration-700 lg:left-[62%]"
          style={{ backgroundColor: treat.glow }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-400">Waffles · Brownies · Brownie Tubs</p>
          </Reveal>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight [font-variation-settings:'SOFT'_50]"
          >
            <RisingWords delay={0.05}>Made to be</RisingWords>{" "}
            <span className="relative inline-block">
              <RisingWords delay={0.15} className="italic text-berry-400">
                craved.
              </RisingWords>
              <Squiggle />
            </span>
          </motion.h2>
        </header>

        {/* Tabs */}
        <Reveal delay={0.2} className="mt-10 flex justify-center">
          <div
            role="tablist"
            aria-label="Treats"
            onKeyDown={handleTabKeys}
            className="inline-flex gap-1 rounded-full bg-cream-50/[0.06] p-1.5 ring-1 ring-cream-50/10"
          >
            {TREATS.map((t, i) => {
              const selected = i === active;
              return (
                <button
                  key={t.id}
                  id={`treat-tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls="treat-panel"
                  tabIndex={selected ? 0 : -1}
                  onClick={() => choose(i)}
                  className={`relative isolate overflow-hidden rounded-full px-4 py-3 text-[15px] font-semibold transition-colors sm:px-7 sm:text-base ${
                    selected ? "text-cream-50" : "text-cream-200/70 hover:text-cream-50"
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="treat-tab"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      className="absolute inset-0 -z-10 rounded-full bg-berry-500"
                    />
                  )}
                  {t.name}
                  {selected && autoplay && inView && !reduce && (
                    <motion.span
                      key={active}
                      aria-hidden
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                      className="absolute inset-x-4 bottom-1 h-0.5 origin-left rounded-full bg-cream-50/60"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        <div
          id="treat-panel"
          role="tabpanel"
          aria-labelledby={`treat-tab-${treat.id}`}
          className="mt-8 grid items-center gap-6 lg:mt-4 lg:grid-cols-[1.1fr_1fr] lg:gap-12"
        >
          {/* Text */}
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={treat.id}
                initial="hidden"
                animate="show"
                exit="leave"
                variants={{ show: { transition: { staggerChildren: 0.07 } } }}
              >
                {[
                  <h3 key="name" className="font-display text-6xl font-semibold leading-[0.95] tracking-tight [font-variation-settings:'SOFT'_50] sm:text-7xl lg:text-[5.5rem]">
                    {treat.name}
                  </h3>,
                  <p key="line" className="mx-auto mt-5 max-w-xl text-xl leading-relaxed text-cream-100/85 sm:text-2xl lg:mx-0">
                    {treat.line}
                  </p>,
                  <ul key="tags" className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
                    {treat.tags.map((tag) => (
                      <li key={tag} className="rounded-full bg-cream-50/[0.08] px-5 py-2.5 text-base font-medium text-cream-100 ring-1 ring-cream-50/15">
                        {tag}
                      </li>
                    ))}
                  </ul>,
                  <div key="cta" className="mt-9 flex flex-col items-center gap-3 lg:items-start">
                    <a
                      href={whatsappLink(treat.order)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-berry-500 px-7 py-4 text-base font-semibold text-cream-50 shadow-lg shadow-black/30 transition hover:-translate-y-0.5 hover:bg-berry-600 sm:px-8 sm:py-5 sm:text-lg"
                    >
                      <WhatsAppIcon className="size-6 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                      {/* Shorter on phones so "brownie tubs" still fits on one line */}
                      <span className="sm:hidden">Order {treat.name.toLowerCase()}</span>
                      <span className="hidden sm:inline">Order {treat.name.toLowerCase()} on WhatsApp</span>
                    </a>
                    <div className="flex flex-wrap items-center justify-center gap-2 text-base text-cream-200/70 lg:justify-start">
                      <span>Also on</span>
                      <DeliveryLinks />
                    </div>
                  </div>,
                ].map((child, i) => (
                  <motion.div
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                      leave: { opacity: 0, y: -10, transition: { duration: 0.2 } },
                    }}
                  >
                    {child}
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Stage */}
          <motion.div
            onPanEnd={handleSwipe}
            style={{ touchAction: "pan-y" }}
            className="relative order-1 mx-auto aspect-square w-full max-w-[380px] select-none sm:max-w-[520px] lg:order-2 lg:max-w-none"
          >
            {/* Giant outlined word behind the product */}
            <div aria-hidden className="pointer-events-none absolute inset-0 grid place-items-center overflow-visible">
              <AnimatePresence initial={false}>
                <motion.span
                  key={treat.word}
                  initial={{ opacity: 0, x: direction * 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -80 }}
                  transition={{ duration: 0.6, ease: EASE }}
                  className="absolute whitespace-nowrap font-display text-[clamp(4.5rem,15vw,11rem)] font-black tracking-tight text-transparent [-webkit-text-stroke:2px_rgb(255_250_243/0.14)] [font-variation-settings:'SOFT'_100,'WONK'_1]"
                >
                  {treat.word}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Pool of light the product floats over */}
            <div aria-hidden className="absolute bottom-[10%] left-1/2 h-[14%] w-[70%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(255_250_243/0.18),transparent)]" />

            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={treat.id}
                custom={direction}
                variants={productVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-[6%]"
              >
                <div className="relative size-full motion-safe:animate-bob">
                  <SmartImage
                    src={treat.image}
                    alt={treat.name}
                    fill
                    sizes="(min-width: 1024px) 560px, 90vw"
                    className="object-contain drop-shadow-[0_30px_30px_rgb(0_0_0/0.45)]"
                    fallback={<span className="absolute inset-[15%] rounded-full bg-cream-50/10" />}
                  />
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Chocolate drops splash out on every switch */}
            {!reduce && (
              <div key={active} aria-hidden className="pointer-events-none absolute left-1/2 top-1/2">
                {DROPS.map((d, i) => (
                  <motion.span
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: d.size,
                      height: d.size,
                      background: i % 3 === 0 ? treat.glow : "#3b2116",
                      boxShadow: "inset -2px -2px 0 rgb(0 0 0 / 0.25)",
                    }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{ x: d.x, y: [0, d.y - 40, d.y + 30], opacity: [0, 1, 0], scale: [0.4, 1, 0.8] }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: 0.05 }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

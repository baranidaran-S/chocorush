"use client";

import { useRef, useState, type PointerEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { ArrowRightIcon, WhatsAppIcon } from "@/components/icons";
import { Reveal, RisingWords, Squiggle } from "@/components/ui/motion-text";
import { SmartImage } from "@/components/ui/smart-image";
import { Wave } from "@/components/ui/wave";
import { categories, type Category, type CategoryTone } from "@/lib/catalog";

const TONES: Record<CategoryTone, { card: string; title: string; text: string; pill: string }> = {
  rose: { card: "bg-[#f8d9e0]", title: "text-cocoa-900", text: "text-cocoa-700", pill: "bg-cocoa-900 text-cream-50" },
  cocoa: { card: "bg-cocoa-800", title: "text-cream-50", text: "text-cream-200/80", pill: "bg-berry-500 text-cream-50" },
  butter: { card: "bg-[#fbe8c6]", title: "text-cocoa-900", text: "text-cocoa-700", pill: "bg-cocoa-900 text-cream-50" },
  caramel: { card: "bg-[#f1d4b4]", title: "text-cocoa-900", text: "text-cocoa-700", pill: "bg-cocoa-900 text-cream-50" },
  berry: { card: "bg-berry-500", title: "text-cream-50", text: "text-cream-50/85", pill: "bg-cream-50 text-cocoa-900" },
  latte: { card: "bg-[#e9d6c2]", title: "text-cocoa-900", text: "text-cocoa-700", pill: "bg-cocoa-900 text-cream-50" },
};

export function WhatWeMake() {
  return (
    <section
      id="what-we-make"
      className="relative overflow-x-clip bg-cream-100 bg-[linear-gradient(to_bottom,var(--color-cream-200),var(--color-cream-100)_36rem)] pb-24 pt-20 sm:pb-32 sm:pt-24"
    >
      {/* Cream waves rising into the hero, like the chocolate ones on the treats section */}
      <Wave back="text-cream-300" front="text-cream-200" />
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 size-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-berry-300/20 blur-[120px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <header className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Reveal>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-600">What we make</p>
            </Reveal>
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-cocoa-900 [font-variation-settings:'SOFT'_50]"
            >
              <RisingWords delay={0.05}>Six ways to</RisingWords>{" "}
              <span className="relative inline-block">
                <RisingWords delay={0.15} className="italic text-berry-500">
                  treat yourself.
                </RisingWords>
                <Squiggle />
              </span>
            </motion.h2>
          </div>
          <Reveal delay={0.25} className="max-w-sm">
            <p className="text-base leading-relaxed text-cocoa-600 sm:text-lg">
              From everyday cakes to one-of-a-kind birthday creations — pick a craving and dive in.
            </p>
          </Reveal>
        </header>

        {/* One column on phones, two on tablets, three on desktop. Top padding leaves room for the images to pop out. */}
        <ul className="mt-6 grid gap-y-4 sm:mt-10 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3">
          {categories.map((category, i) => (
            <li key={category.id} className="pt-24 sm:pt-28">
              <CategoryCard category={category} index={i} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CategoryCard({ category, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const tone = TONES[category.tone];

  // Pointer position inside the card, -0.5..0.5, drives the 3D tilt and the glare.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [9, -9]), { stiffness: 180, damping: 18 });
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-11, 11]), { stiffness: 180, damping: 18 });
  const glareX = useTransform(px, (v) => (v + 0.5) * 100);
  const glareY = useTransform(py, (v) => (v + 0.5) * 100);
  const glare = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 60%)`;

  function handleMove(e: PointerEvent<HTMLAnchorElement>) {
    if (reduce || e.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((e.clientX - rect.left) / rect.width - 0.5);
    py.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    px.set(0);
    py.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 90 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ type: "spring", stiffness: 70, damping: 16, delay: (index % 3) * 0.12 }}
      className="h-full [perspective:1200px]"
    >
      <motion.a
        ref={ref}
        href={category.href}
        {...(category.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        onPointerMove={handleMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={handleLeave}
        style={reduce ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
        className={`group relative flex h-full flex-col rounded-[2rem] px-6 pb-6 pt-[52%] shadow-[0_20px_50px_-24px_rgb(42_23_15/0.35)] transition-shadow duration-500 hover:shadow-[0_40px_80px_-30px_rgb(42_23_15/0.5)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-berry-400 sm:px-7 sm:pb-7 ${tone.card}`}
      >
        <motion.span
          aria-hidden
          style={{ background: glare }}
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />

        {/* Pop-out image, lifted toward the viewer in 3D */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto w-[86%] [transform:translateZ(70px)] sm:-top-28"
        >
          <motion.span
            className="block"
            initial={{ scale: 0.6, rotate: -14, opacity: 0 }}
            whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.25 + (index % 3) * 0.12 }}
          >
            <motion.span
              className="relative block aspect-square"
              animate={reduce ? undefined : { y: hovered ? -16 : 0, rotate: hovered ? -4 : 0, scale: hovered ? 1.07 : 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
            >
              <span className="absolute inset-x-[18%] bottom-[8%] h-[10%] rounded-[50%] bg-cocoa-950/25 blur-xl transition-transform duration-500 group-hover:scale-75" />
              <SmartImage
                src={category.image}
                alt=""
                fill
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 40vw, 70vw"
                className="object-contain drop-shadow-[0_22px_22px_rgb(42_23_15/0.3)]"
                fallback={<span className="absolute inset-[12%] rounded-full bg-white/30" />}
              />
            </motion.span>
          </motion.span>
        </span>

        <div className="relative mt-auto [transform:translateZ(30px)]">
          <h3 className={`font-display text-[1.75rem] font-semibold leading-tight tracking-tight ${tone.title}`}>
            {category.name}
          </h3>
          <p className={`mt-2 text-sm leading-relaxed ${tone.text}`}>{category.blurb}</p>
          <span
            className={`mt-5 inline-flex items-center gap-2 rounded-full py-2 pl-4 pr-2 text-sm font-semibold transition-transform duration-300 group-hover:-translate-y-0.5 ${tone.pill}`}
          >
            {category.cta}
            <span className="grid size-6 place-items-center rounded-full bg-white/15 transition-transform duration-300 group-hover:translate-x-1">
              {category.external ? <WhatsAppIcon className="size-4" /> : <ArrowRightIcon className="size-3.5" />}
            </span>
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

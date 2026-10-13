"use client";

import { motion } from "motion/react";
import { HeartIcon, WhatsAppIcon } from "@/components/icons";
import { EASE, Reveal, RisingWords, Squiggle } from "@/components/ui/motion-text";
import { SmartImage } from "@/components/ui/smart-image";
import { whatsappLink } from "@/lib/site";

const CAKES = [
  { name: "Two-tier Celebration", image: "/images/custom-cakes/two-tier-celebration.png", tint: "#fff3ea" },
  { name: "Black Forest", image: "/images/custom-cakes/classic-black-forest.png", tint: "#fde6ec" },
  { name: "Floral", image: "/images/custom-cakes/floral-cake.png", tint: "#f2ebfb" },
  { name: "Unicorn", image: "/images/custom-cakes/unicorn-cake.png", tint: "#fff3d6" },
  { name: "Superhero", image: "/images/custom-cakes/superhero-cake.png", tint: "#e6effc" },
  { name: "Minimal Gold", image: "/images/custom-cakes/minimal-gold.png", tint: "#f6eee2" },
];

const PROMISES = ["Any theme you dream up", "Your favourite flavour", "Your name & message"];

export function CustomCake() {
  return (
    <section id="custom-cake" className="relative overflow-x-clip bg-[#fbeef0] pb-24 pt-24 sm:pb-28 sm:pt-28">
      {/* Piped-frosting scallops along the top edge */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-5 -translate-y-full bg-[radial-gradient(circle_at_14px_20px,#fbeef0_14px,transparent_14.5px)] bg-size-[28px_20px] bg-repeat-x"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgb(229_96_127/0.14)_1.2px,transparent_1.3px)] bg-size-[22px_22px]"
      />

      <header className="relative mx-auto max-w-2xl px-4 text-center sm:px-8">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-600">Custom birthday cakes</p>
        </Reveal>
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-cocoa-900 [font-variation-settings:'SOFT'_50]"
        >
          <RisingWords delay={0.05}>Your cake,</RisingWords>{" "}
          <span className="relative inline-block">
            <RisingWords delay={0.15} className="italic text-berry-500">
              your way.
            </RisingWords>
            <Squiggle />
          </span>
        </motion.h2>
        <Reveal delay={0.2}>
          <p className="mt-5 text-base leading-relaxed text-cocoa-600 sm:text-lg">
            Tell us the theme, the flavour and the message — we&apos;ll bake a cake made just for your
            celebration.
          </p>
        </Reveal>
      </header>

      {/* Endless strip of cakes; pauses on hover. It slides by half its length per loop, and each half must be
          wider than the screen or a gap opens before the loop restarts: two sets per half from tablets up,
          one on phones. The loop takes twice as long when it covers two sets, so the speed stays the same. */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="group/strip relative mt-2 py-12 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <ul className="flex w-max gap-6 pr-6 will-change-transform motion-safe:animate-marquee group-hover/strip:[animation-play-state:paused] sm:[animation-duration:64s]">
          {[...CAKES, ...CAKES, ...CAKES, ...CAKES].map((cake, i) => (
            <li
              key={i}
              aria-hidden={i >= CAKES.length}
              className={`w-52 shrink-0 sm:w-64 ${i % 2 ? "translate-y-6" : ""} ${i >= CAKES.length * 2 ? "hidden sm:block" : ""}`}
            >
              <div
                className="group/card relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-[0_24px_50px_-28px_rgb(42_23_15/0.45)] ring-1 ring-cocoa-900/5 transition-transform duration-500 hover:-translate-y-2"
                style={{ background: `radial-gradient(circle at 50% 42%, #fffaf3 0%, ${cake.tint} 70%)` }}
              >
                <SmartImage
                  src={cake.image}
                  alt={i < CAKES.length ? `${cake.name} birthday cake` : ""}
                  fill
                  sizes="(min-width: 640px) 256px, 208px"
                  className="object-contain p-5 pb-14 drop-shadow-[0_18px_18px_rgb(42_23_15/0.25)] transition-transform duration-500 group-hover/card:scale-105 group-hover/card:-rotate-2"
                  fallback={<span className="absolute inset-[18%] rounded-full bg-white/50" />}
                />
                <span className="absolute inset-x-0 bottom-4 text-center font-display text-lg font-semibold text-cocoa-900">
                  {cake.name}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      <div className="relative mx-auto mt-4 flex max-w-3xl flex-col items-center gap-7 px-4 text-center sm:px-8">
        <ul className="flex flex-wrap justify-center gap-3">
          {PROMISES.map((text, i) => (
            <motion.li
              key={text}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, ease: EASE, delay: i * 0.1 }}
              className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-cocoa-800 ring-1 ring-cocoa-900/10"
            >
              <HeartIcon className="size-4 text-berry-500" />
              {text}
            </motion.li>
          ))}
        </ul>
        <Reveal delay={0.3}>
          <a
            href={whatsappLink("Hi ChocoRush! 🎂 I'd like to order a custom birthday cake.")}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-cocoa-900 px-7 py-4 text-base font-semibold text-cream-50 shadow-lg shadow-cocoa-900/25 transition hover:-translate-y-0.5 hover:bg-berry-600 hover:shadow-xl"
          >
            <WhatsAppIcon className="size-5 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            Plan my cake on WhatsApp
          </a>
        </Reveal>
      </div>
    </section>
  );
}

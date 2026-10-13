"use client";

import { motion, type Variants } from "motion/react";
import { InstagramIcon, StarIcon } from "@/components/icons";
import { Drip } from "@/components/ui/drip";
import { EASE, Reveal, RisingWords, Squiggle } from "@/components/ui/motion-text";
import { site } from "@/lib/site";
import { testimonials } from "@/lib/testimonials";

// Pastel notes, each pinned at its own slight angle.
const NOTES = [
  { color: "#fde6ec", tilt: -3 },
  { color: "#fff1cc", tilt: 2 },
  { color: "#efe6fb", tilt: -1.5 },
  { color: "#ffe6d5", tilt: 2.5 },
  { color: "#fbd9e3", tilt: -2 },
  { color: "#f5ead9", tilt: 1.5 },
];

const pin: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.9, rotate: 0 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: NOTES[i % NOTES.length].tilt,
    transition: { type: "spring", stiffness: 170, damping: 16, delay: 0.05 + i * 0.05 },
  }),
};

export function Testimonials() {
  return (
    <section id="reviews" className="relative overflow-x-clip bg-cream-50 pb-20 pt-44 sm:pb-24 sm:pt-48">
      {/* Chocolate from the treats section drips into this one */}
      <Drip className="absolute inset-x-0 top-0 z-10 -mt-px" colors={["#1a0e09", "#1a0e09"]} />
      <div aria-hidden className="pointer-events-none absolute -left-40 top-1/2 size-[60vmin] rounded-full bg-berry-300/20 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-600">Sweet words</p>
          </Reveal>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-cocoa-900 [font-variation-settings:'SOFT'_50]"
          >
            <RisingWords delay={0.05}>Loved all over</RisingWords>{" "}
            <span className="relative inline-block">
              <RisingWords delay={0.15} className="italic text-berry-500">
                Madurai.
              </RisingWords>
              <Squiggle />
            </span>
          </motion.h2>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-cocoa-600 sm:text-lg">
              A few kind notes from people we&apos;ve baked for.
            </p>
          </Reveal>
        </header>

        {/* Swipe row on phones, a pinned-note wall from tablet up. The list triggers the
            animation so notes scrolled out of view in the phone row still pop in. */}
        <motion.ul
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="-mx-4 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-14 pt-4 [scrollbar-width:none] sm:mx-0 sm:mt-16 sm:grid sm:pb-8 sm:grid-cols-2 sm:gap-8 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((review, i) => (
            <motion.li
              key={review.name}
              custom={i}
              variants={pin}
              whileHover={{ rotate: 0, y: -8, scale: 1.02, transition: { duration: 0.35, ease: EASE } }}
              className={`w-[80%] shrink-0 snap-center sm:w-auto ${i % 3 === 1 ? "lg:translate-y-8" : ""}`}
            >
              <figure
                className="relative flex h-full flex-col rounded-[1.75rem] p-7 pt-9 shadow-[0_22px_45px_-24px_rgb(42_23_15/0.35)]"
                style={{ backgroundColor: NOTES[i % NOTES.length].color }}
              >
                {/* Strip of tape holding the note up */}
                <span
                  aria-hidden
                  className="absolute -top-3 left-1/2 h-7 w-24 -translate-x-1/2 -rotate-3 rounded-sm bg-white/60 shadow-sm ring-1 ring-cocoa-900/5"
                />
                <div className="flex gap-1 text-berry-500" role="img" aria-label={`${review.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, s) => (
                    <StarIcon key={s} className={`size-5 ${s < review.rating ? "" : "opacity-25"}`} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-display text-xl leading-snug text-cocoa-900 [font-variation-settings:'SOFT'_50]">
                  “{review.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa-900 font-display text-lg font-semibold text-cream-50">
                    {review.name[0]}
                  </span>
                  <span>
                    <span className="block font-semibold text-cocoa-900">{review.name}</span>
                    <span className="text-sm text-cocoa-500">{review.order}</span>
                  </span>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>

        <Reveal className="mt-4 text-center sm:mt-16">
          <p className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-base text-cocoa-600">
            Tried our treats? Tag us on Instagram
            <a
              href={site.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 font-semibold text-cocoa-900 transition-colors hover:text-berry-600"
            >
              <InstagramIcon className="size-6 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
              {site.instagramHandle}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

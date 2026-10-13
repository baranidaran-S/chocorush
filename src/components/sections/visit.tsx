"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { ArrowRightIcon, BagIcon, ClockIcon, InstagramIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { EASE, Reveal, RisingWords, Squiggle } from "@/components/ui/motion-text";
import { DeliveryLinks } from "@/components/delivery-links";
import { site, whatsappLink } from "@/lib/site";

const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.address)}`;
const telUrl = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

export function Visit() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  function sendMessage(e: FormEvent) {
    e.preventDefault();
    const intro = name.trim() ? `This is ${name.trim()}. ` : "";
    window.open(whatsappLink(`Hi ${site.name}! ${intro}${message.trim()}`), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="relative overflow-x-clip bg-cream-50 pb-24 pt-12 sm:pb-32 sm:pt-16">
      <div aria-hidden className="pointer-events-none absolute -right-40 top-1/3 size-[60vmin] rounded-full bg-berry-300/25 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-600">Visit & contact</p>
          </Reveal>
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-3 font-display text-[clamp(2.5rem,6vw,4.75rem)] font-semibold leading-[1.02] tracking-tight text-cocoa-900 [font-variation-settings:'SOFT'_50]"
          >
            <RisingWords delay={0.05}>Come say</RisingWords>{" "}
            <span className="relative inline-block">
              <RisingWords delay={0.15} className="italic text-berry-500">
                hello.
              </RisingWords>
              <Squiggle />
            </span>
          </motion.h2>
          <Reveal delay={0.2}>
            <p className="mt-5 text-base leading-relaxed text-cocoa-600 sm:text-lg">
              Drop by for something fresh, or message us to order cakes, waffles, brownies and more.
            </p>
          </Reveal>
        </header>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <InfoCard index={0} icon={<MapPinIcon className="size-5" />} title="Visit us" body={site.address}>
              <TextLink href={directionsUrl} external>
                Get directions
              </TextLink>
            </InfoCard>
            <InfoCard index={1} icon={<ClockIcon className="size-5" />} title="Opening hours" body={site.hours} />
            <InfoCard index={2} icon={<PhoneIcon className="size-5" />} title="Call or WhatsApp" body={site.phone}>
              <div className="flex flex-wrap gap-2">
                <Pill href={telUrl}>
                  <PhoneIcon className="size-3.5" />
                  Call
                </Pill>
                <Pill href={whatsappLink()} external dark>
                  <WhatsAppIcon className="size-3.5" />
                  WhatsApp
                </Pill>
              </div>
            </InfoCard>
            <InfoCard index={3} icon={<BagIcon className="size-5" />} title="Order online" body="Get your treats delivered.">
              <DeliveryLinks variant="solid" />
            </InfoCard>
          </div>

          {/* Message form: opens WhatsApp with the text ready to send */}
          <motion.form
            onSubmit={sendMessage}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative flex flex-col overflow-hidden rounded-[2rem] bg-cocoa-900 p-6 text-cream-50 shadow-[0_30px_60px_-30px_rgb(42_23_15/0.6)] sm:p-8"
          >
            <div aria-hidden className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-berry-500/25 blur-3xl" />
            <h3 className="relative font-display text-2xl font-semibold sm:text-3xl">Send us a message</h3>
            <p className="relative mt-1 text-sm text-cream-200/70">Questions, bulk orders or a special request — it opens in WhatsApp.</p>
            <div className="relative mt-5 flex flex-1 flex-col gap-3">
              <label className="sr-only" htmlFor="contact-name">
                Your name
              </label>
              <input
                id="contact-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                className={fieldClass}
              />
              <label className="sr-only" htmlFor="contact-message">
                Your message
              </label>
              <textarea
                id="contact-message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What can we bake for you?"
                className={`${fieldClass} min-h-32 flex-1 resize-none`}
              />
            </div>
            <div className="relative mt-auto flex flex-wrap items-center justify-between gap-4 pt-5">
              <button
                type="submit"
                className="group inline-flex items-center gap-2.5 rounded-full bg-berry-500 px-6 py-3.5 text-sm font-semibold text-cream-50 transition hover:-translate-y-0.5 hover:bg-berry-600"
              >
                <WhatsAppIcon className="size-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                Send on WhatsApp
              </button>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-cream-100 transition-colors hover:text-berry-300"
              >
                <InstagramIcon className="size-6" />
                {site.instagramHandle}
              </a>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

const fieldClass =
  "w-full rounded-2xl bg-cream-50/[0.08] px-4 py-3 text-base text-cream-50 ring-1 ring-cream-50/15 transition placeholder:text-cream-200/50 focus:bg-cream-50/[0.12] focus:outline-none focus:ring-2 focus:ring-berry-400";

function InfoCard({
  index,
  icon,
  title,
  body,
  children,
}: {
  index: number;
  icon: ReactNode;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE, delay: (index % 2) * 0.1 + Math.floor(index / 2) * 0.12 }}
      className="group flex flex-col rounded-[1.75rem] bg-white/70 p-6 ring-1 ring-cocoa-900/[0.07] transition duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-28px_rgb(42_23_15/0.4)]"
    >
      <span className="grid size-11 place-items-center rounded-2xl bg-berry-500/10 text-berry-600 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110">
        {icon}
      </span>
      <h3 className="mt-4 text-sm font-semibold uppercase tracking-wider text-cocoa-500">{title}</h3>
      <p className="mt-1 font-display text-xl font-semibold leading-snug text-cocoa-900">{body}</p>
      {children && <div className="mt-auto pt-4">{children}</div>}
    </motion.div>
  );
}

function TextLink({ href, external, children }: { href: string; external?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-berry-600 hover:text-berry-500"
    >
      {children}
      <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover/link:translate-x-1" />
    </a>
  );
}

function Pill({ href, external, dark, children }: { href: string; external?: boolean; dark?: boolean; children: ReactNode }) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-semibold transition hover:-translate-y-0.5 ${
        dark ? "bg-cocoa-900 text-cream-50 hover:bg-berry-600" : "bg-cocoa-900/[0.06] text-cocoa-900 hover:bg-cocoa-900/[0.12]"
      }`}
    >
      {children}
    </a>
  );
}

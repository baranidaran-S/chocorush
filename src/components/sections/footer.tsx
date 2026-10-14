import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowRightIcon, InstagramIcon, WhatsAppIcon } from "@/components/icons";
import { DeliveryLinks } from "@/components/delivery-links";
import { Reveal } from "@/components/ui/motion-text";
import { navLinks, site, whatsappLink } from "@/lib/site";

// Cached so the page stays static; refreshes daily so the year rolls over on its own.
async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden rounded-t-[2.5rem] bg-cocoa-950 text-cream-100 sm:rounded-t-[4rem]">
      <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[55vmin] rounded-full bg-berry-500/15 blur-[110px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-24 size-[50vmin] rounded-full bg-caramel-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-6xl px-4 pt-16 sm:px-8 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr] lg:gap-10">
          <Reveal className="sm:col-span-2 lg:col-span-1">
            <a
              href="#home"
              aria-label={`${site.name} — back to top`}
              className="inline-block -rotate-2 rounded-2xl bg-cream-50 px-4 py-1 shadow-[0_18px_40px_-18px_rgb(0_0_0/0.6)] transition-transform duration-300 hover:rotate-0 hover:scale-105"
            >
              <Image src="/images/logo/chocorush-logo.png" alt={site.name} width={444} height={184} className="h-14 w-auto sm:h-16" />
            </a>
            <p className="mt-7 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl [font-variation-settings:'SOFT'_50]">
              Happiness, <span className="italic text-berry-400">freshly baked.</span>
            </p>
            <p className="mt-3 max-w-sm leading-relaxed text-cream-200/65">
              Cakes, custom birthday cakes, waffles, brownies, brownie tubs and shakes — baked fresh every day in Madurai.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-400">Explore</h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={`/${link.href}`} className={menuLink}>
                    {link.label}
                    <MenuArrow />
                  </a>
                </li>
              ))}
              {LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className={menuLink}>
                    {link.label}
                    <MenuArrow />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-400">Say hello</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-lg font-medium transition-colors hover:text-berry-300"
                >
                  <InstagramIcon className="size-7 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  {site.instagramHandle}
                </a>
              </li>
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-lg font-medium transition-colors hover:text-berry-300"
                >
                  <WhatsAppIcon className="size-7 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110" />
                  {site.phone}
                </a>
              </li>
            </ul>
            <h2 className="mt-9 text-sm font-semibold uppercase tracking-[0.2em] text-berry-400">Order online</h2>
            <DeliveryLinks className="mt-4" />
          </Reveal>
        </div>

        <div className="mt-14 flex items-center justify-between gap-5 border-t border-cream-50/10 pb-8 pt-6 text-sm text-cream-200/60 sm:pb-10">
          <p className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-2">
            <span>
              © <CurrentYear /> {site.name}. All rights reserved.
            </span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span>
              Designed & developed by{" "}
              {site.credit.url ? (
                <a
                  href={site.credit.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-cream-100 underline decoration-berry-500/60 underline-offset-4 transition-colors hover:text-berry-300 hover:decoration-berry-300"
                >
                  {site.credit.name}
                </a>
              ) : (
                <span className="font-semibold text-cream-100">{site.credit.name}</span>
              )}
            </span>
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="group inline-flex shrink-0 items-center gap-3 font-semibold text-cream-100 transition-colors hover:text-berry-300"
          >
            {/* Just the arrow on phones */}
            <span className="hidden sm:inline">Back to top</span>
            <span className="grid size-10 place-items-center rounded-full bg-cream-50/10 ring-1 ring-cream-50/15 transition duration-300 group-hover:-translate-y-1 group-hover:bg-berry-500 group-hover:ring-berry-500">
              <ArrowRightIcon className="size-4 -rotate-90 text-cream-50" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

const LEGAL_LINKS = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const menuLink = "group inline-flex items-center gap-2 text-lg font-medium text-cream-100 transition-colors hover:text-berry-300";

function MenuArrow() {
  return (
    <ArrowRightIcon className="size-4 -translate-x-2 opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
  );
}

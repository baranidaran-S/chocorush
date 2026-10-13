"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useLenis } from "lenis/react";
import { WhatsAppIcon } from "@/components/icons";
import { DeliveryLinks } from "@/components/delivery-links";
import { navLinks, site, whatsappLink } from "@/lib/site";

const EASE = [0.22, 1, 0.36, 1] as const;
// Where the menu button sits, so the mobile menu grows out of it.
const MENU_ORIGIN = "calc(100% - 42px) 42px";

export function Navbar() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  // Hide while scrolling down, come back on any scroll up.
  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > previous && y > 160);
  });

  // Freeze the page behind the open mobile menu; Escape closes it.
  useEffect(() => {
    if (!open) return;
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lenis]);

  function goTo(e: MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    document.documentElement.style.overflow = "";
    if (lenis) {
      lenis.start();
      lenis.scrollTo(href === "#home" ? 0 : href, { duration: 1.4 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: hidden && !open ? "-130%" : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4"
      >
        <nav
          aria-label="Main"
          className={`mx-auto flex max-w-5xl items-center justify-between gap-4 rounded-full py-2 pl-4 pr-2 ring-1 backdrop-blur-xl transition-[background-color,box-shadow] duration-500 ${
            open
              ? "bg-cream-50 shadow-[0_12px_40px_-12px_rgb(0_0_0/0.5)] ring-cocoa-900/10"
              : scrolled
                ? "bg-cream-50/95 shadow-[0_12px_40px_-12px_rgb(42_23_15/0.3)] ring-cocoa-900/10"
                : "bg-cream-50/55 ring-cocoa-900/5"
          }`}
        >
          <a href="#home" onClick={(e) => goTo(e, "#home")} aria-label={`${site.name} — back to top`} className="block shrink-0">
            <Image
              src="/images/logo/chocorush-logo.png"
              alt={site.name}
              width={444}
              height={184}
              loading="eager"
              className="-my-1.5 h-14 w-auto sm:-my-2 sm:h-[60px]"
            />
          </a>

          <ul className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => goTo(e, link.href)}
                  onMouseEnter={() => setHovered(link.href)}
                  onFocus={() => setHovered(link.href)}
                  className="relative isolate block rounded-full px-4 py-2 text-sm font-medium text-cocoa-700 transition-colors hover:text-cocoa-950"
                >
                  {hovered === link.href && (
                    <motion.span
                      layoutId="nav-hover"
                      className="absolute inset-0 -z-10 rounded-full bg-cocoa-900/[0.07]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-full bg-cocoa-900 px-5 py-2.5 text-sm font-semibold text-cream-50 transition-colors duration-300 hover:bg-berry-600 sm:inline-flex"
            >
              <WhatsAppIcon className="size-4 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
              Order Now
            </a>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center rounded-full bg-cocoa-900 text-cream-50 transition-colors hover:bg-cocoa-800 lg:hidden"
            >
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "rotate-45" : "-translate-y-1"}`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-current transition-transform duration-300 ${open ? "-rotate-45" : "translate-y-1"}`}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: `circle(0% at ${MENU_ORIGIN})` }}
            animate={{ clipPath: `circle(150% at ${MENU_ORIGIN})` }}
            exit={{ clipPath: `circle(0% at ${MENU_ORIGIN})` }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cocoa-950 px-6 pb-10 pt-28 text-cream-50 lg:hidden"
          >
            <div aria-hidden className="pointer-events-none absolute -right-24 top-1/3 size-80 rounded-full bg-berry-500/20 blur-3xl" />
            <nav aria-label="Mobile" className="relative">
              <ul className="space-y-1">
                {[{ label: "Home", href: "#home" }, ...navLinks].map((link, i) => (
                  <li key={link.href} className="overflow-hidden">
                    <motion.a
                      href={link.href}
                      onClick={(e) => goTo(e, link.href)}
                      initial={{ y: "105%" }}
                      animate={{ y: "0%" }}
                      exit={{ y: "105%", transition: { duration: 0.3 } }}
                      transition={{ duration: 0.6, ease: EASE, delay: 0.25 + i * 0.06 }}
                      className="flex items-baseline gap-4 py-1 font-display text-[clamp(2.4rem,11vw,4rem)] font-semibold leading-tight transition-colors hover:text-berry-400"
                    >
                      <span className="font-sans text-sm font-medium text-berry-400">0{i + 1}</span>
                      {link.label}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
              className="relative mt-auto space-y-4 pt-10"
            >
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 rounded-full bg-berry-500 px-6 py-4 font-semibold text-cream-50 transition-colors hover:bg-berry-600"
              >
                <WhatsAppIcon className="size-5" />
                Order on WhatsApp
              </a>
              <div className="flex items-center justify-center gap-2 text-sm text-cream-200/70">
                <span>Also on</span>
                <DeliveryLinks />
              </div>
              <p className="text-center text-sm text-cream-200/70">{site.hours}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

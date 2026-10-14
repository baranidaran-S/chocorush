import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Footer } from "@/components/sections/footer";
import { site } from "@/lib/site";

/** Shared layout for the Privacy Policy and Terms & Conditions pages. */
export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      {/* id="home" so the footer's "Back to top" works on these pages too */}
      <header id="home" className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-4 pt-6 sm:px-8">
        <Link href="/" aria-label={`${site.name} home`} className="block shrink-0">
          <Image src="/images/logo/chocorush-logo.png" alt={site.name} width={444} height={184} className="h-12 w-auto sm:h-14" />
        </Link>
        <Link
          href="/"
          className="group inline-flex items-center gap-2 rounded-full bg-cocoa-900 px-4 py-2.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-berry-600"
        >
          <ArrowRightIcon className="size-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5" />
          Back to home
        </Link>
      </header>

      <main className="relative flex-1 overflow-x-clip pb-24 pt-12 sm:pb-32 sm:pt-16">
        <div aria-hidden className="pointer-events-none absolute -right-40 top-10 size-[50vmin] rounded-full bg-berry-300/20 blur-[110px]" />
        <article className="relative mx-auto max-w-3xl px-4 sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-berry-600">Legal</p>
          <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-cocoa-900 [font-variation-settings:'SOFT'_50]">
            {title}
          </h1>
          <p className="mt-3 text-sm text-cocoa-500">Last updated: {updated}</p>
          <div className="legal mt-10">{children}</div>
        </article>
      </main>

      <Footer />
    </>
  );
}

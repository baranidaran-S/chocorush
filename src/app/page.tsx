import { CustomCake } from "@/components/sections/custom-cake";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Navbar } from "@/components/sections/navbar";
import { Testimonials } from "@/components/sections/testimonials";
import { Treats } from "@/components/sections/treats";
import { Visit } from "@/components/sections/visit";
import { WhatWeMake } from "@/components/sections/what-we-make";

export default function Home() {
  return (
    <>
      <main className="flex-1">
        <Navbar />
        <Hero />
        <WhatWeMake />
        <CustomCake />
        <Treats />
        <Testimonials />
        <Visit />
      </main>
      <Footer />
    </>
  );
}

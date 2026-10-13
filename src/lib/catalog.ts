// Product categories shown in "What We Make".
import { whatsappLink } from "@/lib/site";

export type CategoryTone = "rose" | "cocoa" | "butter" | "caramel" | "berry" | "latte";

export type Category = {
  id: string;
  name: string;
  blurb: string;
  image: string;
  href: string;
  cta: string;
  /** Opens WhatsApp in a new tab instead of scrolling within the page. */
  external?: boolean;
  tone: CategoryTone;
};

export const categories: Category[] = [
  {
    id: "cakes",
    name: "Cakes",
    blurb: "Chocolate truffle, red velvet, black forest and more.",
    image: "/images/categories/cakes.png",
    href: whatsappLink("Hi ChocoRush! I'd like to order a cake."),
    cta: "Order on WhatsApp",
    external: true,
    tone: "rose",
  },
  {
    id: "custom-cakes",
    name: "Custom Birthday Cakes",
    blurb: "Your theme, your flavour, your message — designed with you.",
    image: "/images/categories/custom-cakes.png",
    href: "#custom-cake",
    cta: "Design yours",
    tone: "cocoa",
  },
  {
    id: "waffles",
    name: "Waffles",
    blurb: "Crispy, golden and drenched in chocolate.",
    image: "/images/categories/waffle.png",
    href: whatsappLink("Hi ChocoRush! I'd like to order waffles."),
    cta: "Order on WhatsApp",
    external: true,
    tone: "butter",
  },
  {
    id: "brownies",
    name: "Brownies",
    blurb: "Thick, fudgy and gooey in the middle.",
    image: "/images/categories/brownie.png",
    href: whatsappLink("Hi ChocoRush! I'd like to order brownies."),
    cta: "Order on WhatsApp",
    external: true,
    tone: "caramel",
  },
  {
    id: "brownie-tubs",
    name: "Brownie Tubs",
    blurb: "Gooey brownie chunks drowned in chocolate, packed in a tub.",
    image: "/images/categories/brownie-tub.png",
    href: whatsappLink("Hi ChocoRush! I'd like to order a brownie tub."),
    cta: "Order on WhatsApp",
    external: true,
    tone: "berry",
  },
  {
    id: "beverages",
    name: "Beverages",
    blurb: "Thick shakes, cold coffee and hot chocolate.",
    image: "/images/categories/beverage.png",
    href: whatsappLink("Hi ChocoRush! I'd like to order beverages."),
    cta: "Order on WhatsApp",
    external: true,
    tone: "latte",
  },
];


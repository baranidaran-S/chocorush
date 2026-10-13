// Business details used across the site. Replace the placeholders with the real values.
export const site = {
  name: "ChocoRush",
  tagline:
    "Cakes, custom birthday cakes, waffles, brownies, brownie tubs & shakes — baked fresh every day.",

  // WhatsApp number with country code, digits only (e.g. 919876543210)
  whatsappNumber: "918248743615",
  phone: "+91 82487 43615",

  swiggyUrl: "https://www.swiggy.com/city/madurai/choco-rush-pt-rajan-road-narimedu-rest399279",
  zomatoUrl: "https://www.zomato.com/madurai/choco-rush-periyar/order",
  instagramUrl: "https://www.instagram.com/chocorush.in/",
  instagramHandle: "@chocorush.in",

  address: "A.A, Private Lane, 26C/2, Chairman Muthuramaiyer Rd, near Vairamani Mahal, Madurai, Tamil Nadu 625009",
  hours: "Open daily · 10 AM – 11 PM",

  // Footer credit. Paste the website link into `url` (e.g. "https://...") to make the name clickable.
  credit: { name: "MnT Future", url: "https://mntfuture.com/" },
};

// Page sections, shared by the navbar and the footer.
export const navLinks = [
  { label: "What We Make", href: "#what-we-make" },
  { label: "Custom Cakes", href: "#custom-cake" },
  { label: "Waffles & Brownies", href: "#treats" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export function whatsappLink(message = `Hi ${site.name}! I'd like to place an order.`) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

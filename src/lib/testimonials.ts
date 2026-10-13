// SAMPLE REVIEWS, for layout only. Replace every entry with a real customer review
// (with their permission) before the site goes live.
export type Testimonial = {
  name: string;
  /** What they ordered, shown under their name. */
  order: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    name: "Priya",
    order: "Custom birthday cake",
    text: "Ordered a unicorn cake for my daughter's birthday and it looked exactly like the picture. Tasted even better!",
    rating: 5,
  },
  {
    name: "Arjun",
    order: "Brownie tub",
    text: "The brownie tub is dangerous. Gooey, chocolatey and gone in ten minutes. Already planning the next one.",
    rating: 5,
  },
  {
    name: "Divya",
    order: "Waffles",
    text: "Crispy waffles drenched in chocolate are now our Friday night ritual. Such a cosy little place.",
    rating: 5,
  },
  {
    name: "Karthik",
    order: "Chocolate truffle cake",
    text: "Rich and moist without being too sweet. Everyone at the office asked where the cake was from.",
    rating: 5,
  },
  {
    name: "Meena",
    order: "Brownies",
    text: "Fudgy in the middle, crackly on top. My go-to whenever I need a chocolate fix.",
    rating: 5,
  },
  {
    name: "Rahul",
    order: "Shakes & cold coffee",
    text: "Thick shakes and a proper cold coffee. The perfect stop after a long day.",
    rating: 4,
  },
];

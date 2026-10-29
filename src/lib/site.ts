/**
 * Verified business details, taken from the previous equinoxtinting.com.
 * Anything not listed here (service areas beyond Port St. Lucie, geo
 * coordinates, Google Business Profile URL, reviews) was NOT published on the
 * old site and must be supplied by the owner before it is added.
 */
export const site = {
  name: "Equinox Tinting",
  legalName: "Equinox Tinting",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://equinoxtinting.com",
  tagline: "Window tint & ceramic coating in Port St. Lucie, FL",
  description:
    "Automotive window tint and ceramic coating in Port St. Lucie, FL. Nano-ceramic and color-stable films that block 99% of UVA/UVB rays, installed by Equinox Tinting.",
  phone: {
    display: "(772) 380-3272",
    href: "tel:+17723803272",
    e164: "+17723803272",
  },
  email: "equinoxtinting@gmail.com",
  address: {
    street: "500 NW University Blvd",
    unit: "Unit 101",
    city: "Port St. Lucie",
    region: "FL",
    postalCode: "34986",
    country: "US",
  },
  hours: [
    { days: "Monday – Saturday", short: "Mon–Sat", open: "09:00", close: "17:00", label: "9:00am – 5:00pm" },
    { days: "Sunday", short: "Sun", open: null, close: null, label: "Closed" },
  ],
  areaServed: ["Port St. Lucie, FL"],
  social: {
    instagram: { handle: "@eqxtinting", href: "https://www.instagram.com/eqxtinting/" },
    facebook: { handle: "Equinox Tinting", href: "https://www.facebook.com/profile.php?id=61550664565050" },
  },
  credit: { name: "PJV Web Development", href: "https://www.pjvwebdev.com/" },
} as const;

export const fullAddress = `${site.address.street} ${site.address.unit}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;

const mapsQuery = encodeURIComponent(
  `${site.address.street} ${site.address.unit}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
);

export const mapsLinks = {
  directions: `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`,
  embed: `https://maps.google.com/maps?q=${mapsQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`,
};

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Services", href: "/services" },
  { label: "Window Tint", href: "/services/window-tint" },
  { label: "Ceramic Coating", href: "/services/ceramic-coating" },
  { label: "Gallery", href: "/gallery" },
  { label: "Studio", href: "/about" },
  { label: "Contact", href: "/contact" },
];

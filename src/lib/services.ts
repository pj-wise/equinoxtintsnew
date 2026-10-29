import type { Photo } from "@/lib/photos";
import { photos } from "@/lib/photos";

/**
 * Service + film content. All copy and specifications come from the previous
 * equinoxtinting.com. Do not add specs, VLT availability or pricing here
 * without confirmation from the shop.
 */

export type Spec = { label: string; value: string; note?: string };

export type Film = {
  id: string;
  name: string;
  type: string;
  summary: string;
  description: string;
  specs: Spec[];
  highlights: string[];
  warranty: string;
  photo: Photo;
};

export const films: Film[] = [
  {
    id: "carbonfx",
    name: "CarbonFX",
    type: "Black NR 2-Ply Window Film",
    summary: "A true color-stable dyed film with a rich, black tone.",
    description:
      "CarbonFX uses some of the most advanced dyes on the market. The deep-dyed, 2-ply, 1.5 mil polyester film adds multiple stages of UV inhibitors during manufacturing so it keeps the same rich color as the day it was installed — while blocking 99% of UVA and UVB rays.",
    specs: [
      { label: "UVA / UVB blocked", value: "99%" },
      { label: "Construction", value: "2-Ply" },
      { label: "Thickness", value: "1.5 mil" },
    ],
    highlights: ["Deep-dyed, true color-stable", "Rich black tone", "Multi-stage UV inhibitors"],
    warranty: "Premium lifetime warranty against excessive color change",
    photo: photos.audiA3,
  },
  {
    id: "fxtreme2",
    name: "FXtreme2",
    type: "Nano-Ceramic 2-Ply Window Film",
    summary: "Non-metalized nano-ceramic built to reject heat.",
    description:
      "FXtreme2 uses a proprietary, non-metalized ceramic material designed to reject heat — up to 88% of infrared — and block 99% of harmful UVA and UVB rays. Built into a 2-ply, 2.0 mil color-stable polyester, it keeps vehicles cooler, reduces sun damage to the interior and won't interfere with today's electronics.",
    specs: [
      { label: "IR rejection", value: "Up to 88%" },
      { label: "UVA / UVB blocked", value: "99%" },
      { label: "Thickness", value: "2.0 mil" },
    ],
    highlights: ["Non-metalized nano-ceramic", "Won't interfere with electronics", "Color-stable polyester"],
    warranty: "Premium lifetime warranty against excessive color change",
    photo: photos.lexusRx350,
  },
  {
    id: "fx-plus",
    name: "FX Plus",
    type: "Nano-Ceramic 2-Ply Window Film",
    summary: "The ultimate nano-ceramic for maximum heat rejection.",
    description:
      "FX Plus is engineered for high infrared rejection (96–98%) and Total Solar Energy Rejection (TSER). Maximum heat rejection, 99% UVA/UVB rejection, a color-stable rich black tone, great optical clarity with no distortion and an unmatched scratch-resistant coating.",
    specs: [
      { label: "IR rejection", value: "96–98%" },
      { label: "UVA / UVB blocked", value: "99%" },
      { label: "Construction", value: "2-Ply" },
    ],
    highlights: ["Maximum heat rejection", "Optical clarity, no distortion", "Scratch-resistant coating"],
    warranty: "Premium lifetime warranty",
    photo: photos.corvetteC7Black,
  },
];

export type Service = {
  id: string;
  index: string;
  name: string;
  shortName: string;
  href: string;
  summary: string;
  photo: Photo;
  quoteValue: QuoteService;
};

export const quoteServices = [
  "Automotive window tint",
  "Ceramic coating",
  "Residential or commercial film",
  "Not sure yet",
] as const;
export type QuoteService = (typeof quoteServices)[number];

export const services: Service[] = [
  {
    id: "window-tint",
    index: "01",
    name: "Automotive Window Tint",
    shortName: "Window Tint",
    href: "/services/window-tint",
    summary:
      "Color-stable dyed and nano-ceramic films that cut heat and glare, block 99% of UVA/UVB rays and enhance the appearance of your car.",
    photo: photos.fordMustang,
    quoteValue: "Automotive window tint",
  },
  {
    id: "ceramic-coating",
    index: "02",
    name: "Ceramic Coating",
    shortName: "Ceramic Coating",
    href: "/services/ceramic-coating",
    summary:
      "A durable, hydrophobic layer that repels water, dirt and contaminants while deepening gloss and protecting against UV and oxidation.",
    photo: photos.corvetteC6Blue,
    quoteValue: "Ceramic coating",
  },
  {
    id: "residential-commercial",
    index: "03",
    name: "Residential & Commercial Film",
    shortName: "Home & Business",
    href: "/services#residential-commercial",
    summary:
      "Film options for homes and businesses that add privacy, security and energy efficiency — making your space more comfortable and cost-effective.",
    photo: photos.storefront,
    quoteValue: "Residential or commercial film",
  },
];

export const ceramicCoating = {
  intro:
    "At Equinox Tinting, we offer a premium ceramic coating service that protects and enhances your vehicle's exterior.",
  body: "Our advanced coating creates a durable, hydrophobic layer that repels water, dirt, and contaminants, making cleaning easier. It also provides long-lasting protection against UV rays, oxidation, and minor scratches, while enhancing your vehicle's gloss and depth.",
  closing:
    "Trust our expert technicians to deliver a flawless finish and maintain your vehicle's showroom shine.",
  benefits: [
    { title: "Hydrophobic", text: "Water beads and sheets off instead of sitting on the paint." },
    { title: "Easier cleaning", text: "Dirt and contaminants have a harder time bonding to the surface." },
    { title: "UV & oxidation", text: "Long-lasting protection from the Florida sun and oxidation." },
    { title: "Minor scratches", text: "An added layer of defense against light marring." },
    { title: "Gloss & depth", text: "Richer color and a deeper, glass-like shine." },
  ],
};

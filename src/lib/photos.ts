import type { StaticImageData } from "next/image";

import audiRsInstall from "@/assets/photos/audi-rs-install.jpg";
import ceramicCoatingApplication from "@/assets/photos/ceramic-coating-application.jpg";
import corvetteC8Orange from "@/assets/photos/corvette-c8-orange.jpg";
import corvetteC8Red from "@/assets/photos/corvette-c8-red.jpg";
import corvetteC8Yellow from "@/assets/photos/corvette-c8-yellow.jpg";
import customerLounge from "@/assets/photos/customer-lounge.jpg";
import dodgeChargerRed from "@/assets/photos/dodge-charger-red.jpg";
import filmInstallDetail from "@/assets/photos/film-install-detail.jpg";
import filmPlotter from "@/assets/photos/film-plotter.jpg";
import fordMustangHex from "@/assets/photos/ford-mustang-hex.jpg";
import lexusHex from "@/assets/photos/lexus-hex.jpg";
import squeegeeGlass from "@/assets/photos/squeegee-glass.jpg";
import teslaModelX from "@/assets/photos/tesla-model-x.jpg";

export type PhotoCategory = "vehicles" | "studio";

export type Photo = {
  id: string;
  src: StaticImageData;
  alt: string;
  /** Short caption. Vehicle names are identified from the photos — owner should confirm. */
  title: string;
  category: PhotoCategory;
};

/** Shop photography supplied by Equinox Tinting (Oct 2026), in a curated order. */
export const photos = {
  corvetteC8Red: {
    id: "corvette-c8-red",
    src: corvetteC8Red,
    alt: "Red mid-engine Chevrolet Corvette with both doors open in the Equinox Tinting install bay",
    title: "Chevrolet Corvette",
    category: "vehicles",
  },
  corvetteC8Yellow: {
    id: "corvette-c8-yellow",
    src: corvetteC8Yellow,
    alt: "Yellow mid-engine Chevrolet Corvette under hexagon lights in the Equinox Tinting bay",
    title: "Chevrolet Corvette",
    category: "vehicles",
  },
  teslaModelX: {
    id: "tesla-model-x",
    src: teslaModelX,
    alt: "White Tesla Model X with its falcon-wing doors raised in the Equinox Tinting bay",
    title: "Tesla Model X",
    category: "vehicles",
  },
  corvetteC8Orange: {
    id: "corvette-c8-orange",
    src: corvetteC8Orange,
    alt: "Orange Chevrolet Corvette with the door open, showing its tinted side glass and tan interior",
    title: "Chevrolet Corvette",
    category: "vehicles",
  },
  dodgeChargerRed: {
    id: "dodge-charger-red",
    src: dodgeChargerRed,
    alt: "Red Dodge Charger with tinted windows in the studio",
    title: "Dodge Charger",
    category: "vehicles",
  },
  fordMustangHex: {
    id: "ford-mustang-hex",
    src: fordMustangHex,
    alt: "Dark gray Ford Mustang reflecting the hexagon ceiling lights",
    title: "Ford Mustang",
    category: "vehicles",
  },
  lexusHex: {
    id: "lexus-hex",
    src: lexusHex,
    alt: "Hexagon studio lights reflected across the glossy hood of a dark Lexus",
    title: "Lexus",
    category: "vehicles",
  },
  squeegeeGlass: {
    id: "squeegee-glass",
    src: squeegeeGlass,
    alt: "Installer squeegeeing window film onto glass",
    title: "Squeegee work",
    category: "studio",
  },
  filmPlotter: {
    id: "film-plotter",
    src: filmPlotter,
    alt: "Film being cut on the plotter in the Equinox Tinting prep room",
    title: "Film on the plotter",
    category: "studio",
  },
  ceramicCoatingApplication: {
    id: "ceramic-coating-application",
    src: ceramicCoatingApplication,
    alt: "Gloved hand loading a ceramic coating applicator from a dropper bottle",
    title: "Ceramic coating application",
    category: "studio",
  },
  audiRsInstall: {
    id: "audi-rs-install",
    src: audiRsInstall,
    alt: "Gray Audi RS with film being installed over the front end, spray bottle on the floor",
    title: "Audi RS — install in progress",
    category: "studio",
  },
  filmInstallDetail: {
    id: "film-install-detail",
    src: filmInstallDetail,
    alt: "Close-up of clear film being laid over a headlight during an install",
    title: "Install detail",
    category: "studio",
  },
  customerLounge: {
    id: "customer-lounge",
    src: customerLounge,
    alt: "Equinox Tinting customer lounge with armchairs, a TV and film samples on the wall",
    title: "Customer lounge",
    category: "studio",
  },
} satisfies Record<string, Photo>;

export const galleryPhotos: Photo[] = Object.values(photos);

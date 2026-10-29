import type { StaticImageData } from "next/image";

import audiA3 from "@/assets/photos/audi-a3.jpg";
import audiA5 from "@/assets/photos/audi-a5.jpg";
import bmwX3 from "@/assets/photos/bmw-x3.jpg";
import corvetteC6Blue from "@/assets/photos/corvette-c6-blue.jpg";
import corvetteC7Black from "@/assets/photos/corvette-c7-black.jpg";
import customerLounge from "@/assets/photos/customer-lounge.jpg";
import dodgeCharger from "@/assets/photos/dodge-charger.jpg";
import fordMustang from "@/assets/photos/ford-mustang.jpg";
import hyundaiElantra from "@/assets/photos/hyundai-elantra.jpg";
import hyundaiTucson from "@/assets/photos/hyundai-tucson.jpg";
import installRoom from "@/assets/photos/install-room.jpg";
import lexusEs from "@/assets/photos/lexus-es.jpg";
import lexusRx350 from "@/assets/photos/lexus-rx350.jpg";
import ram1500Storefront from "@/assets/photos/ram-1500-storefront.jpg";
import silveradoAndCorvette from "@/assets/photos/silverado-and-corvette.jpg";
import storefront from "@/assets/photos/storefront.jpg";
import storefrontEntrance from "@/assets/photos/storefront-entrance.jpg";
import teslaModel3 from "@/assets/photos/tesla-model-3.jpg";

export type PhotoCategory = "vehicles" | "studio";

export type Photo = {
  id: string;
  src: StaticImageData;
  alt: string;
  /** Short caption. Vehicle names are identified from the photos — owner should confirm. */
  title: string;
  category: PhotoCategory;
};

/** All photography from the previous equinoxtinting.com, in a curated order. */
export const photos = {
  corvetteC7Black: {
    id: "corvette-c7-black",
    src: corvetteC7Black,
    alt: "Black Chevrolet Corvette with doors open inside the Equinox Tinting install bay",
    title: "Chevrolet Corvette",
    category: "vehicles",
  },
  lexusRx350: {
    id: "lexus-rx350",
    src: lexusRx350,
    alt: "2023 Lexus RX350 in dark gray parked in the Equinox Tinting studio",
    title: "2023 Lexus RX350",
    category: "vehicles",
  },
  fordMustang: {
    id: "ford-mustang",
    src: fordMustang,
    alt: "Blue Ford Mustang with both doors open in the Equinox Tinting bay",
    title: "Ford Mustang",
    category: "vehicles",
  },
  audiA5: {
    id: "audi-a5",
    src: audiA5,
    alt: "White Audi A5 Sportback with tinted windows in the studio",
    title: "Audi A5",
    category: "vehicles",
  },
  corvetteC6Blue: {
    id: "corvette-c6-blue",
    src: corvetteC6Blue,
    alt: "Blue Chevrolet Corvette with doors open under the studio lights",
    title: "Chevrolet Corvette",
    category: "vehicles",
  },
  teslaModel3: {
    id: "tesla-model-3",
    src: teslaModel3,
    alt: "White Tesla Model 3 with tinted windows in the install bay",
    title: "Tesla Model 3",
    category: "vehicles",
  },
  audiA3: {
    id: "audi-a3",
    src: audiA3,
    alt: "Black Audi A3 sedan with headlights on in the Equinox Tinting bay",
    title: "Audi A3",
    category: "vehicles",
  },
  lexusEs: {
    id: "lexus-es",
    src: lexusEs,
    alt: "White Lexus ES with front doors open in the install bay",
    title: "Lexus ES",
    category: "vehicles",
  },
  dodgeCharger: {
    id: "dodge-charger",
    src: dodgeCharger,
    alt: "Gray Dodge Charger with racing stripes in the studio",
    title: "Dodge Charger",
    category: "vehicles",
  },
  bmwX3: {
    id: "bmw-x3",
    src: bmwX3,
    alt: "Silver BMW X3 parked in the Equinox Tinting install bay",
    title: "BMW X3",
    category: "vehicles",
  },
  hyundaiElantra: {
    id: "hyundai-elantra",
    src: hyundaiElantra,
    alt: "Gray Hyundai Elantra with tinted windows in the studio",
    title: "Hyundai Elantra",
    category: "vehicles",
  },
  hyundaiTucson: {
    id: "hyundai-tucson",
    src: hyundaiTucson,
    alt: "Close-up of a gray Hyundai Tucson's tinted side windows and wheel",
    title: "Hyundai Tucson",
    category: "vehicles",
  },
  silveradoAndCorvette: {
    id: "silverado-and-corvette",
    src: silveradoAndCorvette,
    alt: "Chevrolet Silverado and a blue Corvette side by side in the bay",
    title: "Silverado & Corvette",
    category: "vehicles",
  },
  ram1500Storefront: {
    id: "ram-1500-storefront",
    src: ram1500Storefront,
    alt: "White Ram pickup parked outside the Equinox Tinting storefront",
    title: "Ram 1500",
    category: "vehicles",
  },
  storefront: {
    id: "storefront",
    src: storefront,
    alt: "Equinox Tinting storefront at 500 NW University Blvd, Unit 101, Port St. Lucie",
    title: "The storefront",
    category: "studio",
  },
  storefrontEntrance: {
    id: "storefront-entrance",
    src: storefrontEntrance,
    alt: "Equinox Tinting entrance doors with the logo and phone number",
    title: "Unit 101",
    category: "studio",
  },
  customerLounge: {
    id: "customer-lounge",
    src: customerLounge,
    alt: "Equinox Tinting customer lounge with blue armchairs and film samples on the wall",
    title: "Customer lounge",
    category: "studio",
  },
  installRoom: {
    id: "install-room",
    src: installRoom,
    alt: "Film prep room with racked tint rolls and a cutting table",
    title: "Film prep room",
    category: "studio",
  },
} satisfies Record<string, Photo>;

export const galleryPhotos: Photo[] = Object.values(photos);

import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";
import { ContactBlock } from "@/components/sections/contact-block";
import { FollowStrip } from "@/components/sections/follow-strip";
import { FilmLineup } from "@/components/sections/home/film-lineup";
import { GalleryPreview } from "@/components/sections/home/gallery-preview";
import { Hero } from "@/components/sections/home/hero";
import { ServicesIndex } from "@/components/sections/home/services-index";
import { Statement } from "@/components/sections/home/statement";
import { WhyEquinox } from "@/components/sections/home/why-equinox";
import { Reviews } from "@/components/sections/reviews";
import { TintSection } from "@/components/sections/tint-section";
import { Marquee } from "@/components/ui-kit/marquee";
import { JsonLd, filmsItemListJsonLd } from "@/lib/schema";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <PageTransition>
      <JsonLd data={filmsItemListJsonLd()} />
      <Hero />
      <Marquee items={["Window Tint", "Ceramic Coating", "Nano-Ceramic Film", "99% UV Protection", "Port St. Lucie, FL"]} />
      <Statement />
      <ServicesIndex />
      <FilmLineup />
      <TintSection index="03" />
      <WhyEquinox />
      <GalleryPreview />
      <Reviews />
      <FollowStrip />
      <ContactBlock />
    </PageTransition>
  );
}

import type { Metadata } from "next";

import { GalleryGrid } from "@/components/gallery/gallery-grid";
import { PageTransition } from "@/components/motion/page-transition";
import { CtaBand } from "@/components/sections/cta-band";
import { FollowStrip } from "@/components/sections/follow-strip";
import { PageHero } from "@/components/sections/page-hero";
import { galleryPhotos, photos } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Gallery — Recent Window Tint Work",
  description:
    "Photos of recent window tint work and the Equinox Tinting studio in Port St. Lucie, FL — Corvettes, Tesla, Mustang, Charger, Lexus, Audi and more, plus a look behind the scenes.",
  alternates: { canonical: "/gallery" },
  openGraph: { url: "/gallery", images: [{ url: photos.teslaModelX.src.src, alt: photos.teslaModelX.alt }] },
};

export default function GalleryPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="Our work"
        lines={["The", <span key="2">gallery<span className="text-teal">.</span></span>]}
        intro="A look at recent vehicles from our Port St. Lucie studio — and the space they're finished in. Tap any photo to view it full screen."
        photo={photos.teslaModelX}
        crumbs={[{ name: "Gallery", path: "/gallery" }]}
      />
      <section aria-label="Photo gallery" className="pb-24 sm:pb-32">
        <div className="container-x">
          <GalleryGrid photos={galleryPhotos} />
        </div>
      </section>
      <FollowStrip />
      <CtaBand photo={photos.corvetteC8Orange} title={["Your car,", "next."]} />
    </PageTransition>
  );
}

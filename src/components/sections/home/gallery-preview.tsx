"use client";

import { useRef, useState } from "react";

import { GalleryTile } from "@/components/gallery/gallery-tile";
import { Lightbox } from "@/components/gallery/lightbox";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui-kit/cta-link";
import { SectionHeading } from "@/components/ui-kit/section-heading";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { photos } from "@/lib/photos";

const featured = [
  photos.lexusRx350,
  photos.fordMustang,
  photos.teslaModel3,
  photos.corvetteC6Blue,
  photos.audiA5,
  photos.dodgeCharger,
  photos.audiA3,
  photos.bmwX3,
  photos.lexusEs,
];

// Three columns, each drifting at its own speed.
const columns = [
  { items: [0, 3, 6], speed: -8, offset: "" },
  { items: [1, 4, 7], speed: 10, offset: "lg:mt-40" },
  { items: [2, 5, 8], speed: -14, offset: "lg:mt-16" },
];

export function GalleryPreview() {
  const root = useRef<HTMLElement>(null);
  const [index, setIndex] = useState<number | null>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.desktopMotion, () => {
        gsap.utils.toArray<HTMLElement>("[data-col]").forEach((col) => {
          gsap.to(col, {
            yPercent: Number(col.dataset.speed),
            ease: "none",
            scrollTrigger: { trigger: "[data-cols]", start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="portfolio" aria-labelledby="portfolio-title" className="relative overflow-hidden py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="portfolio-title"
          index="05"
          eyebrow="Our work"
          lines={["Fresh out", <span key="2">of the <span className="italic text-teal">bay.</span></span>]}
        >
          Our automotive window tinting enhances the appearance of your car while protecting it from harmful UV rays and
          reducing heat and glare inside — improving the overall driving experience.
        </SectionHeading>

        <div data-cols className="mt-16 grid grid-cols-2 gap-3 sm:mt-24 sm:gap-4 lg:grid-cols-3 lg:gap-6">
          {columns.map((col, c) => (
            <div
              key={c}
              data-col
              data-speed={col.speed}
              className={`flex flex-col gap-3 sm:gap-4 lg:gap-6 ${col.offset} ${c === 2 ? "hidden lg:flex" : ""}`}
            >
              {col.items.map((i) => (
                <Reveal key={featured[i].id} y={40}>
                  <GalleryTile
                    photo={featured[i]}
                    onOpen={() => setIndex(i)}
                    sizes="(min-width: 1024px) 31vw, 48vw"
                    aspect={i % 2 ? "aspect-[3/4]" : "aspect-[4/5]"}
                  />
                </Reveal>
              ))}
            </div>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 border-t border-white/10 pt-10 sm:flex-row sm:items-center sm:justify-between lg:mt-8">
          <p className="max-w-md text-mist">
            {Object.keys(photos).length} photos from the studio — sedans, sports cars, SUVs and trucks.
          </p>
          <CtaLink href="/gallery" variant="outline">
            View the full gallery
          </CtaLink>
        </div>
      </div>

      <Lightbox photos={featured} index={index} onIndexChange={setIndex} />
    </section>
  );
}

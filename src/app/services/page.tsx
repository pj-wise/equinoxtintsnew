import type { Metadata } from "next";
import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FilmLineup } from "@/components/sections/home/film-lineup";
import { PageHero } from "@/components/sections/page-hero";
import { CtaLink, TextLink } from "@/components/ui-kit/cta-link";
import { photos } from "@/lib/photos";
import { quoteHref } from "@/lib/quote";
import { serviceJsonLd, JsonLd } from "@/lib/schema";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Services — Window Tint, Ceramic Coating & Window Film",
  description:
    "Automotive window tint, ceramic coating, and residential & commercial window film from Equinox Tinting in Port St. Lucie, FL.",
  alternates: { canonical: "/services" },
  openGraph: { url: "/services" },
};

const residential = services.find((s) => s.id === "residential-commercial")!;

export default function ServicesPage() {
  return (
    <PageTransition>
      <JsonLd
        data={serviceJsonLd({ name: residential.name, description: residential.summary, path: "/services#residential-commercial" })}
      />
      <PageHero
        eyebrow="Services"
        lines={["Specializing", <span key="2">in your <span className="italic text-teal">ride.</span></span>]}
        intro="We offer a variety of services and products that protect the surfaces of your car from the intense Florida heat, UV rays, wear and tear and more — specifically designed to keep your car looking its best while being gentle on the paint and glass."
        photo={photos.corvetteC8Yellow}
        crumbs={[{ name: "Services", path: "/services" }]}
      />

      {/* Editorial alternating service blocks */}
      <section aria-label="Our services" className="py-16 sm:py-24">
        <div className="container-x flex flex-col gap-24 sm:gap-36">
          {services.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-title`}
              className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <div className={i % 2 ? "lg:order-2 lg:col-span-6 lg:col-start-7" : "lg:col-span-6"}>
                <ImageReveal direction={i % 2 ? "left" : "right"} className="aspect-[4/5] w-full bg-graphite sm:aspect-[4/3] lg:aspect-[4/5]">
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-[50%_60%]"
                  />
                </ImageReveal>
              </div>
              <Reveal className={i % 2 ? "lg:order-1 lg:col-span-5 lg:col-start-1" : "lg:col-span-5 lg:col-start-8"}>
                <span className="font-mono text-xs text-teal">{s.index}</span>
                <h2 id={`${s.id}-title`} className="font-display mt-4 text-display-md">
                  {s.name}
                </h2>
                <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/80">{s.summary}</p>
                <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                  <CtaLink href={quoteHref(s.quoteValue)}>Get a free estimate</CtaLink>
                  {!s.href.includes("#") && <TextLink href={s.href}>Learn more</TextLink>}
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <FilmLineup />
      <CtaBand />
    </PageTransition>
  );
}

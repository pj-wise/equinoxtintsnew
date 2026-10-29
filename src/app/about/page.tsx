import type { Metadata } from "next";
import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { CtaLink, TextLink } from "@/components/ui-kit/cta-link";
import { photos } from "@/lib/photos";
import { mapsLinks, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Our Port St. Lucie Studio",
  description:
    "Equinox Tinting is a window tint and ceramic coating studio at 500 NW University Blvd, Unit 101, Port St. Lucie, FL. Passion, dedication and customer satisfaction.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about", images: [{ url: photos.storefront.src.src, alt: photos.storefront.alt }] },
};

const studio = [
  { photo: photos.storefrontEntrance, label: "Unit 101", aspect: "aspect-[8/7]" },
  { photo: photos.customerLounge, label: "The lounge", aspect: "aspect-[4/5]" },
  { photo: photos.installRoom, label: "Film prep", aspect: "aspect-[3/4]" },
  { photo: photos.corvetteC7Black, label: "The bay", aspect: "aspect-[4/5]" },
];

export default function AboutPage() {
  return (
    <PageTransition>
      <PageHero
        eyebrow="The studio"
        lines={["Passion", <span key="2">is the <span className="italic text-teal">work.</span></span>]}
        intro="At Equinox Tinting, we are passionate about what we do. We believe our success comes down to passion, dedication and customer satisfaction."
        photo={photos.storefront}
        imagePosition="50% 45%"
        crumbs={[{ name: "Studio", path: "/about" }]}
        actions={
          <CtaLink href={mapsLinks.directions} target="_blank" rel="noopener noreferrer" size="lg" variant="outline">
            Get directions
          </CtaLink>
        }
      />

      <section aria-labelledby="approach-title" className="py-24 sm:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Our approach</p>
            <TextReveal as="h2" id="approach-title" className="font-display text-display-md">
              <span>The best car</span>
              <span>care experience</span>
              <span className="text-teal">possible.</span>
            </TextReveal>
          </div>
          <Reveal className="space-y-6 text-lg leading-relaxed text-bone/80 lg:col-span-6 lg:col-start-7">
            <p>
              We offer a variety of services and products that protect the surfaces of your car from the intense Florida
              heat, UV rays, wear and tear and more. Our products are specifically designed to keep your car looking its
              best while being gentle on the paint and glass.
            </p>
            <p className="text-mist">
              We are passionate about providing our customers with the best car care experience possible, offering custom
              solutions tailored to meet their individual needs — from window tint and ceramic coating for your vehicle to
              residential and commercial film for your home or business.
            </p>
            <div className="pt-4">
              <TextLink href="/services">Explore our services</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="space-title" className="pb-24 sm:pb-32">
        <div className="container-x">
          <h2 id="space-title" className="eyebrow mb-10">
            Inside the studio
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {studio.map((s, i) => (
              <figure key={s.photo.id} className={i % 2 ? "lg:mt-24" : ""}>
                <ImageReveal className={`${s.aspect} w-full bg-graphite`} delay={i * 0.08}>
                  <Image
                    src={s.photo.src}
                    alt={s.photo.alt}
                    fill
                    placeholder="blur"
                    sizes="(min-width: 1024px) 24vw, 48vw"
                    className="object-cover"
                  />
                </ImageReveal>
                <figcaption className="mt-3 flex justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
                  <span>{s.label}</span>
                  <span className="text-teal">0{i + 1}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="visit-title" className="border-t border-white/[0.07] py-24 sm:py-32">
        <div className="container-x grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-6">Visit</p>
            <h2 id="visit-title" className="font-display text-display-md">
              {site.address.city}
              <span className="text-teal">.</span>
            </h2>
            <address className="mt-8 text-lg not-italic leading-relaxed text-bone/80">
              {site.address.street}, {site.address.unit}
              <br />
              {site.address.city}, {site.address.region} {site.address.postalCode}
            </address>
            <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
              {site.hours.map((h) => (
                <div key={h.days} className="contents">
                  <dt className="text-mist">{h.days}</dt>
                  <dd>{h.label}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CtaLink href={mapsLinks.directions} target="_blank" rel="noopener noreferrer">
                Get directions
              </CtaLink>
              <CtaLink href={site.phone.href} variant="outline" icon="phone">
                {site.phone.display}
              </CtaLink>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ImageReveal className="aspect-[4/3] w-full bg-graphite" direction="left">
              <Image
                src={photos.ram1500Storefront.src}
                alt={photos.ram1500Storefront.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-[50%_55%]"
              />
            </ImageReveal>
          </div>
        </div>
      </section>

      <CtaBand />
    </PageTransition>
  );
}

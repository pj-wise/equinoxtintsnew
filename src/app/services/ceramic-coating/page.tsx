import type { Metadata } from "next";
import Image from "next/image";

import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal, StaggerGroup, StaggerItem, TextReveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { PageHero } from "@/components/sections/page-hero";
import { CtaLink } from "@/components/ui-kit/cta-link";
import { photos } from "@/lib/photos";
import { quoteHref } from "@/lib/quote";
import { JsonLd, serviceJsonLd } from "@/lib/schema";
import { ceramicCoating } from "@/lib/services";
import { site } from "@/lib/site";

const description =
  "Ceramic coating in Port St. Lucie, FL. A durable, hydrophobic layer that repels water, dirt and contaminants and protects against UV, oxidation and minor scratches.";

export const metadata: Metadata = {
  title: "Ceramic Coating in Port St. Lucie",
  description,
  alternates: { canonical: "/services/ceramic-coating" },
  openGraph: {
    url: "/services/ceramic-coating",
    images: [{ url: photos.corvetteC6Blue.src.src, alt: photos.corvetteC6Blue.alt }],
  },
};

export default function CeramicCoatingPage() {
  return (
    <PageTransition>
      <JsonLd data={serviceJsonLd({ name: "Ceramic Coating", description, path: "/services/ceramic-coating" })} />

      <PageHero
        eyebrow="Ceramic coating · Port St. Lucie"
        lines={["Ceramic", <span key="2">coating<span className="text-teal">.</span></span>]}
        intro={ceramicCoating.intro}
        photo={photos.corvetteC6Blue}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: "Ceramic Coating", path: "/services/ceramic-coating" },
        ]}
        actions={
          <>
            <CtaLink href={quoteHref("Ceramic coating")} size="lg" magnetic>
              Get a coating quote
            </CtaLink>
            <CtaLink href={site.phone.href} variant="outline" size="lg" icon="phone">
              {site.phone.display}
            </CtaLink>
          </>
        }
      />

      <section aria-labelledby="coating-title" className="py-24 sm:py-32">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="order-2 lg:order-1 lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <ImageReveal className="col-span-2 aspect-[4/3] bg-graphite" direction="right">
                <Image
                  src={photos.corvetteC7Black.src}
                  alt={photos.corvetteC7Black.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover object-[50%_70%]"
                />
              </ImageReveal>
              <ImageReveal className="aspect-[4/5] bg-graphite" direction="up" delay={0.1}>
                <Image
                  src={photos.dodgeCharger.src}
                  alt={photos.dodgeCharger.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
              <ImageReveal className="aspect-[4/5] bg-graphite" direction="up" delay={0.2}>
                <Image
                  src={photos.audiA5.src}
                  alt={photos.audiA5.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  className="object-cover"
                />
              </ImageReveal>
            </div>
          </div>
          <div className="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
            <p className="eyebrow mb-6">The finish</p>
            <TextReveal as="h2" id="coating-title" className="font-display text-display-md">
              <span>Showroom</span>
              <span>
                shine<span className="text-teal">,</span>
              </span>
              <span className="italic text-outline">protected.</span>
            </TextReveal>
            <Reveal className="mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-bone/80">
              <p>{ceramicCoating.body}</p>
              <p className="text-mist">{ceramicCoating.closing}</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section aria-labelledby="benefits-title" className="border-t border-white/[0.07] py-24 sm:py-32">
        <div className="container-x">
          <h2 id="benefits-title" className="eyebrow mb-12">
            What it does
          </h2>
          <StaggerGroup className="grid border-t border-white/10">
            {ceramicCoating.benefits.map((b, i) => (
              <StaggerItem
                key={b.title}
                className="group/b grid grid-cols-1 items-baseline gap-4 border-b border-white/10 py-8 sm:grid-cols-12 sm:gap-8"
              >
                <span className="font-mono text-xs text-teal sm:col-span-1">0{i + 1}</span>
                <h3 className="font-display text-display-sm transition-colors duration-500 group-hover/b:text-teal-bright sm:col-span-6">
                  {b.title}
                </h3>
                <p className="text-mist sm:col-span-5">{b.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <section aria-label="Gallery highlight" className="relative h-[70vh] min-h-[420px]">
        <Parallax className="absolute inset-0" amount={12}>
          <Image src={photos.fordMustang.src} alt={photos.fordMustang.alt} fill sizes="100vw" placeholder="blur" className="object-cover object-[50%_55%]" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
      </section>

      <CtaBand photo={photos.corvetteC7Black} title={["Keep it", "glossy."]} quoteHref={quoteHref("Ceramic coating")} />
    </PageTransition>
  );
}

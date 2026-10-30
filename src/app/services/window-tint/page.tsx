import type { Metadata } from "next";
import { Eye, Gauge, Sun, Thermometer } from "lucide-react";
import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { PageTransition } from "@/components/motion/page-transition";
import { Reveal, StaggerGroup, StaggerItem, TextReveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { FilmLineup } from "@/components/sections/home/film-lineup";
import { PageHero } from "@/components/sections/page-hero";
import { TintSection } from "@/components/sections/tint-section";
import { CtaLink } from "@/components/ui-kit/cta-link";
import { photos } from "@/lib/photos";
import { quoteHref } from "@/lib/quote";
import { JsonLd, filmsItemListJsonLd, serviceJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";

const description =
  "Automotive window tint in Port St. Lucie, FL. CarbonFX, FXtreme2 and FX Plus films block 99% of UVA/UVB rays, reduce heat and glare, and carry a premium lifetime warranty.";

export const metadata: Metadata = {
  title: "Automotive Window Tint in Port St. Lucie",
  description,
  alternates: { canonical: "/services/window-tint" },
  openGraph: {
    url: "/services/window-tint",
    images: [{ url: photos.corvetteC8Orange.src.src, alt: photos.corvetteC8Orange.alt }],
  },
};

// Benefits as described on the original site.
const benefits = [
  { icon: Sun, title: "UV protection", text: "Every film series blocks 99% of harmful UVA and UVB rays." },
  { icon: Thermometer, title: "Less heat", text: "Nano-ceramic films reject infrared heat — up to 88% with FXtreme2, 96–98% with FX Plus." },
  { icon: Eye, title: "Less glare", text: "Reduced glare inside the car for a more comfortable drive." },
  { icon: Gauge, title: "Better look", text: "Enhances the appearance of your car with a rich, color-stable black tone." },
];

export default function WindowTintPage() {
  return (
    <PageTransition>
      <JsonLd data={serviceJsonLd({ name: "Automotive Window Tint", description, path: "/services/window-tint" })} />
      <JsonLd data={filmsItemListJsonLd()} />

      <PageHero
        eyebrow="Automotive window tint · Port St. Lucie"
        lines={["Window", <span key="2">tint<span className="text-teal">.</span></span>]}
        intro="Our automotive window tinting enhances the appearance of your car while protecting it from harmful UV rays, reducing heat and glare inside the car, and improving the overall driving experience."
        photo={photos.corvetteC8Orange}
        crumbs={[
          { name: "Services", path: "/services" },
          { name: "Window Tint", path: "/services/window-tint" },
        ]}
        actions={
          <>
            <CtaLink href={quoteHref("Automotive window tint")} size="lg" magnetic>
              Free tint estimate
            </CtaLink>
            <CtaLink href={site.phone.href} variant="outline" size="lg" icon="phone">
              {site.phone.display}
            </CtaLink>
          </>
        }
      />

      {/* UV story */}
      <section aria-labelledby="uv-title" className="relative py-24 sm:py-32">
        <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <p className="eyebrow mb-6">Why tint</p>
            <TextReveal as="h2" id="uv-title" className="font-display text-display-md">
              <span>Don&apos;t let</span>
              <span>the clouds</span>
              <span className="italic text-teal">fool you.</span>
            </TextReveal>
            <Reveal className="mt-8 max-w-lg space-y-5 leading-relaxed text-mist">
              <p>
                You probably know it&apos;s important to protect your eyes on a sunny day. But the sun doesn&apos;t have
                to be shining for harmful ultraviolet (UV) rays to potentially damage your eyes and the skin around them.
              </p>
              <p>
                UV rays can reflect off of water, snow and buildings, even on the most overcast day. Quality window film
                keeps that protection with you every time you drive.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-6">
            <Parallax className="aspect-[4/5] w-full bg-graphite" amount={10}>
              <Image
                src={photos.squeegeeGlass.src}
                alt={photos.squeegeeGlass.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Parallax>
          </div>
        </div>

        <div className="container-x mt-24">
          <StaggerGroup className="grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <StaggerItem key={b.title} className="bg-ink p-8">
                <b.icon aria-hidden className="size-6 text-teal" strokeWidth={1.5} />
                <h3 className="font-wide mt-8 text-lg font-semibold uppercase tracking-wide">{b.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{b.text}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <FilmLineup />
      <TintSection />
      <CtaBand photo={photos.lexusHex} title={["Pick your", "film & shade."]} quoteHref={quoteHref("Automotive window tint")} />
    </PageTransition>
  );
}

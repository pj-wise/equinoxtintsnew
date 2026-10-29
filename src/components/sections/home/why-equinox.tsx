"use client";

import { cn } from "cn";
import Image from "next/image";
import { useRef, useState } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui-kit/section-heading";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { photos, type Photo } from "@/lib/photos";

type Pillar = { title: string; text: string; photo: Photo };

// Every point below is drawn from the original site's copy and photography.
const pillars: Pillar[] = [
  {
    title: "Built for Florida",
    text: "Our products are chosen to protect your car from the intense Florida heat, UV rays and everyday wear and tear.",
    photo: photos.hyundaiTucson,
  },
  {
    title: "Gentle on paint & glass",
    text: "Everything we use is designed to keep your car looking its best while being gentle on the paint and the glass.",
    photo: photos.teslaModel3,
  },
  {
    title: "Tailored to you",
    text: "We're passionate about providing the best car care experience possible, with custom solutions tailored to your individual needs.",
    photo: photos.lexusEs,
  },
  {
    title: "Lifetime film warranty",
    text: "All three of our window film series — CarbonFX, FXtreme2 and FX Plus — carry a premium lifetime warranty.",
    photo: photos.audiA5,
  },
  {
    title: "A real studio",
    text: "Visit us at 500 NW University Blvd in Port St. Lucie — a dedicated install bay, a film prep room and a comfortable customer lounge.",
    photo: photos.customerLounge,
  },
];

export function WhyEquinox() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const triggers = gsap.utils.toArray<HTMLElement>("[data-pillar]").map((el, i) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(i),
        }),
      );
      return () => triggers.forEach((t) => t.kill());
    },
    { scope: root },
  );

  return (
    <section ref={root} id="why" aria-labelledby="why-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="why-title"
          index="04"
          eyebrow="Why Equinox"
          lines={["Passion,", <span key="2">dedication<span className="text-teal">,</span></span>, <span key="3" className="italic text-outline">satisfaction.</span>]}
        />

        <div className="mt-16 grid grid-cols-1 gap-12 sm:mt-24 lg:grid-cols-12 lg:gap-16">
          {/* Sticky photo stack (desktop) */}
          <div className="hidden lg:col-span-6 lg:block">
            <div className="sticky top-[calc(var(--header-h)+2rem)] h-[calc(100vh-var(--header-h)-4rem)] overflow-hidden bg-graphite">
              {pillars.map((p, i) => (
                <div
                  key={p.title}
                  aria-hidden={i !== active}
                  className={cn(
                    "absolute inset-0 transition-[clip-path] duration-[1100ms] ease-[var(--ease-in-out-quart)] motion-reduce:transition-none",
                    i === active ? "z-10 [clip-path:inset(0_0_0_0)]" : i < active ? "[clip-path:inset(0_0_100%_0)]" : "[clip-path:inset(100%_0_0_0)]",
                  )}
                >
                  <Image
                    src={p.photo.src}
                    alt={p.photo.alt}
                    fill
                    sizes="50vw"
                    placeholder="blur"
                    className={cn(
                      "object-cover object-[50%_60%] transition-transform duration-[1600ms] ease-[var(--ease-out-expo)] motion-reduce:transition-none",
                      i === active ? "scale-100" : "scale-110",
                    )}
                  />
                </div>
              ))}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between bg-gradient-to-t from-ink/80 to-transparent p-6 pt-24">
                <span className="font-mono text-xs text-bone/80">{pillars[active].photo.title}</span>
                <span className="font-mono text-xs text-teal-bright">
                  {String(active + 1).padStart(2, "0")} / {String(pillars.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>

          {/* Points */}
          <ol className="lg:col-span-6 lg:py-[18vh]">
            {pillars.map((p, i) => (
              <li
                key={p.title}
                data-pillar
                className={cn(
                  "border-t border-white/10 py-10 transition-opacity duration-500 lg:min-h-[52vh] lg:py-14",
                  i === active ? "lg:opacity-100" : "lg:opacity-35",
                )}
              >
                <Reveal>
                  <div className="relative mb-8 aspect-[4/5] overflow-hidden sm:aspect-[16/10] lg:hidden">
                    <Image
                      src={p.photo.src}
                      alt={p.photo.alt}
                      fill
                      sizes="100vw"
                      placeholder="blur"
                      className="object-cover object-[50%_60%]"
                    />
                  </div>
                  <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display mt-4 text-display-sm">{p.title}</h3>
                  <p className="mt-5 max-w-md leading-relaxed text-mist">{p.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}


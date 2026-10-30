"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { CtaLink, TextLink } from "@/components/ui-kit/cta-link";
import { gsap, mq, useGSAP } from "@/lib/gsap";
import { quoteHref } from "@/lib/quote";
import { films } from "@/lib/services";

/**
 * The three film series. Desktop + motion: the section pins and the track
 * scrolls horizontally. Everywhere else it's a plain vertical stack, so
 * content is never trapped in a scroll mechanism.
 */
export function FilmLineup({ headingLevel = "h2" }: { headingLevel?: "h2" | "h3" }) {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const Heading = headingLevel;
  const Sub = headingLevel === "h2" ? "h3" : "h4";

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.desktopMotion, () => {
        const section = root.current!;
        const el = track.current!;
        section.dataset.horizontal = "true";
        const distance = () => el.scrollWidth - window.innerWidth;

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(progress.current, { scaleX: self.progress }),
          },
        });

        gsap.utils.toArray<HTMLElement>("[data-film-image]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -6, scale: 1.12 },
            {
              xPercent: 6,
              scale: 1.12,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, containerAnimation: tween, start: "left right", end: "right left", scrub: true },
            },
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-film-name]").forEach((name) => {
          gsap.from(name, {
            xPercent: 18,
            opacity: 0,
            ease: "power3.out",
            scrollTrigger: { trigger: name, containerAnimation: tween, start: "left 90%", end: "left 45%", scrub: true },
          });
        });

        return () => {
          delete section.dataset.horizontal;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="films"
      aria-labelledby="films-title"
      className="group/films relative overflow-hidden border-y border-white/[0.07] bg-carbon data-[horizontal=true]:h-screen"
    >
      <div
        ref={track}
        className="flex flex-col group-data-[horizontal=true]/films:h-full group-data-[horizontal=true]/films:w-max group-data-[horizontal=true]/films:flex-row"
      >
        {/* Intro panel */}
        <div className="container-x flex flex-col justify-center py-24 group-data-[horizontal=true]/films:w-[40vw] group-data-[horizontal=true]/films:max-w-none group-data-[horizontal=true]/films:shrink-0 group-data-[horizontal=true]/films:py-0 group-data-[horizontal=true]/films:pr-0">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="text-teal">02</span>
            <span className="h-px w-8 bg-white/20" />
            Window film lineup
          </p>
          <Heading id="films-title" className="font-display text-display-md">
            Three series.
            <br />
            <span className="text-teal">99%</span> UV blocked.
          </Heading>
          <p className="mt-8 max-w-md leading-relaxed text-mist">
            From a deep-dyed, color-stable classic to our ultimate nano-ceramic. Every film blocks 99% of harmful UVA and
            UVB rays — the difference is how much heat stays out.
          </p>
          <p className="eyebrow mt-10 hidden items-center gap-3 group-data-[horizontal=true]/films:flex">
            Scroll to explore <span className="block h-px w-16 bg-teal" />
          </p>
        </div>

        {films.map((film, i) => (
          <article
            key={film.id}
            aria-labelledby={`film-${film.id}`}
            className="relative grid grid-cols-1 border-t border-white/[0.07] group-data-[horizontal=true]/films:h-full group-data-[horizontal=true]/films:w-[78vw] group-data-[horizontal=true]/films:shrink-0 group-data-[horizontal=true]/films:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] group-data-[horizontal=true]/films:border-l group-data-[horizontal=true]/films:border-t-0 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)]"
          >
            <div className="relative h-[68vh] min-h-[420px] overflow-hidden group-data-[horizontal=true]/films:h-full lg:h-auto lg:min-h-[640px]">
              <div data-film-image className="absolute inset-0">
                <Image
                  src={film.photo.src}
                  alt={film.photo.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover object-[50%_65%]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-carbon via-transparent to-carbon/40 lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-carbon" />
              <span className="absolute left-5 top-5 font-mono text-xs text-bone/80">
                {String(i + 1).padStart(2, "0")} / {String(films.length).padStart(2, "0")}
              </span>
            </div>

            <div className="flex min-w-0 flex-col justify-center px-[var(--gutter)] py-14 lg:py-16 lg:pl-12 lg:pr-[var(--gutter)] xl:pl-16">
              <p className="eyebrow text-teal">{film.type}</p>
              <Sub id={`film-${film.id}`} data-film-name className="font-display mt-4 text-[clamp(2.4rem,4.4vw,5.25rem)]">
                {film.name}
                <span className="font-wide ml-3 align-top text-sm font-normal normal-case tracking-normal text-mist">
                  Series
                </span>
              </Sub>
              <p className="mt-4 max-w-lg text-lg text-bone/85">{film.summary}</p>

              <dl className="mt-10 grid grid-cols-3 border-y border-white/10">
                {film.specs.map((spec) => (
                  <div key={spec.label} className="border-r border-white/10 py-5 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
                    <dt className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-mist">{spec.label}</dt>
                    <dd className="font-display mt-2 text-[clamp(1.2rem,2vw,2rem)] text-bone">{spec.value}</dd>
                  </div>
                ))}
              </dl>

              <p className="mt-8 max-w-xl text-sm leading-relaxed text-mist">{film.description}</p>

              <ul className="mt-6 grid grid-cols-1 gap-2 text-sm text-bone/85 sm:grid-cols-2">
                {[...film.highlights, film.warranty].map((h) => (
                  <li key={h} className="flex items-start gap-2">
                    <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                    {h}
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <TextLink href={quoteHref("Automotive window tint")}>Free estimate with {film.name}</TextLink>
              </div>
            </div>
          </article>
        ))}

        {/* Outro panel */}
        <div className="container-x flex flex-col justify-center border-t border-white/[0.07] py-24 group-data-[horizontal=true]/films:w-[46vw] group-data-[horizontal=true]/films:max-w-none group-data-[horizontal=true]/films:shrink-0 group-data-[horizontal=true]/films:border-l group-data-[horizontal=true]/films:border-t-0 group-data-[horizontal=true]/films:px-16">
          <p className="font-display text-display-sm">
            Not sure which
            <br />
            film is right?
          </p>
          <p className="mt-6 max-w-sm leading-relaxed text-mist">
            Tell us about your vehicle and how you drive. We&apos;ll recommend a film and shade that fits.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaLink href={quoteHref("Automotive window tint")}>Get a free recommendation</CtaLink>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 hidden h-px bg-white/10 group-data-[horizontal=true]/films:block">
        <div ref={progress} className="h-full origin-left scale-x-0 bg-teal" />
      </div>
    </section>
  );
}

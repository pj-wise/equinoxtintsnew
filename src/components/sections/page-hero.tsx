import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { ImageReveal } from "@/components/motion/image-reveal";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import type { Photo } from "@/lib/photos";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";

type Crumb = { name: string; path: string };

type PageHeroProps = {
  eyebrow: string;
  lines: ReactNode[];
  intro: ReactNode;
  photo: Photo;
  crumbs: Crumb[];
  actions?: ReactNode;
  imagePosition?: string;
};

export function PageHero({ eyebrow, lines, intro, photo, crumbs, actions, imagePosition = "50% 60%" }: PageHeroProps) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="grain relative isolate overflow-hidden pt-[calc(var(--header-h)+2.5rem)] sm:pt-[calc(var(--header-h)+4rem)]">
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_85%_20%,rgb(15_255_255/0.10),transparent_70%)]" />
      <div className="container-x grid grid-cols-1 gap-12 pb-16 lg:grid-cols-12 lg:items-end lg:gap-10 lg:pb-24">
        <div className="lg:col-span-7">
          <nav aria-label="Breadcrumb" className="mb-10">
            <ol className="flex flex-wrap items-center gap-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-mist">
              {trail.map((c, i) => (
                <li key={c.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight aria-hidden className="size-3 text-white/30" />}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-bone/80">
                      {c.name}
                    </span>
                  ) : (
                    <Link href={c.path} className="transition-colors hover:text-teal-bright">
                      {c.name}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" /> {eyebrow}
          </p>
          <TextReveal as="h1" immediate delay={0.1} className="font-display text-display-lg">
            {lines}
          </TextReveal>
          <Reveal delay={0.45} className="mt-8 max-w-xl text-lg leading-relaxed text-bone/80">
            {intro}
          </Reveal>
          {actions && (
            <Reveal delay={0.6} className="mt-10 flex flex-col gap-3 sm:flex-row">
              {actions}
            </Reveal>
          )}
        </div>
        <div className="lg:col-span-5">
          <ImageReveal immediate mode="curtain" delay={0.2} className="aspect-[4/5] w-full bg-graphite sm:aspect-[16/11] lg:aspect-[4/5]">
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </ImageReveal>
        </div>
      </div>
    </section>
  );
}

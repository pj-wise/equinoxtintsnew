"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Image from "next/image";
import { useRef } from "react";

import { ImageReveal } from "@/components/motion/image-reveal";
import { TextReveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui-kit/cta-link";
import { photos } from "@/lib/photos";
import { site } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;
const SHADES = [70, 50, 35, 20, 15, 5];

const proofPoints = [
  { value: "99%", label: "UVA / UVB blocked by every film series" },
  { value: "96–98%", label: "Infrared rejection with FX Plus nano-ceramic" },
  { value: "Lifetime", label: "Premium warranty on all three film series" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const hero = photos.corvetteC7Black;

  return (
    <section
      ref={ref}
      id="home"
      aria-labelledby="hero-title"
      className="grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* Ambient light */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_78%_35%,rgb(19_167_168/0.16),transparent_70%)]" />

      {/* Image: full-bleed on mobile, a tall right-hand panel on desktop */}
      <motion.div
        style={{ y: imageY, scale: imageScale }}
        className="absolute inset-0 -z-10 lg:inset-y-0 lg:left-auto lg:right-0 lg:w-[46%]"
      >
        <ImageReveal immediate mode="curtain" delay={0.15} className="h-full w-full">
          <Image
            src={hero.src}
            alt={hero.alt}
            fill
            preload
            placeholder="blur"
            quality={80}
            sizes="(min-width: 1024px) 46vw, 100vw"
            className="object-cover object-[50%_70%]"
          />
        </ImageReveal>
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/30 lg:bg-gradient-to-r lg:from-ink lg:via-ink/10 lg:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
      </motion.div>

      {/* VLT shade scale — the site's recurring motif */}
      <motion.ol
        aria-hidden
        className="absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 flex-col gap-1 lg:flex"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: 1.1 } } }}
      >
        {SHADES.map((vlt) => (
          <motion.li
            key={vlt}
            variants={{ hidden: { opacity: 0, x: 16 }, show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: EASE } } }}
            className="flex items-center justify-end gap-3"
          >
            <span className="font-mono text-[0.62rem] tracking-widest text-bone/60">{vlt}%</span>
            <span className="block h-9 w-2.5 border border-white/15" style={{ background: `rgb(4 6 7 / ${1 - vlt / 100})` }} />
          </motion.li>
        ))}
      </motion.ol>

      <motion.div
        style={{ y: contentY, opacity: fade }}
        className="container-x relative flex flex-1 flex-col justify-end pb-10 pt-[calc(var(--header-h)+3rem)] lg:pb-12"
      >
        <h1 id="hero-title">
          <motion.span
            className="eyebrow mb-6 flex items-center gap-3 text-bone/80"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          >
            <span className="h-px w-10 bg-teal" />
            Window tint &amp; ceramic coating · Port St. Lucie, FL
          </motion.span>{" "}
          <TextReveal as="span" immediate delay={0.35} stagger={0.12} className="font-display text-display-xl block">
            <span>Control</span>
            <span>
              <span className="italic text-outline [font-variation-settings:'wdth'_125]">the</span>{" "}
              light<span className="text-teal">.</span>
            </span>
          </TextReveal>
        </h1>

        <motion.div
          className="mt-8 flex max-w-xl flex-col gap-8"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.85 }}
        >
          <p className="text-base leading-relaxed text-bone/80 sm:text-lg">
            Color-stable and nano-ceramic window films that cut heat and glare and block 99% of harmful UV — plus
            ceramic coating that keeps your paint glossy and protected. Built for the Florida sun, installed in our Port
            St. Lucie studio.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <CtaLink href="/contact" size="lg" magnetic>
              Get a quote
            </CtaLink>
            <CtaLink href={site.phone.href} variant="outline" size="lg" icon="phone">
              {site.phone.display}
            </CtaLink>
          </div>
        </motion.div>
      </motion.div>

      {/* Proof bar */}
      <motion.div
        className="container-x relative hidden pb-8 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
      >
        <ul className="grid grid-cols-3 border-t border-white/10 pt-6 lg:w-[54%]">
          {proofPoints.map((p) => (
            <li key={p.value} className="pr-6">
              <span className="font-display block text-2xl text-bone xl:text-3xl">{p.value}</span>
              <span className="mt-2 block max-w-[22ch] text-xs leading-snug text-mist">{p.label}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui-kit/section-heading";
import { quoteHref } from "@/lib/quote";
import { services } from "@/lib/services";

export function ServicesIndex() {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 260, damping: 30, mass: 0.5 });
  const y = useSpring(useMotionValue(0), { stiffness: 260, damping: 30, mass: 0.5 });

  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse" || !listRef.current) return;
    const r = listRef.current.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <section id="services" aria-labelledby="services-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="services-title"
          index="01"
          eyebrow="Services"
          lines={["Specializing", <span key="2">in your <span className="italic text-teal">ride.</span></span>]}
        >
          We offer services and products that protect the surfaces of your car from the intense Florida heat, UV rays,
          wear and tear — gentle on paint and glass, with custom solutions tailored to your needs.
        </SectionHeading>

        <ul
          ref={listRef}
          onPointerMove={onMove}
          onPointerLeave={() => setActive(null)}
          className="relative mt-16 border-t border-white/10 sm:mt-24"
        >
          {/* Cursor-follow preview (desktop, fine pointer only) */}
          <motion.div
            aria-hidden
            style={{ x, y }}
            className="pointer-events-none absolute left-0 top-0 z-20 hidden lg:block"
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key={active}
                  initial={{ opacity: 0, scale: 0.85, clipPath: "inset(50% 0% 50% 0%)" }}
                  animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -left-36 -top-48 h-96 w-72 overflow-hidden"
                >
                  <Image
                    src={services[active].photo.src}
                    alt=""
                    fill
                    sizes="288px"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {services.map((service, i) => (
            <li key={service.id} onPointerEnter={() => setActive(i)} className="border-b border-white/10">
              <Reveal y={20} delay={i * 0.06}>
                <div className="group/row relative grid grid-cols-1 gap-6 py-8 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-8">
                  {/* Mobile image */}
                  <div className="relative aspect-[4/3] overflow-hidden lg:hidden">
                    <Image
                      src={service.photo.src}
                      alt={service.photo.alt}
                      fill
                      sizes="(min-width: 640px) 90vw, 100vw"
                      placeholder="blur"
                      className="object-cover object-[50%_65%]"
                    />
                  </div>

                  <span className="font-mono text-xs text-teal lg:col-span-1">{service.index}</span>
                  <h3 className="font-display text-display-sm transition-[color,transform] duration-500 ease-[var(--ease-out-expo)] lg:col-span-6 lg:group-hover/row:translate-x-4 lg:group-hover/row:text-teal-bright">
                    <Link href={service.href} className="after:absolute after:inset-0 after:content-['']">
                      {service.name}
                    </Link>
                  </h3>
                  <div className="lg:col-span-4">
                    <p className="max-w-md text-sm leading-relaxed text-mist">{service.summary}</p>
                    <Link
                      href={quoteHref(service.quoteValue)}
                      className="relative z-10 mt-4 inline-block text-xs uppercase tracking-[0.16em] text-bone/70 underline-offset-4 transition-colors hover:text-teal-bright hover:underline"
                    >
                      Get a free estimate<span className="sr-only"> for {service.name}</span>
                    </Link>
                  </div>
                  <div className="hidden lg:col-span-1 lg:flex lg:justify-end">
                    <span
                      aria-hidden
                      className="grid size-12 place-items-center border border-white/15 transition-all duration-500 group-hover/row:rotate-45 group-hover/row:border-teal group-hover/row:bg-teal group-hover/row:text-ink"
                    >
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

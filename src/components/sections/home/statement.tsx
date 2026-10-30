"use client";

import Image from "next/image";
import { Fragment, useRef } from "react";

import { gsap, mq, useGSAP } from "@/lib/gsap";
import { photos, type Photo } from "@/lib/photos";

type Token = { word: string } | { photo: Photo };

// Copy from the original site, lightly edited for flow.
const tokens: Token[] = [
  ..."We're passionate about what we do.".split(" ").map((word) => ({ word })),
  { photo: photos.filmPlotter },
  ..."Our success comes down to passion, dedication".split(" ").map((word) => ({ word })),
  { photo: photos.customerLounge },
  ..."and customer satisfaction.".split(" ").map((word) => ({ word })),
];

export function Statement() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.anyMotion, () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.14 },
          {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: 0.6 },
          },
        );
        gsap.fromTo(
          "[data-chip]",
          { clipPath: "inset(0% 50% 0% 50%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: { trigger: "[data-statement]", start: "top 75%", end: "center 55%", scrub: 0.6 },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="statement-title" className="relative py-28 sm:py-40">
      <div className="container-x grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <h2 id="statement-title" className="eyebrow flex items-center gap-3">
            <span className="h-px w-8 bg-teal" /> At Equinox Tinting
          </h2>
        </div>
        <p
          data-statement
          className="font-wide text-[clamp(1.75rem,4.4vw,4.4rem)] font-medium leading-[1.08] tracking-[-0.02em] text-bone lg:col-span-9"
        >
          {tokens.map((t, i) =>
            "word" in t ? (
              <Fragment key={i}>
                <span data-word>{t.word}</span>{" "}
              </Fragment>
            ) : (
              <Fragment key={i}>
                <span
                  data-chip
                  aria-hidden
                  className="relative mx-[0.1em] inline-block h-[0.78em] w-[1.7em] -translate-y-[0.04em] overflow-hidden align-baseline"
                >
                  <Image src={t.photo.src} alt="" fill sizes="160px" className="object-cover" />
                </span>{" "}
              </Fragment>
            ),
          )}
        </p>
      </div>
    </section>
  );
}

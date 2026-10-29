"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

/** Shared breakpoints for gsap.matchMedia() so scroll choreography only runs where it helps. */
export const mq = {
  desktopMotion: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  anyMotion: "(prefers-reduced-motion: no-preference)",
} as const;

export { gsap, ScrollTrigger, useGSAP };

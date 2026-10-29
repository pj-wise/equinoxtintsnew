"use client";

import { cn } from "cn";
import { useRef, type ReactNode } from "react";

import { gsap, mq, useGSAP } from "@/lib/gsap";

type ParallaxProps = {
  children: ReactNode;
  className?: string;
  /** Vertical travel in percent of the element's height. Positive moves slower than scroll. */
  amount?: number;
};

/**
 * Scrubbed vertical drift for the inner layer. The inner layer is oversized so
 * edges never show. Disabled under reduced motion; lighter on small screens.
 */
export function Parallax({ children, className, amount = 12 }: ParallaxProps) {
  const root = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(mq.anyMotion, () => {
        const travel = window.innerWidth < 768 ? amount * 0.5 : amount;
        gsap.fromTo(
          inner.current,
          { yPercent: -travel / 2 },
          {
            yPercent: travel / 2,
            ease: "none",
            scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [amount] },
  );

  return (
    <div ref={root} className={cn("relative overflow-hidden", className)}>
      <div ref={inner} className="absolute inset-x-0 -inset-y-[8%] will-change-transform">
        {children}
      </div>
    </div>
  );
}

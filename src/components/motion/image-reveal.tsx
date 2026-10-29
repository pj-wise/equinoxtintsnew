"use client";

import { cn } from "cn";
import { motion } from "motion/react";
import { useState, type ReactNode } from "react";

const EASE = [0.76, 0, 0.24, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "center";

const clipFrom: Record<Direction, string> = {
  up: "inset(100% 0% 0% 0%)",
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
  center: "inset(18% 18% 18% 18%)",
};

type ImageRevealProps = {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  delay?: number;
  /** Reveal on mount (hero) rather than on scroll. */
  immediate?: boolean;
  /** Run the light "squeegee" sweep once revealed. */
  sweep?: boolean;
  /**
   * "curtain" keeps the image painted from first render and wipes an ink panel
   * off it instead — use for above-the-fold (LCP) images.
   */
  mode?: "clip" | "curtain";
};

/**
 * Masks an image in with a clip-path wipe while the image settles from a slight
 * zoom — like film being laid across glass. Children should fill the box
 * (e.g. next/image with `fill`).
 */
export function ImageReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  immediate = false,
  sweep = true,
  mode = "clip",
}: ImageRevealProps) {
  const [revealed, setRevealed] = useState(false);
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -8% 0px" } };

  return (
    <motion.div
      className={cn("relative overflow-hidden", sweep && "film-sweep", className)}
      data-revealed={revealed}
      initial="hidden"
      {...trigger}
      variants={
        mode === "clip"
          ? {
              hidden: { clipPath: clipFrom[direction] },
              show: { clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 1.3, ease: EASE, delay } },
            }
          : { hidden: {}, show: { transition: { delay } } }
      }
      onAnimationComplete={() => setRevealed(true)}
    >
      <motion.div
        className="absolute inset-0"
        variants={{
          hidden: { scale: 1.18 },
          show: { scale: 1, transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1], delay } },
        }}
      >
        {children}
      </motion.div>
      {mode === "curtain" && (
        <motion.div
          aria-hidden
          className="absolute inset-0 z-[1] origin-top bg-ink"
          variants={{
            hidden: { scaleY: 1 },
            show: { scaleY: 0, transition: { duration: 1.3, ease: EASE, delay } },
          }}
        />
      )}
    </motion.div>
  );
}

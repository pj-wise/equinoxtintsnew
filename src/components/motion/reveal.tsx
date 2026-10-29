"use client";

import { cn } from "cn";
import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { Children, Fragment, type ElementType, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ─────────────────────────── TextReveal ───────────────────────────
 * Each child line slides up from behind a mask, staggered.
 * Pass lines as children: <TextReveal as="h2"><span>Line one</span><span>Line two</span></TextReveal>
 */
type TextRevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of when scrolled into view. */
  immediate?: boolean;
  id?: string;
};

const lineVariants: Variants = {
  hidden: { y: "108%", rotate: 2 },
  show: (i: number) => ({
    y: "0%",
    rotate: 0,
    transition: { duration: 1.05, ease: EASE, delay: i },
  }),
};

export function TextReveal({
  as: Tag = "div",
  children,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  immediate = false,
  id,
}: TextRevealProps) {
  const lines = Children.toArray(children);
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag className={className} id={id}>
      <motion.span className="block" initial="hidden" {...trigger}>
        {lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && " "}
            <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
              <motion.span
                className={cn("block origin-bottom-left will-change-transform", lineClassName)}
                variants={lineVariants}
                custom={delay + i * stagger}
              >
                {line}
              </motion.span>
            </span>
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  );
}

/* ─────────────────────────── Reveal ─────────────────────────── */
type RevealProps = HTMLMotionProps<"div"> & { delay?: number; y?: number };

export function Reveal({ delay = 0, y = 28, className, children, ...props }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────── Stagger group ─────────────────────────── */
const groupVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function StaggerGroup({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div
      className={className}
      variants={groupVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ className, children, ...props }: HTMLMotionProps<"div">) {
  return (
    <motion.div className={className} variants={itemVariants} {...props}>
      {children}
    </motion.div>
  );
}

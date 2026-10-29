import { cn } from "cn";
import type { ReactNode } from "react";

import { TextReveal } from "@/components/motion/reveal";

type SectionHeadingProps = {
  id?: string;
  index?: string;
  eyebrow: string;
  /** Each entry renders as one masked, staggered line. */
  lines: ReactNode[];
  as?: "h1" | "h2";
  size?: "lg" | "md";
  className?: string;
  children?: ReactNode;
};

export function SectionHeading({
  id,
  index,
  eyebrow,
  lines,
  as = "h2",
  size = "lg",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <header className={cn("grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-end", className)}>
      <div className="lg:col-span-8">
        <p className="eyebrow mb-6 flex items-center gap-3">
          {index && <span className="text-teal">{index}</span>}
          <span className="h-px w-8 bg-white/20" />
          {eyebrow}
        </p>
        <TextReveal
          as={as}
          id={id}
          className={cn("font-display", size === "lg" ? "text-display-lg" : "text-display-md")}
        >
          {lines}
        </TextReveal>
      </div>
      {children && <div className="text-base leading-relaxed text-mist lg:col-span-4 lg:pb-2">{children}</div>}
    </header>
  );
}

import { cn } from "cn";
import { ArrowUpRight, Phone } from "lucide-react";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

import { Magnetic } from "@/components/motion/magnetic";

type Variant = "primary" | "outline" | "ghost" | "light";
type Size = "md" | "lg";

const base =
  "group/cta relative inline-flex items-center justify-between gap-4 overflow-hidden font-medium uppercase tracking-[0.14em] transition-[background-color,border-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-teal-bright select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-teal text-ink hover:bg-teal-bright shadow-[0_0_0_0_rgb(19_167_168/0)] hover:shadow-[0_10px_40px_-10px_rgb(19_167_168/0.65)]",
  outline: "border border-bone/25 text-bone hover:border-bone/70 bg-ink/20 backdrop-blur-sm",
  ghost: "text-bone hover:text-teal-bright",
  light: "bg-bone text-ink hover:bg-white",
};

const sizes: Record<Size, string> = {
  md: "h-12 pl-5 pr-2 text-[0.7rem]",
  lg: "h-14 pl-6 pr-2.5 text-[0.74rem] sm:h-16 sm:pl-7 sm:text-[0.78rem]",
};

function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function IconChip({ variant, icon }: { variant: Variant; icon: "arrow" | "phone" }) {
  const Icon = icon === "phone" ? Phone : ArrowUpRight;
  return (
    <span
      className={cn(
        "relative grid size-9 shrink-0 place-items-center overflow-hidden sm:size-10",
        variant === "primary" && "bg-ink/90 text-teal-bright",
        variant === "light" && "bg-ink text-bone",
        variant === "outline" && "bg-bone/10 text-bone",
        variant === "ghost" && "text-current",
      )}
    >
      <Icon
        aria-hidden
        className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-6 group-hover/cta:-translate-y-6"
      />
      <Icon
        aria-hidden
        className="absolute size-4 -translate-x-6 translate-y-6 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/cta:translate-x-0 group-hover/cta:translate-y-0"
      />
    </span>
  );
}

type CtaLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: Variant;
  size?: Size;
  icon?: "arrow" | "phone";
  magnetic?: boolean;
  className?: string;
};

/** The site's primary call-to-action. Works for internal routes, tel: and external links. */
export function CtaLink({
  variant = "primary",
  size = "md",
  icon = "arrow",
  magnetic = false,
  className,
  children,
  ...props
}: CtaLinkProps) {
  const link = (
    <Link className={cn(base, variants[variant], sizes[size], className)} {...props}>
      <RollingLabel>{children}</RollingLabel>
      <IconChip variant={variant} icon={icon} />
    </Link>
  );
  return magnetic ? <Magnetic>{link}</Magnetic> : link;
}

/** Inline text link with an animated underline. */
export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "group/tl inline-flex items-center gap-2 text-sm uppercase tracking-[0.16em] text-bone",
        className,
      )}
      {...props}
    >
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-bone/30" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-teal-bright transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/tl:scale-x-100" />
      </span>
      <ArrowUpRight
        aria-hidden
        className="size-4 text-teal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/tl:translate-x-0.5 group-hover/tl:-translate-y-0.5"
      />
    </Link>
  );
}

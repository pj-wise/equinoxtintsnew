"use client";

import { cn } from "cn";
import { Phone } from "lucide-react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/layout/logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { CtaLink } from "@/components/ui-kit/cta-link";
import { mainNav, site } from "@/lib/site";

const desktopNav = mainNav.filter((item) => item.href !== "/contact");

export function SiteHeader() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    // Tuck away while reading downward, return on any upward scroll.
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  const isActive = (href: string) => (href === "/services" ? pathname === href : pathname.startsWith(href));

  return (
    <motion.header
      style={{ viewTransitionName: "site-header" }}
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: hidden ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          "absolute inset-0 -z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          scrolled
            ? "border-white/[0.07] bg-ink/72 backdrop-blur-xl backdrop-saturate-150"
            : "-bottom-10 border-transparent bg-gradient-to-b from-ink/70 via-ink/25 to-transparent",
        )}
      />
      <div className="container-x flex h-[var(--header-h)] items-center gap-8">
        <Logo className="h-9 sm:h-10" preload />

        <nav aria-label="Main" className="ml-auto hidden lg:block">
          <ul className="flex items-center gap-1">
            {desktopNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="group/nav relative block px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-bone/75 transition-colors hover:text-bone aria-[current=page]:text-bone"
                >
                  {item.label}
                  <span className="absolute inset-x-3.5 bottom-1 h-px origin-left scale-x-0 bg-teal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/nav:scale-x-100 group-aria-[current=page]/nav:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href={site.phone.href}
            className="hidden items-center gap-2 font-mono text-xs tracking-wider text-bone/80 transition-colors hover:text-teal-bright xl:flex"
          >
            <Phone aria-hidden className="size-3.5 text-teal" />
            {site.phone.display}
          </a>
          <CtaLink href="/contact" className="hidden sm:inline-flex" magnetic>
            Free estimate
          </CtaLink>
          <MobileMenu />
        </div>
      </div>
    </motion.header>
  );
}

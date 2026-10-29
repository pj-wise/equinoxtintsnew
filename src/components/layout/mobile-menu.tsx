"use client";

import { Dialog } from "@base-ui/react/dialog";
import { cn } from "cn";
import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { Logo } from "@/components/layout/logo";
import { useLenis } from "@/components/motion/smooth-scroll";
import { mainNav, mapsLinks, site } from "@/lib/site";

const EASE = "ease-[cubic-bezier(0.76,0,0.24,1)]";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const lenis = useLenis();

  const onOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) lenis?.stop();
    else lenis?.start();
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger
        aria-label="Open menu"
        className="relative grid size-12 place-items-center border border-bone/15 bg-ink/40 backdrop-blur-sm transition-colors hover:border-bone/40 lg:hidden"
      >
        <span className="relative block h-3 w-5">
          <span
            className={cn(
              "absolute left-0 top-0 h-px w-full bg-bone",
            )}
          />
          <span
            className={cn(
              "absolute bottom-0 right-0 h-px w-3/5 bg-bone",
            )}
          />
        </span>
      </Dialog.Trigger>

      <Dialog.Portal keepMounted>
        <Dialog.Popup
          className={cn(
            "group/menu fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-ink lg:hidden",
            "transition-[clip-path] duration-700",
            EASE,
            "[clip-path:inset(0_0_0_0)] data-[closed]:[clip-path:inset(0_0_100%_0)] data-[starting-style]:[clip-path:inset(0_0_100%_0)] data-[ending-style]:[clip-path:inset(0_0_100%_0)]",
          )}
        >
          <Dialog.Title className="sr-only">Site menu</Dialog.Title>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_50%_at_100%_0%,rgb(19_167_168/0.18),transparent_70%)]" />

          <div className="container-x relative flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Logo className="h-9 sm:h-10" />
            <Dialog.Close
              aria-label="Close menu"
              className="grid size-12 place-items-center border border-bone/15 transition-colors hover:border-bone/40"
            >
              <span className="relative block h-3 w-5">
                <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-bone" />
                <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-bone" />
              </span>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="container-x relative mt-6 flex-1">
            <ul className="flex flex-col">
              {mainNav.map((item, i) => {
                const active = item.href === pathname;
                return (
                  <li key={item.href} className="overflow-hidden border-b border-white/[0.08]">
                    <Link
                      href={item.href}
                      onClick={() => onOpenChange(false)}
                      aria-current={active ? "page" : undefined}
                      style={{ transitionDelay: open ? `${180 + i * 55}ms` : "0ms" }}
                      className={cn(
                        "flex items-baseline gap-4 py-4 transition-[transform,opacity] duration-700",
                        EASE,
                        open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
                      )}
                    >
                      <span className="font-mono text-[0.68rem] text-teal">0{i + 1}</span>
                      <span
                        className={cn(
                          "font-display text-[clamp(2rem,9vw,3.4rem)]",
                          active ? "text-teal-bright" : "text-bone",
                        )}
                      >
                        {item.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div
            className={cn(
              "container-x relative grid gap-6 pb-10 pt-10 transition-opacity duration-700",
              open ? "opacity-100 delay-500" : "opacity-0",
            )}
          >
            <div className="grid grid-cols-2 gap-2">
              <a
                href={site.phone.href}
                className="flex h-14 items-center justify-center gap-2 border border-bone/20 text-xs font-medium uppercase tracking-[0.14em]"
              >
                <Phone aria-hidden className="size-4 text-teal" /> Call
              </a>
              <Link
                href="/contact"
                onClick={() => onOpenChange(false)}
                className="flex h-14 items-center justify-center gap-2 bg-teal text-xs font-medium uppercase tracking-[0.14em] text-ink"
              >
                Get a quote <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            </div>
            <dl className="grid gap-3 text-sm text-mist">
              <div className="flex gap-3">
                <dt className="sr-only">Address</dt>
                <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                <dd>
                  <a href={mapsLinks.directions} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                    {site.address.street} {site.address.unit}, {site.address.city}, {site.address.region}
                  </a>
                </dd>
              </div>
              <div className="flex gap-3">
                <dt className="sr-only">Hours</dt>
                <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-teal" />
                <dd>
                  {site.hours[0].short} {site.hours[0].label} · {site.hours[1].short} {site.hours[1].label}
                </dd>
              </div>
            </dl>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

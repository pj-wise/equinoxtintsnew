"use client";

import { ArrowUpRight, Phone } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { site } from "@/lib/site";

/** Thumb-reachable call + quote actions on small screens, shown once the hero is passed. */
export function MobileCtaBar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setVisible(y > window.innerHeight * 0.6));

  const onContact = pathname === "/contact";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "120%" }}
          animate={{ y: 0 }}
          exit={{ y: "120%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-ink/85 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-xl md:hidden"
        >
          <div className={onContact ? "grid grid-cols-1" : "grid grid-cols-2 gap-2"}>
            <a
              href={site.phone.href}
              className="flex h-12 items-center justify-center gap-2 border border-bone/20 text-[0.7rem] font-medium uppercase tracking-[0.14em] text-bone"
            >
              <Phone aria-hidden className="size-4 text-teal" />
              Call {site.phone.display}
            </a>
            {!onContact && (
              <Link
                href="/contact"
                className="flex h-12 items-center justify-center gap-2 bg-teal text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink"
              >
                Get a quote
                <ArrowUpRight aria-hidden className="size-4" />
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

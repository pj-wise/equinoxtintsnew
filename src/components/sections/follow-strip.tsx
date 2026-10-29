import { ArrowUpRight } from "lucide-react";

import { FacebookIcon, InstagramIcon } from "@/components/ui-kit/social-icons";
import { site } from "@/lib/site";

/** Points people to the shop's real social channels for the latest work. */
export function FollowStrip() {
  return (
    <section aria-label="Follow Equinox Tinting" className="border-y border-white/[0.07]">
      <div className="container-x grid grid-cols-1 md:grid-cols-2">
        <a
          href={site.social.instagram.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/s flex items-center justify-between gap-6 py-10 md:border-r md:border-white/[0.07] md:pr-10"
        >
          <span className="flex items-center gap-5">
            <InstagramIcon className="size-7 text-teal" />
            <span>
              <span className="eyebrow block">Latest installs on Instagram</span>
              <span className="font-display mt-2 block text-[clamp(1.5rem,3vw,2.6rem)] transition-colors group-hover/s:text-teal-bright">
                {site.social.instagram.handle}
              </span>
            </span>
          </span>
          <ArrowUpRight aria-hidden className="size-6 shrink-0 text-mist transition-transform duration-500 group-hover/s:-translate-y-1 group-hover/s:translate-x-1 group-hover/s:text-teal-bright" />
        </a>
        <a
          href={site.social.facebook.href}
          target="_blank"
          rel="noopener noreferrer"
          className="group/s flex items-center justify-between gap-6 border-t border-white/[0.07] py-10 md:border-t-0 md:pl-10"
        >
          <span className="flex items-center gap-5">
            <FacebookIcon className="size-7 text-teal" />
            <span>
              <span className="eyebrow block">Follow on Facebook</span>
              <span className="font-display mt-2 block text-[clamp(1.5rem,3vw,2.6rem)] transition-colors group-hover/s:text-teal-bright">
                Equinox Tinting
              </span>
            </span>
          </span>
          <ArrowUpRight aria-hidden className="size-6 shrink-0 text-mist transition-transform duration-500 group-hover/s:-translate-y-1 group-hover/s:translate-x-1 group-hover/s:text-teal-bright" />
        </a>
      </div>
    </section>
  );
}

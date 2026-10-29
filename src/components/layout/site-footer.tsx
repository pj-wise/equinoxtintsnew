import Link from "next/link";

import { Logo } from "@/components/layout/logo";
import { CurrentYear } from "@/components/layout/current-year";
import { InstagramIcon, FacebookIcon } from "@/components/ui-kit/social-icons";
import { mainNav, mapsLinks, site } from "@/lib/site";
import { services } from "@/lib/services";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.07] bg-carbon pb-28 pt-20 md:pb-10">
      <div className="container-x grid grid-cols-1 gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-12" />
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-mist">
            Window tint and ceramic coating in Port St. Lucie, Florida. Products that protect your car from the
            intense Florida heat, UV rays and everyday wear.
          </p>
          <div className="mt-8 flex gap-2">
            <a
              href={site.social.instagram.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Equinox Tinting on Instagram"
              className="grid size-11 place-items-center border border-white/10 text-bone/80 transition-colors hover:border-teal hover:text-teal-bright"
            >
              <InstagramIcon className="size-4" />
            </a>
            <a
              href={site.social.facebook.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Equinox Tinting on Facebook"
              className="grid size-11 place-items-center border border-white/10 text-bone/80 transition-colors hover:border-teal hover:text-teal-bright"
            >
              <FacebookIcon className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h2 className="eyebrow mb-5">Services</h2>
            <ul className="space-y-3 text-sm">
              {services.map((s) => (
                <li key={s.id}>
                  <Link href={s.href} className="text-bone/80 transition-colors hover:text-teal-bright">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5">Explore</h2>
            <ul className="space-y-3 text-sm">
              {mainNav
                .filter((n) => !n.href.startsWith("/services"))
                .map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="text-bone/80 transition-colors hover:text-teal-bright">
                      {n.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <h2 className="eyebrow mb-5">Visit</h2>
            <address className="space-y-3 text-sm not-italic text-bone/80">
              <a href={mapsLinks.directions} target="_blank" rel="noopener noreferrer" className="block hover:text-teal-bright">
                {site.address.street}
                <br />
                {site.address.unit}
                <br />
                {site.address.city}, {site.address.region} {site.address.postalCode}
              </a>
              <a href={site.phone.href} className="block font-mono hover:text-teal-bright">
                {site.phone.display}
              </a>
              <a href={`mailto:${site.email}`} className="block break-all hover:text-teal-bright">
                {site.email}
              </a>
            </address>
            <ul className="mt-5 space-y-1 font-mono text-xs text-mist">
              {site.hours.map((h) => (
                <li key={h.days}>
                  {h.short} · {h.label}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div
        aria-hidden
        className="font-display pointer-events-none mt-20 select-none whitespace-nowrap text-center text-[19vw] leading-[0.8] text-transparent [-webkit-text-stroke:1px_rgb(255_255_255/0.07)]"
      >
        Equinox
      </div>

      <div className="container-x mt-10 flex flex-col gap-3 border-t border-white/[0.07] pt-6 text-xs text-mist sm:flex-row sm:justify-between">
        <p>
          © <CurrentYear /> {site.name}. All rights reserved.
        </p>
        <p>
          Website by{" "}
          <a href={site.credit.href} target="_blank" rel="noopener noreferrer" className="text-bone/80 hover:text-teal-bright">
            {site.credit.name}
          </a>
        </p>
      </div>
    </footer>
  );
}

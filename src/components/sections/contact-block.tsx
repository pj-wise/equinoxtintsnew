import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";

import { QuoteForm } from "@/components/forms/quote-form";
import { Reveal, TextReveal } from "@/components/motion/reveal";
import { mapsLinks, site } from "@/lib/site";

type ContactBlockProps = {
  headingLevel?: "h1" | "h2";
  id?: string;
};

/** Contact details + free estimate form. Used on the homepage (#contact) and /contact. */
export function ContactBlock({ headingLevel = "h2", id = "contact" }: ContactBlockProps) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grain relative isolate overflow-hidden py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_60%_at_0%_100%,rgb(15_255_255/0.10),transparent_70%)]" />
      <div className="container-x grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-teal" /> Ready to get started?
          </p>
          <TextReveal as={headingLevel} id={`${id}-title`} className="font-display text-display-lg">
            <span>Let&apos;s talk</span>
            <span className="text-teal">tint.</span>
          </TextReveal>

          <Reveal className="mt-12 grid gap-px border border-white/10 bg-white/10" delay={0.1}>
            <a
              href={site.phone.href}
              className="group/c flex items-center justify-between gap-4 bg-ink p-6 transition-colors hover:bg-graphite"
            >
              <span className="flex items-center gap-4">
                <Phone aria-hidden className="size-5 text-teal" />
                <span>
                  <span className="eyebrow block">Call us today</span>
                  <span className="font-display mt-1 block text-2xl sm:text-3xl">{site.phone.display}</span>
                </span>
              </span>
              <ArrowUpRight aria-hidden className="size-5 text-mist transition-transform group-hover/c:-translate-y-0.5 group-hover/c:translate-x-0.5 group-hover/c:text-teal-bright" />
            </a>
            <a
              href={`mailto:${site.email}`}
              className="group/c flex items-center justify-between gap-4 bg-ink p-6 transition-colors hover:bg-graphite"
            >
              <span className="flex min-w-0 items-center gap-4">
                <Mail aria-hidden className="size-5 shrink-0 text-teal" />
                <span className="min-w-0">
                  <span className="eyebrow block">Email</span>
                  <span className="mt-1 block truncate text-bone">{site.email}</span>
                </span>
              </span>
              <ArrowUpRight aria-hidden className="size-5 shrink-0 text-mist group-hover/c:text-teal-bright" />
            </a>
            <a
              href={mapsLinks.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group/c flex items-center justify-between gap-4 bg-ink p-6 transition-colors hover:bg-graphite"
            >
              <span className="flex items-center gap-4">
                <MapPin aria-hidden className="size-5 text-teal" />
                <span>
                  <span className="eyebrow block">Main office · Get directions</span>
                  <address className="mt-1 block not-italic text-bone">
                    {site.address.street} {site.address.unit}
                    <br />
                    {site.address.city}, {site.address.region} {site.address.postalCode}
                  </address>
                </span>
              </span>
              <ArrowUpRight aria-hidden className="size-5 text-mist group-hover/c:text-teal-bright" />
            </a>
            <div className="flex items-start gap-4 bg-ink p-6">
              <Clock aria-hidden className="mt-0.5 size-5 text-teal" />
              <div>
                <span className="eyebrow block">Working hours</span>
                <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="text-mist">{h.days}</dt>
                      <dd className="text-bone">{h.label}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal className="lg:col-span-6 lg:col-start-7" delay={0.15}>
          <div id="quote" className="border border-white/10 bg-carbon/80 p-6 backdrop-blur-sm sm:p-10">
            <h3 className="font-display text-display-sm">Get a free estimate</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">
              Tell us about your vehicle and what you&apos;re after — we&apos;ll follow up with a free estimate.
            </p>
            <QuoteForm className="mt-10" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

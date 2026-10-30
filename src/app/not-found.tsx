import type { Metadata } from "next";

import { CtaLink } from "@/components/ui-kit/cta-link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="grain relative isolate flex min-h-[90svh] items-center overflow-hidden pt-[var(--header-h)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(50%_50%_at_50%_50%,rgb(15_255_255/0.08),transparent_70%)]" />
      <div className="container-x">
        <p className="eyebrow mb-6">Error 404 · 0% VLT</p>
        <h1 className="font-display text-display-xl">
          Too dark
          <br />
          <span className="text-teal">to see.</span>
        </h1>
        <p className="mt-8 max-w-md text-lg text-mist">
          This page doesn&apos;t exist — or it moved when we redesigned the site.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaLink href="/" size="lg">
            Back to home
          </CtaLink>
          <CtaLink href={site.phone.href} variant="outline" size="lg" icon="phone">
            {site.phone.display}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

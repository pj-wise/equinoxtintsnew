import type { Metadata } from "next";

import { PageTransition } from "@/components/motion/page-transition";
import { ContactBlock } from "@/components/sections/contact-block";
import { MapEmbed } from "@/components/sections/map-embed";
import { JsonLd, breadcrumbJsonLd } from "@/lib/schema";
import { fullAddress } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Quote Request",
  description: `Request a window tint or ceramic coating quote from Equinox Tinting. Call (772) 380-3272, email equinoxtinting@gmail.com, or visit ${fullAddress}.`,
  alternates: { canonical: "/contact" },
  openGraph: { url: "/contact" },
};

export default function ContactPage() {
  return (
    <PageTransition>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <div className="pt-[var(--header-h)]">
        <ContactBlock headingLevel="h1" id="contact" />
      </div>
      <MapEmbed />
    </PageTransition>
  );
}

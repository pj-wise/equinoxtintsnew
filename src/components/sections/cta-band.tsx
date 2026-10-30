import Image from "next/image";

import { Parallax } from "@/components/motion/parallax";
import { TextReveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui-kit/cta-link";
import { photos, type Photo } from "@/lib/photos";
import { site } from "@/lib/site";

type CtaBandProps = {
  photo?: Photo;
  title?: [string, string];
  quoteHref?: string;
};

/** Full-bleed closing call to action used at the end of interior pages. */
export function CtaBand({
  photo = photos.fordMustangHex,
  title = ["Ready when", "you are."],
  quoteHref = "/contact",
}: CtaBandProps) {
  return (
    <section aria-labelledby="cta-band-title" className="relative isolate overflow-hidden">
      <Parallax className="absolute inset-0 -z-10" amount={12}>
        <Image src={photo.src} alt="" fill sizes="100vw" placeholder="blur" className="object-cover object-[50%_60%]" />
      </Parallax>
      <div className="absolute inset-0 -z-10 bg-ink/75" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/60 to-transparent" />
      <div className="container-x py-28 sm:py-40">
        <TextReveal as="h2" id="cta-band-title" className="font-display text-display-lg max-w-4xl">
          <span>{title[0]}</span>
          <span className="text-teal">{title[1]}</span>
        </TextReveal>
        <p className="mt-8 max-w-md text-lg text-bone/80">
          Call, email or send a quick request — we&apos;re open {site.hours[0].days}, {site.hours[0].label}.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <CtaLink href={quoteHref} size="lg" magnetic>
            Get a free estimate
          </CtaLink>
          <CtaLink href={site.phone.href} variant="outline" size="lg" icon="phone">
            {site.phone.display}
          </CtaLink>
        </div>
      </div>
    </section>
  );
}

import { SectionHeading } from "@/components/ui-kit/section-heading";
import { TintSelector } from "@/components/tint/tint-selector";

export function TintSection({ index }: { index?: string }) {
  return (
    <section id="shades" aria-labelledby="shades-title" className="relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="shades-title"
          index={index}
          eyebrow="Shade preview"
          lines={["Find your", <span key="2">shade<span className="text-teal">.</span></span>]}
        >
          VLT — visible light transmission — is the percentage of light a film lets through. Lower numbers are darker.
          Pick a shade and drag the divider to compare it with untinted glass.
        </SectionHeading>
        <div className="mt-14 sm:mt-20">
          <TintSelector />
        </div>
      </div>
    </section>
  );
}

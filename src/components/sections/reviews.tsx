import { Quote } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui-kit/section-heading";
import { reviews } from "@/lib/reviews";

/** Renders only when real reviews exist in src/lib/reviews.ts. */
export function Reviews() {
  if (reviews.length === 0) return null;
  const [lead, ...rest] = reviews;

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading id="reviews-title" eyebrow="Reviews" lines={["In their", "words."]} size="md" />
        <Reveal className="mt-16 border-t border-white/10 pt-12">
          <figure className="max-w-5xl">
            <Quote aria-hidden className="size-10 text-teal" />
            <blockquote className="font-wide mt-6 text-[clamp(1.5rem,3.2vw,3rem)] font-medium leading-tight">
              {lead.quote}
            </blockquote>
            <figcaption className="eyebrow mt-8">
              {lead.author} · {lead.source}
              {lead.vehicle && ` · ${lead.vehicle}`}
            </figcaption>
          </figure>
        </Reveal>
        {rest.length > 0 && (
          <div className="mt-16 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((r) => (
              <figure key={r.author + r.quote.slice(0, 12)} className="bg-ink p-8">
                <blockquote className="leading-relaxed text-bone/90">“{r.quote}”</blockquote>
                <figcaption className="eyebrow mt-6">
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="hover:text-teal-bright">
                      {r.author} · {r.source}
                    </a>
                  ) : (
                    `${r.author} · ${r.source}`
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

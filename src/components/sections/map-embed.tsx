"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";

import { fullAddress, mapsLinks } from "@/lib/site";

/**
 * Click-to-load Google Map. Keeps the heavy third-party iframe (and its
 * cookies) off the page until the visitor actually wants it.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false);

  return (
    <section aria-label="Map" className="relative h-[60vh] min-h-[380px] border-t border-white/[0.07] bg-graphite">
      {loaded ? (
        <iframe
          title={`Map to Equinox Tinting, ${fullAddress}`}
          src={mapsLinks.embed}
          className="absolute inset-0 h-full w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.6)_brightness(0.9)]"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(rgb(255_255_255/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:48px_48px]">
          <div className="flex flex-col items-center gap-6 px-6 text-center">
            <span className="grid size-14 place-items-center bg-teal text-ink">
              <MapPin aria-hidden className="size-6" />
            </span>
            <p className="max-w-sm text-bone/85">{fullAddress}</p>
            <div className="flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setLoaded(true)}
                className="h-12 border border-bone/25 px-6 text-xs font-medium uppercase tracking-[0.14em] transition-colors hover:border-teal hover:text-teal-bright"
              >
                Load map
              </button>
              <a
                href={mapsLinks.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-12 items-center bg-teal px-6 text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-teal-bright"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

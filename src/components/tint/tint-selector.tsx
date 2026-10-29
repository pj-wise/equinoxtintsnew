"use client";

import { cn } from "cn";
import { Check, Info, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useId, useState } from "react";

import { CompareSlider } from "@/components/tint/compare-slider";
import { photos } from "@/lib/photos";

/** Common automotive VLT levels. Availability varies by film series — not a product list. */
const SHADES = [
  { vlt: 70, name: "Light" },
  { vlt: 50, name: "Medium-light" },
  { vlt: 35, name: "Medium" },
  { vlt: 20, name: "Dark" },
  { vlt: 15, name: "Darker" },
  { vlt: 5, name: "Limo" },
] as const;

/**
 * Florida Statutes §316.2953 (front side windows) and §316.2954 (rear side and
 * rear windows): minimum light transmittance. Reference only.
 */
const FL_LIMITS = [
  { label: "Front side windows", min: 28 },
  { label: "Rear side & rear — cars", min: 15 },
  { label: "Rear side & rear — SUVs, trucks, vans", min: 6 },
];

/** Perceptual (not physical) darkening so on-screen steps read naturally. */
const tintAlpha = (vlt: number) => 1 - Math.pow(vlt / 100, 0.55);

// Side-window cutout in a 800×600 frame (evenodd → the glass is the hole).
const WINDOW = "M92 470 L132 196 C142 134 178 108 244 102 L640 94 C702 94 738 122 748 178 L762 470 Z";

export function TintSelector() {
  const [vlt, setVlt] = useState<number>(35);
  const groupId = useId();
  const photo = photos.ram1500Storefront;

  const scene = (
    <Image
      src={photo.src}
      alt=""
      fill
      sizes="(min-width: 1024px) 58vw, 100vw"
      className="object-cover object-[50%_62%]"
    />
  );

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Stage */}
      <figure className="lg:col-span-7">
        <CompareSlider
          className="aspect-square bg-graphite sm:aspect-[4/3]"
          ariaLabel="Compare no film with the selected tint shade"
          beforeLabel="No film"
          afterLabel={`${vlt}% VLT`}
          initial={42}
          before={scene}
          after={
            <>
              {scene}
              <div
                className="absolute inset-0 transition-[background-color] duration-700 ease-out"
                style={{ backgroundColor: `rgb(4 6 7 / ${tintAlpha(vlt)})` }}
              />
              <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgb(255_255_255/0.05)_45%,transparent_60%)]" />
            </>
          }
          overlay={
            <svg
              aria-hidden
              viewBox="0 0 800 600"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
            >
              <defs>
                <linearGradient id={`${groupId}-door`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#15181b" />
                  <stop offset="1" stopColor="#060708" />
                </linearGradient>
              </defs>
              <path fillRule="evenodd" fill={`url(#${groupId}-door)`} d={`M0 0H800V600H0Z ${WINDOW}`} />
              <path d={WINDOW} fill="none" stroke="rgb(255 255 255 / 0.12)" strokeWidth="3" />
              <path d="M70 512 H780" stroke="rgb(255 255 255 / 0.06)" strokeWidth="2" />
              <rect x="560" y="530" width="120" height="10" rx="5" fill="rgb(255 255 255 / 0.08)" />
            </svg>
          }
        />
        <figcaption className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-mist">
          <Info aria-hidden className="mt-0.5 size-3.5 shrink-0 text-teal" />
          <span>
            <strong className="font-medium text-bone">Illustrative preview only.</strong> On-screen shading is an
            approximation, not an exact representation of real-world VLT — results vary with the film, your vehicle&apos;s
            glass, lighting and your display. Visit the shop to see film in person.
          </span>
        </figcaption>
      </figure>

      {/* Controls */}
      <div className="lg:col-span-5">
        <fieldset>
          <legend className="eyebrow mb-4">Choose a shade (VLT)</legend>
          <div className="grid grid-cols-3 gap-px border border-white/10 bg-white/10 sm:grid-cols-6 lg:grid-cols-3">
            {SHADES.map((s) => (
              <label
                key={s.vlt}
                className={cn(
                  "group/shade relative flex cursor-pointer flex-col gap-3 bg-ink p-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-teal-bright",
                  vlt === s.vlt ? "bg-graphite" : "hover:bg-carbon",
                )}
              >
                <input
                  type="radio"
                  name={groupId}
                  value={s.vlt}
                  checked={vlt === s.vlt}
                  onChange={() => setVlt(s.vlt)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className="block h-10 border border-white/10"
                  style={{
                    background: `linear-gradient(rgb(4 6 7 / ${tintAlpha(s.vlt)}), rgb(4 6 7 / ${tintAlpha(s.vlt)})), linear-gradient(135deg, #8fb6c6, #d9e4e6)`,
                  }}
                />
                <span className="flex items-baseline justify-between gap-1">
                  <span className="font-display text-lg">{s.vlt}%</span>
                  <span className="hidden text-[0.65rem] text-mist xl:inline">{s.name}</span>
                </span>
                {vlt === s.vlt && (
                  <motion.span layoutId={`${groupId}-active`} className="absolute inset-x-0 top-0 h-0.5 bg-teal" />
                )}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 border-y border-white/10 py-6" aria-live="polite">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={vlt}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-end justify-between gap-6"
            >
              <p className="font-display text-[clamp(3rem,6vw,5rem)] text-bone">
                {vlt}
                <span className="text-teal">%</span>
              </p>
              <p className="pb-2 text-right text-sm text-mist">
                <span className="block text-bone">{SHADES.find((s) => s.vlt === vlt)?.name}</span>
                {vlt}% of visible light passes through
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8">
          <h3 className="eyebrow mb-4">Florida tint limits · minimum VLT</h3>
          <ul className="divide-y divide-white/10 border-y border-white/10 text-sm">
            {FL_LIMITS.map((limit) => {
              const ok = vlt >= limit.min;
              return (
                <li key={limit.label} className="flex items-center justify-between gap-4 py-3">
                  <span className="text-bone/85">{limit.label}</span>
                  <span className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-mist">{limit.min}%+</span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 px-2 py-1",
                        ok ? "bg-teal/15 text-teal-bright" : "bg-white/5 text-mist",
                      )}
                    >
                      {ok ? <Check aria-hidden className="size-3.5" /> : <X aria-hidden className="size-3.5" />}
                      {ok ? "Within limit" : "Too dark"}
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-mist">
            Summary of{" "}
            <a
              href="https://www.flsenate.gov/Laws/Statutes/2024/316.2953"
              target="_blank"
              rel="noopener noreferrer"
              className="text-bone/80 underline underline-offset-2 hover:text-teal-bright"
            >
              Florida Statutes §316.2953–316.2954
            </a>{" "}
            for reference — not legal advice. Final VLT depends on the film combined with your factory glass, and medical
            exemptions exist. Ask us what&apos;s right for your vehicle.
          </p>
        </div>
      </div>
    </div>
  );
}

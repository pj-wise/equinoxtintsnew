"use client";

import { cn } from "cn";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";

import { GalleryTile } from "@/components/gallery/gallery-tile";
import { Lightbox } from "@/components/gallery/lightbox";
import type { Photo, PhotoCategory } from "@/lib/photos";

const FILTERS: { value: PhotoCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "vehicles", label: "Vehicles" },
  { value: "studio", label: "The studio" },
];

// Editorial rhythm: tile aspect ratios cycle so the grid never feels uniform.
const ASPECTS = ["aspect-[4/5]", "aspect-[3/4]", "aspect-[4/5]", "aspect-[1/1]", "aspect-[3/4]", "aspect-[4/5]"];

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<PhotoCategory | "all">("all");
  const [index, setIndex] = useState<number | null>(null);

  const visible = useMemo(() => (filter === "all" ? photos : photos.filter((p) => p.category === filter)), [filter, photos]);

  // Distribute into columns (round-robin) so reading order stays left→right.
  const toColumns = (count: number) =>
    Array.from({ length: count }, (_, c) => visible.map((p, i) => ({ p, i })).filter(({ i }) => i % count === c));

  const renderColumns = (count: number, className: string) => (
    <div className={cn("grid gap-3 sm:gap-4 lg:gap-6", className)}>
      {toColumns(count).map((col, c) => (
        <div key={c} className={cn("flex flex-col gap-3 sm:gap-4 lg:gap-6", c % 2 === 1 && "pt-10 sm:pt-16 lg:pt-24")}>
          <AnimatePresence mode="popLayout" initial={false}>
            {col.map(({ p, i }) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GalleryTile
                  photo={p}
                  onOpen={() => setIndex(i)}
                  aspect={ASPECTS[i % ASPECTS.length]}
                  sizes={count === 3 ? "(min-width: 1024px) 31vw, 48vw" : "48vw"}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-2">
        <LayoutGroup id="gallery-filter">
          {FILTERS.map((f) => {
            const count = f.value === "all" ? photos.length : photos.filter((p) => p.category === f.value).length;
            const active = filter === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.value)}
                className={cn(
                  "relative h-11 px-5 text-xs font-medium uppercase tracking-[0.16em] transition-colors",
                  active ? "text-ink" : "text-bone/75 hover:text-bone",
                )}
              >
                {active && (
                  <motion.span layoutId="filter-pill" className="absolute inset-0 bg-teal" transition={{ type: "spring", bounce: 0.15, duration: 0.5 }} />
                )}
                {!active && <span className="absolute inset-0 border border-white/15" />}
                <span className="relative">
                  {f.label} <span className="font-mono opacity-60">{count}</span>
                </span>
              </button>
            );
          })}
        </LayoutGroup>
      </div>

      <div className="mt-12">
        {renderColumns(2, "grid-cols-2 lg:hidden")}
        {renderColumns(3, "hidden grid-cols-3 lg:grid")}
      </div>

      <Lightbox photos={visible} index={index} onIndexChange={setIndex} />
    </div>
  );
}

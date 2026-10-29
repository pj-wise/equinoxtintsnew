"use client";

import { Dialog } from "@base-ui/react/dialog";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Image from "next/image";
import { useEffect, useState, type KeyboardEvent } from "react";

import { useLenis } from "@/components/motion/smooth-scroll";
import type { Photo } from "@/lib/photos";

type LightboxProps = {
  photos: Photo[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
};

export function Lightbox({ photos, index, onIndexChange }: LightboxProps) {
  const lenis = useLenis();
  const [direction, setDirection] = useState(1);
  const open = index !== null;
  const photo = index !== null ? photos[index] : null;

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open, lenis]);

  const go = (delta: number) => {
    if (index === null) return;
    setDirection(delta);
    onIndexChange((index + delta + photos.length) % photos.length);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") go(1);
    else if (e.key === "ArrowLeft") go(-1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -60 || info.velocity.x < -400) go(1);
    else if (info.offset.x > 60 || info.velocity.x > 400) go(-1);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <Dialog.Portal>
        <Dialog.Backdrop className="fixed inset-0 z-[80] bg-ink/95 backdrop-blur-md transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0" />
        <Dialog.Popup onKeyDown={onKeyDown} className="fixed inset-0 z-[81] flex flex-col outline-none transition-opacity duration-300 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0">
          <div className="container-x flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Dialog.Title className="font-mono text-xs uppercase tracking-[0.16em] text-bone/80">
              {photo?.title}
            </Dialog.Title>
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-mist">
                {index !== null ? String(index + 1).padStart(2, "0") : ""} / {String(photos.length).padStart(2, "0")}
              </span>
              <Dialog.Close
                aria-label="Close gallery"
                className="grid size-12 place-items-center border border-bone/15 transition-colors hover:border-teal hover:text-teal-bright"
              >
                <X aria-hidden className="size-5" />
              </Dialog.Close>
            </div>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              {photo && (
                <motion.div
                  key={photo.id}
                  custom={direction}
                  variants={{
                    enter: (d: number) => ({ x: `${d * 12}%`, opacity: 0, scale: 0.96 }),
                    center: { x: 0, opacity: 1, scale: 1 },
                    exit: (d: number) => ({ x: `${d * -12}%`, opacity: 0, scale: 0.96 }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.4}
                  onDragEnd={onDragEnd}
                  className="absolute inset-4 cursor-grab active:cursor-grabbing sm:inset-8"
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    quality={90}
                    sizes="100vw"
                    draggable={false}
                    className="object-contain"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="container-x flex shrink-0 items-center justify-between gap-4 py-5">
            <Dialog.Description className="max-w-xl text-sm text-mist">{photo?.alt}</Dialog.Description>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous photo"
                className="grid size-12 place-items-center border border-bone/15 transition-colors hover:border-teal hover:text-teal-bright"
              >
                <ArrowLeft aria-hidden className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next photo"
                className="grid size-12 place-items-center border border-bone/15 transition-colors hover:border-teal hover:text-teal-bright"
              >
                <ArrowRight aria-hidden className="size-5" />
              </button>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

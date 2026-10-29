"use client";

import { cn } from "cn";
import { Plus } from "lucide-react";
import Image from "next/image";

import type { Photo } from "@/lib/photos";

type GalleryTileProps = {
  photo: Photo;
  onOpen: () => void;
  sizes: string;
  className?: string;
  aspect?: string;
};

export function GalleryTile({ photo, onOpen, sizes, className, aspect = "aspect-[4/5]" }: GalleryTileProps) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`View photo: ${photo.title}`}
      className={cn("group/tile relative block w-full overflow-hidden bg-graphite text-left", aspect, className)}
    >
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes={sizes}
        placeholder="blur"
        className="object-cover object-[50%_60%] transition-[transform,filter] duration-[1200ms] ease-[var(--ease-out-expo)] group-hover/tile:scale-[1.06] group-hover/tile:brightness-110"
      />
      {/* Hover: film-like darkening from the top, caption rises from the bottom */}
      <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/0 to-ink/0 opacity-60 transition-opacity duration-500 group-hover/tile:opacity-100" />
      <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5">
        <span className="translate-y-2 text-sm font-medium text-bone opacity-90 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover/tile:translate-y-0 group-hover/tile:opacity-100">
          {photo.title}
        </span>
        <span className="grid size-9 shrink-0 scale-75 place-items-center bg-teal text-ink opacity-0 transition-all duration-500 ease-[var(--ease-out-expo)] group-hover/tile:scale-100 group-hover/tile:opacity-100 group-focus-visible/tile:scale-100 group-focus-visible/tile:opacity-100">
          <Plus aria-hidden className="size-4" />
        </span>
      </span>
    </button>
  );
}

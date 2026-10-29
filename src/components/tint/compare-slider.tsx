"use client";

import { cn } from "cn";
import { ChevronsLeftRight } from "lucide-react";
import { useCallback, useRef, useState, type KeyboardEvent, type PointerEvent, type ReactNode } from "react";

type CompareSliderProps = {
  before: ReactNode;
  after: ReactNode;
  beforeLabel: string;
  afterLabel: string;
  /** Rendered above both layers (frames, vignettes). Must be pointer-events-none. */
  overlay?: ReactNode;
  initial?: number;
  className?: string;
  ariaLabel?: string;
};

/**
 * Accessible before/after comparison. Drag anywhere (mouse, pen, touch) or use
 * arrow keys / Home / End on the handle. Vertical page scrolling still works on touch.
 */
export function CompareSlider({
  before,
  after,
  beforeLabel,
  afterLabel,
  overlay,
  initial = 50,
  className,
  ariaLabel = "Comparison slider",
}: CompareSliderProps) {
  const [pos, setPos] = useState(initial);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const setFromClientX = useCallback((clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
    setFromClientX(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => dragging && setFromClientX(e.clientX);
  const stop = () => setDragging(false);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const next =
      e.key === "ArrowLeft" || e.key === "ArrowDown"
        ? pos - step
        : e.key === "ArrowRight" || e.key === "ArrowUp"
          ? pos + step
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? 100
              : null;
    if (next === null) return;
    e.preventDefault();
    setPos(Math.min(100, Math.max(0, next)));
  };

  return (
    <div
      ref={ref}
      className={cn("relative isolate cursor-ew-resize touch-pan-y select-none overflow-hidden", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={stop}
      onPointerCancel={stop}
    >
      <div className="absolute inset-0">{before}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
        {after}
      </div>
      {overlay}

      <span className="pointer-events-none absolute bottom-4 left-4 z-10 bg-ink/70 px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-bone backdrop-blur-sm">
        {beforeLabel}
      </span>
      <span className="pointer-events-none absolute bottom-4 right-4 z-10 bg-teal px-2.5 py-1.5 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-ink">
        {afterLabel}
      </span>

      <div className="pointer-events-none absolute inset-y-0 z-10 w-px bg-bone/90" style={{ left: `${pos}%` }}>
        <div
          role="slider"
          tabIndex={0}
          aria-label={ariaLabel}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% showing ${beforeLabel}`}
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center border border-bone/80 bg-ink/60 text-bone backdrop-blur-md transition-transform duration-300",
            dragging && "scale-90 border-teal-bright",
          )}
        >
          <ChevronsLeftRight aria-hidden className="size-5" />
        </div>
      </div>
    </div>
  );
}

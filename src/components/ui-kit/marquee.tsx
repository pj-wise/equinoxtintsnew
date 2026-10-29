import { cn } from "cn";

/** Slow, decorative ticker. Content is duplicated for a seamless loop and hidden from AT. */
export function Marquee({ items, className }: { items: string[]; className?: string }) {
  const row = (
    <ul className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="font-display px-8 text-[clamp(1.4rem,3vw,2.6rem)] text-bone/90">{item}</span>
          <span className="size-2 rotate-45 bg-teal" />
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden className={cn("relative overflow-hidden border-y border-white/[0.07] py-6", className)}>
      <div className="animate-marquee flex w-max">
        {row}
        {row}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink to-transparent" />
    </div>
  );
}

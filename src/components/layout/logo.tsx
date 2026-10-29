import { cn } from "cn";
import Image from "next/image";
import Link from "next/link";

import logo from "@/assets/brand/equinox-logo.png";

export function Logo({ className, preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Link href="/" aria-label="Equinox Tinting — home" className={cn("relative block shrink-0", className)}>
      <Image
        src={logo}
        alt="Equinox Tinting"
        sizes="160px"
        preload={preload}
        className="h-full w-auto"
      />
    </Link>
  );
}

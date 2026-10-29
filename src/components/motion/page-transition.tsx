"use client";

import { ViewTransition, type ReactNode } from "react";

/**
 * Wrap each page's content. Route changes crossfade/rise via the
 * ::view-transition rules in globals.css; the header stays anchored.
 * Browsers without View Transitions simply swap pages instantly.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      {children}
    </ViewTransition>
  );
}

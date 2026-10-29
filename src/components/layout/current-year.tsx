"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

// Read on the client only so the static shell never bakes in a build-time
// date (Cache Components forbids `new Date()` during prerender).
export function CurrentYear() {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => null,
  );
  return <span>{year}</span>;
}

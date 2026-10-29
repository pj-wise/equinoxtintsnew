"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

import { SmoothScroll } from "@/components/motion/smooth-scroll";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>{children}</SmoothScroll>
    </MotionConfig>
  );
}

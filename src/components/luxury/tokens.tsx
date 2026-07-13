import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

/**
 * Luxury design tokens (mirrors src/styles.css).
 * Consumed by components in this folder for consistent spacing, type, and motion.
 */
export const luxury = {
  container: "mx-auto max-w-[1400px] px-6 md:px-10",
  containerNarrow: "mx-auto max-w-[1100px] px-6 md:px-10",
  sectionY: "py-32 md:py-48 lg:py-56",
  eyebrow: "font-numeric text-[10px] uppercase tracking-[0.32em] text-gold",
  eyebrowMuted: "font-numeric text-[10px] uppercase tracking-[0.28em] text-platinum/70",
  bodyMuted: "text-[15px] font-light leading-relaxed text-platinum/70",
  bodySmall: "text-[13px] font-light tracking-wide text-platinum/70",
  hairline:
    "h-px bg-gradient-to-r from-transparent via-[color-mix(in_oklab,var(--gold)_60%,transparent)] to-transparent",
  ease: [0.19, 1, 0.22, 1] as const,
};

export function Container({
  narrow,
  className,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { narrow?: boolean }) {
  return (
    <div className={cn(narrow ? luxury.containerNarrow : luxury.container, className)} {...rest}>
      {children}
    </div>
  );
}

export function Eyebrow({
  children,
  muted,
  className,
}: {
  children: ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <span className={cn(muted ? luxury.eyebrowMuted : luxury.eyebrow, className)}>{children}</span>
  );
}

export function Hairline({ className }: { className?: string }) {
  return <div className={cn(luxury.hairline, className)} />;
}

import { AcademyMark } from "./logo";

/**
 * Backwards-compatible alias for the Academy monogram seal. New code should
 * import `AcademyMark` (or `AcademyLockup`) from `@/components/luxury` directly.
 */
export function GoldMark({ className }: { className?: string }) {
  return <AcademyMark className={className} decorative />;
}

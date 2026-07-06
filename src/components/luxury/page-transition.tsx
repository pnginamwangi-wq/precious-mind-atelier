import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { luxury } from "./tokens";

/**
 * Shared route-level transition.
 *
 * Two coordinated motions on every pathname change:
 *   1. Content: fade + slow rise with the luxury easing (matches the
 *      homepage reveal rhythm).
 *   2. Veil: an obsidian curtain with a gold hairline sweeps top to bottom
 *      across the viewport, evoking a page turn in a printed monograph.
 *
 * Respects prefers-reduced-motion: renders children without animation.
 * `initial={false}` on both AnimatePresences suppresses the effect on the
 * very first paint so the hero's own reveals aren't doubled.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{
            opacity: { duration: 0.9, ease: luxury.ease },
            y: { duration: 1, ease: luxury.ease },
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence initial={false}>
        <motion.div
          key={`${pathname}::veil`}
          aria-hidden
          className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-dvh"
          initial={{ y: "-101%" }}
          animate={{ y: "101%" }}
          transition={{ duration: 1.1, ease: luxury.ease, delay: 0.05 }}
        >
          <div className="relative h-full w-full bg-obsidian">
            <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />
            <div className="absolute inset-x-0 top-[calc(50%+18px)] h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}

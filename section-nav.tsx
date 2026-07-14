import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

import { useActiveSection } from "@/hooks/use-active-nav";
import { useSmoothHashNav } from "@/hooks/use-smooth-hash-nav";
import { cn } from "@/lib/utils";

export type SectionNavItem = { id: string; label: string };

/**
 * In page secondary navigation for long detail routes.
 *
 * Renders a sticky rail that highlights the currently visible section using
 * the same IntersectionObserver pattern as the global Header, Footer and
 * MobileTabs. Clicking an item smooth scrolls to the target and writes the
 * hash into the router location so aria-current updates immediately.
 */
export function SectionNav({
  items,
  label = "In this Institute",
  className,
}: {
  items: readonly SectionNavItem[];
  label?: string;
  className?: string;
}) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const activeSection = useActiveSection(ids);
  const onHashNav = useSmoothHashNav();
  const reduceMotion = useReducedMotion();
  const motionDur = reduceMotion ? "duration-0" : "duration-500";

  return (
    <nav
      aria-label={label}
      className={cn(
        "sticky top-24 hidden lg:block",
        "text-[11px] tracking-[0.28em] uppercase",
        className,
      )}
    >
      <div className="font-numeric text-[10px] tracking-[0.32em] text-gold">
        {label}
      </div>
      <ul className="mt-6 space-y-4 border-l border-white/10 pl-6">
        {items.map((item) => {
          const active = activeSection === item.id;
          return (
            <li key={item.id} className="relative">
              {active ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute -left-[25px] top-1/2 h-px w-4 -translate-y-1/2 bg-gold transition-all ease-out",
                    motionDur,
                  )}
                />
              ) : null}
              <a
                href={`#${item.id}`}
                onClick={(e) => onHashNav(`#${item.id}`, e)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "group inline-flex rounded-sm font-numeric text-[10px] tracking-[0.32em] uppercase outline-none transition-colors focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian",
                  motionDur,
                  active ? "text-gold" : "text-platinum/60 hover:text-ivory",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/**
 * Horizontal variant used on medium viewports where a rail would crowd
 * the layout. Sticks to the top of its scroll container.
 */
export function SectionNavBar({
  items,
  label = "Sections",
  className,
}: {
  items: readonly SectionNavItem[];
  label?: string;
  className?: string;
}) {
  const ids = useMemo(() => items.map((i) => i.id), [items]);
  const activeSection = useActiveSection(ids);
  const onHashNav = useSmoothHashNav();
  const reduceMotion = useReducedMotion();
  const motionDur = reduceMotion ? "duration-0" : "duration-500";

  return (
    <nav
      aria-label={label}
      className={cn(
        "sticky top-20 z-30 border-y border-white/5 bg-obsidian/85 px-6 backdrop-blur md:px-10",
        "md:top-24 lg:hidden",
        className,
      )}
    >
      <ul className="scrollbar-hidden flex gap-8 overflow-x-auto py-4">
        {items.map((item) => {
          const active = activeSection === item.id;
          return (
            <li key={item.id} className="flex-none">
              <a
                href={`#${item.id}`}
                onClick={(e) => onHashNav(`#${item.id}`, e)}
                aria-current={active ? "location" : undefined}
                className={cn(
                  "relative inline-flex whitespace-nowrap rounded-sm font-numeric text-[10px] tracking-[0.32em] uppercase outline-none transition-colors focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian",
                  motionDur,
                  active ? "text-gold" : "text-platinum/70 hover:text-ivory",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute -bottom-2 left-0 h-px bg-gold transition-all ease-out",
                    motionDur,
                    active ? "w-full" : "w-0",
                  )}
                />
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

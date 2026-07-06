import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Tracks the currently visible section id via IntersectionObserver.
 * Observes all elements matching the provided ids that exist in the DOM.
 * Falls back to the URL hash when no section is in view.
 */
export function useActiveSection(ids: readonly string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (targets.length === 0) {
      setActive(null);
      return;
    }
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visible.set(entry.target.id, entry.intersectionRatio);
          } else {
            visible.delete(entry.target.id);
          }
        }
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        setActive(best);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    for (const t of targets) observer.observe(t);
    return () => observer.disconnect();
  }, [ids, pathname]);

  return active;
}

export type NavContext = {
  pathname: string;
  hash: string;
  activeSection: string | null;
};

/**
 * Determines whether a nav href should be considered active given the
 * current router location and (optionally) the observed section.
 */
export function isNavActive(href: string, ctx: NavContext): boolean {
  const { pathname, hash, activeSection } = ctx;
  if (href.startsWith("#")) {
    if (pathname !== "/") return false;
    const id = href.slice(1);
    if (activeSection) return activeSection === id;
    return hash === href;
  }
  if (href === "/") return pathname === "/" && !hash && !activeSection;
  return pathname === href || pathname.startsWith(href + "/");
}

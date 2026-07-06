import { useCallback } from "react";
import { useNavigate, useRouterState } from "@tanstack/react-router";

/**
 * Returns a click handler for hash-anchor nav links (e.g. "#academy").
 *
 * Behavior:
 *  - Prevents the browser's default jump.
 *  - Smooth-scrolls the target section into view when we are already on "/".
 *  - Navigates to "/" with the hash first when we are on another route.
 *  - Writes the hash into the router location immediately so
 *    `isNavActive` reports the tapped item as active on the very next
 *    render, without waiting for the IntersectionObserver to catch up.
 *
 * Non-hash hrefs (e.g. "/institutes") are ignored so callers can bind
 * this to every nav item unconditionally.
 */
export function useSmoothHashNav(): (
  href: string,
  event: { preventDefault: () => void },
) => void {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return useCallback(
    (href, event) => {
      if (!href.startsWith("#")) return;
      event.preventDefault();
      const id = href.slice(1);

      const scrollToTarget = () => {
        const el = document.getElementById(id);
        if (!el) return;
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        el.scrollIntoView({
          behavior: prefersReducedMotion ? "auto" : "smooth",
          block: "start",
        });
      };

      if (pathname === "/") {
        // Update the router hash first so `isNavActive` flips the tapped
        // item to aria-current="page" this render, then scroll.
        void navigate({ to: "/", hash: id, replace: true });
        scrollToTarget();
      } else {
        // Cross-route jump: land on "/" then scroll once the section mounts.
        void navigate({ to: "/", hash: id }).then(() => {
          // requestAnimationFrame gives the DOM one paint to place the
          // section before we measure its scroll position.
          requestAnimationFrame(scrollToTarget);
        });
      }
    },
    [navigate, pathname],
  );
}

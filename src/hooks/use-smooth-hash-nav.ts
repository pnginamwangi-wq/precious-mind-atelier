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

      // If the target section exists on the current route (e.g. a
      // secondary in-page nav on /institutes/$slug), stay on this
      // route and just update the hash so aria-current flips now.
      const inCurrentRoute =
        typeof document !== "undefined" && document.getElementById(id) !== null;

      if (pathname === "/" || inCurrentRoute) {
        void navigate({ to: pathname, hash: id, replace: true });
        scrollToTarget();
      } else {
        // Cross-route jump: land on "/" then scroll once the section mounts.
        void navigate({ to: "/", hash: id }).then(() => {
          requestAnimationFrame(scrollToTarget);
        });
      }
    },
    [navigate, pathname],
  );
}

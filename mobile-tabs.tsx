import { BookOpen, Compass, Home, Library, Newspaper } from "lucide-react";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { cn } from "@/lib/utils";
import { isNavActive, useActiveSection } from "@/hooks/use-active-nav";
import { useSmoothHashNav } from "@/hooks/use-smooth-hash-nav";
import { motion, useReducedMotion } from "framer-motion";

const TABS = [
  { label: "Home", href: "/", icon: Home },
  { label: "Institutes", href: "/institutes", icon: Compass },
  { label: "Journal", href: "/journal", icon: Newspaper, primary: true },
  { label: "Knowledge", href: "/knowledge", icon: BookOpen },
  { label: "Library", href: "/library", icon: Library },
];

const SECTION_IDS = ["academy", "masterclasses", "mentor"] as const;

/**
 * Mobile bottom tab bar. Hidden on lg+.
 * Sits above the page content with safe-area padding.
 */
export function MobileTabs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash ?? "" });
  const activeSection = useActiveSection(SECTION_IDS);
  const onHashNav = useSmoothHashNav();
  const navigate = useNavigate();
  // When the user prefers reduced motion, snap active-state visuals
  // (color, gold underline slide) to their final value instead of
  // easing across 500ms / a spring.
  const reduceMotion = useReducedMotion();
  const colorDur = reduceMotion ? "duration-0" : "duration-500";
  const navCtx = useMemo(
    () => ({ pathname, hash: hash ? `#${hash.replace(/^#/, "")}` : "", activeSection }),
    [pathname, hash, activeSection],
  );

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-obsidian/85 backdrop-blur-2xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end">
        {TABS.map((t) => {
          const isActive = isNavActive(t.href, navCtx);
          const Icon = t.icon;

          const inner = (
            <span
              className={cn(
                "relative flex flex-col items-center gap-1.5 py-3 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors",
                colorDur,
                t.primary
                  ? "text-obsidian"
                  : isActive
                    ? "text-gold"
                    : "text-platinum/60 hover:text-ivory",
              )}
            >
              {t.primary ? (
                <span className="flex h-12 w-12 -translate-y-4 items-center justify-center rounded-full bg-gradient-to-br from-champagne via-gold to-gold-soft shadow-[0_10px_30px_-8px_rgba(200,164,93,0.6)] transition-transform group-active:scale-95">
                  <Icon className="h-5 w-5" />
                </span>
              ) : (
                <Icon
                  className={cn(
                    "h-5 w-5 transition-colors",
                    colorDur,
                    isActive && "text-gold",
                  )}
                />
              )}
              <span className={cn(t.primary && "-mt-2 text-gold")}>{t.label}</span>
              {isActive && !t.primary ? (
                <motion.span
                  layoutId="mobile-tab-active"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 350, damping: 32 }
                  }
                  className="absolute -top-px left-1/2 h-px w-8 -translate-x-1/2 bg-gold"
                />
              ) : null}
            </span>
          );

          const linkClasses =
            "group flex-1 outline-none focus-visible:bg-white/5 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-gold";


          if (t.href.startsWith("#")) {
            return (
              <li key={t.label} className="flex">
                <a
                  href={t.href}
                  aria-label={t.label}
                  aria-current={isActive ? "page" : undefined}
                  className={linkClasses}
                  onClick={(e) => onHashNav(t.href, e)}
                >
                  {inner}
                </a>
              </li>
            );
          }

          // Use a router-driven <a> instead of TanStack's <Link>. TanStack
          // Link unconditionally spreads STATIC_ACTIVE_PROPS on any route
          // match, which would force aria-current="page" on the Home tab
          // while a section is also active. Owning the anchor lets our
          // isNavActive result be the sole source of truth for ARIA state.
          return (
            <li key={t.label} className="flex">
              <a
                href={t.href}
                aria-label={t.label}
                aria-current={isActive ? "page" : undefined}
                className={linkClasses}
                onClick={(e) => {
                  if (
                    e.defaultPrevented ||
                    e.button !== 0 ||
                    e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    e.altKey
                  ) {
                    return;
                  }
                  e.preventDefault();
                  void navigate({ to: t.href });
                }}
              >
                {inner}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

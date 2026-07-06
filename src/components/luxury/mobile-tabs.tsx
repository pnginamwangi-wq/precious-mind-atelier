import { Compass, GraduationCap, Home, Library, Sparkles } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "Home", href: "/", icon: Home, exact: true },
  { label: "Institutes", href: "/institutes", icon: Compass },
  { label: "Mentor", href: "#mentor", icon: Sparkles, primary: true },
  { label: "Classes", href: "#masterclasses", icon: GraduationCap },
  { label: "Library", href: "#library", icon: Library },
];

/**
 * Mobile bottom tab bar. Hidden on lg+.
 * Sits above the page content with safe-area padding.
 */
export function MobileTabs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav
      aria-label="Mobile navigation"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-obsidian/85 backdrop-blur-2xl lg:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 items-end">
        {TABS.map((t) => {
          const isActive = t.exact ? pathname === t.href : false;
          const Icon = t.icon;

          const inner = (
            <span
              className={cn(
                "relative flex flex-col items-center gap-1.5 py-3 text-[9px] font-medium uppercase tracking-[0.2em] transition-colors",
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
                <Icon className={cn("h-5 w-5", isActive && "text-gold")} />
              )}
              <span className={cn(t.primary && "-mt-2 text-gold")}>{t.label}</span>
              {isActive && !t.primary ? (
                <span className="absolute -top-px left-1/2 h-px w-8 -translate-x-1/2 bg-gold" />
              ) : null}
            </span>
          );

          if (t.href.startsWith("#")) {
            return (
              <li key={t.label} className="flex">
                <a
                  href={t.href}
                  aria-label={t.label}
                  className="group flex-1 outline-none focus-visible:bg-white/5"
                >
                  {inner}
                </a>
              </li>
            );
          }

          return (
            <li key={t.label} className="flex">
              <Link
                to={t.href}
                aria-label={t.label}
                aria-current={isActive ? "page" : undefined}
                className="group flex-1 outline-none focus-visible:bg-white/5"
              >
                {inner}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

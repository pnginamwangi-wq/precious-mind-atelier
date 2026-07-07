import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";
import { Container, Eyebrow, GoldMark } from "@/components/luxury";
import { CookieSettingsLink } from "@/components/luxury/cookie-notice";

import { isNavActive, useActiveSection } from "@/hooks/use-active-nav";
import { useSmoothHashNav } from "@/hooks/use-smooth-hash-nav";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string; internal?: boolean };

const COLS: { title: string; items: FooterLink[] }[] = [
  {
    title: "Academy",
    items: [
      { label: "Institutes", href: "/institutes", internal: true },
      { label: "Masterclasses", href: "#masterclasses" },
      { label: "AI Mentor", href: "#mentor" },
    ],
  },
  {
    title: "Institution",
    items: [
      { label: "Governance", href: "/governance", internal: true },
      { label: "Privacy", href: "/privacy", internal: true },
      { label: "Terms", href: "/terms", internal: true },
    ],
  },
];

const SECTION_IDS = ["academy", "masterclasses", "mentor"] as const;

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash ?? "" });
  const activeSection = useActiveSection(SECTION_IDS);
  const onHashNav = useSmoothHashNav();
  // Snap footer link color + underline when reduced motion is on.
  const reduceMotion = useReducedMotion();
  const motionDur = reduceMotion ? "duration-0" : "duration-500";
  const navCtx = useMemo(
    () => ({ pathname, hash: hash ? `#${hash.replace(/^#/, "")}` : "", activeSection }),
    [pathname, hash, activeSection],
  );

  return (
    <footer className="border-t border-white/5 bg-obsidian pb-24 pt-24 md:pb-10">
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <GoldMark />
              <span className="font-display text-lg text-ivory">
                The Precious Intelligence Academy
              </span>
            </div>
            <p className="mt-8 max-w-md font-display text-3xl leading-tight text-ivory/90 md:text-4xl">
              Master the <em className="gold-gradient-text not-italic">Extraordinary</em>.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-10 md:col-span-7 md:grid-cols-2"
          >
            {COLS.map((col) => (
              <div key={col.title}>
                <Eyebrow>{col.title}</Eyebrow>
                <ul className="mt-6 space-y-3">
                  {col.items.map((item) => {
                    const active = isNavActive(item.href, navCtx);
                    const linkClasses = cn(
                      "group relative inline-flex rounded-sm text-[13px] font-light outline-none transition-colors hover:text-ivory focus-visible:text-ivory focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian",
                      motionDur,
                      active ? "text-gold" : "text-platinum/70",
                    );
                    const underline = (
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px bg-gold transition-all ease-out group-hover:w-full group-focus-visible:w-full",
                          motionDur,
                          active ? "w-full" : "w-0",
                        )}
                      />
                    );
                    const ariaCurrent = active ? ("page" as const) : undefined;
                    return (
                      <li key={item.label}>
                        {item.internal ? (
                          <Link
                            to={item.href}
                            className={linkClasses}
                            aria-current={ariaCurrent}
                          >
                            {item.label}
                            {underline}
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            className={linkClasses}
                            aria-current={ariaCurrent}
                            onClick={(e) => onHashNav(item.href, e)}
                          >
                            {item.label}
                            {underline}
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-16 border-t border-white/5 pt-6">
          <p className="text-[11.5px] font-light leading-relaxed text-platinum/60">
            Educational content only. Not financial, investment, gemological, or legal advice.{" "}
            <Link
              to="/governance"
              hash="disclosures"
              className="text-platinum/80 underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
            >
              Read our disclosures
            </Link>
            .
          </p>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <Eyebrow muted>© MMXXVI · The Precious Intelligence Academy</Eyebrow>
          <div className="flex items-center gap-6">
            <CookieSettingsLink />
            <Eyebrow muted>Crafted with precision</Eyebrow>
          </div>
        </div>

      </Container>
    </footer>
  );
}

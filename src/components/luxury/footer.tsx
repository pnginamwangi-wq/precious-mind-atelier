import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useMemo } from "react";
import { Container, Eyebrow, GoldMark } from "@/components/luxury";
import { isNavActive, useActiveSection } from "@/hooks/use-active-nav";
import { cn } from "@/lib/utils";

type FooterLink = { label: string; href: string; internal?: boolean };

const COLS: { title: string; items: FooterLink[] }[] = [
  {
    title: "Academy",
    items: [
      { label: "Institutes", href: "/institutes", internal: true },
      { label: "Masterclasses", href: "#masterclasses" },
      { label: "Certifications", href: "#certifications" },
      { label: "AI Mentor", href: "#mentor" },
    ],
  },
  {
    title: "Library",
    items: [
      { label: "Journal", href: "#journal" },
      { label: "Product Library", href: "#library" },
      { label: "Glossary", href: "#glossary" },
      { label: "Downloads", href: "#downloads" },
    ],
  },
  {
    title: "Institution",
    items: [
      { label: "About", href: "#about" },
      { label: "Faculty", href: "#faculty" },
      { label: "Careers", href: "#careers" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

const SOCIAL = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "YouTube", href: "#", Icon: Youtube },
];

const SECTION_IDS = ["academy", "masterclasses", "mentor", "library", "journal"] as const;

export function Footer() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash ?? "" });
  const activeSection = useActiveSection(SECTION_IDS);
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

            <div className="mt-10 flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center border border-white/10 text-platinum/70 outline-none transition-colors hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-10 md:col-span-7 md:grid-cols-3"
          >
            {COLS.map((col) => (
              <div key={col.title}>
                <Eyebrow>{col.title}</Eyebrow>
                <ul className="mt-6 space-y-3">
                  {col.items.map((item) => {
                    const active = isNavActive(item.href, navCtx);
                    const linkClasses = cn(
                      "group relative inline-flex rounded-sm text-[13px] font-light outline-none transition-colors duration-500 hover:text-ivory focus-visible:text-ivory focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian",
                      active ? "text-gold" : "text-platinum/70",
                    );
                    const underline = (
                      <span
                        className={cn(
                          "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-500 ease-out group-hover:w-full group-focus-visible:w-full",
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

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <Eyebrow muted>© MMXXVI · The Precious Intelligence Academy</Eyebrow>
          <Eyebrow muted>Crafted with precision</Eyebrow>
        </div>
      </Container>
    </footer>
  );
}

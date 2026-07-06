import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, User, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Eyebrow, GoldMark, LuxButton, luxury } from "@/components/luxury";
import { useAuth } from "@/hooks/use-auth";
import { isNavActive, useActiveSection } from "@/hooks/use-active-nav";
import { cn } from "@/lib/utils";


const NAV: { label: string; href: string; internal?: boolean }[] = [
  { label: "Academy", href: "#academy" },
  { label: "Institutes", href: "/institutes", internal: true },
  { label: "Masterclasses", href: "#masterclasses" },
  { label: "AI Mentor", href: "#mentor" },
  { label: "Library", href: "#library" },
  { label: "Journal", href: "#journal" },
];

const SECTION_IDS = ["academy", "masterclasses", "mentor", "library", "journal"] as const;


export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hash = useRouterState({ select: (s) => s.location.hash ?? "" });
  const activeSection = useActiveSection(SECTION_IDS);
  const navCtx = useMemo(
    () => ({ pathname, hash: hash ? `#${hash.replace(/^#/, "")}` : "", activeSection }),
    [pathname, hash, activeSection],
  );




  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-500",
        scrolled
          ? "border-white/5 bg-obsidian/80 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div
        className={cn(
          "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-6 transition-all duration-500 md:px-10",
          luxury.container,
          scrolled ? "py-4" : "py-6",
          "lg:flex lg:justify-between",
        )}
      >
        <Link
          to="/"
          aria-label="The Precious Intelligence Academy, home"
          className="flex min-w-0 items-center gap-3 rounded-sm outline-none focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
        >
          <GoldMark />
          <div className="flex min-w-0 flex-col leading-none">
            <span className="truncate font-display text-[14px] tracking-wide text-ivory sm:text-[15px]">
              The Precious Intelligence Academy
            </span>
            <Eyebrow className="mt-1 hidden sm:inline-block">Est. MMXXVI</Eyebrow>
          </div>
        </Link>

        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 lg:flex"
        >
          {NAV.map((item) => {
            const classes =
              "group relative rounded-sm text-[13px] font-light tracking-wide text-platinum/80 outline-none transition-colors hover:text-ivory focus-visible:text-ivory focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian";
            const underline = (
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full group-focus-visible:w-full" />
            );
            return item.internal ? (
              <Link key={item.label} to={item.href} className={classes}>
                {item.label}
                {underline}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className={classes}>
                {item.label}
                {underline}
              </a>
            );
          })}

        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            {user ? (
              <Link to="/profile" aria-label="Your profile">
                <LuxButton variant="outline" size="sm" icon={<User className="h-3.5 w-3.5" />}>
                  Profile
                </LuxButton>
              </Link>
            ) : (
              <Link to="/auth" aria-label="Sign in to the Academy">
                <LuxButton variant="outline" size="sm">
                  Sign in
                </LuxButton>
              </Link>
            )}
          </div>


          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 text-ivory outline-none transition-colors hover:border-gold/60 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold lg:hidden"
              >
                <Menu className="h-4 w-4" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-full border-l border-white/10 bg-obsidian p-0 text-ivory sm:max-w-sm [&>button]:hidden"
            >
              <div className="flex h-full flex-col">
                <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
                  <div className="flex items-center gap-3">
                    <GoldMark />
                    <Eyebrow>Menu</Eyebrow>
                  </div>
                  <button
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                    className="flex h-11 w-11 items-center justify-center border border-white/10 text-ivory transition-colors hover:border-gold/60 hover:text-gold focus-visible:ring-1 focus-visible:ring-gold"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-6 py-10">
                  <ul className="space-y-2">
                    {NAV.map((item, i) => (
                      <motion.li
                        key={item.label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + i * 0.05, duration: 0.5, ease: luxury.ease }}
                      >
                        {item.internal ? (
                          <Link
                            to={item.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-baseline justify-between border-b border-white/5 py-4 outline-none focus-visible:text-gold"
                          >
                            <span className="font-display text-3xl text-ivory transition-colors group-hover:text-gold">
                              {item.label}
                            </span>
                            <span className="font-numeric text-[10px] tracking-[0.28em] text-platinum/40">
                              0{i + 1}
                            </span>
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className="group flex items-baseline justify-between border-b border-white/5 py-4 outline-none focus-visible:text-gold"
                          >
                            <span className="font-display text-3xl text-ivory transition-colors group-hover:text-gold">
                              {item.label}
                            </span>
                            <span className="font-numeric text-[10px] tracking-[0.28em] text-platinum/40">
                              0{i + 1}
                            </span>
                          </a>
                        )}

                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-10">
                    <Link to={user ? "/profile" : "/auth"} onClick={() => setOpen(false)}>
                      <LuxButton className="w-full">
                        {user ? "Your profile" : "Sign in or create account"}
                      </LuxButton>
                    </Link>
                  </div>

                </nav>

                <div className="border-t border-white/5 px-6 py-5">
                  <Eyebrow muted>© MMXXVI · Master the Extraordinary</Eyebrow>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <AnimatePresence>
        {scrolled ? (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.8, ease: luxury.ease }}
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-transparent via-gold/60 to-transparent"
          />
        ) : null}
      </AnimatePresence>
    </header>
  );
}

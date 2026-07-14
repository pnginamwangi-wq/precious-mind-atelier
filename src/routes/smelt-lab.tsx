import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { MINT, MediaOverlay } from "@/components/luxury";

const wingSchema = z.enum(["classic", "immersive"]).catch("classic");
const searchSchema = z.object({ wing: wingSchema.optional() });

export const Route = createFileRoute("/smelt-lab")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "The Smelt Lab, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "An interactive precious metals laboratory. Compose a gold alloy, take it to 1,064 degrees, cast a bar and read the assay. Classic 2D bench or immersive 3D foundry.",
      },
      { property: "og:title", content: "The Smelt Lab, Precious Intelligence Academy" },
      {
        property: "og:description",
        content: "Compose alloys, cast bars, read the assay. Now with an immersive 3D foundry wing.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/smelt-lab" }],
  }),
  component: SmeltLabPage,
});

type Wing = "classic" | "immersive";

const WINGS: {
  id: Wing;
  label: string;
  sub: string;
  src: string;
  title: string;
  description: string;
}[] = [
  {
    id: "classic",
    label: "Classic Bench",
    sub: "Alloy, melt, cast, assay",
    src: "/smelt-lab.html",
    title: "The Smelt Lab, Classic Bench",
    description: "Compose an alloy, melt at 1,064 degrees, cast a bar and read the assay.",
  },
  {
    id: "immersive",
    label: "Immersive Foundry",
    sub: "3D crucible and pour",
    src: "/smelt-lab-3d.html",
    title: "The Smelt Lab, Immersive 3D Foundry",
    description: "A three-dimensional foundry: crucible, pour, mould and assay in real space.",
  },
];

const FOCUS_KEY = "smelt-lab:last-focus";

function SmeltLabPage() {
  const { wing } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const current: Wing = wing ?? "classic";
  const active = WINGS.find((w) => w.id === current) ?? WINGS[0];

  const tabRefs = useRef<Record<Wing, HTMLButtonElement | null>>({ classic: null, immersive: null });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const prev = useRef<Wing>(current);
  const [announcement, setAnnouncement] = useState("");

  const setWing = useCallback(
    (next: Wing) => {
      if (next === current) return;
      void navigate({ search: { wing: next }, replace: true });
    },
    [current, navigate],
  );

  // Announce wing change + focus iframe.
  useEffect(() => {
    if (prev.current === current) return;
    prev.current = current;
    setAnnouncement(`Loaded ${active.label}. ${active.description}`);
    const frame = iframeRef.current;
    if (!frame) return;
    const focus = () => {
      try {
        frame.focus({ preventScroll: true });
      } catch {
        frame.focus();
      }
    };
    if (frame.contentDocument?.readyState === "complete") focus();
    else frame.addEventListener("load", focus, { once: true });
  }, [current, active.label, active.description]);

  // Focus restoration: restore focus target from prior visit, save on unmount.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.sessionStorage.getItem(FOCUS_KEY);
    if (saved === "iframe") {
      iframeRef.current?.focus({ preventScroll: true });
    } else if (saved === "tab") {
      tabRefs.current[current]?.focus({ preventScroll: true });
    }
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t === iframeRef.current) window.sessionStorage.setItem(FOCUS_KEY, "iframe");
      else if (t.getAttribute("role") === "tab") window.sessionStorage.setItem(FOCUS_KEY, "tab");
    };
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const onTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const i = WINGS.findIndex((w) => w.id === current);
    let n = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") n = (i + 1) % WINGS.length;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") n = (i - 1 + WINGS.length) % WINGS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = WINGS.length - 1;
    else return;
    e.preventDefault();
    const next = WINGS[n].id;
    tabRefs.current[next]?.focus();
    setWing(next);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-obsidian">
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        data-testid="smelt-lab-live"
      >
        {announcement}
      </div>
      <a
        href="#smelt-lab-frame"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-[11px] focus:uppercase focus:tracking-[0.24em] focus:text-obsidian"
      >
        Skip to interactive
      </a>
      <div className="relative flex items-center justify-between gap-3 overflow-hidden border-b border-white/10 bg-obsidian/80 px-4 py-3 backdrop-blur-md">
        <MediaOverlay
          poster={MINT.coiningPress.poster}
          mobile={MINT.coiningPress.mobile}
          alt=""
          loading="lazy"
          scrim="scrim-card"
        />
        <Link
          to="/"
          aria-label="Return to the Academy home page"
          className="inline-flex items-center gap-2 border border-white/15 bg-obsidian/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-ivory transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
          Academy
        </Link>
        <div role="tablist" aria-label="Smelt Lab wings" className="flex items-center gap-1">
          {WINGS.map((w) => {
            const activeWing = w.id === current;
            return (
              <button
                key={w.id}
                ref={(el) => {
                  tabRefs.current[w.id] = el;
                }}
                type="button"
                role="tab"
                id={`smelt-tab-${w.id}`}
                aria-selected={activeWing}
                aria-controls="smelt-lab-frame"
                tabIndex={activeWing ? 0 : -1}
                onClick={() => setWing(w.id)}
                onKeyDown={onTabKeyDown}
                className={cn(
                  "px-3 py-1.5 text-left text-[11px] uppercase tracking-[0.24em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
                  activeWing
                    ? "border border-gold/60 text-gold"
                    : "border border-white/10 text-ivory/70 hover:border-white/25 hover:text-ivory",
                )}
              >
                <span className="block">{w.label}</span>
                <span className="mt-0.5 block text-[9px] tracking-[0.18em] text-platinum/60 normal-case">
                  {w.sub}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <iframe
        ref={iframeRef}
        key={active.id}
        id="smelt-lab-frame"
        src={active.src}
        title={active.title}
        aria-label={`${active.title}. ${active.description}`}
        role="tabpanel"
        aria-labelledby={`smelt-tab-${active.id}`}
        tabIndex={0}
        className="h-full w-full flex-1 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-pointer-lock"
        referrerPolicy="same-origin"
        loading="eager"
      />
    </div>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { z } from "zod";

import { cn } from "@/lib/utils";

const wingSchema = z.enum(["study", "bench", "levels"]).catch("study");

const searchSchema = z.object({
  wing: wingSchema.optional(),
});

export const Route = createFileRoute("/loupe-room")({
  validateSearch: (search) => searchSchema.parse(search),
  head: () => ({
    meta: [
      { title: "The Loupe Room, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Train your eye at the Academy's Loupe Room. Eight guided gemstone examination pathways, plus the Examination Bench where you read hallmarks, identify stones and detect suspicious pieces under a jeweller's loupe.",
      },
      { property: "og:title", content: "The Loupe Room, Precious Intelligence Academy" },
      {
        property: "og:description",
        content:
          "Guided gemstone examination pathways and an interactive examination bench for hallmarks and stones.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/loupe-room" }],
  }),
  component: LoupeRoomPage,
});

type Wing = "study" | "bench" | "levels";

const WINGS: {
  id: Wing;
  label: string;
  sub: string;
  src: string;
  title: string;
  description: string;
}[] = [
  {
    id: "study",
    label: "Study Pathways",
    sub: "Eight guided examinations",
    src: "/loupe-room.html",
    title: "The Loupe Room, Study Pathways",
    description:
      "Interactive study wing with eight guided gemstone examination pathways under the jeweller's loupe.",
  },
  {
    id: "bench",
    label: "Examination Bench",
    sub: "Read the piece under the loupe",
    src: "/loupe-room-training.html",
    title: "The Loupe Room, Examination Bench",
    description:
      "Training bench where you read hallmarks, identify stones and detect suspicious pieces.",
  },
  {
    id: "levels",
    label: "Level Training",
    sub: "Progressive mastery ladder",
    src: "/loupe-room-levels.html",
    title: "The Loupe Room, Level Training",
    description:
      "Progressive levels ladder: earn your loupe, unlock harder examinations and prove your eye.",
  },
];

function LoupeRoomPage() {
  const { wing } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const current: Wing = wing ?? "study";
  const active = WINGS.find((w) => w.id === current) ?? WINGS[0];

  const tabRefs = useRef<Record<Wing, HTMLButtonElement | null>>({
    study: null,
    bench: null,
  });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const previousWing = useRef<Wing>(current);

  const setWing = useCallback(
    (next: Wing) => {
      if (next === current) return;
      void navigate({
        search: { wing: next },
        replace: true,
      });
    },
    [current, navigate],
  );

  // Move focus into the newly mounted iframe when the wing changes,
  // so keyboard users land inside the interactive without an extra Tab.
  useEffect(() => {
    if (previousWing.current === current) return;
    previousWing.current = current;
    const frame = iframeRef.current;
    if (!frame) return;
    const focus = () => {
      try {
        frame.focus({ preventScroll: true });
      } catch {
        frame.focus();
      }
    };
    if (frame.contentDocument?.readyState === "complete") {
      focus();
    } else {
      frame.addEventListener("load", focus, { once: true });
    }
  }, [current]);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = WINGS.findIndex((w) => w.id === current);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % WINGS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + WINGS.length) % WINGS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = WINGS.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const nextWing = WINGS[nextIndex].id;
    tabRefs.current[nextWing]?.focus();
    setWing(nextWing);
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-obsidian">
      <a
        href="#loupe-room-frame"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-gold focus:px-3 focus:py-2 focus:text-[11px] focus:uppercase focus:tracking-[0.24em] focus:text-obsidian"
      >
        Skip to interactive
      </a>
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-obsidian/80 px-4 py-3 backdrop-blur-md">
        <Link
          to="/"
          aria-label="Return to the Academy home page"
          className="inline-flex items-center gap-2 border border-white/15 bg-obsidian/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-ivory transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
          Academy
        </Link>
        <div
          role="tablist"
          aria-label="Loupe Room wings"
          className="flex items-center gap-1"
        >
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
                id={`loupe-tab-${w.id}`}
                aria-selected={activeWing}
                aria-controls="loupe-room-frame"
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
        id="loupe-room-frame"
        src={active.src}
        title={active.title}
        aria-label={`${active.title}. ${active.description}`}
        role="tabpanel"
        aria-labelledby={`loupe-tab-${active.id}`}
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

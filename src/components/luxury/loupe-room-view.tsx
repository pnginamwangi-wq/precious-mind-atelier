import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";

import { cn } from "@/lib/utils";
import { DIAMOND_THEATRE, MediaOverlay } from "./media-overlay";

export type LoupeWing = "study" | "bench" | "hallmark-karat-lab";

export const LOUPE_WINGS: {
  id: LoupeWing;
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
    id: "hallmark-karat-lab",
    label: "Hallmark & Karat Lab",
    sub: "Read the mark, identify the metal",
    src: "/loupe-room-hallmark-karat-lab.html",
    title: "The Loupe Room, The Hallmark & Karat Lab",
    description:
      "Train your eye to recognise hallmarks, karat standards, metal fineness, gemstones and common jewellery issues through interactive visual challenges.",
  },
];

export function LoupeRoomView({
  wing,
  onWingChange,
}: {
  wing: LoupeWing;
  onWingChange: (next: LoupeWing) => void;
}) {
  const active = LOUPE_WINGS.find((w) => w.id === wing) ?? LOUPE_WINGS[0];

  const tabRefs = useRef<Record<LoupeWing, HTMLButtonElement | null>>({
    study: null,
    bench: null,
    "hallmark-karat-lab": null,
  });
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const previousWing = useRef<LoupeWing>(wing);

  const setWing = useCallback(
    (next: LoupeWing) => {
      if (next === wing) return;
      onWingChange(next);
    },
    [wing, onWingChange],
  );

  useEffect(() => {
    if (previousWing.current === wing) return;
    previousWing.current = wing;
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
  }, [wing]);

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const currentIndex = LOUPE_WINGS.findIndex((w) => w.id === wing);
    let nextIndex = currentIndex;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (currentIndex + 1) % LOUPE_WINGS.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (currentIndex - 1 + LOUPE_WINGS.length) % LOUPE_WINGS.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = LOUPE_WINGS.length - 1;
    } else {
      return;
    }
    event.preventDefault();
    const nextWing = LOUPE_WINGS[nextIndex].id;
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
      <div className="relative flex items-center justify-between gap-3 overflow-hidden border-b border-white/10 bg-obsidian/80 px-4 py-3 backdrop-blur-md">
        <MediaOverlay
          poster={DIAMOND_THEATRE.examinationStage.poster}
          mobile={DIAMOND_THEATRE.examinationStage.mobile}
          alt=""
          loading="lazy"
          scrim="scrim-card"
          className="-z-0"
        />
        <Link
          to="/"
          aria-label="Return to the Academy home page"
          className="inline-flex items-center gap-2 border border-white/15 bg-obsidian/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-ivory transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <ArrowLeft aria-hidden className="h-3.5 w-3.5" />
          Academy
        </Link>
        <div role="tablist" aria-label="Loupe Room wings" className="flex items-center gap-1">
          {LOUPE_WINGS.map((w) => {
            const activeWing = w.id === wing;
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
                data-testid={`loupe-tab-${w.id}`}
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
        data-testid="loupe-room-frame"
        data-wing={active.id}
        className="h-full w-full flex-1 border-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold"
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-downloads allow-pointer-lock"
        referrerPolicy="same-origin"
        loading="eager"
      />
    </div>
  );
}

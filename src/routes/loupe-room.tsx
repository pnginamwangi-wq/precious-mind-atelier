import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

import { cn } from "@/lib/utils";

export const Route = createFileRoute("/loupe-room")({
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

type Wing = "study" | "bench";

const WINGS: { id: Wing; label: string; sub: string; src: string; title: string }[] = [
  {
    id: "study",
    label: "Study Pathways",
    sub: "Eight guided examinations",
    src: "/loupe-room.html",
    title: "The Loupe Room, Study Pathways",
  },
  {
    id: "bench",
    label: "Examination Bench",
    sub: "Read the piece under the loupe",
    src: "/loupe-room-training.html",
    title: "The Loupe Room, Examination Bench",
  },
];

function LoupeRoomPage() {
  const [wing, setWing] = useState<Wing>("study");
  const active = WINGS.find((w) => w.id === wing) ?? WINGS[0];

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-obsidian">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-obsidian/80 px-4 py-3 backdrop-blur-md">
        <Link
          to="/"
          aria-label="Return to the Academy"
          className="inline-flex items-center gap-2 border border-white/15 bg-obsidian/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.28em] text-ivory transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Academy
        </Link>
        <nav aria-label="Loupe Room wings" className="flex items-center gap-1">
          {WINGS.map((w) => {
            const activeWing = w.id === wing;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setWing(w.id)}
                aria-pressed={activeWing}
                className={cn(
                  "px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold",
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
        </nav>
      </div>
      <iframe
        key={active.id}
        src={active.src}
        title={active.title}
        className="h-full w-full flex-1 border-0"
        allow="fullscreen"
      />
    </div>
  );
}

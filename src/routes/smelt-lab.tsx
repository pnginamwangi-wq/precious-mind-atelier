import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/smelt-lab")({
  head: () => ({
    meta: [
      { title: "The Smelt Lab, Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "An interactive precious metals laboratory. Compose a gold alloy, take it to 1,064 degrees, cast your own bar and read the assay like a professional.",
      },
      { property: "og:title", content: "The Smelt Lab, Precious Intelligence Academy" },
      {
        property: "og:description",
        content:
          "Compose a gold alloy, take it to 1,064 degrees, cast your own bar and read the assay like a professional.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/smelt-lab" }],
  }),
  component: SmeltLabPage,
});

function SmeltLabPage() {
  return (
    <div className="fixed inset-0 z-40 bg-obsidian">
      <Link
        to="/"
        aria-label="Return to the Academy"
        className="fixed left-4 top-4 z-50 inline-flex items-center gap-2 border border-white/15 bg-obsidian/70 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-ivory backdrop-blur-md transition-colors hover:border-gold/60 hover:text-gold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Academy
      </Link>
      <iframe
        src="/smelt-lab.html"
        title="The Smelt Lab"
        className="h-full w-full border-0"
        allow="fullscreen"
      />
    </div>
  );
}

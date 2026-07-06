import { createFileRoute } from "@tanstack/react-router";

import heroOpal from "@/assets/hero-opal.jpg";
import heroGold from "@/assets/hero-gold.jpg";
import heroDiamond from "@/assets/hero-diamond.jpg";

import {
  Aside,
  Caption,
  ChapterMark,
  Figure,
  PullQuote,
  Vignette,
} from "@/components/luxury/editorial";

/**
 * Visual regression harness.
 *
 * Renders every editorial block in isolation on a stable, motion-free
 * canvas so Playwright can snapshot each block across breakpoints
 * without page chrome, header, or animated sections interfering.
 *
 * Not linked from navigation. Reached only by tests at
 * /visual/editorial-blocks.
 */
export const Route = createFileRoute("/visual/editorial-blocks")({
  component: EditorialBlocksHarness,
  head: () => ({
    meta: [
      { title: "Editorial blocks visual harness" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function Slot({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section
      data-testid={id}
      id={id}
      className="border-b border-ivory/5 bg-obsidian px-6 py-16 md:px-12"
    >
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

function EditorialBlocksHarness() {
  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <Slot id="block-caption">
        <Caption
          index="01"
          title="The Empress Opal"
          origin="Coober Pedy, 1932"
          note="A single stone, held for three generations, catalogued only once."
          href="#"
          cta="Study the object"
        />
      </Slot>

      <Slot id="block-figure">
        <Figure
          src={heroOpal}
          alt="Opal study"
          aspect="wide"
          caption="Plate I. Study of the Empress in raking light."
        />
      </Slot>

      <Slot id="block-vignette">
        <Vignette
          index="02"
          image={heroGold}
          alt="Gold landscape"
          title="Untitled, in Yellow Gold"
          origin="Geneva atelier, 1968"
          note="Hand chased across four seasons by a single master."
          href="#"
          cta="Read the chapter"
        />
      </Slot>

      <Slot id="block-vignette-reverse">
        <Vignette
          index="03"
          image={heroDiamond}
          alt="Diamond study"
          title="The Argent Solitaire"
          origin="Antwerp, 1911"
          reverse
          note="Cut against the grain, the way the century turned."
        />
      </Slot>

      <Slot id="block-pullquote">
        <PullQuote
          quote="To hold an object is to inherit the silence it kept."
          attribution="M. Aubert"
          role="Curator, Salle des Objets"
          align="center"
        />
      </Slot>

      <Slot id="block-chaptermark">
        <ChapterMark
          index="IV"
          eyebrow="Chapter"
          title="An Inventory of Quiet Things"
        />
      </Slot>

      <Slot id="block-aside">
        <Aside eyebrow="A note from the archive">
          Provenance for this piece was reconstructed from three ledgers, a
          telegram, and one handwritten card, dated 1948.
        </Aside>
      </Slot>
    </main>
  );
}

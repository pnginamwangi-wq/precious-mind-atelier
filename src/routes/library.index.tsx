import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import { Container, Eyebrow, Section, SectionHeader, luxury } from "@/components/luxury";
import { LIBRARY } from "@/data/library";

export const Route = createFileRoute("/library/")({
  head: () => ({
    meta: [
      { title: "The Library, The Precious Intelligence Academy" },
      {
        name: "description",
        content: "Reference pages for the objects that recur across the Academy's curriculum: bars, coins, stones, and timepieces.",
      },
      { property: "og:title", content: "The Library, The Precious Intelligence Academy" },
      { property: "og:description", content: "Reference pages for the objects at the centre of the trade." },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/library" }],
  }),
  component: LibraryIndex,
});

function LibraryIndex() {
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="The Library"
            title="Reference pages for the objects"
            intro="The pieces that recur across the Academy's curriculum, each with the specifications, value factors, care notes, and sales guidance a professional needs at hand."
          />

          <Container className="mt-16">
            <ul className="grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-3">
              {LIBRARY.map((it, i) => (
                <li key={it.slug} className="bg-obsidian">
                  <Link to="/library/$slug" params={{ slug: it.slug }} className="group block p-8">
                    <div className="flex items-center gap-3">
                      <span className="font-numeric text-[11px] tracking-[0.28em] text-gold">N° {String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px w-8 bg-gold/50" />
                    </div>
                    <h2 className="mt-6 font-display text-2xl leading-tight text-ivory group-hover:text-gold md:text-3xl">{it.name}</h2>
                    <p className={`mt-3 line-clamp-4 ${luxury.bodyMuted}`}>{it.dek}</p>
                    <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-gold">
                      Open reference
                      <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  GEM_MUSEUM,
  MediaOverlay,
  Section,
  SectionHeader,
  luxury,
} from "@/components/luxury";
import { GLOSSARY } from "@/data/glossary";
import { PATHWAYS } from "@/data/pathways";
import { COMPARISONS } from "@/data/comparisons";
import { BookOpen, Compass, Flame, GitCompare, Search } from "lucide-react";

export const Route = createFileRoute("/knowledge/")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub, The Precious Intelligence Academy" },
      {
        name: "description",
        content: "A glossary, curated learning pathways, and comparison guides across the eight Institutes.",
      },
      { property: "og:title", content: "Knowledge Hub, The Precious Intelligence Academy" },
      {
        property: "og:description",
        content: "One place to consult the vocabulary, sequences, and comparisons that recur across the Academy.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/knowledge" }],
  }),
  component: KnowledgeIndex,
});

function KnowledgeIndex() {
  const cards = [
    {
      to: "/knowledge/glossary",
      icon: BookOpen,
      title: "Glossary",
      dek: `${GLOSSARY.length} definitions across metals, coins, gems, jewellery, horology, and applied AI.`,
    },
    {
      to: "/knowledge/pathways",
      icon: Compass,
      title: "Learning Pathways",
      dek: `${PATHWAYS.length} curated sequences that read together as short courses across the Institutes.`,
    },
    {
      to: "/knowledge/compare",
      icon: GitCompare,
      title: "Comparisons",
      dek: `${COMPARISONS.length} side by side guides for pairs the trade frequently confuses.`,
    },
    {
      to: "/knowledge/search",
      icon: Search,
      title: "Search",
      dek: "Look across chapters, articles, glossary terms, and library objects in one place.",
    },
    {
      to: "/smelt-lab",
      icon: Flame,
      title: "The Smelt Lab",
      dek: "A cinematic interactive that teaches karats by letting you mix and cast your own gold alloy.",
    },
  ] as const;

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="relative overflow-hidden pt-40">
          <MediaOverlay
            poster={GEM_MUSEUM.vitrineGallery.poster}
            mobile={GEM_MUSEUM.vitrineGallery.mobile}
            alt=""
            loading="lazy"
            scrim="scrim-card"
          />
          <Container className="relative z-10">
            <SectionHeader
              as="h1"
              eyebrow="Knowledge Hub"
              title="Consult the shared vocabulary"
              intro="A single place to look up terms, follow curated sequences across the Institutes, or compare products the trade often conflates."
            />
          </Container>


          <Container className="mt-16">
            <ul className="grid gap-px bg-white/5 md:grid-cols-2">
              {cards.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.title} className="bg-obsidian">
                    <Link to={c.to} className="group block p-10">
                      <div className="flex items-center gap-4 text-gold">
                        <Icon className="h-5 w-5" />
                        <Eyebrow>{c.title}</Eyebrow>
                      </div>
                      <h2 className="mt-6 font-display text-2xl leading-tight text-ivory group-hover:text-gold md:text-3xl">
                        {c.title}
                      </h2>
                      <p className={`mt-3 ${luxury.bodyMuted}`}>{c.dek}</p>
                      <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-gold">
                        Open
                        <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

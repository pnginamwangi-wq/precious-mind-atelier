import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import { Container, Eyebrow, Section, SectionHeader, luxury } from "@/components/luxury";
import { Search } from "lucide-react";
import { ARTICLES, categoryLabel } from "@/data/journal";
import { GLOSSARY } from "@/data/glossary";
import { LIBRARY } from "@/data/library";
import { INSTITUTES } from "@/data/institutes";

type Hit =
  | { kind: "article"; slug: string; title: string; blurb: string; label: string }
  | { kind: "glossary"; term: string; blurb: string; label: string }
  | { kind: "library"; slug: string; title: string; blurb: string; label: string }
  | { kind: "chapter"; institute: string; chapter: string; title: string; blurb: string; label: string };

export const Route = createFileRoute("/knowledge/search")({
  head: () => ({
    meta: [
      { title: "Search, Knowledge Hub" },
      { name: "description", content: "Search across chapters, articles, glossary terms, and library entries." },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [query, setQuery] = useState("");

  const results: Hit[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q || q.length < 2) return [];
    const hits: Hit[] = [];
    for (const a of ARTICLES) {
      if (a.title.toLowerCase().includes(q) || a.dek.toLowerCase().includes(q) || a.tags.some((t) => t.toLowerCase().includes(q))) {
        hits.push({ kind: "article", slug: a.slug, title: a.title, blurb: a.dek, label: `Journal · ${categoryLabel(a.category)}` });
      }
    }
    for (const g of GLOSSARY) {
      if (g.term.toLowerCase().includes(q) || g.definition.toLowerCase().includes(q)) {
        hits.push({ kind: "glossary", term: g.term, blurb: g.definition, label: `Glossary · ${g.category}` });
      }
    }
    for (const l of LIBRARY) {
      if (l.name.toLowerCase().includes(q) || l.dek.toLowerCase().includes(q)) {
        hits.push({ kind: "library", slug: l.slug, title: l.name, blurb: l.dek, label: "Library" });
      }
    }
    for (const it of INSTITUTES) {
      for (const m of it.curriculum) {
        if (m.title.toLowerCase().includes(q) || m.summary.toLowerCase().includes(q)) {
          hits.push({
            kind: "chapter",
            institute: it.slug,
            chapter: m.chapter.toLowerCase(),
            title: `${m.chapter}. ${m.title}`,
            blurb: m.summary,
            label: `Institute of ${it.name}`,
          });
        }
      }
    }
    return hits.slice(0, 80);
  }, [query]);

  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="Knowledge Hub · Search"
            title="Find it in one place"
            intro="A single search across chapters, journal articles, glossary terms, and library entries."
          />

          <Container className="mt-14">
            <div className="relative mx-auto max-w-2xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50" />
              <label htmlFor="hub-search" className="sr-only">Search the Knowledge Hub</label>
              <input
                id="hub-search"
                type="search"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try “hallmark”, “tourbillon”, “opal”, “Good Delivery”…"
                className="w-full border border-white/10 bg-charcoal/40 py-4 pl-11 pr-4 text-lg font-light text-ivory placeholder:text-platinum/40 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
          </Container>

          <Container className="mt-16">
            {query.trim().length < 2 ? (
              <p className={`mx-auto max-w-xl text-center ${luxury.bodyMuted}`}>Type at least two characters to search.</p>
            ) : results.length === 0 ? (
              <div className="mx-auto max-w-xl border border-white/10 bg-charcoal/40 p-10 text-center">
                <Eyebrow>No matches</Eyebrow>
                <p className={`mt-4 ${luxury.bodyMuted}`}>Try a broader term, or browse the Glossary or Pathways.</p>
              </div>
            ) : (
              <>
                <Eyebrow>{results.length} result{results.length === 1 ? "" : "s"}</Eyebrow>
                <ul className="mt-6 divide-y divide-white/5 border-y border-white/5">
                  {results.map((r, i) => (
                    <li key={i}>
                      <ResultRow hit={r} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

function ResultRow({ hit }: { hit: Hit }) {
  const common = "group flex flex-col gap-2 py-6";
  const title = "font-display text-xl leading-tight text-ivory group-hover:text-gold md:text-2xl";
  const body = "text-[13px] font-light leading-relaxed text-platinum/70";
  if (hit.kind === "article") {
    return (
      <Link to="/journal/$slug" params={{ slug: hit.slug }} className={common}>
        <Eyebrow>{hit.label}</Eyebrow>
        <h3 className={title}>{hit.title}</h3>
        <p className={body}>{hit.blurb}</p>
      </Link>
    );
  }
  if (hit.kind === "library") {
    return (
      <Link to="/library/$slug" params={{ slug: hit.slug }} className={common}>
        <Eyebrow>{hit.label}</Eyebrow>
        <h3 className={title}>{hit.title}</h3>
        <p className={body}>{hit.blurb}</p>
      </Link>
    );
  }
  if (hit.kind === "chapter") {
    return (
      <Link
        to="/institutes/$slug/chapters/$chapter"
        params={{ slug: hit.institute, chapter: hit.chapter }}
        className={common}
      >
        <Eyebrow>{hit.label}</Eyebrow>
        <h3 className={title}>{hit.title}</h3>
        <p className={body}>{hit.blurb}</p>
      </Link>
    );
  }
  return (
    <Link to="/knowledge/glossary" className={common}>
      <Eyebrow>{hit.label}</Eyebrow>
      <h3 className={title}>{hit.term}</h3>
      <p className={body}>{hit.blurb}</p>
    </Link>
  );
}

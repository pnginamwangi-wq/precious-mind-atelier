import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import { Container, Eyebrow, Section, SectionHeader, luxury } from "@/components/luxury";
import { GLOSSARY } from "@/data/glossary";
import { Search } from "lucide-react";

export const Route = createFileRoute("/knowledge/glossary")({
  head: () => ({
    meta: [
      { title: "Glossary, Knowledge Hub, The Precious Intelligence Academy" },
      { name: "description", content: "Definitions of the terminology that recurs across the eight Institutes." },
    ],
  }),
  component: GlossaryPage,
});

function GlossaryPage() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<string>("All");

  const categories = useMemo(() => {
    const set = new Set<string>();
    GLOSSARY.forEach((e) => set.add(e.category));
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GLOSSARY.filter((e) => {
      if (cat !== "All" && e.category !== cat) return false;
      if (!q) return true;
      return e.term.toLowerCase().includes(q) || e.definition.toLowerCase().includes(q);
    }).sort((a, b) => a.term.localeCompare(b.term));
  }, [query, cat]);

  const groups = useMemo(() => {
    const map = new Map<string, typeof GLOSSARY>();
    for (const e of filtered) {
      const letter = e.term.charAt(0).toUpperCase();
      const existing = map.get(letter) ?? [];
      existing.push(e);
      map.set(letter, existing);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="Knowledge Hub · Glossary"
            title="The vocabulary of the trade"
            intro="Definitions of terms that recur across the eight Institutes. Search or filter by discipline."
          />

          <Container className="mt-14">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50" />
                <label htmlFor="glossary-search" className="sr-only">Search glossary</label>
                <input
                  id="glossary-search"
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search terms and definitions"
                  className="w-full border border-white/10 bg-charcoal/40 py-3 pl-11 pr-4 font-light text-ivory placeholder:text-platinum/40 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
                />
              </div>
              <label className="sr-only" htmlFor="glossary-cat">Filter category</label>
              <select
                id="glossary-cat"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                className="border border-white/10 bg-charcoal/40 px-4 py-3 font-light text-ivory outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              >
                {categories.map((c) => (
                  <option key={c} value={c} className="bg-obsidian">{c}</option>
                ))}
              </select>
            </div>
          </Container>

          <Container className="mt-16">
            {groups.length === 0 ? (
              <div className="border border-white/10 bg-charcoal/40 p-10 text-center">
                <Eyebrow>No matches</Eyebrow>
                <p className={`mt-4 ${luxury.bodyMuted}`}>Try a different search term or reset the category filter.</p>
              </div>
            ) : (
              <div className="space-y-16">
                {groups.map(([letter, entries]) => (
                  <section key={letter}>
                    <div className="flex items-baseline gap-6">
                      <h2 className="font-display text-5xl text-gold">{letter}</h2>
                      <span className="h-px flex-1 bg-white/10" />
                    </div>
                    <dl className="mt-8 grid gap-px bg-white/5 md:grid-cols-2">
                      {entries.map((e) => (
                        <div key={e.term} className="bg-obsidian p-6 md:p-8">
                          <div className="flex flex-wrap items-baseline justify-between gap-3">
                            <dt className="font-display text-xl text-ivory">{e.term}</dt>
                            <Eyebrow>{e.category}</Eyebrow>
                          </div>
                          <dd className={`mt-3 ${luxury.bodyMuted}`}>{e.definition}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

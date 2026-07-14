import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ARTICLES, JOURNAL_CATEGORIES, featuredArticle, editorsPicks, categoryLabel } from "@/data/journal";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  Hairline,
  LEGENDS,
  MediaOverlay,
  NewsletterSignup,
  Section,
  SectionHeader,
  luxury,
} from "@/components/luxury";
import { Search } from "lucide-react";

export const Route = createFileRoute("/journal/")({
  head: () => ({
    meta: [
      { title: "The Journal, The Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "A weekly editorial from The Academy Desk on precious metals, gemstones, jewellery, horology, luxury retail, and applied intelligence.",
      },
      { property: "og:title", content: "The Journal, The Precious Intelligence Academy" },
      {
        property: "og:description",
        content: "Weekly editorial writing on the disciplines that define the extraordinary.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/journal" },
    ],
    links: [{ rel: "canonical", href: "/journal" }],
  }),
  component: JournalIndex,
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function JournalIndex() {
  const featured = featuredArticle();
  const picks = editorsPicks().filter((a) => a.slug !== featured.slug);
  const latest = ARTICLES.filter((a) => a.slug !== featured.slug);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.dek.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q)),
    );
  }, [query]);

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="The Journal"
            title="Weekly, from The Academy Desk"
            intro="Editorial writing on the disciplines that recur across the Academy. Craft, provenance, history, and the small practices that separate a professional from a beginner."
          />

          {/* Search */}
          <Container className="mt-14">
            <div className="relative mx-auto max-w-xl">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/50" />
              <label htmlFor="journal-search" className="sr-only">Search The Journal</label>
              <input
                id="journal-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles, tags, subjects"
                className="w-full border border-white/10 bg-charcoal/40 py-3 pl-11 pr-4 font-light text-ivory placeholder:text-platinum/40 outline-none focus:border-gold focus:ring-1 focus:ring-gold"
              />
            </div>
          </Container>

          {filtered ? (
            <Container className="mt-16">
              <Eyebrow>{filtered.length} result{filtered.length === 1 ? "" : "s"}</Eyebrow>
              <ul className="mt-8 grid gap-px bg-white/5 md:grid-cols-2">
                {filtered.map((a) => (
                  <li key={a.slug} className="bg-obsidian">
                    <Link to="/journal/$slug" params={{ slug: a.slug }} className="group block p-8">
                      <Eyebrow>{categoryLabel(a.category)} · {a.readingMinutes} min</Eyebrow>
                      <h2 className="mt-4 font-display text-2xl leading-tight text-ivory group-hover:text-gold md:text-3xl">{a.title}</h2>
                      <p className={`mt-3 ${luxury.bodyMuted}`}>{a.dek}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          ) : (
            <>
              {/* Featured */}
              <Container className="mt-20">
                <Link
                  to="/journal/$slug"
                  params={{ slug: featured.slug }}
                  className="group block border border-white/10 bg-charcoal/40 p-8 transition-colors hover:border-gold/40 md:p-14"
                >
                  <Eyebrow>Featured · {categoryLabel(featured.category)}</Eyebrow>
                  <h2 className="mt-6 max-w-3xl font-display text-4xl leading-tight text-ivory group-hover:text-gold md:text-6xl">
                    {featured.title}
                  </h2>
                  <p className={`mt-6 max-w-2xl ${luxury.bodyMuted}`}>{featured.dek}</p>
                  <div className="mt-10 flex items-center gap-4">
                    <Hairline className="w-16" />
                    <Eyebrow muted>The Academy Desk · {formatDate(featured.publishedAt)} · {featured.readingMinutes} min read</Eyebrow>
                  </div>
                </Link>
              </Container>

              {/* Editor's picks */}
              {picks.length > 0 ? (
                <Container className="mt-24">
                  <Eyebrow>Editor's picks</Eyebrow>
                  <ul className="mt-8 grid gap-px bg-white/5 md:grid-cols-3">
                    {picks.slice(0, 3).map((a) => (
                      <li key={a.slug} className="bg-obsidian">
                        <Link to="/journal/$slug" params={{ slug: a.slug }} className="group block p-8">
                          <Eyebrow>{categoryLabel(a.category)}</Eyebrow>
                          <h3 className="mt-4 font-display text-xl leading-tight text-ivory group-hover:text-gold md:text-2xl">{a.title}</h3>
                          <p className={`mt-3 line-clamp-3 ${luxury.bodyMuted}`}>{a.dek}</p>
                          <p className="mt-4 text-[11px] tracking-[0.24em] text-platinum/50">{a.readingMinutes} MIN</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Container>
              ) : null}

              {/* Latest */}
              <Container className="mt-24">
                <Eyebrow>Latest</Eyebrow>
                <ul className="mt-8 divide-y divide-white/5 border-y border-white/5">
                  {latest.map((a) => (
                    <li key={a.slug}>
                      <Link to="/journal/$slug" params={{ slug: a.slug }} className="group grid gap-6 py-8 md:grid-cols-12">
                        <div className="md:col-span-3">
                          <Eyebrow>{categoryLabel(a.category)}</Eyebrow>
                          <p className="mt-2 text-[11px] tracking-[0.2em] text-platinum/50">{formatDate(a.publishedAt)}</p>
                        </div>
                        <div className="md:col-span-9">
                          <h3 className="font-display text-2xl leading-tight text-ivory group-hover:text-gold md:text-3xl">{a.title}</h3>
                          <p className={`mt-3 max-w-2xl ${luxury.bodyMuted}`}>{a.dek}</p>
                          <p className="mt-3 text-[11px] tracking-[0.24em] text-platinum/50">{a.readingMinutes} MIN READ</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Container>

              {/* Categories */}
              <Container className="mt-24">
                <Eyebrow>Browse by category</Eyebrow>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {JOURNAL_CATEGORIES.map((c) => (
                    <li key={c.slug}>
                      <Link
                        to="/journal/category/$category"
                        params={{ category: c.slug }}
                        className="inline-flex border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-platinum/80 transition-colors hover:border-gold/40 hover:text-gold"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Container>
            </>
          )}

          {/* Newsletter */}
          <Container className="mt-24">
            <NewsletterSignup source="journal-index" />
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

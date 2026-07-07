import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ARTICLES, JOURNAL_CATEGORIES, articlesByCategory, categoryLabel, type JournalCategorySlug } from "@/data/journal";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import { Container, Eyebrow, Section, SectionHeader, luxury } from "@/components/luxury";

export const Route = createFileRoute("/journal/category/$category")({
  loader: ({ params }) => {
    const cat = JOURNAL_CATEGORIES.find((c) => c.slug === params.category);
    if (!cat) throw notFound();
    return { category: cat.slug as JournalCategorySlug };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) {
      return { meta: [{ title: "Category not found, The Journal" }, { name: "robots", content: "noindex" }] };
    }
    const label = categoryLabel(loaderData.category);
    const path = `/journal/category/${params.category}`;
    return {
      meta: [
        { title: `${label}, The Journal` },
        { name: "description", content: `Editorial writing from The Academy Desk on ${label}.` },
        { property: "og:title", content: `${label}, The Journal` },
        { property: "og:description", content: `Editorial writing from The Academy Desk on ${label}.` },
        { property: "og:url", content: path },
      ],
      links: [{ rel: "canonical", href: path }],
    };
  },
  notFoundComponent: () => <NotFound />,
  errorComponent: () => <NotFound />,
  component: CategoryPage,
});

function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader as="h1" eyebrow="The Journal" title="Category not found" intro="We could not find that category." />
          <Container className="mt-8">
            <Link to="/journal" className="text-gold underline">Back to The Journal</Link>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const label = categoryLabel(category);
  const articles = articlesByCategory(category);
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="Category"
            title={label}
            intro={`Articles from The Academy Desk filed under ${label}.`}
          />
          <Container className="mt-16">
            {articles.length === 0 ? (
              <div className="border border-white/10 bg-charcoal/40 p-10 text-center">
                <Eyebrow>Empty for now</Eyebrow>
                <p className={`mt-4 ${luxury.bodyMuted}`}>
                  No articles have been filed under this category yet. Return to The Journal for the full list.
                </p>
                <div className="mt-6">
                  <Link to="/journal" className="text-gold underline">Back to The Journal</Link>
                </div>
              </div>
            ) : (
              <ul className="grid gap-px bg-white/5 md:grid-cols-2">
                {articles.map((a) => (
                  <li key={a.slug} className="bg-obsidian">
                    <Link to="/journal/$slug" params={{ slug: a.slug }} className="group block p-8">
                      <Eyebrow>{new Date(a.publishedAt).toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })} · {a.readingMinutes} min</Eyebrow>
                      <h2 className="mt-4 font-display text-2xl leading-tight text-ivory group-hover:text-gold md:text-3xl">{a.title}</h2>
                      <p className={`mt-3 ${luxury.bodyMuted}`}>{a.dek}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-16">
              <Link to="/journal" className="text-[11px] uppercase tracking-[0.28em] text-gold hover:underline">← All of The Journal</Link>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

// Suppress unused warning for ARTICLES import (used indirectly via helpers)
void ARTICLES;

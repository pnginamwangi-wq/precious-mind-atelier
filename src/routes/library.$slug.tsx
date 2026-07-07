import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  Hairline,
  KnowledgeCheck,
  Section,
  SectionHeader,
  luxury,
} from "@/components/luxury";
import { getLibraryItem, type LibraryItem } from "@/data/library";
import { INSTITUTES } from "@/data/institutes";
import { getArticle } from "@/data/journal";

export const Route = createFileRoute("/library/$slug")({
  loader: ({ params }) => {
    const item = getLibraryItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Reference not found, The Library" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const it = loaderData.item;
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: it.name,
      description: it.dek,
      author: { "@type": "Organization", name: "The Academy Desk" },
      publisher: {
        "@type": "Organization",
        name: "The Precious Intelligence Academy",
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": `/library/${it.slug}` },
      about: it.eyebrow,
    };
    const faqLd = it.faqs.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: it.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;
    return {
      meta: [
        { title: `${it.name}, The Library` },
        { name: "description", content: it.dek },
        { property: "og:title", content: `${it.name}, The Library` },
        { property: "og:description", content: it.dek },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/library/${it.slug}` },
      ],
      links: [{ rel: "canonical", href: `/library/${it.slug}` }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(articleLd) },
        ...(faqLd
          ? [{ type: "application/ld+json", children: JSON.stringify(faqLd) }]
          : []),
      ],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: NotFound,
  component: LibraryItemPage,
});

function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader as="h1" eyebrow="The Library" title="Reference not found" intro="We could not find that library entry." />
          <Container className="mt-8">
            <Link to="/library" className="text-gold underline">Back to The Library</Link>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

function LibraryItemPage() {
  const { item } = Route.useLoaderData() as { item: LibraryItem };
  const institutes = INSTITUTES.filter((i) => item.relatedInstitutes.includes(i.slug));
  const articles = (item.relatedArticles ?? [])
    .map((s: string) => getArticle(s))
    .filter((a): a is NonNullable<ReturnType<typeof getArticle>> => Boolean(a));

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        {/* Hero */}
        <Section className="pt-40">
          <Container>
            <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.24em] text-platinum/60">
              <Link to="/library" className="hover:text-gold">The Library</Link>
            </nav>
            <Eyebrow className="mt-8">{item.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-display text-5xl leading-[1.05] text-ivory md:text-7xl">{item.name}</h1>
            <p className={`mt-8 max-w-2xl ${luxury.bodyMuted} text-lg`}>{item.dek}</p>
            <Hairline className="mt-12 w-16" />
          </Container>
        </Section>

        {/* Overview */}
        <Section>
          <Container>
            <div className="grid gap-16 md:grid-cols-12">
              <div className="md:col-span-4">
                <Eyebrow>Overview</Eyebrow>
              </div>
              <div className="space-y-6 md:col-span-8">
                {item.overview.map((p, i) => (
                  <p key={i} className="text-[15px] font-light leading-[1.85] text-platinum/85">{p}</p>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* History */}
        <Section>
          <Container>
            <div className="grid gap-16 md:grid-cols-12">
              <div className="md:col-span-4">
                <Eyebrow>History</Eyebrow>
              </div>
              <div className="space-y-6 md:col-span-8">
                {item.history.map((p, i) => (
                  <p key={i} className="text-[15px] font-light leading-[1.85] text-platinum/85">{p}</p>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Specifications */}
        <Section>
          <Container>
            <Eyebrow>Specifications</Eyebrow>
            <dl className="mt-8 grid gap-px bg-white/5 md:grid-cols-2">
              {item.specifications.map((s) => (
                <div key={s.label} className="bg-obsidian p-6">
                  <dt className="text-[11px] uppercase tracking-[0.24em] text-platinum/60">{s.label}</dt>
                  <dd className="mt-3 font-display text-lg text-ivory">{s.value}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>

        {/* Value Factors */}
        <Section>
          <Container>
            <Eyebrow>Value factors</Eyebrow>
            <ul className="mt-8 space-y-8">
              {item.valueFactors.map((v) => (
                <li key={v.label} className="grid gap-4 md:grid-cols-12">
                  <div className="md:col-span-3">
                    <h3 className="font-display text-xl text-gold">{v.label}</h3>
                  </div>
                  <p className="md:col-span-9 text-[15px] font-light leading-[1.85] text-platinum/85">{v.text}</p>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* Care */}
        <Section>
          <Container>
            <Eyebrow>Care</Eyebrow>
            <ul className="mt-6 max-w-2xl space-y-3">
              {item.care.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] font-light leading-[1.7] text-platinum/85">
                  <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold/60" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </Container>
        </Section>

        {/* FAQs */}
        <Section>
          <Container>
            <Eyebrow>FAQs</Eyebrow>
            <dl className="mt-8 divide-y divide-white/5 border-y border-white/5">
              {item.faqs.map((f) => (
                <div key={f.question} className="py-8">
                  <dt className="font-display text-xl text-ivory">{f.question}</dt>
                  <dd className={`mt-3 ${luxury.bodyMuted}`}>{f.answer}</dd>
                </div>
              ))}
            </dl>
          </Container>
        </Section>

        {/* Sales Guidance */}
        <Section>
          <Container>
            <div className="border-l-2 border-gold/60 pl-6 md:pl-10">
              <Eyebrow>Sales guidance</Eyebrow>
              <ul className="mt-6 space-y-3">
                {item.salesGuidance.map((s) => (
                  <li key={s} className="flex gap-3 text-[15px] font-light leading-[1.7] text-platinum/85">
                    <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold/60" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </Section>

        {/* Related */}
        {(institutes.length > 0 || articles.length > 0) ? (
          <Section>
            <Container>
              <Eyebrow>Continue in the Academy</Eyebrow>
              <div className="mt-8 grid gap-8 md:grid-cols-2">
                {institutes.length > 0 ? (
                  <div>
                    <h3 className="font-display text-lg text-ivory">Related Institutes</h3>
                    <ul className="mt-4 space-y-2">
                      {institutes.map((it) => (
                        <li key={it.slug}>
                          <Link to="/institutes/$slug" params={{ slug: it.slug }} className="text-ivory hover:text-gold">
                            {it.name} <span aria-hidden>→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {articles.length > 0 ? (
                  <div>
                    <h3 className="font-display text-lg text-ivory">Related articles</h3>
                    <ul className="mt-4 space-y-2">
                      {articles.map((a) => (
                        <li key={a.slug}>
                          <Link to="/journal/$slug" params={{ slug: a.slug }} className="text-ivory hover:text-gold">
                            {a.title} <span aria-hidden>→</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Container>
          </Section>
        ) : null}

        {/* Knowledge Check */}
        <Section>
          <Container>
            <KnowledgeCheck questions={item.knowledgeCheck} />
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArticle, relatedArticles, categoryLabel, type ArticleBlock } from "@/data/journal";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  BookmarkButton,
  Container,
  Eyebrow,
  Hairline,
  NewsletterSignup,
  ReadingProgress,
  Section,
  SectionHeader,
  luxury,
} from "@/components/luxury";

export const Route = createFileRoute("/journal/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found, The Journal" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const a = loaderData.article;
    return {
      meta: [
        { title: `${a.title}, The Journal` },
        { name: "description", content: a.dek },
        { property: "og:title", content: a.title },
        { property: "og:description", content: a.dek },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/journal/${a.slug}` },
        { property: "article:published_time", content: a.publishedAt },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/journal/${a.slug}` }],
    };
  },
  notFoundComponent: NotFound,
  errorComponent: NotFound,
  component: ArticlePage,
});

function NotFound() {
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader as="h1" eyebrow="The Journal" title="Article not found" intro="We could not find that article." />
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

function renderBlock(block: ArticleBlock, i: number) {
  switch (block.kind) {
    case "heading":
      return (
        <h2 key={i} className="mt-14 font-display text-2xl leading-tight text-ivory md:text-3xl">
          {block.text}
        </h2>
      );
    case "paragraph":
      return (
        <p key={i} className="mt-6 text-[15px] font-light leading-[1.85] text-platinum/85 md:text-base">
          {block.text}
        </p>
      );
    case "quote":
      return (
        <blockquote key={i} className="mt-12 border-l-2 border-gold/60 pl-6 font-display text-2xl leading-[1.3] text-ivory md:text-3xl">
          {block.text}
          {block.attribution ? (
            <footer className="mt-4 text-[11px] uppercase tracking-[0.28em] text-gold">{block.attribution}</footer>
          ) : null}
        </blockquote>
      );
    case "list":
      return (
        <ul key={i} className="mt-6 space-y-3 text-[15px] font-light leading-[1.7] text-platinum/85">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3">
              <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
  }
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = relatedArticles(article, 3);
  const date = new Date(article.publishedAt).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <ReadingProgress />
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="pt-40">
          <Container>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="text-[11px] uppercase tracking-[0.24em] text-platinum/60">
              <Link to="/journal" className="hover:text-gold">The Journal</Link>
              <span aria-hidden> · </span>
              <Link
                to="/journal/category/$category"
                params={{ category: article.category }}
                className="hover:text-gold"
              >
                {categoryLabel(article.category)}
              </Link>
            </nav>

            <article className="mx-auto mt-10 max-w-3xl">
              <Eyebrow>{categoryLabel(article.category)}</Eyebrow>
              <h1 className="mt-6 font-display text-4xl leading-[1.1] text-ivory md:text-6xl">{article.title}</h1>
              <p className={`mt-8 ${luxury.bodyMuted} text-lg md:text-xl`}>{article.dek}</p>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                <Hairline className="w-14 shrink-0" />
                <div>
                  <Eyebrow>The Academy Desk</Eyebrow>
                  <p className="mt-1 text-[11px] tracking-[0.22em] text-platinum/60">
                    {date} · {article.readingMinutes} min read
                  </p>
                </div>
                <div className="ml-auto">
                  <BookmarkButton slug={article.slug} />
                </div>
              </div>

              <Hairline className="mt-12" />

              <div className="mt-4">
                {article.body.map((b: ArticleBlock, i: number) => renderBlock(b, i))}
              </div>

              {/* Tags */}
              {article.tags.length > 0 ? (
                <div className="mt-16">
                  <Eyebrow>Filed under</Eyebrow>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {article.tags.map((t: string) => (
                      <li key={t}>
                        <Link
                          to="/journal/tag/$tag"
                          params={{ tag: t }}
                          className="inline-flex border border-white/10 px-3 py-1.5 text-[11px] uppercase tracking-[0.24em] text-platinum/80 transition-colors hover:border-gold/40 hover:text-gold"
                        >
                          #{t}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </article>
          </Container>
        </Section>

        {/* Related */}
        {related.length > 0 ? (
          <Section>
            <Container>
              <Eyebrow>Continue reading</Eyebrow>
              <ul className="mt-8 grid gap-px bg-white/5 md:grid-cols-3">
                {related.map((r) => (
                  <li key={r.slug} className="bg-obsidian">
                    <Link to="/journal/$slug" params={{ slug: r.slug }} className="group block p-8">
                      <Eyebrow>{categoryLabel(r.category)}</Eyebrow>
                      <h3 className="mt-4 font-display text-xl leading-tight text-ivory group-hover:text-gold md:text-2xl">{r.title}</h3>
                      <p className={`mt-3 line-clamp-3 ${luxury.bodyMuted}`}>{r.dek}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        ) : null}

        {/* Related Institutes */}
        {article.relatedInstitutes && article.relatedInstitutes.length > 0 ? (
          <Section>
            <Container>
              <Eyebrow>Related Institutes</Eyebrow>
              <ul className="mt-6 flex flex-wrap gap-3">
                {article.relatedInstitutes.map((slug: string) => (
                  <li key={slug}>
                    <Link
                      to="/institutes/$slug"
                      params={{ slug }}
                      className="inline-flex border border-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-ivory transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      Institute of {slug.replace(/-/g, " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </Container>
          </Section>
        ) : null}

        <Section>
          <Container>
            <NewsletterSignup source={`article-${article.slug}`} />
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

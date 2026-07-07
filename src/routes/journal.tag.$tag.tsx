import { createFileRoute, Link } from "@tanstack/react-router";
import { articlesByTag } from "@/data/journal";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import { Container, Eyebrow, Section, SectionHeader, luxury } from "@/components/luxury";

export const Route = createFileRoute("/journal/tag/$tag")({
  head: ({ params }) => ({
    meta: [
      { title: `Tag: ${params.tag}, The Journal` },
      { name: "description", content: `Journal articles tagged “${params.tag}”.` },
    ],
  }),
  component: TagPage,
});

function TagPage() {
  const { tag } = Route.useParams();
  const articles = articlesByTag(tag);
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader as="h1" eyebrow="Tag" title={`#${tag}`} intro="Articles that share this subject." />
          <Container className="mt-16">
            {articles.length === 0 ? (
              <div className="border border-white/10 bg-charcoal/40 p-10 text-center">
                <Eyebrow>Nothing here yet</Eyebrow>
                <p className={`mt-4 ${luxury.bodyMuted}`}>No article carries this tag. Try another.</p>
                <div className="mt-6">
                  <Link to="/journal" className="text-gold underline">Back to The Journal</Link>
                </div>
              </div>
            ) : (
              <ul className="grid gap-px bg-white/5 md:grid-cols-2">
                {articles.map((a) => (
                  <li key={a.slug} className="bg-obsidian">
                    <Link to="/journal/$slug" params={{ slug: a.slug }} className="group block p-8">
                      <Eyebrow>{a.readingMinutes} min</Eyebrow>
                      <h2 className="mt-4 font-display text-2xl leading-tight text-ivory group-hover:text-gold md:text-3xl">{a.title}</h2>
                      <p className={`mt-3 ${luxury.bodyMuted}`}>{a.dek}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

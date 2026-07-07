import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import { Container, Eyebrow, Hairline, Section, SectionHeader, luxury } from "@/components/luxury";
import { PATHWAYS, type PathwayStep } from "@/data/pathways";

export const Route = createFileRoute("/knowledge/pathways")({
  head: () => ({
    meta: [
      { title: "Learning Pathways, Knowledge Hub" },
      { name: "description", content: "Curated sequences of chapters, articles, and library entries that read together as short courses." },
    ],
  }),
  component: PathwaysPage,
});

function StepLink({ step }: { step: PathwayStep }) {
  if (step.kind === "chapter") {
    return (
      <Link
        to="/institutes/$slug/chapters/$chapter"
        params={{ slug: step.institute, chapter: step.chapter }}
        className="inline-flex items-center gap-2 text-[13px] text-ivory hover:text-gold"
      >
        {step.label} <span aria-hidden>→</span>
      </Link>
    );
  }
  if (step.kind === "article") {
    return (
      <Link to="/journal/$slug" params={{ slug: step.slug }} className="inline-flex items-center gap-2 text-[13px] text-ivory hover:text-gold">
        {step.label} <span aria-hidden>→</span>
      </Link>
    );
  }
  return (
    <Link to="/library/$slug" params={{ slug: step.slug }} className="inline-flex items-center gap-2 text-[13px] text-ivory hover:text-gold">
      {step.label} <span aria-hidden>→</span>
    </Link>
  );
}

function PathwaysPage() {
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="Knowledge Hub · Pathways"
            title="Short courses across the Institutes"
            intro="Each pathway is a curated sequence that draws chapters, articles, and library entries together into one shape."
          />

          <Container className="mt-16 space-y-16">
            {PATHWAYS.map((p) => (
              <article key={p.slug} className="border border-white/10 bg-charcoal/40 p-8 md:p-12">
                <div className="flex flex-wrap items-baseline justify-between gap-4">
                  <div>
                    <Eyebrow>Pathway</Eyebrow>
                    <h2 className="mt-3 font-display text-3xl leading-tight text-ivory md:text-4xl">{p.title}</h2>
                  </div>
                  <Eyebrow muted>{p.minutes} min total</Eyebrow>
                </div>
                <p className={`mt-4 max-w-2xl ${luxury.bodyMuted}`}>{p.dek}</p>
                <Hairline className="mt-10 w-16" />
                <ol className="mt-8 space-y-4">
                  {p.steps.map((s, i) => (
                    <li key={i} className="flex items-baseline gap-4">
                      <span className="font-numeric text-[11px] tracking-[0.24em] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <StepLink step={s} />
                    </li>
                  ))}
                </ol>
              </article>
            ))}
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

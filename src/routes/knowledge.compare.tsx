import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import { Container, Eyebrow, Hairline, Section, SectionHeader, luxury } from "@/components/luxury";
import { COMPARISONS } from "@/data/comparisons";

export const Route = createFileRoute("/knowledge/compare")({
  head: () => ({
    meta: [
      { title: "Comparisons, Knowledge Hub" },
      { name: "description", content: "Side by side guides to pairs the trade frequently confuses." },
      { property: "og:title", content: "Comparisons, Knowledge Hub" },
      { property: "og:description", content: "Side by side guides to pairs the trade frequently confuses." },
      { property: "og:url", content: "/knowledge/compare" },
    ],
    links: [{ rel: "canonical", href: "/knowledge/compare" }],
  }),
  component: ComparePage,
});

function ComparePage() {
  return (
    <>
      <Header />
      <main className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="Knowledge Hub · Comparisons"
            title="Two products, one clear view"
            intro="Side by side guides for pairs the trade often conflates. Read either column top to bottom, then read across."
          />

          <Container className="mt-16 space-y-20">
            {COMPARISONS.map((c) => (
              <article key={c.slug} className="border border-white/10 bg-charcoal/40 p-8 md:p-12">
                <Eyebrow>Comparison</Eyebrow>
                <h2 className="mt-4 font-display text-3xl leading-tight text-ivory md:text-4xl">{c.title}</h2>
                <p className={`mt-4 max-w-3xl ${luxury.bodyMuted}`}>{c.dek}</p>

                <div className="mt-10 grid gap-px bg-white/5 md:grid-cols-2">
                  {[c.left, c.right].map((side) => (
                    <div key={side.name} className="bg-obsidian p-6 md:p-8">
                      <h3 className="font-display text-xl text-ivory">{side.name}</h3>
                      <Hairline className="mt-4 w-10" />
                      <ul className="mt-6 space-y-3 text-[14px] font-light leading-[1.7] text-platinum/85">
                        {side.points.map((pt) => (
                          <li key={pt} className="flex gap-3">
                            <span aria-hidden className="mt-2 h-px w-4 shrink-0 bg-gold/60" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                <div className="mt-8 border-l-2 border-gold/60 pl-5 py-2">
                  <Eyebrow>The bottom line</Eyebrow>
                  <p className={`mt-3 max-w-3xl ${luxury.bodyMuted}`}>{c.bottomLine}</p>
                </div>
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

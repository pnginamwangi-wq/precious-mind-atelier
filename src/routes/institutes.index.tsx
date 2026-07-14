import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  METALS_VAULT,
  MediaOverlay,
  Section,
  SectionHeader,
  fadeUp,
} from "@/components/luxury";
import { INSTITUTES } from "@/data/institutes";

export const Route = createFileRoute("/institutes/")({
  head: () => ({
    meta: [
      { title: "The Institutes, The Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Eight disciplines. One faculty. Precious Metals, Bullion, Numismatics, Gemstones, Jewellery, Horology, Luxury Retail, and Applied Intelligence.",
      },
      { property: "og:title", content: "The Institutes, The Precious Intelligence Academy" },
      {
        property: "og:description",
        content: "Eight self contained programmes, taught by the practitioners who set the standard.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/institutes" },
    ],
    links: [{ rel: "canonical", href: "/institutes" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "The Institutes",
          description:
            "Eight self contained programmes at The Precious Intelligence Academy.",
          url: "/institutes",
          hasPart: INSTITUTES.map((it) => ({
            "@type": "EducationalOrganization",
            name: it.name,
            url: `/institutes/${it.slug}`,
          })),
        }),
      },
    ],
  }),
  component: InstitutesIndex,
});

function InstitutesIndex() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="relative overflow-hidden pt-40">
          <MediaOverlay
            poster={METALS_VAULT.bullionVault.poster}
            mobile={METALS_VAULT.bullionVault.mobile}
            video={METALS_VAULT.bullionVaultLoopVideo}
            alt=""
            loading="lazy"
            fetchPriority="auto"
            scrim="scrim-hero"
          />
          <Container className="relative z-10">
            <SectionHeader
              as="h1"
              eyebrow="The Institutes"
              title="Eight disciplines. One faculty."
              intro="Each Institute is a self contained programme, taught by practitioners of the discipline. Enter the one you are drawn to."
            />
          </Container>
          <div className="relative z-10">


            <Container className="mt-16">

            <div className="grid gap-px bg-white/5 md:grid-cols-2">
              {INSTITUTES.map((it) => (
                <motion.article key={it.slug} variants={fadeUp} className="bg-obsidian">
                  <Link
                    to="/institutes/$slug"
                    params={{ slug: it.slug }}
                    className="group block"
                    aria-label={`Enter the ${it.name} Institute`}
                  >
                    <div className="relative aspect-[16/10] min-h-[220px] overflow-hidden">
                      <MediaOverlay
                        poster={it.hero}
                        alt=""
                        loading="lazy"
                        scrim="scrim-card"
                        className="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                        <div className="flex items-center gap-4">
                          <span className="font-numeric text-[11px] tracking-[0.3em] text-gold">
                            {it.n}
                          </span>
                          <span className="h-px w-10 bg-gold/60" />
                          <Eyebrow>Institute</Eyebrow>
                        </div>
                        <h2 className="mt-4 font-display text-3xl font-semibold leading-tight text-ivory md:text-4xl">
                          {it.name}
                        </h2>
                        <p className="mt-3 text-[13px] uppercase tracking-[0.24em] text-platinum">{it.tag}</p>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-platinum">
                          {it.intro}
                        </p>
                        <div className="mt-6 inline-flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-gold">
                          Enter the Institute
                          <span className="transition-transform duration-500 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
            </Container>
          </div>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

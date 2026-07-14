import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  Section,
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
        {/* Editorial masthead: text only, no busy overlay */}
        <Section className="pt-40 pb-16 md:pt-48 md:pb-24">
          <Container>
            <div className="grid gap-12 md:grid-cols-12">
              <div className="md:col-span-4">
                <Eyebrow>The Institutes</Eyebrow>
                <p className="mt-6 font-numeric text-[11px] tracking-[0.32em] text-gold">
                  I — VIII
                </p>
              </div>
              <div className="md:col-span-8">
                <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ivory md:text-6xl">
                  Eight disciplines.
                  <br />
                  <span className="text-platinum">One faculty.</span>
                </h1>
                <p className="mt-8 max-w-xl text-base leading-relaxed text-platinum md:text-lg">
                  Each Institute is a self contained programme, taught by practitioners of the discipline. Enter the one you are drawn to.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Editorial index: consistent aligned rows */}
        <Section className="pb-32">
          <Container>
            <div className="border-t border-white/10">
              {INSTITUTES.map((it) => (
                <motion.div key={it.slug} variants={fadeUp}>
                  <Link
                    to="/institutes/$slug"
                    params={{ slug: it.slug }}
                    aria-label={`Enter the ${it.name} Institute`}
                    className="group block border-b border-white/10 py-8 transition-colors duration-500 hover:bg-white/[0.02] md:py-10"
                  >
                    <div className="grid items-start gap-6 md:grid-cols-12 md:gap-8">
                      {/* Numeral */}
                      <div className="md:col-span-1">
                        <span className="font-numeric text-xs tracking-[0.3em] text-gold">
                          {it.n}
                        </span>
                      </div>

                      {/* Thumbnail */}
                      <div className="md:col-span-2">
                        <div className="relative aspect-square w-20 overflow-hidden md:w-full">
                          <img
                            src={it.hero}
                            alt=""
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-[1200ms] ease-out group-hover:grayscale-0 group-hover:scale-[1.04]"
                          />
                          <div className="absolute inset-0 bg-obsidian/40 transition-opacity duration-700 group-hover:opacity-0" />
                        </div>
                      </div>

                      {/* Title + tag */}
                      <div className="md:col-span-4">
                        <h2 className="font-display text-2xl font-semibold leading-tight text-ivory transition-colors duration-500 group-hover:text-gold md:text-3xl">
                          {it.name}
                        </h2>
                        <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-platinum/80">
                          {it.tag}
                        </p>
                      </div>

                      {/* Intro */}
                      <div className="md:col-span-4">
                        <p className="text-sm leading-relaxed text-platinum md:text-[15px]">
                          {it.intro}
                        </p>
                      </div>

                      {/* Enter */}
                      <div className="md:col-span-1 md:text-right">
                        <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-gold">
                          <span className="transition-transform duration-500 group-hover:translate-x-1">
                            →
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

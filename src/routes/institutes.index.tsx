import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  Section,
  SectionHeader,
  fadeUp,
  luxury,
} from "@/components/luxury";
import { INSTITUTES } from "@/data/institutes";

export const Route = createFileRoute("/institutes/")({
  head: () => ({
    meta: [
      { title: "The Institutes, The Precious Intelligence Academy" },
      {
        name: "description",
        content:
          "Eight disciplines. One faculty. Explore the Institutes of Precious Metals, Bullion, Numismatics, Gemstones, Jewellery, Horology, Luxury Retail, and Artificial Intelligence.",
      },
      { property: "og:title", content: "The Institutes, The Precious Intelligence Academy" },
      {
        property: "og:description",
        content: "Eight self contained programmes for the world's finest maisons.",
      },
    ],
  }),
  component: InstitutesIndex,
});

function InstitutesIndex() {
  return (
    <>
      <Header />
      <main id="main" className="bg-obsidian text-ivory">
        <Section className="pt-40">
          <SectionHeader
            eyebrow="The Institutes"
            title="Eight disciplines. One faculty."
            intro="Each Institute is a self contained programme, developed with master jewellers, refiners, gemmologists, horologists, and luxury retail directors. Enter the discipline you are drawn to."
          />

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
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={it.hero}
                        alt=""
                        loading="lazy"
                        width={1920}
                        height={1080}
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-8 md:p-10">
                        <div className="flex items-center gap-4">
                          <span className="font-numeric text-[11px] tracking-[0.3em] text-gold">
                            {it.n}
                          </span>
                          <span className="h-px w-10 bg-gold/60" />
                          <Eyebrow>Institute</Eyebrow>
                        </div>
                        <h2 className="mt-4 font-display text-4xl leading-tight text-ivory md:text-5xl">
                          {it.name}
                        </h2>
                        <p className={`mt-3 ${luxury.bodySmall}`}>{it.tag}</p>
                        <p className="mt-5 max-w-xl text-[13px] font-light leading-relaxed text-platinum/70">
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
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

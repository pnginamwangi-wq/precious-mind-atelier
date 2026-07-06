import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";


import heroOpal from "@/assets/hero-opal.jpg";
import heroGold from "@/assets/hero-gold.jpg";
import heroDiamond from "@/assets/hero-diamond.jpg";
import heroWatch from "@/assets/hero-watch.jpg";
import heroPearl from "@/assets/hero-pearl.jpg";

import {
  ArrowLink,
  Container,
  Eyebrow,
  Footer,
  Hairline,
  Header,
  LuxButton,
  MobileTabs,
  Reveal,
  Section,
  SectionHeader,
  fadeUp,
  luxury,
} from "@/components/luxury";

export const Route = createFileRoute("/")({
  component: Home,
});

const INSTITUTES = [
  { slug: "precious-metals", n: "01", name: "Precious Metals", tag: "Gold. Silver. Platinum." },
  { slug: "bullion", n: "02", name: "Bullion", tag: "Bars. Coins. Markets." },
  { slug: "numismatics", n: "03", name: "Numismatics", tag: "Rare and commemorative coinage." },
  { slug: "gemstones", n: "04", name: "Gemstones", tag: "Diamonds. Opals. Coloured stones." },
  { slug: "jewellery", n: "05", name: "Jewellery", tag: "Design. Craft. Provenance." },
  { slug: "horology", n: "06", name: "Horology", tag: "Swiss watchmaking, decoded." },
  { slug: "luxury-retail", n: "07", name: "Luxury Retail", tag: "Clienteling and high value sales." },
  { slug: "artificial-intelligence", n: "08", name: "Artificial Intelligence", tag: "AI for the luxury industry." },
] as const;


const SCROLL_OBJECTS = [
  { src: heroOpal, name: "Black Opal", origin: "Lightning Ridge, Australia" },
  { src: heroGold, name: "Fine Gold, 999.9", origin: "1 kilogram, LBMA cast" },
  { src: heroDiamond, name: "Round Brilliant", origin: "D flawless, 3.02 ct" },
  { src: heroWatch, name: "Tourbillon", origin: "Geneva, mechanical" },
  { src: heroPearl, name: "South Sea Pearl", origin: "Pinctada maxima" },
];

function Home() {
  return (
    <div className="min-h-dvh bg-obsidian text-ivory">
      <Header />
      <main id="main">
        <Hero />
        <Manifesto />
        <ScrollGallery />
        <Institutes />
        <AIMentor />
      </main>
      <Footer />
      <MobileTabs />
    </div>
  );
}


function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-32"
    >
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="relative h-[80vh] w-[80vh] max-h-[720px] max-w-[720px]">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-transparent blur-3xl" />
          <img
            src={heroOpal}
            alt="Black opal, the essence of precious intelligence"
            width={1536}
            height={1536}
            className="float-slow relative h-full w-full object-contain"
          />
        </div>
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,var(--obsidian)_85%)]" />

      <motion.div
        style={{ opacity }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
        }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 text-center md:px-10"
      >
        <motion.div
          variants={fadeUp}
          className="mb-8 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-gold/60" />
          <Eyebrow>The Precious Intelligence Academy</Eyebrow>
          <span className="h-px w-12 bg-gold/60" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          transition={{ duration: 1.4, ease: luxury.ease }}
          className="font-display text-[13vw] leading-[0.95] text-ivory md:text-[112px] lg:text-[136px]"
        >
          Master the
          <br />
          <em className="gold-gradient-text not-italic">Extraordinary</em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className={`mx-auto mt-10 max-w-xl ${luxury.bodyMuted}`}
        >
          An institution for those who work with the world's most precious
          materials. Precious metals, jewellery, gemstones, and the disciplines
          that surround them, studied at the level a serious professional expects.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <LuxButton>Explore the Academy</LuxButton>
          <LuxButton
            variant="ghost"
            icon={
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M0 0L10 5L0 10V0Z" fill="currentColor" />
              </svg>
            }
          >
            Meet the AI Mentor
          </LuxButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto mb-3 h-10 w-px bg-gradient-to-b from-transparent to-gold" />
        <Eyebrow muted>Scroll</Eyebrow>
      </motion.div>
    </section>
  );
}

function Manifesto() {
  return (
    <Section id="academy" bordered tinted>
      <Container narrow>
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <Eyebrow>I. Our Philosophy</Eyebrow>
            <Hairline className="mt-6 w-16" />
          </Reveal>
          <div className="md:col-span-8 space-y-8">
            <Reveal>
              <p className="font-display text-3xl leading-[1.25] text-ivory md:text-[42px] md:leading-[1.2]">
                This isn't another learning platform.
              </p>
            </Reveal>
            <Reveal>
              <p className="font-display text-2xl leading-[1.35] text-ivory/90 md:text-[28px]">
                It is a place for people who believe knowledge is as valuable
                as the products they represent.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted} text-[16px] md:text-[17px]`}>
                Whether it is a gold bar, a rare gemstone, a handcrafted piece
                of jewellery, or an exceptional client experience, mastery
                begins with understanding.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted} text-[16px] md:text-[17px]`}>
                The Precious Intelligence Academy was created for professionals
                who want to deepen their expertise, refine their craft, and
                build the confidence that only knowledge can provide.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted} text-[16px] md:text-[17px]`}>
                We believe luxury is earned through precision, curiosity,
                craftsmanship, and continual learning.
              </p>
            </Reveal>
            <Reveal>
              <p className="font-display text-2xl leading-[1.35] text-ivory md:text-[28px]">
                Because extraordinary service begins with extraordinary
                knowledge.
              </p>
            </Reveal>
            <Reveal>
              <Hairline className="w-16" />
              <p className="mt-8 font-display text-3xl italic text-ivory md:text-4xl">
                Master the <span className="gold-gradient-text not-italic">Extraordinary</span>.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ScrollGallery() {
  return (
    <Section id="masterclasses">
      <Container>
        <SectionHeader
          index="II"
          eyebrow="The Vitrine"
          title="Objects of study."
        />
        <div className="grid gap-16 md:gap-24">
          {SCROLL_OBJECTS.map((obj, i) => (
            <motion.article
              key={obj.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: luxury.ease }}
              className={`grid items-center gap-10 md:grid-cols-12 md:gap-16 ${
                i % 2 ? "md:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="md:col-span-7">
                <div className="relative aspect-square overflow-hidden bg-charcoal">
                  <img
                    src={obj.src}
                    alt={obj.name}
                    loading="lazy"
                    width={1536}
                    height={1536}
                    className="h-full w-full object-cover transition-transform duration-[2s] ease-out hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
                </div>
              </div>
              <div className="md:col-span-5">
                <Eyebrow>N° 0{i + 1}</Eyebrow>
                <h3 className="mt-5 font-display text-4xl leading-tight md:text-5xl">
                  {obj.name}
                </h3>
                <p className={`mt-4 ${luxury.bodySmall}`}>{obj.origin}</p>
                <Hairline className="mt-8 w-24" />
                <div className="mt-8">
                  <ArrowLink>Study the object</ArrowLink>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Institutes() {
  return (
    <Section bordered tinted>
      <Container>
        <SectionHeader
          index="III"
          eyebrow="The Institutes"
          title="Eight disciplines. One faculty."
          intro="Each Institute is a self contained programme, developed with master jewellers, refiners, gemmologists, horologists, and luxury retail directors."
        />
        <div className="grid gap-px bg-white/5 md:grid-cols-2 lg:grid-cols-4">
          {INSTITUTES.map((it) => (
            <Link
              key={it.slug}
              to="/institutes/$slug"
              params={{ slug: it.slug }}
              className="group relative flex flex-col justify-between bg-obsidian p-8 transition-colors duration-500 hover:bg-charcoal md:min-h-[280px] md:p-10"
              aria-label={`Enter the ${it.name} Institute`}
            >
              <div className="flex items-start justify-between">
                <span className="font-numeric text-[11px] tracking-[0.3em] text-gold">{it.n}</span>
                <span className="text-platinum/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold">
                  →
                </span>
              </div>
              <div>
                <h3 className="font-display text-3xl leading-tight text-ivory">{it.name}</h3>
                <p className="mt-3 text-[12px] font-light tracking-wide text-platinum/60">
                  {it.tag}
                </p>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link to="/institutes">
            <LuxButton variant="outline">All eight Institutes</LuxButton>
          </Link>
        </div>

      </Container>
    </Section>
  );
}

function AIMentor() {
  return (
    <Section id="mentor" className="overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <Container>
        <div className="grid gap-16 md:grid-cols-12 md:gap-24">
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>IV. The AI Mentor</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 font-display text-5xl leading-tight md:text-7xl">
                A private tutor, forged in gold.
              </h2>
            </Reveal>
            <Reveal>
              <p className={`mt-8 ${luxury.bodyMuted}`}>
                Identify a gemstone from a photograph. Rehearse a high value sale.
                Compare a proof coin to its bullion counterpart. The Mentor listens,
                explains, and remembers, in every language your clientele speaks.
              </p>
            </Reveal>
            <ul className="mt-10 space-y-4">
              {[
                "Voice conversations, calmly paced",
                "Image and gemstone identification",
                "Luxury sales roleplay simulations",
                "Personal glossary and citations",
              ].map((f) => (
                <motion.li
                  key={f}
                  variants={fadeUp}
                  className="flex items-center gap-4 text-[14px] font-light text-ivory/90"
                >
                  <span className="h-px w-6 bg-gold" />
                  {f}
                </motion.li>
              ))}
            </ul>
          </div>

          <Reveal className="md:col-span-7">
            <div className="relative rounded-sm border border-gold/20 bg-charcoal/60 p-8 backdrop-blur-2xl md:p-10">
              <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="shimmer h-2 w-2 rounded-full bg-gold" />
                    <span className="font-numeric text-[11px] uppercase tracking-[0.28em] text-platinum/80">
                      Mentor · Live
                    </span>
                  </div>
                  <span className="font-numeric text-[10px] uppercase tracking-[0.24em] text-platinum/70">
                    Session 04
                  </span>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <span className="font-numeric text-[10px] uppercase tracking-[0.28em] text-platinum/50">
                      You
                    </span>
                    <p className="mt-2 font-display text-2xl leading-snug text-ivory md:text-3xl">
                      A client is comparing a 1kg cast bar to a minted bar. How
                      do I position the premium?
                    </p>
                  </div>

                  <Hairline />

                  <div>
                    <Eyebrow>Mentor</Eyebrow>
                    <p className="mt-2 text-[15px] font-light leading-relaxed text-platinum/90">
                      Begin with the metal, not the price. A cast bar rewards
                      the investor who values weight and liquidity. A minted bar
                      rewards the collector who values finish, packaging, and
                      provenance. Ask your client which of those two stories
                      they will tell in ten years, then let the premium answer
                      itself.
                    </p>
                  </div>
                </div>

                <div className="mt-10 flex items-center gap-3 border-t border-white/5 pt-6">
                  <div className="flex-1 rounded-sm bg-obsidian/60 px-4 py-3 text-[13px] font-light text-platinum/60">
                    Ask the Mentor anything…
                  </div>
                  <button
                    type="button"
                    aria-label="Send message to Mentor"
                    className="flex h-11 w-11 items-center justify-center bg-gold text-obsidian outline-none transition-colors hover:bg-champagne focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-obsidian"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path
                        d="M1 7H13M13 7L7 1M13 7L7 13"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}


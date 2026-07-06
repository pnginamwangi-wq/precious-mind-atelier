import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import heroOpal from "@/assets/hero-opal.jpg";
import heroGold from "@/assets/hero-gold.jpg";
import heroDiamond from "@/assets/hero-diamond.jpg";
import heroWatch from "@/assets/hero-watch.jpg";

import {
  Container,
  Eyebrow,
  Footer,
  Header,
  MobileTabs,
  Section,
  fadeUp,
  luxury,
} from "@/components/luxury";
import {
  Aside,
  ChapterMark,
  PullQuote,
  Vignette,
} from "@/components/luxury/editorial";

export const Route = createFileRoute("/editorial-example")({
  component: EditorialExample,
});

function EditorialExample() {
  return (
    <div className="min-h-dvh bg-obsidian text-ivory">
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <EditorialHero />
        <ChapterOne />
        <QuoteBreak />
        <ChapterTwo />
        <ContextAside />
        <ClosingChapter />
      </main>
      <Footer />
      <MobileTabs />
    </div>
  );
}

function EditorialHero() {
  return (
    <Section className="relative overflow-hidden">
      <Container narrow>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
          }}
          className="flex flex-col items-center text-center"
        >
          <motion.div variants={fadeUp} className="mb-10 flex items-center gap-4">
            <span className="h-px w-12 bg-gold/60" />
            <Eyebrow>Editorial Sequence</Eyebrow>
            <span className="h-px w-12 bg-gold/60" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 1.4, ease: luxury.ease }}
            className="font-display text-[clamp(48px,10vw,112px)] leading-[0.95] text-ivory lg:text-[136px]"
          >
            The Art of
            <br />
            <em className="gold-gradient-text not-italic">Precious Study</em>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className={`mx-auto mt-10 max-w-2xl ${luxury.bodyMuted}`}
          >
            A composed homepage layout built from the editorial block set: chapter
            marks, object vignettes, cinematic pull quotes, and contextual asides
            arranged in a single, deliberate rhythm.
          </motion.p>
        </motion.div>
      </Container>
    </Section>
  );
}

function ChapterOne() {
  return (
    <Section bordered tinted>
      <Container>
        <div className="mb-20 md:mb-28">
          <ChapterMark
            index="01"
            eyebrow="Origins"
            title="Every extraordinary object has a beginning."
          />
        </div>

        <div className="grid gap-24 md:gap-32">
          <Vignette
            index="01"
            image={heroOpal}
            alt="Black opal from Lightning Ridge, Australia"
            aspect="portrait"
            title="The Black Opal"
            origin="Lightning Ridge, Australia"
            note="A rare play-of-colour stone formed over millions of years in ancient sediment. Precious Intelligence begins with knowing where value is born."
            href="#"
            cta="Study the opal"
          />

          <Vignette
            index="02"
            image={heroGold}
            alt="Fine gold 999.9 one kilogram LBMA cast bar"
            aspect="landscape"
            title="Fine Gold, 999.9"
            origin="1 kilogram, LBMA cast"
            note="Purity, weight, and provenance. Three words that separate commodity from confidence in the precious metals trade."
            href="#"
            cta="Study the bar"
            reverse
          />
        </div>
      </Container>
    </Section>
  );
}

function QuoteBreak() {
  return (
    <Section>
      <Container narrow>
        <PullQuote
          align="center"
          quote="Mastery is not the accumulation of facts. It is the slow education of the eye, the hand, and the judgment."
          attribution="The Precious Intelligence Academy"
          role="Founding principle"
        />
      </Container>
    </Section>
  );
}

function ChapterTwo() {
  return (
    <Section bordered tinted>
      <Container>
        <div className="mb-20 md:mb-28">
          <ChapterMark
            index="02"
            eyebrow="Craft"
            title="Precision made visible."
          />
        </div>

        <div className="grid gap-24 md:gap-32">
          <Vignette
            index="03"
            image={heroDiamond}
            alt="D flawless round brilliant diamond, 3.02 carats"
            aspect="square"
            title="Round Brilliant"
            origin="D flawless, 3.02 ct"
            note="Cut, colour, clarity, carat. The four words every professional must learn to weigh without scales."
            href="#"
            cta="Study the diamond"
          />

          <Vignette
            index="04"
            image={heroWatch}
            alt="Geneva tourbillon mechanical watch"
            aspect="wide"
            title="The Tourbillon"
            origin="Geneva, mechanical"
            note="A complication that defies gravity. In horology, as in luxury, the smallest details carry the largest premiums."
            href="#"
            cta="Study the watch"
            reverse
          />
        </div>
      </Container>
    </Section>
  );
}

function ContextAside() {
  return (
    <Section>
      <Container>
        <div className="grid gap-16 md:grid-cols-12 md:gap-24">
          <div className="md:col-span-7">
            <h2 className="font-display text-3xl leading-tight text-ivory md:text-[42px] lg:text-5xl">
              Editorial blocks are designed to be recomposed.
            </h2>
            <p className={`mt-8 ${luxury.bodyMuted}`}>
              Use them like sentences in a longer argument. A chapter mark opens
              the thought. A vignette gives it evidence. A pull quote lets the
              reader breathe. An aside adds the footnote that sharpens the point.
            </p>
            <p className={`mt-6 ${luxury.bodyMuted}`}>
              The sequence above is one possible grammar. The same blocks can be
              rearranged for a journal entry, a masterclass landing page, or an
              institute profile without losing the visual voice of the Academy.
            </p>
          </div>
          <div className="md:col-span-5">
            <Aside eyebrow="Composition note">
              <p>
                Keep the rhythm varied. Pairing two vignettes of the same
                orientation creates visual fatigue; alternating the image
                placement restores momentum. Reserve centred pull quotes for the
                moments when the narrative changes direction.
              </p>
              <p className="mt-4">
                Asides work best when they answer a question the reader has just
                begun to form, not when they introduce an entirely new subject.
              </p>
            </Aside>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ClosingChapter() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      <Container narrow className="relative">
        <div className="text-center">
          <ChapterMark
            className="justify-center"
            index="03"
            eyebrow="Next"
            title="Continue the sequence."
          />
          <p className={`mx-auto mt-10 max-w-2xl ${luxury.bodyMuted}`}>
            This route is a living template. Copy its sections, swap the images,
            and adjust the chapter marks to match the story your next page needs
            to tell.
          </p>
        </div>
      </Container>
    </Section>
  );
}

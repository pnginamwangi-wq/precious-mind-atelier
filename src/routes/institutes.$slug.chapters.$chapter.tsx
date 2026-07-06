import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  ArrowLink,
  Container,
  Eyebrow,
  Hairline,
  LuxButton,
  Reveal,
  Section,
  SectionHeader,
  SectionNav,
  SectionNavBar,
  fadeUp,
  luxury,
} from "@/components/luxury";
import {
  chapterSlug,
  getChapter,
  type CurriculumModule,
  type Institute,
} from "@/data/institutes";

export const Route = createFileRoute("/institutes/$slug/chapters/$chapter")({
  loader: ({ params }) => {
    const found = getChapter(params.slug, params.chapter);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Chapter not found, The Precious Intelligence Academy" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { institute, module } = loaderData;
    const title = `Chapter ${module.chapter}, ${module.title}, ${institute.name} Institute`;
    return {
      meta: [
        { title },
        { name: "description", content: module.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: module.summary },
        { property: "og:type", content: "article" },
        { property: "og:image", content: institute.hero },
        { property: "twitter:image", content: institute.hero },
      ],
    };
  },
  component: ChapterPage,
  notFoundComponent: ChapterNotFound,
});

function ChapterNotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-obsidian px-6 text-center text-ivory">
        <div>
          <Eyebrow>Chapter unavailable</Eyebrow>
          <h1 className="mt-6 font-display text-4xl">This chapter cannot be found.</h1>
          <p className="mt-4 text-platinum/60">
            It may have been renamed or moved. Return to the Institutes to continue.
          </p>
          <div className="mt-8">
            <Link to="/institutes">
              <LuxButton icon={<ArrowRight className="h-3.5 w-3.5" />}>
                Back to the Institutes
              </LuxButton>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

const CHAPTER_SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "study", label: "Study" },
  { id: "next", label: "Continue" },
] as const;

function ChapterPage() {
  const { institute, module, index } = Route.useLoaderData();
  const total = institute.curriculum.length;
  const prev = institute.curriculum[(index - 1 + total) % total];
  const next = institute.curriculum[(index + 1) % total];

  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <ChapterHero institute={institute} module={module} />
        <SectionNavBar items={CHAPTER_SECTIONS} label="Chapter sections" />
        <div className="relative lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 lg:px-10 xl:gap-16">
          <aside className="hidden lg:block lg:pt-32">
            <SectionNav items={CHAPTER_SECTIONS} label="In this chapter" />
          </aside>
          <div className="min-w-0">
            <ChapterStudy institute={institute} module={module} />
            <ChapterNav institute={institute} prev={prev} next={next} />
          </div>
        </div>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

function ChapterHero({
  institute,
  module,
}: {
  institute: Institute;
  module: CurriculumModule;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-24">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url(${institute.hero})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-obsidian/85 to-obsidian" />
      <Container className="relative">
        <Reveal>
          <Link
            to="/institutes/$slug"
            params={{ slug: institute.slug }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-platinum/60 transition-colors hover:text-gold"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {institute.name} Institute
          </Link>
        </Reveal>
        <Reveal>
          <p className="mt-10 font-numeric text-[12px] tracking-[0.4em] text-gold">
            Chapter {module.chapter}
          </p>
        </Reveal>
        <Reveal>
          <h1 className="mt-6 max-w-4xl font-display text-5xl leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            {module.title}.
          </h1>
        </Reveal>
        <Reveal>
          <p className={`mt-8 max-w-2xl text-lg font-light ${luxury.bodyMuted}`}>
            {module.summary}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}

function ChapterStudy({
  institute,
  module,
}: {
  institute: Institute;
  module: CurriculumModule;
}) {
  return (
    <Section bordered>
      <Container>
        <SectionHeader
          index={module.chapter}
          eyebrow="Inside this chapter"
          title="How the chapter is studied."
          intro="Each chapter unfolds across three registers: a private studio session with the faculty, guided practice with the objects of the discipline, and a written reflection that becomes part of your Academy portfolio."
        />
        <div className="mt-14 grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-7">
            <Reveal>
              <Eyebrow>Studio</Eyebrow>
              <h3 className="mt-4 font-display text-3xl leading-tight md:text-4xl">
                A close encounter, on the bench.
              </h3>
              <p className={`mt-6 max-w-xl ${luxury.bodyMuted}`}>
                {institute.philosophy}
              </p>
              <p className={`mt-6 max-w-xl ${luxury.bodyMuted}`}>
                In {module.title}, this philosophy meets its object of study. You will
                spend the chapter looking, listening, and handling, before you write a
                single word.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-5">
            <Reveal>
              <Eyebrow>What you will practise</Eyebrow>
            </Reveal>
            <ul className="mt-8 space-y-5">
              {institute.outcomes.map((o) => (
                <motion.li
                  key={o}
                  variants={fadeUp}
                  className="flex items-start gap-4 text-[15px] font-light leading-relaxed text-ivory/90"
                >
                  <span className="mt-2.5 h-px w-6 shrink-0 bg-gold" />
                  <span>{o}</span>
                </motion.li>
              ))}
            </ul>
            <Hairline className="my-10" />
            <div className="grid gap-6 sm:grid-cols-2">
              {institute.signature.map((s) => (
                <div key={s.label}>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-platinum/50">
                    {s.label}
                  </p>
                  <p className="mt-2 font-display text-lg text-ivory">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="mt-10">
              <Link
                to="/institutes/$slug"
                params={{ slug: institute.slug }}
                hash="inquiry"
              >
                <LuxButton icon={<ArrowRight className="h-3.5 w-3.5" />}>
                  Request an invitation
                </LuxButton>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function ChapterNav({
  institute,
  prev,
  next,
}: {
  institute: Institute;
  prev: CurriculumModule;
  next: CurriculumModule;
}) {
  return (
    <Section bordered tinted>
      <Container>
        <div className="grid gap-px bg-white/5 md:grid-cols-2">
          <ChapterNavCard
            label="Previous chapter"
            institute={institute}
            module={prev}
            align="left"
          />
          <ChapterNavCard
            label="Next chapter"
            institute={institute}
            module={next}
            align="right"
          />
        </div>
      </Container>
    </Section>
  );
}

function ChapterNavCard({
  label,
  institute,
  module,
  align,
}: {
  label: string;
  institute: Institute;
  module: CurriculumModule;
  align: "left" | "right";
}) {
  return (
    <Link
      to="/institutes/$slug/chapters/$chapter"
      params={{ slug: institute.slug, chapter: chapterSlug(module.chapter) }}
      className={`group flex flex-col justify-between gap-8 bg-obsidian p-10 transition-colors duration-500 hover:bg-charcoal md:min-h-[220px] ${
        align === "right" ? "md:items-end md:text-right" : ""
      }`}
    >
      <Eyebrow>{label}</Eyebrow>
      <div className={align === "right" ? "md:text-right" : ""}>
        <p className="font-numeric text-[11px] tracking-[0.3em] text-gold">
          Chapter {module.chapter}
        </p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-ivory transition-colors group-hover:text-gold md:text-4xl">
          {module.title}
        </h3>
        <div className={`mt-6 ${align === "right" ? "md:inline-flex" : "inline-flex"}`}>
          <ArrowLink>Enter the chapter</ArrowLink>
        </div>
      </div>
    </Link>
  );
}

import { createFileRoute, Link, notFound, Outlet, useChildMatches } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

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
import { cn } from "@/lib/utils";

import { InquiryForm } from "@/components/luxury/inquiry-form";
import { SaveInstituteButton } from "@/components/luxury/save-institute-button";
import { INSTITUTES, chapterSlug, getInstitute, type Institute } from "@/data/institutes";

export const Route = createFileRoute("/institutes/$slug")({
  loader: ({ params }) => {
    const institute = getInstitute(params.slug);
    if (!institute) throw notFound();
    return { institute };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Institute not found, The Precious Intelligence Academy" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { institute } = loaderData;
    const title = `${institute.name}, ${institute.overline}`;
    const description = institute.intro;
    const url = `/institutes/${params.slug}`;
    const imageAlt = `${institute.name}, a chapter of The Precious Intelligence Academy`;
    const keywords = [
      institute.name,
      institute.overline,
      "Precious Intelligence Academy",
      ...institute.curriculum.map((c: { title: string; summary: string }) => c.title),
    ].join(", ");
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "keywords", content: keywords },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: institute.hero },
        { property: "og:image:alt", content: imageAlt },
        { property: "og:site_name", content: "The Precious Intelligence Academy" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: institute.hero },
        { name: "twitter:image:alt", content: imageAlt },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "EducationalOrganization",
            name: institute.name,
            alternateName: institute.overline,
            description,
            url,
            image: institute.hero,
            parentOrganization: {
              "@type": "EducationalOrganization",
              name: "The Precious Intelligence Academy",
            },
            hasCourse: institute.curriculum.map((c: { title: string; summary: string }) => ({
              "@type": "Course",
              name: c.title,
              description: c.summary ?? c.title,
              provider: {
                "@type": "EducationalOrganization",
                name: institute.name,
              },
            })),
          }),
        },
      ],
    };
  },
  component: InstitutePage,
  notFoundComponent: NotFound,
});

function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen items-center justify-center bg-obsidian px-6 text-center text-ivory">
        <div>
          <Eyebrow>Not found</Eyebrow>
          <h1 className="mt-4 font-display text-4xl">This Institute does not exist.</h1>
          <div className="mt-8">
            <LuxButton asChild variant="outline" icon={<ArrowRight className="h-3.5 w-3.5" />}>
              <Link to="/institutes">View all Institutes</Link>
            </LuxButton>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

const INSTITUTE_SECTIONS = [
  { id: "philosophy", label: "Philosophy" },
  { id: "curriculum", label: "Curriculum" },
  { id: "faculty", label: "Practitioners & Outcomes" },
  { id: "inquiry", label: "Admissions" },
] as const;

function InstitutePage() {
  const { institute } = Route.useLoaderData();
  // This route is both a leaf (institute detail) and a parent of the
  // chapters subtree. When a child route is active, defer entirely to it
  // instead of rendering the institute layout underneath.
  const childMatches = useChildMatches();
  if (childMatches.length > 0) return <Outlet />;
  return (

    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <InstituteHero institute={institute} />
        <SectionNavBar items={INSTITUTE_SECTIONS} label={`${institute.name} sections`} />

        <div className="relative lg:grid lg:grid-cols-[220px_1fr] lg:gap-12 lg:px-10 xl:gap-16">
          <aside className="hidden lg:block lg:pt-32">
            <SectionNav
              items={INSTITUTE_SECTIONS}
              label={`In the ${institute.name} Institute`}
            />
          </aside>
          <div className="min-w-0">
            <Philosophy institute={institute} />
            <Curriculum institute={institute} />
            <FacultyOutcomes institute={institute} />
            <Inquiry institute={institute} />
            <NextPrev current={institute} />
          </div>
        </div>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

function usePrefersReducedMotion(): boolean {
  const framer = useReducedMotion();
  const [reduce, setReduce] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduce(mq.matches);
    const handler = () => setReduce(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduce || framer === true;
}

function InstituteHero({ institute }: { institute: Institute }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  // When reduced motion is preferred, freeze all parallax MotionValues so the
  // hero image and content render without transform or opacity animation.
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.05, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 0.15]);

  const parallaxStyle = reduce ? undefined : ({ y, scale } as { y: MotionValue<string>; scale: MotionValue<number> });
  const overlayStyle = reduce ? undefined : ({ opacity } as { opacity: MotionValue<number> });
  const reduceAttr = String(reduce);

  return (
    <section ref={ref} data-testid="institute-hero" data-reduce={reduceAttr} className="relative h-[100svh] min-h-[640px] overflow-hidden">
      <motion.div data-testid="hero-parallax" style={parallaxStyle} className="absolute inset-0">
        <img
          src={institute.hero}
          alt=""
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div aria-hidden className="on-media scrim-hero pointer-events-none absolute inset-0" />

      <motion.div
        data-testid="hero-overlay"
        style={overlayStyle}
        className="relative z-10 flex h-full flex-col justify-end pb-24 md:pb-32"
      >
        <Container>
          <div className="max-w-4xl">
            <Reveal>
              <div className="flex items-center gap-4">
                <span className="font-numeric text-[12px] tracking-[0.32em] text-gold">
                  {institute.n}
                </span>
                <span className="h-px w-14 bg-gold/60" />
                <Eyebrow>{institute.overline}</Eyebrow>
              </div>
            </Reveal>
            <Reveal>
              <h1 className="mt-8 font-display text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-[8.5rem]">
                {institute.name}.
              </h1>
            </Reveal>
            <Reveal>
              <p className={`mt-8 max-w-2xl ${luxury.bodyMuted}`}>{institute.intro}</p>
            </Reveal>
            <Reveal>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <LuxButton asChild icon={<ArrowRight className="h-3.5 w-3.5" />}>
                  <a href="#inquiry">Enrol in this Institute</a>
                </LuxButton>
                <LuxButton asChild variant="ghost">
                  <Link to="/institutes">All eight Institutes</Link>
                </LuxButton>
                {institute.slug === "precious-metals" ? (
                  <LuxButton asChild variant="ghost">
                    <Link to="/smelt-lab">Open the Smelt Lab</Link>
                  </LuxButton>
                ) : null}
                <SaveInstituteButton slug={institute.slug} name={institute.name} />
              </div>
            </Reveal>
          </div>
        </Container>
      </motion.div>
    </section>
  );
}

function Philosophy({ institute }: { institute: Institute }) {
  return (
    <Section id="philosophy" bordered className="scroll-mt-24">
      <Container>
        <div className="grid gap-16 md:grid-cols-12 md:gap-24">
          <div className="md:col-span-4">
            <Reveal>
              <Eyebrow>I. Philosophy</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                Why this discipline, and why now.
              </h2>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal>
              <p className={`text-[17px] font-light leading-[1.7] text-ivory/85 md:text-lg`}>{institute.philosophy}</p>
            </Reveal>
            <Hairline className="mt-10 w-32" />
            <dl className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {institute.signature.map((s) => (
                <motion.div key={s.label} variants={fadeUp} className="space-y-2">
                  <dt>
                    <Eyebrow>{s.label}</Eyebrow>
                  </dt>
                  <dd className="font-display text-2xl text-ivory">{s.value}</dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Curriculum({ institute }: { institute: Institute }) {
  return (
    <Section id="curriculum" bordered tinted className="scroll-mt-24">
      <Container>
        <SectionHeader
          index="II"
          eyebrow="The Curriculum"
          title="Six chapters, one obsession."
          intro="Each chapter is delivered through studio sessions, private mentorship, and hands on encounters with the objects that define the discipline."
        />
        <div className="mt-14 grid gap-px bg-white/5 md:grid-cols-2">
          {institute.curriculum.map((m) => (
            <motion.article
              key={m.chapter}
              variants={fadeUp}
              className="group bg-obsidian transition-colors duration-500 hover:bg-charcoal"
            >
              <Link
                to="/institutes/$slug/chapters/$chapter"
                params={{ slug: institute.slug, chapter: chapterSlug(m.chapter) }}
                className="flex h-full flex-col justify-between p-8 md:min-h-[240px] md:p-10"
                aria-label={`Chapter ${m.chapter}, ${m.title}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-numeric text-[11px] tracking-[0.3em] text-gold">
                    Chapter {m.chapter}
                  </span>
                  <span className="text-platinum/40 transition-all duration-500 group-hover:translate-x-1 group-hover:text-gold">
                    →
                  </span>
                </div>
                <div className="mt-10">
                  <h3 className="font-display text-3xl leading-tight text-ivory transition-colors group-hover:text-gold">
                    {m.title}
                  </h3>
                  <p className={`mt-4 ${luxury.bodySmall}`}>{m.summary}</p>
                  <div className="mt-6">
                    <ArrowLink>Enter the chapter</ArrowLink>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function FacultyOutcomes({ institute }: { institute: Institute }) {
  return (
    <Section id="faculty" bordered className="scroll-mt-24">
      <Container>
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-6">
            <Reveal>
              <Eyebrow>III. Practitioners in residence</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                Led by working practitioners of the discipline.
              </h2>
            </Reveal>
            <Reveal>
              <p className={`mt-6 max-w-lg ${luxury.bodySmall}`}>
                Each cohort is taught by practising professionals. Named practitioners are introduced to enrolled members privately, once teaching arrangements are confirmed.
              </p>
            </Reveal>
            <ul className="mt-10 space-y-6">
              {institute.practitioners.map((p) => (
                <motion.li
                  key={`${p.role}-${p.region}`}
                  variants={fadeUp}
                  className="border-b border-white/5 pb-6 last:border-none"
                >
                  <p className="font-display text-2xl text-ivory">{p.role}</p>
                  <p className="mt-2 text-[13px] font-light tracking-wide text-platinum/75">
                    {p.region}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-5 md:col-start-8">
            <Reveal>
              <h3 className="font-display text-4xl leading-tight md:text-5xl">
                What you will be able to do.
              </h3>
              <span className={cn(luxury.eyebrow, "mt-4 block")}>IV. Outcomes</span>
            </Reveal>
            <ul className="mt-10 space-y-5">
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
            <div className="mt-12">
              <LuxButton asChild icon={<ArrowRight className="h-3.5 w-3.5" />}>
                <a href="#inquiry">Request your invitation</a>
              </LuxButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Inquiry({ institute }: { institute: Institute }) {
  return (
    <Section id="inquiry" bordered tinted className="scroll-mt-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <div>
            <Reveal>
              <Eyebrow>Admissions</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mt-6 font-display text-4xl leading-tight md:text-5xl">
                A quiet conversation, first.
              </h2>
            </Reveal>
            <Reveal>
              <p className={`mt-8 max-w-md ${luxury.bodyMuted}`}>
                Every candidate to the {institute.name} Institute is met personally.
                Share a few lines about who you are and what draws you here, and the
                admissions circle will write to you within three working days.
              </p>
            </Reveal>
          </div>
          <Reveal>
            <InquiryForm
              instituteSlug={institute.slug}
              instituteName={institute.name}
            />
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function NextPrev({ current }: { current: Institute }) {
  const index = INSTITUTES.findIndex((i) => i.slug === current.slug);
  const prev = INSTITUTES[(index - 1 + INSTITUTES.length) % INSTITUTES.length];
  const next = INSTITUTES[(index + 1) % INSTITUTES.length];

  return (
    <Section bordered tinted>
      <Container>
        <div className="grid gap-px bg-white/5 md:grid-cols-2">
          <NavCard label="Previous Institute" institute={prev} align="left" />
          <NavCard label="Next Institute" institute={next} align="right" />
        </div>
      </Container>
    </Section>
  );
}

function NavCard({
  label,
  institute,
  align,
}: {
  label: string;
  institute: Institute;
  align: "left" | "right";
}) {
  return (
    <Link
      to="/institutes/$slug"
      params={{ slug: institute.slug }}
      className={`group flex flex-col justify-between gap-8 bg-obsidian p-10 transition-colors duration-500 hover:bg-charcoal md:min-h-[260px] ${
        align === "right" ? "md:text-right md:items-end" : ""
      }`}
    >
      <Eyebrow>{label}</Eyebrow>
      <div className={align === "right" ? "md:text-right" : ""}>
        <p className="font-numeric text-[11px] tracking-[0.3em] text-gold">{institute.n}</p>
        <h3 className="mt-3 font-display text-4xl leading-tight text-ivory transition-colors group-hover:text-gold">
          {institute.name}
        </h3>
        <p className="mt-2 text-[13px] font-light tracking-wide text-platinum/60">
          {institute.tag}
        </p>
        <div className={`mt-6 ${align === "right" ? "md:inline-flex" : "inline-flex"}`}>
          <ArrowLink>Enter the Institute</ArrowLink>
        </div>
      </div>
    </Link>
  );
}

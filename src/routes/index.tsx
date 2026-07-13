import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Info } from "lucide-react";


import {
  Container,
  Eyebrow,
  Footer,
  Hairline,
  Header,
  LuxButton,
  MediaOverlay,
  GRAND_HALL,
  MobileTabs,
  Reveal,
  Section,
  SectionHeader,
  fadeUp,
  luxury,
} from "@/components/luxury";
import { ARTICLES, categoryLabel } from "@/data/journal";
import { LIBRARY } from "@/data/library";
import { PATHWAYS } from "@/data/pathways";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "The Precious Intelligence Academy, Luxury Education" },
      {
        name: "description",
        content:
          "A free digital institution for precious metals, jewellery, gemstones, luxury retail, and AI-assisted learning. Master the extraordinary.",
      },
      { property: "og:title", content: "The Precious Intelligence Academy" },
      {
        property: "og:description",
        content:
          "Master the extraordinary. A free digital institution for the disciplines of luxury.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content: "/__l5e/assets-v1/dd3d60ed-3aae-4bbc-a06c-3d4742c3f58f/og-academy.jpg",
      },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        name: "twitter:image",
        content: "/__l5e/assets-v1/dd3d60ed-3aae-4bbc-a06c-3d4742c3f58f/og-academy.jpg",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

/* ---------- Institutes (all 8) ---------- */

const INSTITUTES = [
  { slug: "precious-metals", n: "I", name: "Precious Metals", tag: "Gold. Silver. Platinum.", body: "The elements that anchor every luxury discipline. Properties, purity, and provenance." },
  { slug: "bullion", n: "II", name: "Bullion", tag: "Bars. Coins. Markets.", body: "How wholesale metal moves, from Good Delivery vaults to the retail counter." },
  { slug: "numismatics", n: "III", name: "Numismatics", tag: "The scholarship of coinage.", body: "Grading, dies, and provenance in the coins the trade treats as literature." },
  { slug: "gemstones", n: "IV", name: "Gemstones", tag: "Diamonds. Opals. Coloured stones.", body: "The Four Cs reread, phenomenal gems, and laboratory practice for the professional eye." },
  { slug: "jewellery", n: "V", name: "Jewellery", tag: "Design. Craft. Provenance.", body: "The bench, the hallmark, the archive, and the estate piece read front and back." },
  { slug: "horology", n: "VI", name: "Horology", tag: "Swiss watchmaking, decoded.", body: "Escapements, complications, and the small vocabulary of the mechanical hand." },
  { slug: "luxury-retail", n: "VII", name: "Luxury Retail", tag: "Clienteling and the high-value sale.", body: "The boutique as theatre, the objection as invitation, the aftercare as promise." },
  { slug: "artificial-intelligence", n: "VIII", name: "Artificial Intelligence", tag: "AI for the luxury industry.", body: "Where AI belongs in the atelier, and where the hand of the master still governs." },
] as const;

/* ---------- Hero material sequence ---------- */

/* ---------- Hero ---------- */


function Home() {
  return (
    <div className="min-h-dvh bg-obsidian text-ivory">
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero />
        <Philosophy />
        <InstitutesSection />
        <PathwaysSection />
        <KnowledgeHubPreview />
        <JournalLatest />
        <FeaturedCollection />
        <MentorSection />
        <CertificatesSection />
        <WhyExists />
        <BeginLearning />
      </main>
      <Footer />
      <MobileTabs />
    </div>
  );
}

/* ============================================================
   1. HERO — cinematic canvas + material sequence
   ============================================================ */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);

  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % MATERIALS.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pt-32"
      aria-label="The Precious Intelligence Academy"
    >
      {/* Base atmosphere */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(212,175,55,0.10),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_80%,rgba(88,120,180,0.08),transparent_55%)]" />

      {/* Cinematic material sequence */}
      <motion.div style={{ y, scale, opacity }} className="absolute inset-0">
        {MATERIALS.map((m, i) => (
          <motion.div
            key={m.key}
            initial={false}
            animate={{
              opacity: i === index ? 1 : 0,
              scale: i === index ? 1 : 1.05,
            }}
            transition={{ duration: 2.2, ease: luxury.ease }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative h-[86vh] w-[86vh] max-h-[820px] max-w-[820px]">
              <div className={`absolute inset-0 rounded-full ${m.glow} blur-[120px]`} />
              <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${m.tint} blur-2xl`} />
              <img
                src={m.img}
                alt=""
                aria-hidden
                width={1536}
                height={1536}
                className="float-slow relative h-full w-full object-contain"
                style={{ filter: "contrast(1.05) saturate(1.05)" }}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Particle field */}
      {!reduced && <ParticleField />}

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,var(--obsidian)_90%)]" />

      {/* Copy */}
      <motion.div
        style={{ opacity }}
        initial="hidden"
        animate="visible"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.16, delayChildren: 0.15 } } }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 text-center md:px-10"
      >
        <motion.div variants={fadeUp} className="mb-8 flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-gold/60" />
          <Eyebrow>The Precious Intelligence Academy</Eyebrow>
          <span className="h-px w-10 bg-gold/60" />
        </motion.div>

        <motion.h1
          variants={fadeUp}
          className="font-display text-[clamp(48px,12vw,120px)] leading-[0.94] tracking-[-0.01em] text-ivory lg:text-[128px]"
        >
          Master the <em className="gold-gradient-text not-italic">Extraordinary.</em>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className={`mx-auto mt-10 max-w-2xl text-[15px] md:text-[17px] font-light leading-[1.75] text-platinum/85`}
        >
          The Precious Intelligence Academy is a free digital institution dedicated to precious metals, jewellery, gemstones, luxury retail and AI-assisted learning. Discover carefully researched knowledge, interactive learning experiences and practical insights designed to help you grow with confidence.
        </motion.p>

        <motion.div variants={fadeUp} className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <LuxButton asChild>
            <Link to="/institutes">Explore the Academy</Link>
          </LuxButton>
          <LuxButton asChild variant="ghost">
            <Link to="/knowledge">Enter the Knowledge Hub</Link>
          </LuxButton>
        </motion.div>

        {/* Live material label */}
        <motion.div variants={fadeUp} className="mt-16 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-gold/50" />
          <div className="min-w-[220px] text-left">
            <motion.p
              key={MATERIALS[index].key}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[11px] uppercase tracking-[0.28em] text-gold"
            >
              Now in view · {MATERIALS[index].label}
            </motion.p>
            <motion.p
              key={MATERIALS[index].key + "-o"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="mt-1 text-[11px] font-light tracking-wide text-platinum/60"
            >
              {MATERIALS[index].origin}
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto mb-3 h-10 w-px bg-gradient-to-b from-transparent to-gold" />
        
      </motion.div>
    </section>
  );
}

function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; twinkle: number };
    let particles: P[] = [];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 18000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -Math.random() * 0.2 - 0.05,
        a: Math.random() * 0.6 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.twinkle += 0.02;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        const alpha = p.a * (0.55 + 0.45 * Math.sin(p.twinkle));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 95, ${alpha.toFixed(3)})`;
        ctx.shadowColor = "rgba(212,175,95,0.6)";
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      raf = requestAnimationFrame(step);
    };

    resize();
    step();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full mix-blend-screen"
    />
  );
}

/* ============================================================
   2. PHILOSOPHY
   ============================================================ */

function Philosophy() {
  return (
    <Section id="philosophy" bordered tinted>
      <Container narrow>
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <Eyebrow>I. Academy Philosophy</Eyebrow>
            <Hairline className="mt-6 w-16" />
          </Reveal>
          <div className="md:col-span-8 space-y-10">
            <Reveal>
              <p className="font-display text-3xl leading-[1.25] text-ivory md:text-[42px] md:leading-[1.2] lg:text-5xl lg:leading-[1.2]">
                Knowledge is the most precious material.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted} text-[16px] md:text-[17px]`}>
                A gold bar, a rare stone, a mechanical movement, a client conversation. Each is understood one small discipline at a time. The Academy is a place where those disciplines are studied at the level a serious professional expects, and offered freely.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted} text-[16px] md:text-[17px]`}>
                We publish research, not opinion. We build interactive tools, not gimmicks. We measure ourselves by the clarity a reader leaves with, not by the length of the lesson.
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   3. INSTITUTES — asymmetric editorial
   ============================================================ */

function InstitutesSection() {
  return (
    <Section id="institutes">
      <Container>
        <SectionHeader
          index="II"
          eyebrow="The Institutes"
          title="Eight disciplines. One faculty."
          intro="Each Institute is a self-contained programme of six chapters, drawn from reputable public sources and recognised industry references."
        />
        <ul className="mt-6 divide-y divide-white/5 border-y border-white/5">
          {INSTITUTES.map((it, i) => (
            <li key={it.slug}>
              <Link
                to="/institutes/$slug"
                params={{ slug: it.slug }}
                className="group grid items-baseline gap-4 py-8 transition-colors duration-500 md:grid-cols-12 md:gap-8 md:py-10"
                aria-label={`Enter the ${it.name} Institute`}
              >
                <div className="md:col-span-1">
                  <span className="font-display text-2xl text-gold/70 transition-colors group-hover:text-gold md:text-3xl">
                    {it.n}
                  </span>
                </div>
                <div className="md:col-span-4">
                  <h3 className="font-display text-3xl leading-tight text-ivory transition-colors group-hover:text-gold md:text-4xl">
                    {it.name}
                  </h3>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.24em] text-platinum/60">{it.tag}</p>
                </div>
                <p className={`md:col-span-6 ${luxury.bodyMuted} text-[15px] leading-[1.7]`}>
                  {it.body}
                </p>
                <div className="md:col-span-1 md:text-right">
                  <span className="inline-block text-platinum/40 transition-all duration-500 group-hover:translate-x-2 group-hover:text-gold">→</span>
                </div>
              </Link>
              {/* subtle gold sweep on hover */}
              <div className="pointer-events-none h-px origin-left scale-x-0 bg-gradient-to-r from-gold/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" aria-hidden style={{ marginTop: -1 }} />
            </li>
          ))}
        </ul>
        <div className="mt-14 text-center">
          <LuxButton asChild variant="outline">
            <Link to="/institutes">All eight Institutes</Link>
          </LuxButton>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   4. FEATURED LEARNING PATHS
   ============================================================ */

function PathwaysSection() {
  const featured = PATHWAYS.slice(0, 4);
  return (
    <Section bordered tinted>
      <Container>
        <SectionHeader
          index="III"
          eyebrow="Learning Paths"
          title="Curated sequences, read as one."
          intro="Chapters, articles, and reference pages arranged so a single evening leaves you with a working foundation."
        />
        <div className="grid gap-px bg-white/5 md:grid-cols-2">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              to="/knowledge/pathways"
              hash={p.slug}
              className="group relative flex flex-col justify-between bg-obsidian p-8 transition-colors duration-500 hover:bg-charcoal md:p-12"
            >
              <div>
                <Eyebrow>Path {String(i + 1).padStart(2, "0")}</Eyebrow>
                <h3 className="mt-6 font-display text-3xl leading-tight text-ivory group-hover:text-gold md:text-4xl">
                  {p.title}
                </h3>
                <p className={`mt-4 max-w-md ${luxury.bodyMuted}`}>{p.dek}</p>
              </div>
              <div className="mt-10 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-platinum/60">
                <span>{p.minutes} minutes · {p.steps.length} steps</span>
                <span className="text-gold transition-transform duration-500 group-hover:translate-x-1">→</span>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <LuxButton asChild variant="outline">
            <Link to="/knowledge/pathways">All learning paths</Link>
          </LuxButton>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   5. KNOWLEDGE HUB PREVIEW
   ============================================================ */

function KnowledgeHubPreview() {
  const tiles = [
    { to: "/knowledge/glossary", label: "The Glossary", body: "A shared vocabulary for the disciplines of luxury, defined without jargon." },
    { to: "/knowledge/compare", label: "Comparisons", body: "The pairs the trade often conflates, set side by side and explained." },
    { to: "/knowledge/pathways", label: "Learning Paths", body: "Curated reading sequences, timed to a single considered session." },
    { to: "/smelt-lab", label: "The Smelt Lab", body: "Blend metals in a virtual crucible and watch karat, colour, and hallmark emerge." },
  ] as const;
  return (
    <Section>
      <Container>
        <div className="grid gap-16 md:grid-cols-12 md:items-end">
          <div className="md:col-span-5">
            <Eyebrow>IV. Knowledge Hub</Eyebrow>
            <h2 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl">
              A single reference room for the trade.
            </h2>
            <p className={`mt-8 max-w-md ${luxury.bodyMuted}`}>
              Glossary, comparisons, pathways, and the Smelt Lab. Open the Hub when a question needs a considered answer, not a search result.
            </p>
            <div className="mt-10">
              <LuxButton asChild>
                <Link to="/knowledge">Enter the Knowledge Hub</Link>
              </LuxButton>
            </div>
          </div>
          <div className="md:col-span-7">
            <ul className="grid gap-px bg-white/5 sm:grid-cols-2">
              {tiles.map((t) => (
                <li key={t.to} className="bg-obsidian">
                  <Link to={t.to} className="group block p-8">
                    <p className="font-display text-2xl text-ivory group-hover:text-gold">{t.label}</p>
                    <p className={`mt-3 ${luxury.bodySmall}`}>{t.body}</p>
                    <div className="mt-6 text-[11px] uppercase tracking-[0.24em] text-gold">
                      Open <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   6. LATEST JOURNAL ARTICLES
   ============================================================ */

function JournalLatest() {
  const [featured, ...rest] = ARTICLES;
  const secondary = rest.slice(0, 4);
  return (
    <Section bordered tinted>
      <Container>
        <SectionHeader
          index="V"
          eyebrow="The Journal"
          title="From the Academy Desk."
          intro="Editorial writing on craft, provenance, history, and the small disciplines that separate a professional from a beginner."
        />
        <div className="grid gap-16 md:grid-cols-12">
          {/* Featured */}
          <Link
            to="/journal/$slug"
            params={{ slug: featured.slug }}
            className="group md:col-span-7"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-charcoal">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent" />
              <div className="absolute inset-0 flex items-end p-8 md:p-12">
                <div>
                  <Eyebrow>{categoryLabel(featured.category)}</Eyebrow>
                  <h3 className="mt-4 font-display text-3xl leading-tight text-ivory transition-colors group-hover:text-gold md:text-5xl">
                    {featured.title}
                  </h3>
                  <p className={`mt-4 max-w-xl ${luxury.bodyMuted}`}>{featured.dek}</p>
                  <div className="mt-6 text-[11px] uppercase tracking-[0.24em] text-gold">
                    Read the essay <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </div>
              <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5" />
            </div>
          </Link>
          {/* Secondary list */}
          <div className="md:col-span-5">
            <ul className="divide-y divide-white/5 border-y border-white/5">
              {secondary.map((a) => (
                <li key={a.slug}>
                  <Link
                    to="/journal/$slug"
                    params={{ slug: a.slug }}
                    className="group block py-6"
                  >
                    <Eyebrow>{categoryLabel(a.category)}</Eyebrow>
                    <p className="mt-3 font-display text-xl leading-tight text-ivory group-hover:text-gold md:text-2xl">
                      {a.title}
                    </p>
                    <p className="mt-2 text-[11px] uppercase tracking-[0.22em] text-platinum/50">
                      {a.readingMinutes} min read
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <LuxButton asChild variant="outline">
                <Link to="/journal">Read The Journal</Link>
              </LuxButton>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   7. FEATURED COLLECTION (Library)
   ============================================================ */

function FeaturedCollection() {
  const items = LIBRARY.slice(0, 4);
  return (
    <Section>
      <Container>
        <SectionHeader
          index="VI"
          eyebrow="The Library"
          title="The objects at the centre of the trade."
          intro="Reference pages for the bars, coins, stones, and timepieces we return to again and again."
        />
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((it, i) => (
            <Link
              key={it.slug}
              to="/library/$slug"
              params={{ slug: it.slug }}
              className={`group relative overflow-hidden border border-white/5 bg-obsidian/60 p-8 backdrop-blur-sm transition-all duration-500 hover:border-gold/40 md:p-12 ${
                i % 2 ? "md:translate-y-8" : ""
              }`}
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/10 blur-3xl transition-opacity duration-700 group-hover:opacity-60 opacity-30" />
              <Eyebrow>{it.eyebrow}</Eyebrow>
              <h3 className="mt-6 font-display text-3xl leading-tight text-ivory transition-colors group-hover:text-gold md:text-4xl">
                {it.name}
              </h3>
              <p className={`mt-4 max-w-md ${luxury.bodyMuted}`}>{it.dek}</p>
              <div className="mt-8 flex items-center gap-3 text-[11px] uppercase tracking-[0.24em] text-gold">
                Open reference
                <span aria-hidden className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-16 text-center">
          <LuxButton asChild variant="outline">
            <Link to="/library">All Library entries</Link>
          </LuxButton>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   8. AI MENTOR
   ============================================================ */

function MentorSection() {
  return (
    <Section id="mentor" bordered tinted className="overflow-hidden">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px]" aria-hidden />
      <Container>
        <div className="grid gap-16 md:grid-cols-12 md:gap-24">
          <div className="md:col-span-5">
            <Reveal><Eyebrow>VII. The AI Mentor</Eyebrow></Reveal>
            <Reveal>
              <h2 className="mt-6 font-display text-5xl leading-[1.05] md:text-6xl">
                A tutor, in private session.
              </h2>
            </Reveal>
            <Reveal>
              <p className={`mt-8 ${luxury.bodyMuted}`}>
                Ask about a stone, a hallmark, or a conversation you are about to have with a client. The Mentor listens, explains, and remembers, in the languages your clientele speaks.
              </p>
            </Reveal>
            <ul className="mt-10 space-y-4">
              {[
                "Voice conversations, calmly paced",
                "Image and gemstone identification",
                "Roleplay for the high-value sale",
                "A personal glossary, with citations",
              ].map((f) => (
                <li key={f} className="flex items-center gap-4 text-[14px] font-light text-ivory/90">
                  <span className="h-px w-6 bg-gold" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <Reveal className="md:col-span-7">
            <div className="relative rounded-sm border border-gold/20 bg-charcoal/60 p-8 backdrop-blur-2xl md:p-10">
              <div className="pointer-events-none absolute inset-0 rounded-sm bg-gradient-to-br from-gold/5 via-transparent to-transparent" />
              <div className="relative">
                <div className="flex items-center justify-between border-b border-white/5 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="shimmer h-2 w-2 rounded-full bg-gold" />
                    <Eyebrow muted>Mentor · Preview</Eyebrow>
                  </div>
                  <Eyebrow muted>Sample transcript</Eyebrow>
                </div>

                <div
                  role="note"
                  aria-label="AI transparency notice"
                  className="mt-6 flex items-start gap-3 border border-gold/25 bg-gold/[0.04] px-4 py-3 text-[11.5px] font-light leading-relaxed text-platinum/80"
                >
                  <Info aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                  <span>
                    <span className="font-medium uppercase tracking-[0.16em] text-gold">AI, educational only.</span>{" "}
                    The Mentor is an AI assistant. Responses may be inaccurate and are not a substitute for a qualified jeweller, gemologist, appraiser, or financial adviser. Confirm any material decision with a licensed professional.
                  </span>
                </div>

                <div className="mt-8 space-y-6">
                  <div>
                    <Eyebrow muted>You</Eyebrow>
                    <p className="mt-2 font-display text-2xl leading-snug text-ivory md:text-3xl">
                      A client is comparing a 1 kg cast bar to a minted bar. How do I position the premium?
                    </p>
                  </div>
                  <Hairline />
                  <div>
                    <Eyebrow>Mentor</Eyebrow>
                    <p className="mt-2 text-[15px] font-light leading-relaxed text-platinum/90">
                      Begin with the metal, not the price. A cast bar rewards the investor who values weight and liquidity. A minted bar rewards the collector who values finish, packaging, and provenance. Ask your client which of those two stories they will tell in ten years, then let the premium answer itself.
                    </p>
                  </div>
                </div>

                <div className="mt-10 border-t border-white/5 pt-6">
                  <p className="text-[13px] font-light leading-relaxed text-platinum/70">
                    The Mentor is not yet available to the public. Enrolled members will receive a private session invitation when it opens to their cohort.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   9. CERTIFICATES
   ============================================================ */

function CertificatesSection() {
  return (
    <Section>
      <Container narrow>
        <div className="grid gap-16 md:grid-cols-12 md:items-center">
          <Reveal className="md:col-span-5">
            <Eyebrow>VIII. Certificates</Eyebrow>
            <Hairline className="mt-6 w-16" />
            <p className="mt-10 font-display text-4xl leading-[1.15] text-ivory md:text-5xl">
              A record of what you have read.
            </p>
          </Reveal>
          <div className="md:col-span-7 space-y-6">
            <Reveal>
              <p className={`${luxury.bodyMuted}`}>
                Completing an Institute earns a Certificate of Completion from The Precious Intelligence Academy. It records the chapters you finished and the date you finished them.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted}`}>
                The Academy is independent and is not accredited by any professional body. A Certificate is a personal record of study, not a professional qualification. It sits alongside the work of the trade bodies, laboratories, and colleges you may already know.
              </p>
            </Reveal>
            <Reveal>
              <div className="mt-4 border-l-2 border-gold/40 pl-6">
                <Eyebrow>Certificate of Completion</Eyebrow>
                <p className="mt-2 font-display text-2xl text-ivory">Awarded upon finishing the six chapters of an Institute.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   10. WHY PIA EXISTS
   ============================================================ */

function WhyExists() {
  return (
    <Section bordered tinted>
      <Container narrow>
        <div className="grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <Eyebrow>IX. Why the Academy exists</Eyebrow>
            <Hairline className="mt-6 w-16" />
          </Reveal>
          <div className="md:col-span-8 space-y-8">
            <Reveal>
              <p className="font-display text-3xl leading-[1.25] text-ivory md:text-[40px] md:leading-[1.2]">
                Because clarity, in this industry, is worth more than mystery.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted}`}>
                The disciplines of luxury are old, deep, and frequently obscured. Buyers are asked to trust; sellers are asked to speak with authority; students are asked to pay for what has always been public knowledge, and often for less.
              </p>
            </Reveal>
            <Reveal>
              <p className={`${luxury.bodyMuted}`}>
                The Academy exists to raise the floor. It is free, independently researched, and not accredited by any external body. Every lesson is drawn from reputable public sources and recognised industry references. Certificates recognise the completion of Academy learning only.
              </p>
            </Reveal>
            <Reveal>
              <p className={luxury.bodySmall}>
                Read the full{" "}
                <Link
                  to="/governance"
                  hash="disclosures"
                  className="text-ivory underline decoration-gold/40 underline-offset-4 transition-colors hover:text-gold"
                >
                  disclosures and governance charter
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ============================================================
   11. BEGIN LEARNING — final CTA
   ============================================================ */

function BeginLearning() {
  return (
    <Section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_60%,rgba(212,175,55,0.14),transparent_65%)]" aria-hidden />
      <Container narrow>
        <div className="text-center">
          <Eyebrow>X. Begin</Eyebrow>
          <h2 className="mx-auto mt-8 max-w-3xl font-display text-[clamp(40px,7vw,88px)] leading-[1.0] text-ivory">
            Enter the Academy.
            <br />
            <em className="gold-gradient-text not-italic">Master the extraordinary.</em>
          </h2>
          <p className={`mx-auto mt-8 max-w-xl ${luxury.bodyMuted}`}>
            Free to read, free to study, free to keep. Begin with an Institute or open the Knowledge Hub.
          </p>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <LuxButton asChild>
              <Link to="/institutes">Explore the Academy</Link>
            </LuxButton>
            <LuxButton asChild variant="ghost">
              <Link to="/knowledge">Enter the Knowledge Hub</Link>
            </LuxButton>
          </div>
        </div>
      </Container>
    </Section>
  );
}

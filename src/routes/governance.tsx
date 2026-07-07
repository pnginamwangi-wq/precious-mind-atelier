import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/luxury/header";
import { Footer } from "@/components/luxury/footer";
import { MobileTabs } from "@/components/luxury/mobile-tabs";
import {
  Container,
  Eyebrow,
  Hairline,
  Reveal,
  Section,
  SectionHeader,
  luxury,
} from "@/components/luxury";
import { EducationDisclaimer } from "@/components/luxury/education-disclaimer";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/governance")({
  head: () => ({
    meta: [
      {
        title: "Governance Charter, The Precious Intelligence Academy",
      },
      {
        name: "description",
        content:
          "The legal, ethical, and compliance charter of The Precious Intelligence Academy. Independence, transparency, and educational integrity, stated plainly.",
      },
      {
        property: "og:title",
        content: "Governance Charter, The Precious Intelligence Academy",
      },
      {
        property: "og:description",
        content:
          "Independence, transparency, and educational integrity. The principles that govern the Academy.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/governance" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/governance" }],
  }),
  component: GovernancePage,
});

type Article = {
  index: string;
  eyebrow: string;
  title: string;
  intro?: string;
  body?: string[];
  list?: { label?: string; items: string[] };
  note?: string;
};

const ARTICLES: Article[] = [
  {
    index: "I",
    eyebrow: "Foundational Principle",
    title: "A legitimate educational platform.",
    body: [
      "The Precious Intelligence Academy is designed as a legitimate educational platform. Every page, feature, and piece of content is intended to comply with general best practices for consumer transparency, intellectual property, privacy, and educational integrity.",
      "Accuracy is treated as a higher priority than marketing. Where a claim cannot be verified, it is left unstated.",
    ],
  },
  {
    index: "II",
    eyebrow: "No Fabricated Claims",
    title: "We do not invent people, credentials, or history.",
    intro:
      "The Academy does not generate false or fabricated claims. Where information is unknown, the space is left blank or clearly identified as a placeholder rather than filled with invention.",
    list: {
      label: "The following are never fabricated",
      items: [
        "Professors, teachers, or employees",
        "Students, testimonials, or reviews",
        "Partnerships, awards, or accreditations",
        "Certifications from external organisations",
        "University affiliations or government approvals",
        "Industry endorsements",
        "Statistics, user numbers, or company history",
        "Research studies",
      ],
    },
  },
  {
    index: "III",
    eyebrow: "Intellectual Property",
    title: "Original work, honestly sourced.",
    intro:
      "The Academy uses only original copy, original interface designs, original iconography, licensed or placeholder imagery, and public domain assets where appropriate.",
    body: [
      "Another organisation's branding, layouts, logos, copyrighted images, or proprietary text are not copied. The Academy is inspired by luxury design principles without imitating any specific brand.",
    ],
  },
  {
    index: "IV",
    eyebrow: "Educational Integrity",
    title: "Independently researched, plainly stated.",
    body: [
      "All educational material is presented as independently researched educational content, developed through research using reputable public sources, recognised industry references, and educational publications.",
      "Nothing published here should be read as the official view or the internal training material of any employer, mint, jewellery house, luxury brand, or certification body, unless explicit written permission has been granted.",
    ],
  },
  {
    index: "V",
    eyebrow: "Certificates",
    title: "Recognition of learning, nothing more.",
    intro:
      "Certificates recognise the completion of learning within The Precious Intelligence Academy. They acknowledge that a course or masterclass has been undertaken and completed with care.",
    list: {
      label: "Certificates are not described as",
      items: [
        "Degrees",
        "Diplomas",
        "Licences",
        "Government recognised qualifications",
        "Nationally accredited qualifications",
      ],
    },
  },
  {
    index: "VI",
    eyebrow: "Brand Independence",
    title: "An independent house of study.",
    intro:
      "The Precious Intelligence Academy is an independent educational platform. No endorsement, sponsorship, or affiliation is implied with any external organisation.",
    list: {
      label: "No affiliation is implied with",
      items: [
        "The Perth Mint",
        "Cartier, Tiffany and Co., Rolex, Hermès",
        "Apple, or any consumer technology company",
        "Any government agency",
        "Any university",
        "Any jewellery retailer",
      ],
    },
    note: "These organisations may be referenced only in educational contexts where the reference is factually accurate and clearly attributed to public information.",
  },
  {
    index: "VII",
    eyebrow: "Employer Boundary",
    title: "A firewall between practice and platform.",
    body: [
      "The Academy must never include confidential information, internal training materials, unpublished product information, or proprietary content from any current or former employer of its author or contributors.",
      "Any reference to a company, product, or brand is drawn from publicly available information and used only for educational purposes. This principle protects both the Academy and the organisations its contributors are associated with, and it is treated as the kind of governance expected of a professional educational institution.",
    ],
  },
  {
    index: "VIII",
    eyebrow: "AI Transparency",
    title: "AI is a tutor, not an authority.",
    intro:
      "Where artificial intelligence features are used within the Academy, their nature and limits are stated plainly to the user.",
    list: {
      label: "Users are informed that",
      items: [
        "AI responses are educational in nature",
        "Users should exercise their own professional judgement",
        "AI generated content does not replace official advice, valuation services, legal advice, financial advice, or professional gemological testing",
      ],
    },
  },
  {
    index: "IX",
    eyebrow: "Privacy",
    title: "Designed for the person on the other side of the screen.",
    intro:
      "The platform is designed to support compliance with major privacy principles, so that the person studying here remains in control of their own information.",
    list: {
      items: [
        "A transparent Privacy Policy",
        "Clear Terms of Use",
        "A cookie notice, with consent where required",
        "Secure authentication",
        "Data minimisation by default",
        "User account deletion on request",
        "Ability to download personal data",
        "Strong password security practices",
      ],
    },
  },
  {
    index: "X",
    eyebrow: "Accessibility",
    title: "Built to be used by everyone.",
    intro:
      "The Academy is designed to meet WCAG 2.2 AA accessibility standards wherever practical, so that the discipline of study is not gated by the design of the interface.",
    list: {
      items: [
        "Full keyboard navigation",
        "Support for assistive screen readers",
        "Considered colour contrast",
        "Responsive layouts across devices",
        "Clear, legible typography",
        "Accessible forms with proper labels and states",
      ],
    },
  },
  {
    index: "XI",
    eyebrow: "Consumer Transparency",
    title: "Clear language, no exaggeration.",
    body: [
      "Misleading language is avoided. Outcomes are not exaggerated. Employment, promotions, income, expertise, or mastery are not guaranteed as a consequence of completing a course.",
      "The intent is to help a student learn, not to sell them a promise. Language throughout the Academy is chosen to be clear, honest, and considered.",
    ],
  },
  {
    index: "XII",
    eyebrow: "Financial and Investment Disclaimer",
    title: "Educational, not financial advice.",
    body: [
      "Any material within the Academy that touches on gold, silver, bullion, coins, precious metals, collectibles, or investments is provided for educational purposes only.",
      "It is not financial advice, investment advice, or a recommendation to buy, sell, or hold any asset. Decisions of that nature should be made with a qualified professional who knows the reader's circumstances.",
    ],
  },
  {
    index: "XIII",
    eyebrow: "Gemological Disclaimer",
    title: "Study the craft, consult the specialist.",
    body: [
      "Information on gemstones, grading, valuation, treatments, and authenticity is educational. It is intended to build understanding, not to replace formal opinion.",
      "For formal identification, grading, valuation, insurance, or purchasing decisions, the Academy recommends consulting a qualified gemmologist, appraiser, or laboratory.",
    ],
  },
  {
    index: "XIV",
    eyebrow: "Continuous Review",
    title: "Corrected patiently, updated with care.",
    body: [
      "The Academy is designed so that its content can be reviewed, updated, and corrected over time. Accuracy is always given priority over speed.",
      "Errors, when identified, are treated as an obligation to correct rather than an inconvenience.",
    ],
  },
];

function GovernancePage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="pt-40">
          <SectionHeader
            as="h1"
            eyebrow="Governance and Ethical Charter"
            title={
              <>
                Legal, ethical, and{" "}
                <em className="gold-gradient-text not-italic">compliance</em>{" "}
                requirements.
              </>
            }
            intro="The principles that govern the design, writing, and teaching of The Precious Intelligence Academy. Independence, transparency, and educational integrity, stated plainly and applied consistently."
          />

          <Container narrow>
            <Reveal>
              <div className={cn(luxury.bodyMuted, "border-l border-gold/40 pl-6 italic")}>
                The Precious Intelligence Academy is a respected place of study. Every page is written to reinforce credibility through careful language, thoughtful design, and clear communication.
              </div>
            </Reveal>
          </Container>
        </Section>

        <Section className="pt-0">
          <Container narrow>
            <div className="space-y-24 md:space-y-32">
              {ARTICLES.map((article) => (
                <article key={article.index} className="grid gap-8 md:grid-cols-12">
                  <header className="md:col-span-4">
                    <Reveal>
                      <div className="font-numeric text-[11px] tracking-[0.32em] text-gold">
                        Article {article.index}
                      </div>
                    </Reveal>
                    <Reveal>
                      <Eyebrow muted className="mt-3 block">
                        {article.eyebrow}
                      </Eyebrow>
                    </Reveal>
                    <Reveal>
                      <h2 className="mt-5 font-display text-3xl leading-tight text-ivory md:text-4xl">
                        {article.title}
                      </h2>
                    </Reveal>
                  </header>

                  <div className="space-y-6 md:col-span-8">
                    {article.intro ? (
                      <Reveal>
                        <p className="text-[17px] font-light leading-relaxed text-ivory/90">
                          {article.intro}
                        </p>
                      </Reveal>
                    ) : null}

                    {article.body?.map((para, i) => (
                      <Reveal key={i}>
                        <p className={luxury.bodyMuted}>{para}</p>
                      </Reveal>
                    ))}

                    {article.list ? (
                      <Reveal>
                        <div className="border-t border-white/5 pt-6">
                          {article.list.label ? (
                            <div className="mb-4 font-numeric text-[10px] uppercase tracking-[0.28em] text-platinum/60">
                              {article.list.label}
                            </div>
                          ) : null}
                          <ul className="space-y-2.5">
                            {article.list.items.map((item) => (
                              <li
                                key={item}
                                className="flex gap-3 text-[15px] font-light leading-relaxed text-platinum/80"
                              >
                                <span
                                  aria-hidden
                                  className="mt-2 h-px w-4 flex-none bg-gold/60"
                                />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </Reveal>
                    ) : null}

                    {article.note ? (
                      <Reveal>
                        <p className={cn(luxury.bodySmall, "italic text-platinum/60")}>
                          {article.note}
                        </p>
                      </Reveal>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div id="disclosures" className="mt-24 scroll-mt-24 md:mt-32">
              <Hairline />
              <Reveal>
                <div className="mt-16">
                  <Eyebrow>Disclosures</Eyebrow>
                  <h2 className="mt-6 font-display text-4xl leading-tight text-ivory md:text-5xl">
                    The full disclaimers, gathered in one place.
                  </h2>
                  <p className={cn(luxury.bodyMuted, "mt-6 max-w-2xl")}>
                    A single reference for the financial, gemological, and AI transparency notices that apply across the Academy. Articles XII and XIII above state the principle; the copy below states the practical detail.
                  </p>
                </div>
              </Reveal>
              <div className="mt-10">
                <EducationDisclaimer
                  kinds={["financial", "gemological", "ai"]}
                  className="!border-x-0"
                />
              </div>
            </div>

            <div className="mt-24 md:mt-32">
              <Hairline />
              <Reveal>
                <div className="mt-16 text-center">
                  <Eyebrow>Final Principle</Eyebrow>
                  <p className="mx-auto mt-8 max-w-2xl font-display text-3xl leading-tight text-ivory md:text-4xl">
                    A respected educational institution that values accuracy, transparency, and trust{" "}
                    <em className="gold-gradient-text not-italic">above marketing</em>.
                  </p>
                  <p className={cn(luxury.bodyMuted, "mx-auto mt-6 max-w-xl")}>
                    Every page should reinforce credibility through careful language, thoughtful design, and clear communication.
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
      <MobileTabs />
    </>
  );
}

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
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      {
        title: "Terms of Use, The Precious Intelligence Academy",
      },
      {
        name: "description",
        content:
          "The terms that govern use of The Precious Intelligence Academy. Consumer transparency, prohibited content and conduct, intellectual property ownership, and limitation of liability, written in plain language.",
      },
      { property: "og:title", content: "Terms of Use, The Precious Intelligence Academy" },
      {
        property: "og:description",
        content:
          "Plain language terms covering acceptable use, intellectual property, liability limits, and how to resolve disputes.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/terms" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
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

const OPERATOR = {
  name: "The Precious Intelligence Academy",
  location: "Perth, Western Australia, Australia",
  jurisdiction: "Australia",
  lastUpdated: "6 July 2026",
};

const ARTICLES: Article[] = [
  {
    index: "I",
    eyebrow: "Agreement",
    title: "Accepting these terms.",
    body: [
      `By accessing or using ${OPERATOR.name}'s website, you agree to be bound by these Terms of Use. If you do not agree, you should not use the site.`,
      "These terms are written in plain language so that the rules, the rights, and the limits are easy to understand. They are designed to be transparent, not to hide obligations in fine print.",
    ],
  },
  {
    index: "II",
    eyebrow: "Who may use the site",
    title: "Eligibility and accounts.",
    list: {
      label: "To use the site you must",
      items: [
        "Be old enough to form a binding contract in your jurisdiction, or use the site under the supervision of a parent or guardian who accepts these terms on your behalf.",
        "Provide accurate information when creating an account.",
        "Keep your account credentials secure and not share them with others.",
        "Be responsible for all activity that occurs under your account.",
      ],
    },
    note: "The Academy may suspend or terminate an account that appears to have been compromised, is used to break these terms, or was created with false information.",
  },
  {
    index: "III",
    eyebrow: "Prohibited content and conduct",
    title: "What is not allowed.",
    intro:
      "The Academy is an educational space. The following behaviour and content are not permitted on the site, in any account, enquiry, comment, upload, or other submission.",
    list: {
      label: "Prohibited conduct",
      items: [
        "Unlawful, fraudulent, deceptive, or misleading activity.",
        "Harassment, threats, abuse, hate speech, or content that promotes discrimination.",
        "Content that infringes the intellectual property, privacy, or other rights of any person.",
        "Spam, unsolicited advertising, pyramid schemes, or other commercial solicitation without permission.",
        "Malicious code, scraping, automated account creation, or attempts to interfere with the site's security or availability.",
        "Collecting personal information about others without their consent.",
        "Impersonating any individual, organisation, or the Academy itself.",
        "Content that is obscene, violent, or otherwise inappropriate for an educational environment.",
      ],
    },
    note: "The Academy reserves the right to remove prohibited content, suspend access, and report serious matters to the appropriate authorities.",
  },
  {
    index: "IV",
    eyebrow: "Intellectual property",
    title: "Who owns what.",
    body: [
      "All content on the site, including text, graphics, logos, images, videos, audio, course materials, interface designs, and software, is owned by the Academy or its licensors and is protected by copyright, trade mark, and other intellectual property laws.",
      "You may use the content for personal, non-commercial educational purposes while using the site. You may not copy, reproduce, distribute, publicly display, modify, create derivative works from, sell, or exploit any site content without written permission, except where a feature of the site explicitly allows it.",
    ],
    list: {
      label: "What you cannot do",
      items: [
        "Reproduce course materials, articles, or downloads for resale or redistribution.",
        "Remove copyright notices or other ownership markings.",
        "Use the Academy's branding or trade marks without permission.",
        "Frame, mirror, or scrape the site without authorisation.",
      ],
    },
  },
  {
    index: "V",
    eyebrow: "Your submissions",
    title: "Content you share with us.",
    body: [
      "If you submit an enquiry, profile information, avatar image, or other material to the site, you grant the Academy a non-exclusive, worldwide, royalty-free licence to use that material for the purpose of providing and improving the service.",
      "You retain ownership of your original material. You represent that you have the right to share it and that it does not violate these terms or the rights of any other person.",
    ],
    note: "The Academy may display or remove user submitted content at its discretion, and may decline to publish anything that does not meet the standards of the site.",
  },
  {
    index: "VI",
    eyebrow: "Educational purpose",
    title: "Information is for learning, not professional advice.",
    body: [
      "The Academy publishes educational content about precious metals, gemstones, jewellery, horology, numismatics, luxury retail, and related fields. This content is for general learning only.",
      "It is not financial advice, investment advice, legal advice, tax advice, or a substitute for professional gemological testing, grading, valuation, or appraisal. Any decisions that involve money, law, insurance, or professional certification should be made with a qualified adviser who understands your circumstances.",
    ],
  },
  {
    index: "VII",
    eyebrow: "Limitation of liability",
    title: "The limits of our responsibility.",
    intro:
      "To the maximum extent permitted by law, the Academy's liability for any claim arising from your use of the site is limited as follows.",
    list: {
      label: "Liability limits",
      items: [
        "The Academy is not liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits or lost data, even if advised of the possibility.",
        "Total liability for any claim arising from these terms or your use of the site is limited to the amount you paid the Academy for access to the relevant service in the twelve months before the claim, or one hundred Australian dollars if you did not pay anything.",
        "The Academy does not guarantee that the site will be uninterrupted, error-free, or completely secure, or that any content is accurate, complete, or current at all times.",
        "The Academy is not responsible for the actions of third party providers, sign in services, or linked websites.",
      ],
    },
    note: "Some jurisdictions do not allow certain limitations of liability, so the exclusions above may not apply to you to the extent prohibited by your local law.",
  },
  {
    index: "VIII",
    eyebrow: "Indemnity",
    title: "You agree to protect the Academy from claims caused by you.",
    body: [
      "You agree to indemnify and hold harmless the Academy, its contributors, and its service providers from any claim, loss, liability, or expense, including reasonable legal costs, arising out of your use of the site, your submissions, or your breach of these terms.",
    ],
  },
  {
    index: "IX",
    eyebrow: "Termination",
    title: "Ending or suspending access.",
    body: [
      "The Academy may suspend or terminate your access to the site at any time, with or without notice, if you breach these terms or if the Academy reasonably believes that continued access would harm the site or other users.",
      "You may stop using the site at any time. The provisions of these terms that by their nature should survive termination, including intellectual property, limitation of liability, indemnity, and governing law, will survive.",
    ],
  },
  {
    index: "X",
    eyebrow: "Changes to these terms",
    title: "Updated terms, dated clearly.",
    body: [
      "The Academy may update these terms as the service evolves or as the law changes. Material changes will be indicated by an updated date at the top of this page. Continued use of the site after an update means acceptance of the revised terms.",
    ],
  },
  {
    index: "XI",
    eyebrow: "Governing law",
    title: "Disputes are governed by Australian law.",
    body: [
      `These terms are governed by the laws of ${OPERATOR.jurisdiction}. Any dispute arising from these terms or your use of the site will be subject to the non-exclusive jurisdiction of the courts of ${OPERATOR.location}.`,
    ],
  },
  {
    index: "XII",
    eyebrow: "Questions",
    title: "How to reach us.",
    body: [
      "If you have questions about these Terms of Use, you may contact the Academy through the enquiry form on the site or at the contact address published on this page.",
    ],
  },
];

function TermsPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="pt-40">
          <SectionHeader
            eyebrow="Terms of Use"
            title={
              <>
                The rules of the{" "}
                <em className="gold-gradient-text not-italic">Academy</em>, written plainly.
              </>
            }
            intro="Consumer transparency, prohibited content and conduct, intellectual property ownership, and limitation of liability. These terms are designed to be readable, fair, and clear about what you can expect and what is expected of you."
          />

          <Container narrow>
            <Reveal>
              <div className={cn(luxury.bodyMuted, "border-l border-gold/40 pl-6 italic")}>
                Last updated {OPERATOR.lastUpdated}. This page is maintained directly by the Academy
                and is subject to revision as the service evolves.
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

            <div className="mt-24 md:mt-32">
              <Hairline />
              <Reveal>
                <div className="mt-16 text-center">
                  <Eyebrow>Final Principle</Eyebrow>
                  <p className="mx-auto mt-8 max-w-2xl font-display text-3xl leading-tight text-ivory md:text-4xl">
                    Clarity, respect, and{" "}
                    <em className="gold-gradient-text not-italic">fair dealing</em> govern every
                    interaction here.
                  </p>
                  <p className={cn(luxury.bodyMuted, "mx-auto mt-6 max-w-xl")}>
                    These terms exist to protect the integrity of the Academy and the trust of every
                    person who uses it.
                  </p>
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>

        <Footer />
      </main>
      <MobileTabs />
    </>
  );
}
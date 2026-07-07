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

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      {
        title:
          "Privacy Policy, The Precious Intelligence Academy",
      },
      {
        name: "description",
        content:
          "How The Precious Intelligence Academy collects, uses, protects, and returns personal data. Written to Australian Privacy Act principles and aligned with GDPR and CCPA style rights, including access, correction, deletion, and portability.",
      },
      { property: "og:title", content: "Privacy Policy, The Precious Intelligence Academy" },
      {
        property: "og:description",
        content:
          "Data minimisation, secure authentication, deletion on request, and a downloadable copy of your personal data.",
      },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/privacy" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
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

// Controller identity, kept in one place so it is easy to update.
const CONTROLLER = {
  name: "The Precious Intelligence Academy",
  location: "Perth, Western Australia, Australia",
  jurisdiction: "Australia (Privacy Act 1988, Australian Privacy Principles)",
  responseWindowDays: 30,
  lastUpdated: "6 July 2026",
};

const ARTICLES: Article[] = [
  {
    index: "I",
    eyebrow: "Who is responsible",
    title: "The party that holds your data.",
    body: [
      `${CONTROLLER.name} is the party responsible for personal data collected through this website and its associated services. The Academy operates from ${CONTROLLER.location}.`,
      `The Academy is not a large corporation and does not maintain a dedicated legal department. It nevertheless conducts its data handling in accordance with ${CONTROLLER.jurisdiction}, and applies the spirit of the European General Data Protection Regulation and the California Consumer Privacy Act where those frameworks offer stronger protections to a reader.`,
    ],
    note: `Last updated ${CONTROLLER.lastUpdated}. This page is maintained directly by the Academy and is subject to revision as the service evolves.`,
  },
  {
    index: "II",
    eyebrow: "Data minimisation",
    title: "Only what is genuinely needed.",
    body: [
      "The Academy is designed to collect the smallest amount of personal data required to provide the service. Marketing profiles, behavioural tracking, and third party advertising identifiers are not built into the platform.",
      "When a piece of information is not needed for the service to function, it is not requested, not stored, and not inferred.",
    ],
    list: {
      label: "What is collected",
      items: [
        "Account data: email address, and any display name, headline, biography, or avatar image that a member chooses to add to their profile.",
        "Authentication data: a securely hashed password, or an identifier returned by a sign in provider (for example Google) when the member chooses that method.",
        "Learning data: which institutes, chapters, or masterclasses a member has viewed or saved within their own account.",
        "Enquiry data: the name, email, background, and message submitted through an institute enquiry form.",
        "Technical data: standard request metadata such as IP address and browser user agent, retained briefly for security and abuse prevention.",
      ],
    },
  },
  {
    index: "III",
    eyebrow: "How the data is used",
    title: "Purposes stated plainly.",
    list: {
      label: "Lawful purposes",
      items: [
        "To create and maintain a member account, and to authenticate a member on return visits.",
        "To display a member's own saved institutes, profile, and preferences back to them.",
        "To respond to an enquiry that a reader has submitted through the site.",
        "To keep the service secure, detect abuse, and prevent unauthorised access.",
        "To comply with a legal obligation where one applies.",
      ],
    },
    note: "Personal data is not sold. It is not rented. It is not shared with advertising networks or data brokers.",
  },
  {
    index: "IV",
    eyebrow: "Secure authentication",
    title: "How accounts are protected.",
    body: [
      "Sign in is handled through a managed authentication service. Passwords are never stored in readable form; they are salted and hashed using industry standard algorithms managed by that service.",
      "Members may choose to sign in with a third party provider such as Google. In that case the Academy receives only the identity information the provider releases (for example email address and display name), and no password is transmitted to the Academy.",
      "Sessions are transported over HTTPS. Data is transmitted between the browser and the service using transport layer encryption. Server side access to member data is restricted by row level security policies that scope each record to the account that owns it.",
    ],
    list: {
      label: "Practical safeguards",
      items: [
        "Passwords are hashed by the authentication provider, never stored in plain text.",
        "All traffic to the site is served over HTTPS.",
        "Database access rules enforce that a member can only read and write their own records.",
        "Uploaded avatar images are held in a private storage bucket and served through short lived signed links.",
      ],
    },
  },
  {
    index: "V",
    eyebrow: "Your rights",
    title: "Access, correction, deletion, portability.",
    intro: "A reader has meaningful rights over the personal data the Academy holds about them. These rights are honoured regardless of the country in which the reader is located.",
    list: {
      label: "Rights available to every reader",
      items: [
        "The right to be informed about what data is collected and why.",
        "The right of access: to request a copy of the personal data held about you.",
        "The right to correction: to ask that inaccurate data be updated.",
        "The right to deletion: to request that your account and its associated data be permanently removed.",
        "The right to portability: to receive your personal data in a common, machine readable format.",
        "The right to object to processing that you consider unjustified, and to lodge a complaint with a supervisory authority.",
      ],
    },
    note: "For readers in Australia the supervisory authority is the Office of the Australian Information Commissioner. Readers in the European Economic Area, the United Kingdom, or California retain the equivalent rights available to them under their local law.",
  },
  {
    index: "VI",
    eyebrow: "Deletion on request",
    title: "How to close an account.",
    body: [
      "An account can be permanently deleted at any time. On receipt of a verified request, the Academy will remove the member's profile, saved institutes, uploaded avatar image, and role assignment from active systems.",
      "Backups that may contain the data are retained for a short period as part of routine system recovery and are then overwritten on their normal cycle. During that window the data is not used for any other purpose.",
      "Certain records may be retained for a limited period where a law requires it, for example to evidence a completed transaction or to respond to a legitimate regulatory request. Where this applies, the retained record is limited to what the obligation actually requires.",
    ],
    note: "A self service delete button is on the roadmap. Until it is published, deletion is handled by email, as described in Article VIII.",
  },
  {
    index: "VII",
    eyebrow: "Downloadable personal data",
    title: "A copy of what is held about you.",
    body: [
      "A reader may request a copy of the personal data associated with their account. The export is provided in a common, machine readable format (typically JSON), and includes profile fields, saved institutes, enquiry submissions linked to the account, and role assignment.",
      "The export excludes information that is not personal to the reader, such as general course content, and excludes secrets such as password hashes that would compromise the security of the account if released.",
    ],
    note: "As with deletion, a self service export is planned. Until then the export is fulfilled by email within a reasonable time, and at no cost for a routine request.",
  },
  {
    index: "VIII",
    eyebrow: "How to exercise a right",
    title: "One clear process.",
    body: [
      `To exercise any right described in this policy, a reader may use the enquiry form on the site and state clearly that the request concerns privacy. A dedicated privacy contact address will be published on this page once it is available.`,
      `The Academy aims to acknowledge every request promptly and to complete it within ${CONTROLLER.responseWindowDays} days. Where a request is unusually complex, the reader will be informed of the reason for any additional time required.`,
      "Before acting on a request that concerns an account, the Academy will take reasonable steps to verify the identity of the person making the request, in order to protect the account from impersonation.",
    ],
  },
  {
    index: "IX",
    eyebrow: "Third parties that process data",
    title: "A short and deliberate list.",
    intro: "Personal data is processed by a small number of infrastructure providers that make the service possible. Each is chosen for its security posture and each acts under contract as a data processor for the Academy.",
    list: {
      label: "Current processors",
      items: [
        "The managed backend and database service that stores accounts, profiles, saved institutes, and uploaded avatars, and provides authentication.",
        "The managed inference gateway that routes any assistant style feature to a language model provider, only when a member actively invokes such a feature.",
        "The identity provider chosen by a member when they sign in with a third party account (for example Google), which returns basic identity information to the Academy.",
      ],
    },
    note: "The list above is kept short by design. Advertising networks, analytics profiling services, and data brokers are not part of the stack. If a new processor is introduced, this page will be updated before that processor begins handling personal data.",
  },
  {
    index: "X",
    eyebrow: "Cookies and tracking",
    title: "Only what the site needs to work.",
    body: [
      "The site sets the cookies and local storage entries required for authentication and for the site to function correctly. It does not deploy third party advertising cookies, cross site tracking pixels, or fingerprinting scripts.",
      "A member may sign out at any time to clear their authenticated session.",
    ],
  },
  {
    index: "XI",
    eyebrow: "Data location and transfers",
    title: "Where the data is held.",
    body: [
      "The infrastructure providers used by the Academy operate globally distributed systems. Personal data may therefore be stored or processed in a jurisdiction outside Australia.",
      "Where a transfer occurs, the Academy relies on the contractual protections offered by its processors and on the safeguards required by Australian Privacy Principle 8, so that the data continues to receive a level of protection consistent with the standards described in this policy.",
    ],
  },
  {
    index: "XII",
    eyebrow: "Children",
    title: "Not directed at young children.",
    body: [
      "The Academy is written for a general adult audience with an interest in precious metals, gemmology, numismatics, and related fields. It is not directed at children under the age of majority in the reader's jurisdiction.",
      "The Academy does not knowingly create accounts for young children. If a parent or guardian believes that a child has created an account, they may contact the Academy at the privacy address and the account will be removed.",
    ],
  },
  {
    index: "XIII",
    eyebrow: "Security incidents",
    title: "Honest notification, promptly.",
    body: [
      "In the unlikely event of a security incident that is likely to result in serious harm to a member, the Academy will notify affected members and the Office of the Australian Information Commissioner in accordance with the Notifiable Data Breaches scheme.",
      "The notification will describe, in plain language, what happened, what data was affected, what is being done in response, and what steps a member may wish to take.",
    ],
  },
  {
    index: "XIV",
    eyebrow: "Changes to this policy",
    title: "Updated with care, dated clearly.",
    body: [
      "This policy may be updated as the service evolves or as the law changes. Material changes will be indicated by an updated date at the top of this page, and where the change materially affects existing members, by an in product notice or an email to registered members.",
      "Continued use of the service after an update signifies acceptance of the revised policy. A reader who does not accept a revision retains the right to close their account and to request deletion of their data as described above.",
    ],
  },
];

function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="bg-obsidian text-ivory outline-none">
        <Section className="pt-40">
          <SectionHeader
            eyebrow="Privacy Policy"
            title={
              <>
                How your data is{" "}
                <em className="gold-gradient-text not-italic">collected, protected, and returned</em>{" "}
                to you.
              </>
            }
            intro="Written to Australian Privacy Act principles, and aligned with the stronger protections found in the European General Data Protection Regulation and the California Consumer Privacy Act. Plain language, minimal collection, secure authentication, deletion on request, and a downloadable copy of your personal data."
          />

          <Container narrow>
            <Reveal>
              <div className={cn(luxury.bodyMuted, "border-l border-gold/40 pl-6 italic")}>
                The Academy collects the least amount of information it can, protects what it holds, and returns or removes it when a member asks.
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
                  <Eyebrow>Contact</Eyebrow>
                  <p className="mx-auto mt-8 max-w-2xl font-display text-3xl leading-tight text-ivory md:text-4xl">
                    Questions about your data are handled{" "}
                    <em className="gold-gradient-text not-italic">personally</em>, not by a form letter.
                  </p>
                  <p className={cn(luxury.bodyMuted, "mx-auto mt-6 max-w-xl")}>
                    Until a dedicated privacy address is published on this page, a reader may use the enquiry form and mark the request as concerning privacy. Every request is acknowledged and completed within {CONTROLLER.responseWindowDays} days.
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

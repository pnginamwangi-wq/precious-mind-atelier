import { Instagram, Linkedin, Youtube } from "lucide-react";
import { Container, Eyebrow, GoldMark } from "@/components/luxury";

const COLS = [
  {
    title: "Academy",
    items: ["Institutes", "Masterclasses", "Certifications", "AI Mentor"],
  },
  {
    title: "Library",
    items: ["Journal", "Product Library", "Glossary", "Downloads"],
  },
  {
    title: "Institution",
    items: ["About", "Faculty", "Careers", "Contact"],
  },
];

const SOCIAL = [
  { label: "Instagram", href: "#", Icon: Instagram },
  { label: "LinkedIn", href: "#", Icon: Linkedin },
  { label: "YouTube", href: "#", Icon: Youtube },
];

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-obsidian pb-24 pt-24 md:pb-10">
      <Container>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <GoldMark />
              <span className="font-display text-lg text-ivory">
                The Precious Intelligence Academy
              </span>
            </div>
            <p className="mt-8 max-w-md font-display text-3xl leading-tight text-ivory/90 md:text-4xl">
              Master the <em className="gold-gradient-text not-italic">Extraordinary</em>.
            </p>

            <div className="mt-10 flex items-center gap-3">
              {SOCIAL.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center border border-white/10 text-platinum/70 outline-none transition-colors hover:border-gold hover:text-gold focus-visible:border-gold focus-visible:text-gold focus-visible:ring-1 focus-visible:ring-gold"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid gap-10 md:col-span-7 md:grid-cols-3"
          >
            {COLS.map((col) => (
              <div key={col.title}>
                <Eyebrow>{col.title}</Eyebrow>
                <ul className="mt-6 space-y-3">
                  {col.items.map((i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="rounded-sm text-[13px] font-light text-platinum/70 outline-none transition-colors hover:text-ivory focus-visible:text-ivory focus-visible:ring-1 focus-visible:ring-gold focus-visible:ring-offset-4 focus-visible:ring-offset-obsidian"
                      >
                        {i}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-4 border-t border-white/5 pt-8 md:flex-row md:items-center">
          <Eyebrow muted>© MMXXVI · The Precious Intelligence Academy</Eyebrow>
          <Eyebrow muted>Crafted with precision</Eyebrow>
        </div>
      </Container>
    </footer>
  );
}

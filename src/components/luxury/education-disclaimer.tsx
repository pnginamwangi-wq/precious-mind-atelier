import { AlertTriangle } from "lucide-react";
import { Container } from "@/components/luxury/tokens";
import { cn } from "@/lib/utils";

/**
 * Prominent, app-owned educational disclaimer for content that touches
 * investment-adjacent (gold, silver, bullion, coins, markets) or gemological
 * (identification, treatment, valuation, appraisal) subject matter.
 *
 * The Academy publishes educational material only. Nothing on these pages is
 * financial advice, a market forecast, a certificate of authenticity, a
 * valuation, or a gemological report.
 */
export type DisclaimerKind = "financial" | "gemological";

const FINANCIAL_SLUGS = new Set([
  "precious-metals",
  "bullion",
  "numismatics",
]);

const GEMOLOGICAL_SLUGS = new Set([
  "gemstones",
  "jewellery",
]);

export function disclaimersForSlug(slug: string): DisclaimerKind[] {
  const kinds: DisclaimerKind[] = [];
  if (FINANCIAL_SLUGS.has(slug)) kinds.push("financial");
  if (GEMOLOGICAL_SLUGS.has(slug)) kinds.push("gemological");
  return kinds;
}

const COPY: Record<
  DisclaimerKind,
  { eyebrow: string; title: string; body: string; bullets: string[] }
> = {
  financial: {
    eyebrow: "Educational content, not financial advice",
    title: "This is coursework, not investment guidance.",
    body: "Material in this Institute discusses gold, silver, platinum, bullion, coins, refineries, vaults, and markets for teaching purposes only. It is not financial, investment, tax, or legal advice, and it is not an offer or solicitation to buy, sell, or hold any asset.",
    bullets: [
      "Prices, spreads, premiums, and market structures are illustrative and change constantly.",
      "Past performance of any metal, coin, or market does not indicate future results.",
      "Speak with a licensed financial adviser, bullion dealer, or tax professional before acting on anything you read here.",
    ],
  },
  gemological: {
    eyebrow: "Educational content, not a gemological report",
    title: "This is coursework, not an appraisal or certificate.",
    body: "Material in this Institute discusses gemstone identification, treatments, grading conventions, and valuation frameworks for teaching purposes only. It is not a gemological report, certificate of authenticity, appraisal, or insurance valuation for any specific stone or piece.",
    bullets: [
      "Only a qualified gemologist working with the physical stone can identify, grade, or value it.",
      "Treatment disclosures, origin claims, and grading terminology vary between laboratories and jurisdictions.",
      "For any purchase, insurance, or resale decision, obtain a current report from an accredited laboratory (for example GIA, SSEF, Gübelin, AGL) and consult a licensed appraiser.",
    ],
  },
};

export function EducationDisclaimer({
  kinds,
  className,
}: {
  kinds: DisclaimerKind[];
  className?: string;
}) {
  if (kinds.length === 0) return null;

  return (
    <aside
      role="note"
      aria-label="Important educational disclaimer"
      className={cn("border-y border-gold/30 bg-gold/[0.04]", className)}
    >
      <Container>
        <div className="py-10 md:py-12">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="flex h-9 w-9 shrink-0 items-center justify-center border border-gold/50 text-gold"
            >
              <AlertTriangle className="h-4 w-4" />
            </span>
            <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-gold">
              Important, please read
            </p>
          </div>

          <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
            {kinds.map((k) => {
              const copy = COPY[k];
              return (
                <div key={k}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-platinum/80">
                    {copy.eyebrow}
                  </p>
                  <p className="mt-3 font-display text-xl leading-snug text-ivory md:text-2xl">
                    {copy.title}
                  </p>
                  <p className="mt-4 text-[13px] font-light leading-relaxed text-platinum/80">
                    {copy.body}
                  </p>
                  <ul className="mt-5 space-y-2.5">
                    {copy.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-3 text-[12.5px] font-light leading-relaxed text-platinum/70"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2 h-px w-4 shrink-0 bg-gold/60"
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <p className="mt-8 border-t border-white/5 pt-6 text-[11.5px] font-light leading-relaxed text-platinum/60">
            This notice is maintained by The Precious Intelligence Academy to make the
            educational scope of our content clear. It is not legal advice and does not
            create any professional, fiduciary, or advisory relationship.
          </p>
        </div>
      </Container>
    </aside>
  );
}

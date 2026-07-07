/**
 * Types for The Journal, the Academy's weekly editorial publication.
 *
 * Articles are authored as typed data files (a lightweight CMS pattern) so
 * that content, routing, SEO, and related learning links can all be derived
 * from one source. Attribution is fixed to "The Academy Desk". No named
 * individuals appear as bylines, consistent with the Governance Charter.
 */

export const JOURNAL_CATEGORIES = [
  { slug: "precious-metals", label: "Precious Metals" },
  { slug: "bullion", label: "Bullion" },
  { slug: "coins", label: "Coins" },
  { slug: "gemstones", label: "Gemstones" },
  { slug: "jewellery", label: "Jewellery" },
  { slug: "diamonds", label: "Diamonds" },
  { slug: "luxury-watches", label: "Luxury Watches" },
  { slug: "luxury-retail", label: "Luxury Retail" },
  { slug: "customer-experience", label: "Customer Experience" },
  { slug: "artificial-intelligence", label: "Artificial Intelligence" },
  { slug: "history", label: "History" },
  { slug: "buying-guides", label: "Buying Guides" },
  { slug: "care-and-maintenance", label: "Care and Maintenance" },
  { slug: "collecting", label: "Collecting" },
  { slug: "craft", label: "Craft" },
  { slug: "governance", label: "Governance" },
] as const;

export type JournalCategorySlug = (typeof JOURNAL_CATEGORIES)[number]["slug"];

export type ArticleBlock =
  | { kind: "paragraph"; text: string }
  | { kind: "heading"; text: string }
  | { kind: "quote"; text: string; attribution?: string }
  | { kind: "list"; items: string[] };

export type Article = {
  slug: string;
  title: string;
  dek: string;
  category: JournalCategorySlug;
  tags: string[];
  readingMinutes: number;
  publishedAt: string; // ISO date
  updatedAt?: string;
  editorsPick?: boolean;
  featured?: boolean;
  body: ArticleBlock[];
  /** Related Institute slugs for cross linking. */
  relatedInstitutes?: string[];
  /** Related Product Library slugs for cross linking. */
  relatedLibrary?: string[];
};

export function categoryLabel(slug: JournalCategorySlug): string {
  return JOURNAL_CATEGORIES.find((c) => c.slug === slug)?.label ?? slug;
}

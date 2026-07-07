/**
 * Learning Pathways: curated sequences of chapters (and optional articles/library items)
 * that read together as a coherent short course across the eight Institutes.
 */

export type PathwayStep =
  | { kind: "chapter"; institute: string; chapter: string; label: string }
  | { kind: "article"; slug: string; label: string }
  | { kind: "library"; slug: string; label: string };

export type Pathway = {
  slug: string;
  title: string;
  dek: string;
  minutes: number;
  steps: PathwayStep[];
};

export const PATHWAYS: Pathway[] = [
  {
    slug: "reading-a-piece",
    title: "Reading a piece of jewellery",
    dek: "Six steps to read any piece of jewellery front and back: metal, hallmark, setting, stones, provenance.",
    minutes: 55,
    steps: [
      { kind: "chapter", institute: "precious-metals", chapter: "ii", label: "Precious Metals, Chapter II: Purity and Hallmarking" },
      { kind: "article", slug: "reading-a-hallmark", label: "Journal: Reading a hallmark, mark by mark" },
      { kind: "chapter", institute: "jewellery", chapter: "iii", label: "Jewellery, Chapter III: At the Bench" },
      { kind: "chapter", institute: "gemstones", chapter: "i", label: "Gemstones, Chapter I: The Four Cs, Reread" },
      { kind: "chapter", institute: "jewellery", chapter: "v", label: "Jewellery, Chapter V: Provenance and Estate" },
      { kind: "library", slug: "diamond-solitaire-ring", label: "Library: Diamond Solitaire Ring" },
    ],
  },
  {
    slug: "the-bullion-desk",
    title: "The bullion desk, in a week",
    dek: "A working foundation for anyone advising private clients on physical gold and silver.",
    minutes: 65,
    steps: [
      { kind: "chapter", institute: "precious-metals", chapter: "iv", label: "Precious Metals, Chapter IV: Markets and Provenance" },
      { kind: "chapter", institute: "bullion", chapter: "i", label: "Bullion, Chapter I: Anatomy of a Bar" },
      { kind: "article", slug: "what-good-delivery-actually-means", label: "Journal: What Good Delivery actually means" },
      { kind: "chapter", institute: "bullion", chapter: "iii", label: "Bullion, Chapter III: Spot, Premium, and Spread" },
      { kind: "chapter", institute: "bullion", chapter: "v", label: "Bullion, Chapter V: Regulation and Risk" },
      { kind: "library", slug: "gold-bar", label: "Library: Gold Bar" },
      { kind: "library", slug: "silver-bar", label: "Library: Silver Bar" },
    ],
  },
  {
    slug: "the-loupe-and-the-lab",
    title: "The loupe and the lab",
    dek: "The gemmological literacy expected of a house director, condensed into a single arc.",
    minutes: 70,
    steps: [
      { kind: "chapter", institute: "gemstones", chapter: "i", label: "Gemstones, Chapter I: The Four Cs, Reread" },
      { kind: "article", slug: "the-four-cs-reread", label: "Journal: The Four Cs, reread for the professional" },
      { kind: "chapter", institute: "gemstones", chapter: "iii", label: "Gemstones, Chapter III: Phenomenal Gems" },
      { kind: "article", slug: "what-makes-an-opal-black", label: "Journal: What makes an opal black" },
      { kind: "chapter", institute: "gemstones", chapter: "iv", label: "Gemstones, Chapter IV: Laboratory Practice" },
      { kind: "chapter", institute: "gemstones", chapter: "v", label: "Gemstones, Chapter V: Ethics and Origin" },
      { kind: "library", slug: "black-opal", label: "Library: Black Opal" },
    ],
  },
  {
    slug: "the-quiet-boutique",
    title: "The quiet boutique",
    dek: "Clienteling, storytelling, and aftercare, in a shape a new boutique director can put to work on Monday.",
    minutes: 45,
    steps: [
      { kind: "chapter", institute: "luxury-retail", chapter: "i", label: "Luxury Retail, Chapter I: The Boutique as Theatre" },
      { kind: "chapter", institute: "luxury-retail", chapter: "ii", label: "Luxury Retail, Chapter II: Clienteling" },
      { kind: "article", slug: "the-quiet-craft-of-clienteling", label: "Journal: The quiet craft of clienteling" },
      { kind: "chapter", institute: "luxury-retail", chapter: "iv", label: "Luxury Retail, Chapter IV: Objection and Silence" },
      { kind: "chapter", institute: "luxury-retail", chapter: "v", label: "Luxury Retail, Chapter V: After the Sale" },
    ],
  },
];

import type { LibraryItem } from "./types";

export const southSeaPearlNecklace: LibraryItem = {
  slug: "south-sea-pearl-necklace",
  name: "South Sea Pearl Necklace",
  eyebrow: "The Library, N° 06",
  dek: "The largest cultured pearls the industry produces, grown in warm waters across a wide arc from Australia to Indonesia and the Philippines.",
  overview: [
    "South Sea pearls are cultured in the Pinctada maxima oyster, a large mollusc found across the tropical waters of northern Australia, Indonesia, and the Philippines. Their size, thickness of nacre, and characteristic subtle overtones distinguish them from the smaller Akoya pearls of Japan and from freshwater cultured pearls grown in mussels.",
    "A South Sea pearl necklace is one of the most demanding pieces of jewellery to assemble. Matching a strand of large pearls for size, shape, colour, and lustre requires drawing from many harvests and, often, waiting years to complete a single strand.",
  ],
  history: [
    "Pearl fishing in the tropical waters that now produce cultured South Sea pearls has an ancient history, particularly among indigenous coastal peoples of northern Australia and southeast Asia.",
    "Modern culturing techniques for the Pinctada maxima developed through the twentieth century, allowing the industry to move from unreliable wild harvests to farmed production. Australian, Indonesian, and Filipino operations remain the principal sources of fine South Sea pearls today.",
  ],
  specifications: [
    { label: "Host oyster", value: "Pinctada maxima" },
    { label: "Typical sizes", value: "Approximately 8 mm to 20 mm; strands most commonly 10 to 15 mm" },
    { label: "Common body colours", value: "White, silver, cream, golden" },
    { label: "Shapes", value: "Round, near round, drop, button, baroque" },
    { label: "Length classifications", value: "Choker, princess, matinee, opera, rope" },
  ],
  valueFactors: [
    { label: "Size", text: "South Sea pearls command increasing price with size, particularly beyond 12 mm, because both the underlying pearls and matched strands become materially harder to source." },
    { label: "Lustre", text: "Deep, sharp lustre is the most reliable indicator of nacre quality and is central to value. Dull or chalky surface tone reduces price considerably." },
    { label: "Shape", text: "Round or near round pearls typically command the highest prices in strand form. Drop, baroque, and other shapes are valued in their own right for design pieces." },
    { label: "Colour", text: "White, silver, and golden are the principal categories. Fine golden South Sea pearls with rich, saturated tone are increasingly sought after." },
    { label: "Matching and clasp", text: "In a strand, uniformity of size, shape, colour, and lustre from pearl to pearl reflects skilled assembly. The clasp, often a signed 18k gold and diamond piece, is a legitimate part of the necklace's value." },
  ],
  care: [
    "Put pearls on last, take them off first: perfume, hairspray, and cosmetics dull the surface over time.",
    "Wipe with a soft dry cloth after wear to remove skin oils.",
    "Store in a soft pouch or lined compartment, away from harder jewellery.",
    "Have the strand restrung on silk with knots between each pearl every few years, more often with frequent wear.",
  ],
  faqs: [
    {
      question: "Are South Sea pearls natural or cultured?",
      answer: "Modern commercially available South Sea pearls are cultured: a nucleus and mantle tissue are introduced into the host oyster, which then deposits nacre. Wild natural pearls of similar size are historically rare and largely a category of the past.",
    },
    {
      question: "White or golden?",
      answer: "Both are legitimate categories and each has its adherents. Fine golden South Sea pearls with deep, saturated tone are relatively scarce and can command significant premiums in strand form.",
    },
    {
      question: "How long does it take to grow a South Sea pearl?",
      answer: "Typical culturing periods for South Sea pearls run around two to three years, longer than the smaller Akoya pearl. The longer growth period contributes to their characteristic thick nacre.",
    },
  ],
  salesGuidance: [
    "Lead with lustre, not size. Deep lustre is what carries a strand across a room.",
    "Explain matching visibly: hand pearls side by side and let the client see the uniformity earned by careful assembly.",
    "Discuss aftercare and restringing at the point of sale, not as an afterthought.",
    "Where a signed clasp is part of the piece, treat it as a legitimate portion of the value and provenance conversation.",
  ],
  relatedInstitutes: ["gemstones", "jewellery"],
  relatedArticles: ["how-to-care-for-a-pearl-necklace"],
  knowledgeCheck: [
    {
      prompt: "South Sea pearls are cultured in which oyster?",
      options: [
        { text: "Pinctada fucata (Akoya oyster)" },
        { text: "Pinctada maxima", correct: true },
        { text: "Pinctada margaritifera (Tahitian oyster)" },
        { text: "Hyriopsis cumingii (freshwater mussel)" },
      ],
      explanation: "South Sea pearls are grown in the Pinctada maxima, a large tropical oyster found across northern Australia, Indonesia, and the Philippines.",
    },
    {
      prompt: "Which value factor is generally the most reliable indicator of nacre quality?",
      options: [
        { text: "Weight" },
        { text: "Lustre", correct: true },
        { text: "Body colour" },
        { text: "Number of pearls in the strand" },
      ],
      explanation: "Deep, sharp lustre is the visible signature of well developed nacre and is central to South Sea pearl value.",
    },
    {
      prompt: "Why should knotted strands of pearls be periodically restrung?",
      options: [
        { text: "To increase the number of pearls" },
        { text: "To reduce weight" },
        { text: "To protect against pearl loss and wear where pearls contact each other", correct: true },
        { text: "To change the metal used in the clasp" },
      ],
      explanation: "Silk stretches and dirties over time, and knots between pearls protect against complete strand loss if the string breaks. Periodic restringing is standard care.",
    },
  ],
};

export default southSeaPearlNecklace;

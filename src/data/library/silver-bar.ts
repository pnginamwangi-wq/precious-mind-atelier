import type { LibraryItem } from "./types";

export const silverBar: LibraryItem = {
  slug: "silver-bar",
  name: "Silver Bar",
  eyebrow: "The Library, N° 02",
  dek: "Silver is the working metal of the precious market, produced in cast and minted bars from one ounce up to the thousand ounce wholesale format.",
  overview: [
    "A silver bar is refined silver cast or minted to a defined weight and stamped with the refiner's mark, fineness, and, in most modern retail formats, a serial number. Silver's higher density-adjusted value and its industrial demand give it a different market character to gold, though the bar formats and their vocabulary echo the gold market closely.",
    "Wholesale silver bars, produced to a market recognised specification with a nominal weight around 1000 troy ounces, move between accredited vaults. Retail bars, from one ounce upwards, are the pieces most private clients encounter.",
  ],
  history: [
    "Silver has served as a monetary metal for longer than gold has been used in coinage, and the practice of casting refined silver into bar form for trade is documented across ancient Near Eastern and Mediterranean civilisations.",
    "Modern wholesale silver bar specifications were formalised alongside gold in the twentieth century, with the London silver market operating a comparable Good Delivery standard covering weight range, minimum fineness, and marking.",
  ],
  specifications: [
    { label: "Wholesale nominal weight", value: "Approximately 1000 troy ounces (about 31.1 kg)" },
    { label: "Wholesale minimum fineness", value: "999 parts per thousand (LBMA Good Delivery silver)" },
    { label: "Common retail weights", value: "1 oz, 5 oz, 10 oz, 100 oz, 1 kg" },
    { label: "Common retail fineness", value: "999 to 999.9 parts per thousand" },
    { label: "Required markings", value: "Refiner mark, weight, fineness, serial number where applicable" },
  ],
  valueFactors: [
    { label: "Metal content", text: "As with gold, metal content is the dominant factor: weight in troy ounces multiplied by the prevailing spot price." },
    { label: "Premium over spot", text: "Retail silver typically carries a proportionally larger premium over spot than retail gold, because fabrication and handling costs are meaningful relative to the underlying metal value." },
    { label: "Refiner and format", text: "Bars from currently accredited refiners in tamper evident packaging generally resell more readily than unfamiliar or damaged product." },
    { label: "Tarnish and condition", text: "Silver tarnishes on contact with airborne sulphur compounds. Original sealed packaging preserves the surface." },
  ],
  care: [
    "Keep bars in original sealed packaging to slow tarnishing.",
    "Store in a dry, ventilated space. Silver is more sensitive to humidity than gold.",
    "Handle unsealed bars with cotton gloves. Fingerprints etch into the surface over time.",
    "Do not polish investment grade bars. Any polishing alters the surface the market accepts.",
  ],
  faqs: [
    {
      question: "Why is silver's retail premium proportionally higher than gold's?",
      answer: "Silver's per ounce value is much lower than gold's, so the fixed costs of refining, minting, packaging, and distribution represent a larger fraction of the total price. That mathematics, not any judgement about the metal, is the main driver.",
    },
    {
      question: "Is a tarnished bar worth less?",
      answer: "It depends on the format. On a sealed investment bar, tarnish on the seal or surface can weaken resale. On unsealed cast bars, moderate tarnish is generally accepted as normal wear and priced accordingly.",
    },
    {
      question: "Should silver be stored differently to gold?",
      answer: "Yes. Silver benefits from lower humidity and less airborne sulphur exposure than gold. Vaults intended for long term silver storage will often control both.",
    },
  ],
  salesGuidance: [
    "Explain silver's premium structure to clients before quoting a price.",
    "Prefer sealed retail bars from currently accredited refiners for private clients.",
    "Discuss storage and tarnishing before the client takes delivery.",
    "For larger allocations, walk through the wholesale specification and its implications for future liquidity.",
  ],
  relatedInstitutes: ["precious-metals", "bullion"],
  relatedArticles: ["what-good-delivery-actually-means", "reading-a-hallmark"],
  knowledgeCheck: [
    {
      prompt: "Why does retail silver typically carry a larger percentage premium over spot than retail gold?",
      options: [
        { text: "Silver is chemically more valuable than gold" },
        { text: "Fabrication and handling costs are larger relative to silver's per ounce value", correct: true },
        { text: "Silver is more difficult to refine than gold" },
        { text: "Silver has a shorter market history" },
      ],
      explanation: "The fixed costs of refining, minting, packaging, and distribution are a larger fraction of silver's lower per ounce value than of gold's, producing a proportionally larger retail premium.",
    },
    {
      prompt: "Which is the most common storage risk specific to silver?",
      options: [
        { text: "Radioactive decay" },
        { text: "Tarnishing from airborne sulphur", correct: true },
        { text: "Loss of density over time" },
        { text: "Optical clouding" },
      ],
      explanation: "Silver reacts with airborne sulphur compounds to form silver sulphide, a dark tarnish. Sealed packaging and controlled storage slow the reaction.",
    },
    {
      prompt: "The nominal wholesale weight for a London Good Delivery silver bar is approximately:",
      options: [
        { text: "100 troy ounces" },
        { text: "400 troy ounces" },
        { text: "1000 troy ounces", correct: true },
        { text: "5000 troy ounces" },
      ],
      explanation: "LBMA Good Delivery silver bars have a nominal weight around 1000 troy ounces, distinct from the 400 troy ounce gold specification.",
    },
  ],
};

export default silverBar;

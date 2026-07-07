import type { LibraryItem } from "./types";

export const goldBar: LibraryItem = {
  slug: "gold-bar",
  name: "Gold Bar",
  eyebrow: "The Library, N° 01",
  dek: "The single most recognised form of investment grade gold, produced by refiners and mints to weight, fineness, and packaging specifications the professional market has agreed on.",
  overview: [
    "A gold bar is a piece of refined gold cast or minted to a defined weight, marked with the refiner's identity, its fineness, and, in most modern cases, a unique serial number. Bars exist in a spectrum from the wholesale 400 troy ounce London Good Delivery bar down to retail pieces of one gram, and each size is a separate product with its own market.",
    "Wholesale bars trade between accredited vaults, largely outside consumer view. Retail bars, typically from one gram to one kilogram, are the pieces most private clients ever hold. Both are gold. They are not the same product.",
  ],
  history: [
    "The practice of casting gold into standardised bars for trade is ancient. Ingots and bar shaped weights of gold have circulated as high value stores of wealth for millennia across the Mediterranean, Asia, and the Americas.",
    "The modern specification of a wholesale gold bar dates to the reorganisation of the London gold market in the twentieth century. Weight range, minimum fineness, and required markings were codified so that a bar produced by one accredited refiner could enter any vault in the market without needing to be reassayed.",
  ],
  specifications: [
    { label: "Wholesale weight", value: "Approximately 400 troy ounces (about 12.4 kg)" },
    { label: "Wholesale minimum fineness", value: "995 parts per thousand (LBMA Good Delivery gold)" },
    { label: "Common retail weights", value: "1 g, 5 g, 10 g, 100 g, 250 g, 500 g, 1 kg" },
    { label: "Common retail fineness", value: "999.9 (four nines) parts per thousand" },
    { label: "Required markings", value: "Refiner mark, weight, fineness, serial number, year (varies by format)" },
  ],
  valueFactors: [
    { label: "Metal content", text: "The overwhelming component of a bar's value is the weight of pure gold it contains, priced against the prevailing spot market." },
    { label: "Refiner", text: "Bars from currently accredited refiners generally trade with tighter resale spreads than bars from unfamiliar or delisted producers." },
    { label: "Format and packaging", text: "Minted bars in tamper evident assay cards typically carry a modest premium over cast bars of identical metal content, in exchange for provenance and presentation." },
    { label: "Condition", text: "Damage to seals, packaging, or markings can weaken resale, since it raises questions the market prefers not to ask." },
  ],
  care: [
    "Handle bars by their edges or through gloves to avoid marking the surface.",
    "Keep minted bars in their original tamper evident packaging. The packaging is part of the product.",
    "Store bars in a secure vault or safe. Insurance and access records matter as much as the physical object.",
    "Never attempt to clean or polish a bar. Its market accepts it as it left the refiner.",
  ],
  faqs: [
    {
      question: "Is a one kilogram bar a Good Delivery bar?",
      answer: "No. Good Delivery refers to a specific wholesale specification, notably a 400 troy ounce bar. A one kilogram bar from a Good Delivery listed refiner is a retail product from a listed refiner; it is not itself a Good Delivery bar in the market's technical sense.",
    },
    {
      question: "Cast bar or minted bar?",
      answer: "Both contain the same gold at the stated fineness. Cast bars tend to be lower cost and are favoured by investors focused on weight and liquidity. Minted bars offer finer finish and tamper evident packaging, and are often preferred where presentation matters.",
    },
    {
      question: "Do serial numbers matter?",
      answer: "Yes. A serial number, combined with the refiner's certificate, is the practical anchor of a bar's provenance and helps a buyer confirm the piece has not been reported as lost or stolen.",
    },
  ],
  salesGuidance: [
    "Lead with the specification: refiner, weight, fineness, and format, before discussing price.",
    "Distinguish wholesale Good Delivery from retail products from listed refiners.",
    "Confirm packaging is intact and the assay card is present before completing a sale.",
    "Record serial numbers on the client's paperwork. It is a small step that pays for itself.",
  ],
  relatedInstitutes: ["precious-metals", "bullion"],
  relatedArticles: ["what-good-delivery-actually-means", "reading-a-hallmark"],
  knowledgeCheck: [
    {
      prompt: "A one kilogram bar from an LBMA listed refiner is best described as:",
      options: [
        { text: "A London Good Delivery bar" },
        { text: "A retail bar from a Good Delivery listed refiner", correct: true },
        { text: "An unrefined ingot" },
        { text: "A commemorative coin" },
      ],
      explanation: "London Good Delivery applies to a specific wholesale specification, typically a 400 troy ounce bar. Smaller bars from listed refiners are retail products, not Good Delivery bars.",
    },
    {
      prompt: "Which factor is generally the largest single component of a gold bar's value?",
      options: [
        { text: "The weight of pure gold it contains", correct: true },
        { text: "The bar's decorative packaging" },
        { text: "The bar's country of manufacture" },
        { text: "The year the bar was cast" },
      ],
      explanation: "A bar's value is dominated by its metal content, priced against the prevailing spot market. Other factors adjust the premium at the margin.",
    },
    {
      prompt: "Why should tamper evident packaging on a minted bar be preserved?",
      options: [
        { text: "It contains additional gold" },
        { text: "It confers Good Delivery status" },
        { text: "It supports provenance and resale confidence", correct: true },
        { text: "It has legal tender status" },
      ],
      explanation: "The assay card and tamper evident seal are part of the product; intact packaging supports provenance and typically preserves resale value.",
    },
  ],
};

export default goldBar;

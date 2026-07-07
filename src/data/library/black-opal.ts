import type { LibraryItem } from "./types";

export const blackOpal: LibraryItem = {
  slug: "black-opal",
  name: "Black Opal",
  eyebrow: "The Library, N° 04",
  dek: "A phenomenal gem whose dark body tone lets its play of colour read with the intensity that has made a small region of Australia one of the most important gemstone provinces in the world.",
  overview: [
    "Black opal is a variety of precious opal in which the body tone, the underlying darkness beneath the play of colour, sits in the deepest tier of a formal industry scale. The dark body absorbs stray light, allowing the diffracted colours produced by microscopic silica structures to appear with dramatic contrast.",
    "The category is distinct from dark opal and from doublets and triplets. A solid black opal is a single piece of natural opal with a naturally dark body; a doublet or triplet is a composite that produces a similar visual effect using a dark backing under a slice of precious opal.",
  ],
  history: [
    "Opal has been known and valued since antiquity, and appears in classical literature as a gem prized for its shifting colours. The specific category of black opal became commercially significant with the discovery of the Lightning Ridge fields in New South Wales in the late nineteenth century.",
    "Lightning Ridge remains the principal source of the world's fine black opal. Smaller quantities of dark bodied opal are produced elsewhere, but the term black opal is most often associated with the Australian material.",
  ],
  specifications: [
    { label: "Mineral", value: "Hydrated silica (SiO2·nH2O), amorphous" },
    { label: "Hardness (Mohs)", value: "Approximately 5.5 to 6.5" },
    { label: "Refractive index", value: "About 1.37 to 1.47" },
    { label: "Body tone (industry scale)", value: "N1 to N4 for black opal" },
    { label: "Principal source", value: "Lightning Ridge, New South Wales, Australia" },
  ],
  valueFactors: [
    { label: "Body tone", text: "The darker the body tone, the more vividly the play of colour reads. N1 to N2 tones command significant premiums over lighter classifications." },
    { label: "Play of colour", text: "The dominant colour, its brightness, the pattern it forms, and how continuously it appears as the stone is moved together drive the visual quality." },
    { label: "Red on black", text: "Strong red play of colour on a dark body tone is the trade's traditional benchmark for the finest black opal." },
    { label: "Origin and disclosure", text: "Documented Australian origin and full disclosure of any treatment or composite construction support price." },
    { label: "Cut and weight", text: "As with any gemstone, well proportioned cutting that maximises visible play of colour without compromising durability is central to value." },
  ],
  care: [
    "Opal is softer than most gemstones and should be worn with awareness of impact and abrasion.",
    "Avoid rapid temperature changes; opal can craze if shocked between hot and cold.",
    "Clean gently with a soft cloth and mild soap solution. Never use ultrasonic or steam cleaners.",
    "Store in a soft pouch, away from harder stones and jewellery that can scratch the surface.",
  ],
  faqs: [
    {
      question: "Is a doublet a real black opal?",
      answer: "A doublet contains a slice of real opal bonded to a dark backing, and can look beautiful, but it is a composite, not a solid black opal. Ethical practice requires the composite structure to be disclosed in writing.",
    },
    {
      question: "Do black opals need to be kept in water?",
      answer: "No. That is a common misconception. Fine Australian opal is stable and does not require rehydration. Prolonged soaking is not recommended.",
    },
    {
      question: "Why does the same stone look different in different rooms?",
      answer: "Opal is highly sensitive to light source and viewing angle. A stone that shows a certain palette in daylight can look quite different under warm indoor lighting. Always view an opal in more than one lighting condition before decisions.",
    },
  ],
  salesGuidance: [
    "Ask for a body tone rating and any origin documentation before quoting.",
    "Confirm in writing whether the stone is solid, doublet, or triplet.",
    "Show clients the opal in motion, ideally in daylight and warm light, so they see the play of colour they are actually buying.",
    "Set expectations about durability compared to harder gemstones; the client should understand what wearing opal in daily life implies.",
  ],
  relatedInstitutes: ["gemstones", "jewellery"],
  relatedArticles: ["what-makes-an-opal-black"],
  knowledgeCheck: [
    {
      prompt: "In the trade, the phrase black opal refers primarily to:",
      options: [
        { text: "An opaque black gemstone with no play of colour" },
        { text: "An opal whose body tone is dark enough for its play of colour to read with high contrast", correct: true },
        { text: "Any opal from Australia" },
        { text: "A synthetic opal" },
      ],
      explanation: "Black opal is defined by body tone, the darkness beneath the play of colour. A dark body allows the diffracted colours to read vividly.",
    },
    {
      prompt: "A doublet differs from a solid black opal because:",
      options: [
        { text: "It uses a different mineral" },
        { text: "It is a composite of a slice of opal bonded to a dark backing", correct: true },
        { text: "It has no play of colour" },
        { text: "It is heavier" },
      ],
      explanation: "A doublet is a composite structure that reproduces the visual effect of a black opal at lower cost. It must be disclosed as such.",
    },
    {
      prompt: "Which of the following is not appropriate care for a black opal?",
      options: [
        { text: "Cleaning with a soft cloth and mild soap solution" },
        { text: "Ultrasonic cleaning", correct: true },
        { text: "Storing in a soft pouch away from harder stones" },
        { text: "Avoiding rapid temperature changes" },
      ],
      explanation: "Ultrasonic and steam cleaning are not appropriate for opal; both risk crazing or damage.",
    },
  ],
};

export default blackOpal;

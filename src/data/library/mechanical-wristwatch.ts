import type { LibraryItem } from "./types";

export const mechanicalWristwatch: LibraryItem = {
  slug: "mechanical-wristwatch",
  name: "Mechanical Wristwatch",
  eyebrow: "The Library, N° 07",
  dek: "A wristwatch whose time is kept by a wound spring and a balance wheel, not a battery. The mechanical wristwatch is the object at the centre of haute horlogerie.",
  overview: [
    "A mechanical wristwatch keeps time using a mainspring, a gear train, an escapement, and a balance wheel, together forming a small mechanical system that oscillates at a regular frequency. Modern mechanical movements typically beat at 4 Hz, meaning the balance oscillates back and forth eight times each second.",
    "Two subcategories cover almost all mechanical wristwatches sold today. A hand wound movement is powered by winding the crown. An automatic movement adds a rotor that winds the mainspring as the wearer moves. Both use the same underlying principles.",
  ],
  history: [
    "Mechanical timekeeping developed over centuries, with portable spring driven watches becoming widely available from the sixteenth century onward. The wristwatch, as a category, became widely worn in the early twentieth century, first among military users and then in general civilian dress.",
    "The Swiss watch industry emerged as the dominant producer of fine mechanical wristwatches, concentrated particularly in the Jura mountains and the Vallée de Joux. Post quartz, the mechanical wristwatch reoriented itself around craft and complication rather than pure timekeeping accuracy.",
  ],
  specifications: [
    { label: "Movement type", value: "Hand wound or automatic mechanical" },
    { label: "Typical beat rate", value: "4 Hz (28,800 vibrations per hour)" },
    { label: "Typical power reserve", value: "40 to 72 hours; long reserve movements offer 5 to 10 days" },
    { label: "Case materials", value: "Steel, gold, platinum, titanium, ceramic" },
    { label: "Water resistance", value: "Varies by design; dress watches often 30 metres, sport watches 100 to 300 metres or more" },
  ],
  valueFactors: [
    { label: "Movement quality", text: "The movement is the heart of the watch. Its design, finish, complications, and origin drive much of the value." },
    { label: "House and provenance", text: "A watch from an established manufacture with clear original papers, service records, and a documented ownership history is worth materially more than a comparable watch without them." },
    { label: "Condition", text: "Original dial, original hands, unpolished case in as new sharpness, and complete original packaging support value. Aggressive polishing that softens case lines can permanently reduce a piece's worth." },
    { label: "Complications", text: "Perpetual calendars, minute repeaters, tourbillons, and split seconds chronographs, when executed well, command significant premiums over time only pieces." },
    { label: "Rarity", text: "Limited references, discontinued models, and specific dial variants can command sharp premiums driven by collector demand." },
  ],
  care: [
    "Service a mechanical wristwatch every four to seven years, or as recommended by the manufacture. Lubricants dry out and wear begins if servicing is neglected.",
    "Keep the watch away from strong magnetic fields, which can affect timekeeping.",
    "Respect the stated water resistance. Do not wear pieces designed for dress use in swimming or diving.",
    "Wind hand wound movements fully, gently, once a day. Do not force the crown past resistance.",
  ],
  faqs: [
    {
      question: "Is a mechanical watch more accurate than a quartz watch?",
      answer: "No. Modern quartz movements are typically more accurate than mechanical movements. A mechanical watch is chosen for craft, tradition, and the way the mechanism reads, not for absolute timekeeping precision.",
    },
    {
      question: "Does a tourbillon make a watch more accurate?",
      answer: "Historically, the tourbillon was designed to average out the effect of gravity in pocket watches held vertically. In a wristwatch worn on a moving wrist, the practical accuracy benefit is small. The tourbillon in a modern wristwatch is primarily a demonstration of craft.",
    },
    {
      question: "Should the case be polished?",
      answer: "For vintage or valuable modern pieces, polishing that softens original case lines can reduce value significantly. Prefer light cleaning to polishing, and consult a specialist before any restoration.",
    },
  ],
  salesGuidance: [
    "Talk about the movement before the case. It is where the value lives.",
    "Distinguish complications that solve a problem, such as a chronograph for timing, from complications that display craft, such as a tourbillon.",
    "Ask about original papers, boxes, and service history at every stage of a pre owned transaction.",
    "Explain servicing intervals to clients as part of the total cost of ownership, not as an afterthought.",
  ],
  relatedInstitutes: ["horology"],
  relatedArticles: ["anatomy-of-a-mechanical-movement"],
  knowledgeCheck: [
    {
      prompt: "Which best describes what a modern tourbillon does in a wristwatch?",
      options: [
        { text: "It is a battery replacement" },
        { text: "It significantly improves accuracy over a standard escapement in daily wear" },
        { text: "It rotates the escapement, primarily as a demonstration of craft in a wristwatch context", correct: true },
        { text: "It doubles the power reserve" },
      ],
      explanation: "The tourbillon rotates the escapement to average out gravity effects. In a wristwatch worn on a moving wrist, its accuracy benefit is small; it is primarily a display of craft.",
    },
    {
      prompt: "The most valuable single specification for many collectable vintage watches is:",
      options: [
        { text: "The bracelet weight" },
        { text: "The originality and condition of the dial, hands, and case", correct: true },
        { text: "Whether the watch has a leather strap" },
        { text: "The colour of the box" },
      ],
      explanation: "Originality and condition of the visible components, especially the dial, are central to collectable value. Refinished dials and heavily polished cases reduce value.",
    },
    {
      prompt: "How often should a typical mechanical wristwatch be serviced?",
      options: [
        { text: "Every month" },
        { text: "Every four to seven years, or per the manufacture", correct: true },
        { text: "Only when it stops running entirely" },
        { text: "Never" },
      ],
      explanation: "Lubricants dry out and mechanical parts wear over time. Manufactures typically recommend service every four to seven years.",
    },
  ],
};

export default mechanicalWristwatch;

import type { LibraryItem } from "./types";

export const diamondSolitaireRing: LibraryItem = {
  slug: "diamond-solitaire-ring",
  name: "Diamond Solitaire Ring",
  eyebrow: "The Library, N° 05",
  dek: "A single diamond, held by a setting whose sole purpose is to present it well. The solitaire is one of the most demanding designs in fine jewellery precisely because it hides nothing.",
  overview: [
    "A diamond solitaire ring is defined by a single centre stone, presented with minimal ornament. The setting exists to secure the stone and to let light reach it. Every other design choice, metal, prong count, gallery height, band profile, is disciplined by the same question: does it serve the stone.",
    "Because the design is so pared back, small choices carry a great deal of weight. Prong number and shape, the height of the setting, the finish of the band, the alignment of any accent detailing: each is visible in a way it would not be inside a more elaborate design.",
  ],
  history: [
    "The single stone ring has existed in various forms for centuries, but the modern diamond solitaire as an engagement ring convention was strongly shaped by twentieth century marketing and by the increasing availability of high quality round brilliant cut diamonds after developments in cutting technology in the early nineteen hundreds.",
    "The six prong Tiffany style setting, introduced in the late nineteenth century, established a template that raised the stone above the band and maximised the visible pavilion. Many later designs are conscious variations on that idea.",
  ],
  specifications: [
    { label: "Centre stone", value: "Typically a single diamond, most often round brilliant cut" },
    { label: "Setting materials", value: "Platinum, 18k white gold, 18k yellow gold, 18k rose gold" },
    { label: "Prong count", value: "Commonly four or six; occasionally three or bezel set" },
    { label: "Common band widths", value: "1.6 mm to 2.5 mm for the base band" },
    { label: "Documentation", value: "Independent grading report (e.g. GIA) for the centre stone" },
  ],
  valueFactors: [
    { label: "Centre stone", text: "The centre diamond drives most of the ring's value. Colour, clarity, cut, and carat weight all matter, with cut widely considered the most impactful for beauty." },
    { label: "Metal choice", text: "Platinum is denser, more wear resistant in fine sections, and hypoallergenic for most clients. 18k gold alloys carry their own trade offs in colour, wear, and price." },
    { label: "Setting craft", text: "Prong finishing, gallery detailing, and the precision of stone seating separate a well made solitaire from a mass produced one. The quality of the work is visible under a loupe." },
    { label: "House and provenance", text: "A ring from an established house with documentation can carry a premium reflecting brand and provenance, distinct from the metal and stone value." },
    { label: "Certification", text: "A recent, respected independent report on the centre stone materially supports resale confidence." },
  ],
  care: [
    "Clean gently with warm water, mild detergent, and a soft brush. Avoid dropping the ring or handling it by the stone.",
    "Remove before manual work, gym sessions, or contact with harsh chemicals; even a diamond can chip on hard impact against a hard edge.",
    "Have a jeweller check the prongs annually. Prong wear is the most common cause of centre stone loss.",
    "Store in a soft lined compartment, apart from other jewellery, to prevent scratching softer metals and stones.",
  ],
  faqs: [
    {
      question: "Four prong or six prong?",
      answer: "Four prong settings show more of the diamond and are generally lighter in appearance. Six prong settings, in the Tiffany tradition, hold the stone more redundantly, which some clients prefer for peace of mind. Either is defensible; the choice is largely aesthetic and lifestyle driven.",
    },
    {
      question: "Platinum or white gold?",
      answer: "Both can look similar when new. Platinum patinas gradually to a soft matte and is generally denser and more resistant to prong wear in fine sections. White gold is rhodium plated in most modern rings and requires periodic replating to maintain its bright white surface.",
    },
    {
      question: "Should the centre stone be certified?",
      answer: "For any centre stone above a modest size, an independent grading report from a widely respected laboratory is standard practice. It supports insurance, resale, and the client's confidence in what they are buying.",
    },
  ],
  salesGuidance: [
    "Lead with the centre stone, not the setting price.",
    "Talk about cut quality first for the client's eye, colour and clarity next, carat weight last for size.",
    "Explain metal choice as a lifestyle question, not only an aesthetic one.",
    "Confirm the grading report and prong condition before delivery, and note prong maintenance in the aftercare conversation.",
  ],
  relatedInstitutes: ["gemstones", "jewellery"],
  relatedArticles: ["the-four-cs-reread", "reading-a-hallmark"],
  knowledgeCheck: [
    {
      prompt: "Which factor most affects how beautiful a round brilliant diamond looks in a solitaire?",
      options: [
        { text: "Its colour grade alone" },
        { text: "Its cut quality", correct: true },
        { text: "Its country of origin" },
        { text: "The band width of the ring" },
      ],
      explanation: "Cut is the only C the polisher controls and it drives brightness, fire, and scintillation, which is what the eye registers as beauty.",
    },
    {
      prompt: "The most common cause of centre stone loss in a solitaire ring is:",
      options: [
        { text: "Corrosion of the stone" },
        { text: "Prong wear left unchecked", correct: true },
        { text: "Ultraviolet exposure" },
        { text: "The band changing size" },
      ],
      explanation: "Prongs wear over time with contact and knocks. Regular inspection and retipping is the standard preventive practice.",
    },
    {
      prompt: "A key visible difference between platinum and rhodium plated white gold is that:",
      options: [
        { text: "Only platinum contains any precious metal" },
        { text: "White gold requires periodic replating to maintain its bright white surface", correct: true },
        { text: "Platinum tarnishes visibly within weeks" },
        { text: "White gold is heavier than platinum" },
      ],
      explanation: "White gold is typically finished with rhodium plating that wears over time. Platinum does not require plating; its surface patinas naturally.",
    },
  ],
};

export default diamondSolitaireRing;

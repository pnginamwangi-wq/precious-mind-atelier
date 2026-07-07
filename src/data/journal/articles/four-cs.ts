import type { Article } from "../types";

export const fourCs: Article = {
  slug: "the-four-cs-reread",
  title: "The Four Cs, reread for the professional",
  dek: "Colour, clarity, cut, and carat weight are the vocabulary of the diamond trade. They also hide the assumptions that separate a shop assistant from an advisor.",
  category: "diamonds",
  tags: ["diamonds", "grading", "gemstones", "GIA"],
  readingMinutes: 9,
  publishedAt: "2026-06-16",
  featured: false,
  editorsPick: true,
  relatedInstitutes: ["gemstones", "jewellery"],
  relatedLibrary: ["diamond-solitaire-ring"],
  body: [
    {
      kind: "paragraph",
      text: "Every serious student of gemstones eventually returns to the Four Cs, not because they exhaust the subject, but because they compress an enormous amount of judgement into four words. Colour, clarity, cut, and carat weight are, in that order, roughly how the trade prices a diamond. They are also, in reverse order, roughly how a beginner tends to notice a diamond. Bridging that gap is much of what serious training is for.",
    },
    {
      kind: "heading",
      text: "Colour, from D to Z",
    },
    {
      kind: "paragraph",
      text: "In a colourless diamond, colour is measured as the absence of colour. The GIA scale runs from D, meaning no perceptible tint under controlled light and against a reference set, down through the alphabet to Z, where the diamond shows visible yellow or brown body colour. The scale is not linear in value. The perceptual jump between D and F is much smaller than the price jump, and the perceptual jump between L and N is much larger than most people expect.",
    },
    {
      kind: "paragraph",
      text: "Fancy coloured diamonds, pinks, blues, yellows saturated enough to be described as fancy, sit on a separate grading system with its own vocabulary. The point to hold in mind is that the D to Z scale exists for the near colourless spectrum only.",
    },
    {
      kind: "heading",
      text: "Clarity, and what an inclusion is",
    },
    {
      kind: "paragraph",
      text: "Clarity describes the presence, size, position, and character of inclusions inside a diamond and blemishes on its surface. The GIA scale runs from Flawless and Internally Flawless down through VVS, VS, SI, and I. Under a ten power loupe, a Flawless diamond shows no inclusions and no blemishes. An I clarity diamond may show inclusions visible to the naked eye.",
    },
    {
      kind: "paragraph",
      text: "The advisor's discipline is to remember that a grade is not a description. Two SI2 diamonds can look very different: one with a small dark inclusion under the table, one with a scattered set of pale inclusions off to one side. Read the plot on the report, not only the letters.",
    },
    {
      kind: "heading",
      text: "Cut, the only C the maker controls",
    },
    {
      kind: "paragraph",
      text: "Colour, clarity, and carat weight are largely set by the rough. Cut is what the polisher does with what nature provided. It is the only C entirely under human control, and it is the one that most affects how a diamond looks. Two round brilliants of identical colour, clarity, and weight can behave completely differently in the same lighting if one is cut well and the other is cut merely to save weight.",
    },
    {
      kind: "paragraph",
      text: "Modern cut grading for round brilliants considers proportions, symmetry, and polish, and their combined effect on brightness, fire, and scintillation. A well cut stone earns its price because a great deal of rough was sacrificed to reach it. This is the argument to have with a client who is optimising for carat weight alone.",
    },
    {
      kind: "heading",
      text: "Carat weight, and why it lies",
    },
    {
      kind: "paragraph",
      text: "Carat is the simplest C to measure and the easiest to misread. Weight is not the same as visible size, since a poorly proportioned stone can hide much of its weight in the pavilion where the eye cannot see it. Weight is also priced in steps: significant per carat price jumps occur around the half carat and one carat boundaries, so a 0.99 carat stone can be markedly less expensive than a 1.01 carat stone of otherwise identical description.",
    },
    {
      kind: "quote",
      text: "Cut is the only C entirely under human control, and it is the one that most affects how a diamond looks.",
    },
    {
      kind: "heading",
      text: "The advisor's reread",
    },
    {
      kind: "list",
      items: [
        "Lead with cut for beauty, lead with clarity plot for character, lead with carat for weight, and lead with colour for coolness of tone.",
        "Prefer describing a diamond in words a client can visualise over reciting a grade back to them.",
        "Distinguish the report, which is a considered opinion, from the diamond, which is the object in the client's hand.",
        "When the Four Cs feel exhausted, ask about origin, treatment disclosure, and how the piece will be worn.",
      ],
    },
  ],
};

export default fourCs;

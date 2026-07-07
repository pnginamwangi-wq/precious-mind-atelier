import type { Article } from "../types";

export const hallmarks: Article = {
  slug: "reading-a-hallmark",
  title: "Reading a hallmark, mark by mark",
  dek: "The small punches on a piece of precious metal are a compressed contract between maker, assay office, and buyer. Learning to read them is the first fluency of the trade.",
  category: "precious-metals",
  tags: ["hallmarks", "assay", "gold", "silver", "jewellery"],
  readingMinutes: 7,
  publishedAt: "2026-06-30",
  editorsPick: true,
  featured: true,
  relatedInstitutes: ["precious-metals", "jewellery"],
  relatedLibrary: ["gold-bar", "silver-bar"],
  body: [
    {
      kind: "paragraph",
      text: "A hallmark is one of the oldest forms of consumer protection in continuous use anywhere in the world. The English system of striking a maker's mark, a fineness mark, an assay office mark, and a date letter into a piece of silver dates in one form or another to the fourteenth century, and its logic has been quietly copied across most jurisdictions that regulate precious metal.",
    },
    {
      kind: "paragraph",
      text: "The purpose has not changed. A buyer, standing in a shop, cannot melt down a ring to test its purity. The hallmark is a promise, made by a body that is not the maker, that the metal is what the maker says it is. It is a small piece of stamped bureaucracy that lets trust travel between strangers.",
    },
    { kind: "heading", text: "The four marks, in order" },
    {
      kind: "paragraph",
      text: "In a full compulsory system, four separate marks tell the story of a piece. The sponsor's or maker's mark identifies who submitted the article for testing. The fineness mark records the metal and its purity, typically as parts per thousand: 750 for eighteen karat gold, 925 for sterling silver, 950 for platinum. The assay office mark identifies which independent testing office performed the assay. The date letter records the year the piece was tested.",
    },
    {
      kind: "paragraph",
      text: "Read together, those four marks answer four practical questions. Who made it. What is it. Who checked. When was it checked. A well marked piece answers all four in a strip of punches smaller than a fingernail.",
    },
    { kind: "heading", text: "Compulsory versus voluntary regimes" },
    {
      kind: "paragraph",
      text: "Different countries treat hallmarking differently. In the United Kingdom, the assay is compulsory above small weight thresholds, and it is a criminal offence to describe an untested article using a regulated metal term. In much of continental Europe the picture is similar but the mark set differs. In the United States, by contrast, hallmarking is largely voluntary: the FTC sets rules for accurate description, but there is no state assay office system.",
    },
    {
      kind: "paragraph",
      text: "A director who works internationally needs to hold both models in mind. Absence of a hallmark is not automatic evidence of forgery in an American context; presence of a full four punch strip is not automatic evidence of authenticity in a British one, since punches can be counterfeited. What the marks do is shift the burden of proof: an accurate hallmark says that a specific, named, third party has publicly staked its reputation on the metal.",
    },
    { kind: "heading", text: "What the marks cannot tell you" },
    {
      kind: "paragraph",
      text: "A hallmark records fineness, not quality of workmanship, not artistic value, not provenance beyond the maker and the year. A rough cast pendant and a masterwork of chasing can carry identical hallmarks. Understanding this boundary is what separates a technician from an advisor. The hallmark answers the metallurgical question, and only the metallurgical question. Everything else, the eye of the person reading the piece must answer for itself.",
    },
    {
      kind: "quote",
      text: "The hallmark is a promise, made by a body that is not the maker, that the metal is what the maker says it is.",
    },
    { kind: "heading", text: "How to practise" },
    {
      kind: "list",
      items: [
        "Handle marked pieces under a loupe in good light: the four marks are often smaller than the loupe itself.",
        "Learn one full system, deeply, before comparing systems. British assay marks are a common starting point.",
        "When a piece carries only a fineness stamp and no assay office mark, treat that as a description by the maker, not an independent guarantee.",
        "When a piece carries no marks at all, ask why, and never round the answer up.",
      ],
    },
    {
      kind: "paragraph",
      text: "Fluency with hallmarks is one of the small disciplines that separates people who talk about jewellery from people who read it. It costs an hour a week for a year, and once acquired, it never leaves the hand.",
    },
  ],
};

export default hallmarks;

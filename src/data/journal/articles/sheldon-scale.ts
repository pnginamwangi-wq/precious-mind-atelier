import type { Article } from "../types";

export const sheldonScale: Article = {
  slug: "the-sheldon-scale-explained",
  title: "The Sheldon scale, explained",
  dek: "How a mid twentieth century numismatist's numbered ladder became the global vocabulary for describing the condition of a coin.",
  category: "coins",
  tags: ["numismatics", "grading", "Sheldon", "PCGS", "NGC"],
  readingMinutes: 8,
  publishedAt: "2026-06-23",
  editorsPick: true,
  relatedInstitutes: ["numismatics"],
  relatedLibrary: ["gold-coin"],
  body: [
    {
      kind: "paragraph",
      text: "Ask two collectors to describe the same coin in plain English and you will usually get two different answers. Ask them for a Sheldon number and, with training, you will get the same one. That is the point of a grading scale: to compress a subtle visual judgement into a shared number that can travel between people who have never met.",
    },
    {
      kind: "heading",
      text: "A ladder from 1 to 70",
    },
    {
      kind: "paragraph",
      text: "Dr. William Sheldon proposed the scale in 1949 for early American large cents, using a 1 to 70 range so that a coin could be described numerically. In modern use the ladder covers every coin the major services grade: a Sheldon 1 is a coin so worn its type is barely identifiable, a Sheldon 70 is a struck coin with no post strike imperfections visible under standard magnification. Between those extremes sit named tiers, About Good, Fine, Very Fine, Extremely Fine, About Uncirculated, and Mint State, each with numeric refinements.",
    },
    {
      kind: "paragraph",
      text: "The tiers matter because value tends to jump at the boundaries rather than climb smoothly through the ladder. The gap between a Mint State 63 and a Mint State 65 can be much larger, in market terms, than the gap between two adjacent numbers deeper in the circulated range, because upper tier grades are where collectors compete.",
    },
    {
      kind: "heading",
      text: "Third party grading",
    },
    {
      kind: "paragraph",
      text: "The scale became a global standard mostly because independent services made it operational. Companies such as PCGS and NGC receive a coin, assess it against published standards, encapsulate it in a tamper evident holder, and return it with a grade printed on the label. The service, not the seller, stakes its reputation on the grade. That structural shift, from seller's assertion to independent opinion, is what allows a numeric grade to carry weight in the market.",
    },
    {
      kind: "paragraph",
      text: "A director should understand both what a graded coin holder is and what it is not. It is a considered opinion from a specific service on a specific date, applying that service's interpretation of the scale. It is not a permanent, universal, unrevisable verdict.",
    },
    {
      kind: "heading",
      text: "Reading a grade critically",
    },
    {
      kind: "paragraph",
      text: "Two coins in adjacent tiers can look almost identical to an untrained eye, and yet trade at markedly different prices. Two coins with the same numeric grade can also differ meaningfully in eye appeal, one bright and well struck, the other dull with distracting toning. The scale is a floor, not a ceiling. Learning to see the coin, not only the label, is the difference between a beginner and a serious student of numismatics.",
    },
    {
      kind: "quote",
      text: "A grade is a considered opinion from a specific service, on a specific date. It is not a permanent, universal verdict.",
    },
    {
      kind: "heading",
      text: "Where the scale meets the client",
    },
    {
      kind: "list",
      items: [
        "Never quote a grade you have not verified from the label yourself.",
        "Read the grade and the service together. Different services use the scale in subtly different ways.",
        "Match the grade to the eye. A coin should look like its grade under a loupe in decent light.",
        "Treat MS grades as a range, not a point. MS 65 to MS 67 is one conversation; VF 30 to VF 35 is another.",
      ],
    },
    {
      kind: "paragraph",
      text: "The Sheldon scale is a piece of applied philosophy: an argument that condition can be described objectively enough for strangers to trade on. It is imperfect, occasionally revised, and endlessly discussed. That is what makes it a scholarly tool, and what makes numismatics a discipline rather than a hobby.",
    },
  ],
};

export default sheldonScale;

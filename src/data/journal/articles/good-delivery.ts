import type { Article } from "../types";

export const goodDelivery: Article = {
  slug: "what-good-delivery-actually-means",
  title: "What Good Delivery actually means",
  dek: "The phrase is thrown around bullion desks and jewellery counters as if it were self explanatory. It is not. It is a precise standard, and the precision is what gives it value.",
  category: "bullion",
  tags: ["LBMA", "Good Delivery", "bullion", "refining"],
  readingMinutes: 7,
  publishedAt: "2026-05-26",
  relatedInstitutes: ["precious-metals", "bullion"],
  relatedLibrary: ["gold-bar", "silver-bar"],
  body: [
    {
      kind: "paragraph",
      text: "A large gold bar changes hands in the professional market on a scale most consumers never see. The standard wholesale gold bar weighs approximately 400 troy ounces, roughly 12.4 kilograms, and it moves between vaults under a set of rules that governs what such a bar must be, how it must be marked, and what a buyer is entitled to expect. Those rules, together, form the London Good Delivery specification.",
    },
    {
      kind: "heading",
      text: "The specification, in outline",
    },
    {
      kind: "paragraph",
      text: "London Good Delivery gold bars, per the LBMA specification, sit within a defined weight range around 400 troy ounces, with a minimum fineness of 995 parts per thousand. Each bar must carry, at a minimum, a serial number, the refiner's mark, the fineness stamp, and the year of manufacture. Silver Good Delivery bars follow a comparable specification with a nominal weight around 1000 troy ounces and a minimum fineness of 999 parts per thousand.",
    },
    {
      kind: "paragraph",
      text: "The point of the specification is not aesthetic. It is that a bar built to it can enter and leave any accredited vault in the London market without independent reassay each time. That is the practical, market shaping feature of the standard.",
    },
    {
      kind: "heading",
      text: "The Good Delivery list",
    },
    {
      kind: "paragraph",
      text: "The refiners whose bars are accepted under the specification are named on a public list maintained by the LBMA. Getting onto the list is a serious undertaking. Applicants are assessed on technical capability, financial standing, and, increasingly, responsible sourcing of the metal they refine. Staying on the list requires ongoing audit. Refiners who fall short can be moved to former lists, and their bars may then trade at a discount.",
    },
    {
      kind: "paragraph",
      text: "Understanding this structure is what separates a professional description from a marketing description. To say a bar is Good Delivery is to say that a specific, named, publicly listed refiner produced it under a published specification, and that a specific market accepts it without reassay.",
    },
    {
      kind: "heading",
      text: "Where Good Delivery ends",
    },
    {
      kind: "paragraph",
      text: "Not every bar an investor buys is a 400 ounce Good Delivery bar. Retail bars of one, ten, one hundred, five hundred, or one thousand grams are separate products, often produced by the same refiners but to different specifications, and they trade in a separate retail market with different premiums, packaging, and liquidity profiles.",
    },
    {
      kind: "paragraph",
      text: "A one kilogram bar from a Good Delivery listed refiner is not itself a Good Delivery bar in the London market's sense. It is a bar from a Good Delivery listed refiner. The distinction is subtle and it matters. The full Good Delivery structure applies to specific formats, not to everything a refiner produces.",
    },
    {
      kind: "quote",
      text: "A bar built to specification can enter and leave any accredited vault in the London market without independent reassay.",
    },
    {
      kind: "heading",
      text: "For the advisor",
    },
    {
      kind: "list",
      items: [
        "When a client asks whether a bar is Good Delivery, ask which specification, and confirm the format.",
        "Prefer bars from currently listed refiners over bars from former listed refiners, for liquidity.",
        "Distinguish wholesale specifications from retail products the same refiner produces.",
        "Read the serial number and refiner's mark yourself. Do not accept them second hand.",
      ],
    },
  ],
};

export default goodDelivery;

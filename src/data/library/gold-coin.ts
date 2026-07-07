import type { LibraryItem } from "./types";

export const goldCoin: LibraryItem = {
  slug: "gold-coin",
  name: "Gold Coin",
  eyebrow: "The Library, N° 03",
  dek: "Gold coins carry a double identity: a specific weight of refined precious metal, and a legal tender object struck under sovereign authority.",
  overview: [
    "A gold coin is a piece of refined gold, struck to a specific weight, fineness, and design under the authority of a mint. Modern bullion coins are produced primarily as vehicles for holding gold, though they retain nominal legal tender status in their country of issue. Numismatic coins are collected primarily for rarity, historical interest, or condition.",
    "The two categories overlap but should be kept distinct in practice. A modern one ounce bullion coin trades close to the spot price of its metal content, plus a modest premium. A rare numismatic coin can trade at many multiples of its metal content, driven by grade, series, and demand.",
  ],
  history: [
    "Coined gold dates to the ancient world. The Kingdom of Lydia in Asia Minor is generally credited with producing the earliest coinage in electrum, a natural gold silver alloy, in the seventh century BCE.",
    "The modern bullion coin era began in the late twentieth century, with sovereign mints producing standardised one ounce and fractional gold pieces expressly for investors. Well known modern examples include the Krugerrand, the American Gold Eagle, the Canadian Maple Leaf, the Australian Kangaroo, and the Britannia. Each carries its own alloy specification, design, and market character.",
  ],
  specifications: [
    { label: "Common bullion weights", value: "1/20 oz, 1/10 oz, 1/4 oz, 1/2 oz, 1 oz" },
    { label: "Typical bullion fineness", value: "916.6 (22 karat) to 999.9 (four nines), depending on programme" },
    { label: "Face value", value: "Nominal legal tender denomination stated on the coin" },
    { label: "Design", value: "Struck by sovereign mint; often changes annually or across series" },
    { label: "Packaging", value: "Loose, tubed, or in tamper evident assay cards" },
  ],
  valueFactors: [
    { label: "Metal content", text: "For bullion coins, metal content is the dominant driver of price, priced against spot." },
    { label: "Premium", text: "Retail bullion coins carry premiums that reflect mintage costs, distribution, and demand for a specific series." },
    { label: "Grade", text: "For numismatic and semi numismatic coins, condition according to a recognised grading standard is central to value." },
    { label: "Rarity and demand", text: "For collectable coins, rarity of a specific date, mint mark, or die variety, combined with active demand, drives premiums well beyond metal value." },
    { label: "Provenance", text: "A documented ownership history can materially support value for significant pieces." },
  ],
  care: [
    "Handle coins by their edges. Fingerprints on struck fields are difficult to remove and can permanently affect grade.",
    "Leave certified graded coins in their original holders. Removing a coin from its holder discards the service's opinion.",
    "Store loose coins in inert holders designed for numismatic use, not in PVC based flips, which can damage the surface.",
    "Never clean a coin. Cleaning is one of the fastest ways to reduce collectable value.",
  ],
  faqs: [
    {
      question: "Are bullion coins legal tender?",
      answer: "Most modern sovereign bullion coins carry a nominal face value and are technically legal tender in their country of issue. The face value is typically much lower than the coin's metal content, so legal tender status is symbolic in practice.",
    },
    {
      question: "Should a bullion coin be graded?",
      answer: "For pieces bought for their gold content, third party grading is generally unnecessary. For coins whose value depends materially on condition or numismatic status, grading by a recognised service adds market clarity and can widen the buyer pool.",
    },
    {
      question: "Is there a tax advantage to coins over bars?",
      answer: "In some jurisdictions, legal tender bullion coins receive different tax treatment to bars, particularly with respect to VAT or sales tax on collectables. Any such advantage is jurisdiction specific and should be confirmed with a qualified adviser.",
    },
  ],
  salesGuidance: [
    "Establish whether the client is buying metal or collecting, and stop treating them as the same buyer.",
    "Quote premium in absolute terms, not only as a percentage, so the client understands the retail versus spot gap.",
    "For numismatic coins, quote grade, service, and label plainly. Never quote a grade you have not verified.",
    "Warn against cleaning. It is the most common irreversible mistake a private owner makes.",
  ],
  relatedInstitutes: ["precious-metals", "bullion", "numismatics"],
  relatedArticles: ["the-sheldon-scale-explained", "what-good-delivery-actually-means"],
  knowledgeCheck: [
    {
      prompt: "Which factor is most likely to make a specific gold coin worth many multiples of its metal content?",
      options: [
        { text: "That it was minted this year" },
        { text: "Rarity, condition, and demand within a numismatic series", correct: true },
        { text: "The presence of any hallmark" },
        { text: "That it is legal tender" },
      ],
      explanation: "Multiples of metal content come from numismatic value, driven by rarity within a series, condition, and active collector demand.",
    },
    {
      prompt: "Why should a graded coin usually stay in its original holder?",
      options: [
        { text: "Because opening the holder is illegal" },
        { text: "Because the holder increases the metal weight" },
        { text: "Because the holder documents the service's grading opinion and protects the coin", correct: true },
        { text: "Because grading is a criminal certification" },
      ],
      explanation: "The holder ties the coin to the service's opinion of its grade. Removing the coin discards that anchor and can reduce market confidence.",
    },
    {
      prompt: "Cleaning a collectable coin generally:",
      options: [
        { text: "Increases its value" },
        { text: "Has no effect" },
        { text: "Reduces its value", correct: true },
        { text: "Restores its original fineness" },
      ],
      explanation: "Cleaning alters the coin's original surface, which the numismatic market values. Cleaned coins typically trade at a discount.",
    },
  ],
};

export default goldCoin;

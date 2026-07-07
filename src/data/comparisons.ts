/**
 * Comparison Guides: side by side clarifications of pairs the trade frequently confuses.
 */

export type Comparison = {
  slug: string;
  title: string;
  dek: string;
  left: { name: string; points: string[] };
  right: { name: string; points: string[] };
  bottomLine: string;
};

export const COMPARISONS: Comparison[] = [
  {
    slug: "bullion-coin-vs-bar",
    title: "Bullion coin vs bullion bar",
    dek: "Same metal, different products. Understanding the difference matters for premium, liquidity, and, in some jurisdictions, tax.",
    left: {
      name: "Bullion coin",
      points: [
        "Struck by a sovereign mint under national authority.",
        "Carries a nominal legal tender face value on the coin.",
        "Typically higher premium over spot than a comparable weight bar.",
        "Often easier to sell in small quantities in retail markets.",
        "May receive different tax treatment in some jurisdictions.",
      ],
    },
    right: {
      name: "Bullion bar",
      points: [
        "Produced by a refiner in cast or minted format.",
        "No legal tender status; value derives from metal content and refiner reputation.",
        "Typically lower premium over spot per unit of metal.",
        "Larger sizes (500 g, 1 kg) improve cost efficiency for larger allocations.",
        "Serial numbers and assay cards support provenance and resale.",
      ],
    },
    bottomLine: "Prefer coins for smaller retail allocations, symbolic weight, and any tax advantage that applies in the client's jurisdiction. Prefer bars for larger allocations where cost efficiency and vault storage dominate.",
  },
  {
    slug: "solid-black-opal-vs-doublet",
    title: "Solid black opal vs doublet",
    dek: "They can look similar in a display case. They are not the same product, and disclosure is not optional.",
    left: {
      name: "Solid black opal",
      points: [
        "A single piece of natural precious opal with a naturally dark body tone.",
        "Value scales with body tone rating, play of colour, pattern, and origin.",
        "Fully stable to normal wear; may be worked and reset like a solid gemstone.",
        "Documented Australian material is particularly sought after.",
      ],
    },
    right: {
      name: "Doublet (or triplet)",
      points: [
        "A composite: a slice of precious opal bonded to a dark backing, with a clear cap in the case of triplets.",
        "Produces a visual effect similar to a solid black opal at a fraction of the price.",
        "Bonded layers make the piece less tolerant of prolonged water exposure and heat shock.",
        "Must be disclosed in writing as a composite; not to be sold as solid black opal.",
      ],
    },
    bottomLine: "Both are legitimate categories. The line the trade will not cross is disclosure: a doublet or triplet must be described as such at every stage of the sale.",
  },
  {
    slug: "platinum-vs-white-gold",
    title: "Platinum vs 18k white gold",
    dek: "Two white metals that can look identical when new, and behave very differently over time.",
    left: {
      name: "Platinum",
      points: [
        "Denser and generally more wear resistant in fine sections such as prongs.",
        "Naturally white; does not require rhodium plating.",
        "Patinas over time to a soft matte that many collectors prize.",
        "Typically more expensive per unit weight than 18k white gold.",
        "Hypoallergenic for most wearers.",
      ],
    },
    right: {
      name: "18k white gold",
      points: [
        "An alloy, typically with palladium, nickel, or silver, plated with rhodium to appear bright white.",
        "Rhodium plating wears off over years of wear and requires periodic replating.",
        "Nickel alloys can trigger sensitivity in some wearers; palladium alloys reduce this risk.",
        "Typically less expensive per unit weight than platinum.",
        "Historically the more common choice in mass market fine jewellery.",
      ],
    },
    bottomLine: "Platinum is the connoisseur's white metal for a solitaire built to be handed down. 18k white gold offers a lower price point today, with the honest requirement of periodic replating over the life of the piece.",
  },
  {
    slug: "cast-bar-vs-minted-bar",
    title: "Cast bar vs minted bar",
    dek: "Both are legitimate ways to hold refined gold or silver. The choice is between texture and packaging on one side, and cost efficiency on the other.",
    left: {
      name: "Cast bar",
      points: [
        "Produced by pouring molten metal into a mould.",
        "Characteristic rough surface, rounded edges, and hand stamped markings.",
        "Typically the lower premium option for a given weight.",
        "Preferred by investors focused on metal content and long term storage.",
      ],
    },
    right: {
      name: "Minted bar",
      points: [
        "Cut from a rolled sheet and struck with a die.",
        "Smooth surface, sharp edges, precise finish, and typically tamper evident packaging.",
        "Typically carries a higher premium in exchange for provenance and presentation.",
        "Preferred where the bar is likely to be gifted, displayed, or moved between hands.",
      ],
    },
    bottomLine: "The gold or silver is the same at the stated fineness. The choice is between raw cost efficiency (cast) and packaged provenance and finish (minted).",
  },
];

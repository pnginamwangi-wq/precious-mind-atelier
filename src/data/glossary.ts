/**
 * Glossary: definitions of terminology that recurs across the Academy.
 * All entries are general knowledge of the discipline, not invented.
 */

export type GlossaryEntry = {
  term: string;
  category: "Precious Metals" | "Bullion" | "Coins" | "Gemstones" | "Diamonds" | "Jewellery" | "Horology" | "Retail" | "AI";
  definition: string;
  seeAlso?: string[];
};

export const GLOSSARY: GlossaryEntry[] = [
  { term: "Alloy", category: "Precious Metals", definition: "A metal formed by combining two or more elements, at least one of which is a metal, to modify colour, hardness, or working properties." },
  { term: "Anglage", category: "Horology", definition: "The bevelled and polished edge applied by hand to bridges and other movement components as part of high grade watch finishing." },
  { term: "Assay", category: "Precious Metals", definition: "The independent testing of a precious metal item to verify its fineness." },
  { term: "Automatic movement", category: "Horology", definition: "A mechanical watch movement whose mainspring is wound by an oscillating rotor driven by the wearer's motion." },
  { term: "Balance wheel", category: "Horology", definition: "The oscillating component of a mechanical watch movement that regulates the release of energy from the mainspring, dividing time into regular intervals." },
  { term: "Bezel setting", category: "Jewellery", definition: "A setting style in which a metal collar surrounds the girdle of a stone, securing it fully around its perimeter." },
  { term: "Body tone", category: "Gemstones", definition: "In opal grading, the underlying darkness beneath the play of colour, ranked on an industry scale that in some conventions runs from N1 (very dark) to N9 (very light)." },
  { term: "Britannia (silver)", category: "Precious Metals", definition: "A silver alloy of at least 958 parts per thousand, historically used in British silver and marked accordingly." },
  { term: "Cabochon", category: "Gemstones", definition: "A gemstone shaped and polished with a smooth, domed, unfaceted surface, commonly used for opaque or phenomenal stones." },
  { term: "Carat (gemstone weight)", category: "Gemstones", definition: "A unit of mass used for gemstones, equal to 200 milligrams. Not to be confused with karat, which measures gold purity." },
  { term: "Cast bar", category: "Bullion", definition: "A bullion bar produced by pouring molten metal into a mould, giving it a characteristic rough surface and rounded edges." },
  { term: "Chronograph", category: "Horology", definition: "A watch complication that includes a stopwatch function, allowing the wearer to time discrete intervals." },
  { term: "Clarity", category: "Gemstones", definition: "The evaluation of the presence, size, position, and character of inclusions in and blemishes on a gemstone." },
  { term: "Complication", category: "Horology", definition: "Any function of a mechanical watch beyond the display of hours, minutes, and seconds, such as a date, chronograph, or perpetual calendar." },
  { term: "Côtes de Genève", category: "Horology", definition: "A decorative pattern of parallel stripes applied to watch movement bridges, associated with fine Swiss watchmaking." },
  { term: "Cut (diamond)", category: "Diamonds", definition: "The proportions, symmetry, and polish of a faceted diamond, which together determine its optical performance." },
  { term: "Doublet", category: "Gemstones", definition: "A composite gemstone made of two layers, typically a slice of precious material bonded to a backing to enhance appearance or durability." },
  { term: "Escapement", category: "Horology", definition: "The mechanical linkage between the gear train and the balance wheel in a mechanical watch, releasing one tooth of the escape wheel per oscillation." },
  { term: "Fineness", category: "Precious Metals", definition: "The purity of a precious metal, expressed in parts per thousand (e.g. 999 fine gold contains 999 parts gold and 1 part impurity)." },
  { term: "Good Delivery", category: "Bullion", definition: "A set of specifications maintained by the LBMA for wholesale gold and silver bars, covering weight, fineness, markings, and refiner accreditation." },
  { term: "Grade", category: "Coins", definition: "A numeric or named description of a coin's condition, most often assigned on the Sheldon scale from 1 to 70." },
  { term: "Hallmark", category: "Precious Metals", definition: "A punch or set of punches applied to a piece of precious metal by an assay office, indicating fineness, maker, and often origin and date." },
  { term: "Inclusion", category: "Diamonds", definition: "A feature inside a gemstone, such as a mineral crystal, feather, or cloud, which contributes to its clarity grade." },
  { term: "Karat (gold purity)", category: "Precious Metals", definition: "A unit of gold purity, expressed in twenty fourths (e.g. 18k gold is 18/24 or 750 parts per thousand pure gold). Distinct from carat, the gemstone weight." },
  { term: "LBMA", category: "Bullion", definition: "The London Bullion Market Association, which maintains the Good Delivery list of accredited gold and silver refiners." },
  { term: "Lustre", category: "Gemstones", definition: "The way light interacts with the surface of a gem or pearl; in pearls, the sharpness and depth of surface reflections." },
  { term: "Mainspring", category: "Horology", definition: "A coiled ribbon of steel or alloy inside the barrel of a mechanical watch, storing energy that drives the movement." },
  { term: "Mint mark", category: "Coins", definition: "A small letter or symbol on a coin indicating the mint at which it was struck." },
  { term: "Minted bar", category: "Bullion", definition: "A bullion bar cut from a rolled sheet and struck with a die, producing a smooth surface, sharp edges, and typically tamper evident packaging." },
  { term: "Nacre", category: "Gemstones", definition: "The iridescent inner shell material of certain molluscs, secreted around a nucleus to form a pearl." },
  { term: "Numismatics", category: "Coins", definition: "The study and collection of coins, tokens, paper money, and related objects." },
  { term: "Play of colour", category: "Gemstones", definition: "The shifting spectral colours seen in precious opal, caused by diffraction of light by microscopic silica structures." },
  { term: "Power reserve", category: "Horology", definition: "The duration a mechanical watch will continue to run after being fully wound, before requiring rewinding." },
  { term: "Prong setting", category: "Jewellery", definition: "A setting style in which small metal claws grip the girdle of a stone from above, securing it while exposing much of its surface." },
  { term: "Refiner of record", category: "Bullion", definition: "A refiner independently accredited to produce bullion bars that meet a specific market's Good Delivery standard." },
  { term: "Rhodium plating", category: "Jewellery", definition: "A thin coating of rhodium applied to white gold to give it a bright white surface; wears off over time and requires periodic reapplication." },
  { term: "Sheldon scale", category: "Coins", definition: "A numeric grading scale from 1 to 70 used to describe the condition of coins, originally proposed by Dr. William Sheldon." },
  { term: "Solitaire", category: "Jewellery", definition: "A jewellery design featuring a single stone as the sole gem, typically in a minimalist setting that emphasises the stone." },
  { term: "Spot price", category: "Bullion", definition: "The current market price for immediate delivery of a precious metal, quoted per troy ounce for gold and silver." },
  { term: "Sterling silver", category: "Precious Metals", definition: "A silver alloy of at least 925 parts per thousand silver, commonly stamped 925." },
  { term: "Tourbillon", category: "Horology", definition: "A watchmaking mechanism that rotates the entire escapement to average out the effect of gravity in different orientations; historically for pocket watches, now primarily a display of craft in wristwatches." },
  { term: "Triplet", category: "Gemstones", definition: "A composite gemstone made of three layers, typically a colour layer bonded to a dark backing and topped with a protective clear cap." },
  { term: "Troy ounce", category: "Precious Metals", definition: "A unit of mass used for precious metals, equal to approximately 31.1035 grams. Distinct from the avoirdupois ounce." },
  { term: "Vermeil", category: "Jewellery", definition: "Sterling silver plated with a substantial layer of gold, meeting a minimum thickness that varies by jurisdiction." },
];

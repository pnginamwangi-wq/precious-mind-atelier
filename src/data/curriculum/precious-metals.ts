import type { ChapterContent } from "./types";

/**
 * Institute of Precious Metals — full lesson content.
 * Pilot institute for the Academy's written curriculum. See AGENTS.md and
 * the Governance Charter (src/routes/governance.tsx) for the constraints
 * this content is written under: no fabricated statistics, no named living
 * people, no implied affiliation with any specific refiner, mint, or house.
 */
const preciousMetalsCurriculum: ChapterContent[] = [
  {
    chapter: "I",
    reading: [
      {
        heading: "Where metal comes from",
        paragraphs: [
          "Gold, silver, and platinum rarely occur as pure metal in nature. Gold is found both as free particles in placer deposits, washed downstream from a source vein over geological time, and locked inside quartz veins and sulphide ores that must be crushed and treated to release it. Silver is more often a companion metal, recovered as a by-product of lead, zinc, and copper mining. Platinum and its sister metals form in layered intrusions, vast slow-cooled bodies of rock where dense metal-bearing minerals settled out of molten rock long before humans existed to look for them.",
          "This matters to anyone advising on precious metals because the geology determines the economics. A placer gold deposit can be worked with comparatively simple equipment; a platinum reef several kilometres underground demands a mining operation of enormous scale and cost. When a client asks why platinum can trade below gold despite being rarer in the earth's crust, the honest answer starts here, in the ground, long before any market opens.",
        ],
      },
      {
        heading: "From ore to bar",
        paragraphs: [
          "Extraction is only the first step. Ore is crushed and concentrated, then the metal is separated using one of a small number of established methods: cyanide leaching and carbon adsorption for gold, froth flotation for base-metal sulphide ores that carry silver and platinum group metals, and smelting at high temperature to produce a crude metal or matte. What comes out of this stage is called doré: an unrefined, mixed bar that might be eighty to ninety percent precious metal, with the remainder base metals and trace elements.",
          "Doré is not a form any market will accept at face value. It travels next to a refinery, where it is dissolved, and the individual metals are separated using chemical and electrolytic processes, most commonly variations of the Miller and Wohlwill processes for gold, and electrolytic refining for silver. The refinery's job is to turn a variable, mine-specific bar into a standardised product: a bar of guaranteed, certified purity that any buyer in the world will accept without further testing.",
        ],
      },
      {
        heading: "The Good Delivery standard",
        paragraphs: [
          "\"Good Delivery\" is the industry's term for a bar that meets the size, weight, purity, and marking standards set by the London Bullion Market Association for gold and silver bars traded in the London market. A Good Delivery gold bar is typically cast to weigh between 350 and 430 troy ounces, at a minimum fineness of 995 parts per thousand, stamped with the refiner's hallmark, an assay stamp, a serial number, and the year of manufacture.",
          "The standard exists to remove friction from trade. A bank in London can accept a bar from an accredited refiner in Switzerland or South Africa without independently assaying it, because the refiner's accreditation and the bar's markings already carry that guarantee. Understanding this system is the difference between describing bullion in the abstract and being able to read an actual bar, hallmark by hallmark, in a client's hand.",
        ],
      },
    ],
    takeaways: [
      "Precious metals are almost never mined pure; geology and ore type shape both extraction method and cost.",
      "Doré is an unrefined, mixed bar produced at the mine site, not a tradable financial product.",
      "Refining converts doré into standardised bars of certified purity through chemical and electrolytic processes.",
      "The Good Delivery standard is what allows a bar to move through global markets without repeated re-testing.",
    ],
    quiz: [
      {
        prompt: "Why is silver so often described as a \"by-product\" metal?",
        options: [
          { text: "Because it has no industrial uses of its own" },
          { text: "Because it is most often recovered alongside lead, zinc, or copper ore", correct: true },
          { text: "Because it cannot be refined to high purity" },
          { text: "Because it only occurs in placer deposits" },
        ],
        explanation: "Silver is frequently extracted as a companion metal during the processing of base-metal ores such as lead, zinc, and copper, rather than from dedicated silver mines alone.",
      },
      {
        prompt: "What best describes doré?",
        options: [
          { text: "A finished, investment-grade bar ready for the market" },
          { text: "A crude, mixed-metal bar produced at or near the mine, before refining", correct: true },
          { text: "The technical name for a platinum reef" },
          { text: "A type of hallmark used only in Switzerland" },
        ],
        explanation: "Doré is an unrefined bar, often 80 to 90 percent precious metal, that still needs refining before it meets any tradable standard.",
      },
      {
        prompt: "What does \"Good Delivery\" actually guarantee to a buyer?",
        options: [
          { text: "That the bar was mined ethically" },
          { text: "That the bar meets an agreed size, weight, purity, and marking standard, recognised without re-testing", correct: true },
          { text: "That the bar was cast by a government mint" },
          { text: "That the bar's price is fixed for one year" },
        ],
        explanation: "Good Delivery is a quality and provenance standard, set by the London Bullion Market Association, that lets accredited bars move through the market without independent re-assay each time.",
      },
    ],
  },
  {
    chapter: "II",
    reading: [
      {
        heading: "Measuring purity",
        paragraphs: [
          "Purity, or fineness, describes what proportion of a piece is the precious metal itself, as opposed to alloying metals mixed in for strength, colour, or cost. Fineness is usually expressed in parts per thousand: a bar marked 999.9 is 99.99 percent pure gold, often called \"four nines\" fine. Jewellery purity is more commonly expressed in karats, a scale from 0 to 24, where 24 karat is pure gold and lower numbers indicate a greater proportion of alloy.",
          "Assaying is the practice of testing a sample to confirm its fineness. Historically this meant fire assay, in which a small sample is melted with lead and other reagents in a furnace, and the resulting bead of precious metal is weighed with extraordinary precision to calculate purity by weight. Modern laboratories now supplement fire assay with instruments such as X-ray fluorescence analysers, which can estimate composition non-destructively in seconds, though fire assay remains the referee method for disputes precisely because it is difficult to deceive.",
        ],
      },
      {
        heading: "Karat and fineness systems",
        paragraphs: [
          "The karat system exists because pure gold, at 24 karat, is soft: it scratches, bends, and wears down quickly, which makes it a poor choice for jewellery that will be worn daily. Alloying gold with metals such as copper, silver, zinc, or palladium increases hardness and durability, and also changes colour. 18 karat gold is 75 percent gold by weight; 14 karat is roughly 58.3 percent; 9 karat, common in some retail markets, is 37.5 percent.",
          "Colour is a direct consequence of alloy choice, not a separate property layered on top of purity. Rose gold typically increases the proportion of copper; white gold is alloyed with palladium, silver, or nickel and often finished with a rhodium plating; green gold leans toward a higher silver content. A sales professional who can explain why a client's rose gold ring will, eventually, need re-plating or re-polishing at the joints has moved from reciting a fact to demonstrating real command of the material.",
        ],
      },
      {
        heading: "Hallmarks around the world",
        paragraphs: [
          "A hallmark is an official mark struck or laser-engraved into a piece of precious metal, certifying its fineness under a national or regional system. The United Kingdom's hallmarking system, administered through assay offices, is one of the oldest continuously operating consumer protection systems in the world, requiring independent testing before certain items can legally be sold as gold, silver, platinum, or palladium above a minimum weight threshold. Other jurisdictions rely on maker's marks and self-certification with spot-check enforcement, which places more responsibility on the buyer's own diligence.",
          "Because standards differ by country, an item that carries a fully compliant hallmark in one jurisdiction may need additional testing or documentation to be resold with confidence in another. Reading a hallmark correctly, and knowing which systems are compulsory-testing regimes versus voluntary or self-certified ones, is a foundational skill for anyone appraising or reselling precious metal objects internationally.",
        ],
      },
    ],
    takeaways: [
      "Fineness expresses purity in parts per thousand; the karat system is the jewellery-trade equivalent, from 0 to 24.",
      "Fire assay remains the referee method for disputed purity, even though non-destructive instruments are now standard for routine testing.",
      "Alloying gold changes both hardness and colour; rose, white, and green gold are the same base metal with different additions.",
      "Hallmarking regimes vary by country between compulsory independent testing and voluntary self-certification, which affects resale confidence.",
    ],
    quiz: [
      {
        prompt: "What does a fineness mark of 999.9 mean?",
        options: [
          { text: "The item is 99.99 percent pure precious metal", correct: true },
          { text: "The item weighs 999.9 grams" },
          { text: "The item is 18 karat gold" },
          { text: "The item has been hallmarked in the United Kingdom" },
        ],
        explanation: "Fineness is expressed in parts per thousand, so 999.9 indicates 99.99 percent pure metal, commonly called four nines fine.",
      },
      {
        prompt: "Why is pure 24 karat gold rarely used in everyday jewellery?",
        options: [
          { text: "It is too expensive to alloy" },
          { text: "It is too soft and wears down or scratches easily", correct: true },
          { text: "It cannot legally be hallmarked" },
          { text: "It has no consistent colour" },
        ],
        explanation: "Pure gold is soft, so alloying it with other metals increases hardness and durability for pieces that are worn regularly.",
      },
      {
        prompt: "What is the key difference between a compulsory hallmarking regime and a self-certification regime?",
        options: [
          { text: "Compulsory regimes only apply to platinum" },
          { text: "Self-certification regimes require independent lab testing before sale" },
          { text: "Compulsory regimes require independent testing before certain items can be sold as a given metal; self-certification relies more on the maker's own declaration", correct: true },
          { text: "There is no practical difference for a buyer" },
        ],
        explanation: "Under compulsory regimes, an accredited assay office independently verifies fineness before an item can legally carry certain metal descriptions; self-certified systems place more of that responsibility on the maker and buyer.",
      },
    ],
  },
  {
    chapter: "III",
    reading: [
      {
        heading: "Why alloys exist",
        paragraphs: [
          "Every working property a craftsperson cares about, hardness, melting point, colour, tarnish resistance, casting behaviour, is affected by what a precious metal is alloyed with. Pure silver, like pure gold, is soft and prone to scratching, which is why sterling silver, at 92.5 percent silver alloyed chiefly with copper, became the standard for silverware and jewellery: strong enough for daily use, while still overwhelmingly silver by composition.",
          "Platinum behaves differently again. It has a far higher melting point than gold or silver, around 1,768 degrees Celsius, which historically made it difficult to work with the furnaces available before the twentieth century, and is part of why platinum's use in jewellery arrived later than gold's. Modern platinum alloys typically combine it with small amounts of other platinum group metals or with copper and cobalt, chosen to ease casting and machining without significantly compromising platinum's density and resistance to tarnish.",
        ],
      },
      {
        heading: "Casting and annealing",
        paragraphs: [
          "Casting is the process of melting metal and pouring or injecting it into a mould to take a specific shape, most commonly using the lost-wax method in fine jewellery: a wax model is built, encased in an investment plaster, then burned out in a kiln, leaving a cavity that molten metal fills. This allows intricate, one-of-a-kind forms to be produced repeatably, though a cast piece typically requires further finishing work, filing, polishing, stone setting, before it is complete.",
          "Annealing is the controlled heating and cooling of metal to relieve internal stress and restore workability. Metal that has been repeatedly hammered, bent, or drawn becomes work-hardened, meaning its crystal structure has been distorted to the point that it resists further shaping and becomes brittle. Annealing at the correct temperature for the specific alloy allows the crystal structure to reform, restoring ductility so the craftsperson can continue shaping the piece without it cracking.",
        ],
      },
      {
        heading: "Working properties in practice",
        paragraphs: [
          "A jeweller choosing between 18 karat yellow gold, platinum, and sterling silver for the same design is not making an aesthetic choice alone. Platinum is denser and heavier for the same volume, holds a stone-setting prong more securely over decades of wear, but is harder to file and more expensive to cast due to its higher melting point and the tools required. Gold is more forgiving to work and repair. Silver tarnishes faster than either, through a reaction with sulphur compounds in the air, which is a maintenance consideration worth explaining honestly to a client rather than glossing over.",
          "Understanding these working properties is what allows a sales or advisory professional to answer, credibly, a question such as \"why does the platinum setting cost so much more than the gold one, when they look almost identical?\" The honest answer sits in metallurgy: density, melting point, tool wear, and labour time, not simply a premium attached to the word platinum.",
        ],
      },
    ],
    takeaways: [
      "Alloying changes hardness, melting point, colour, and tarnish resistance, not just the composition on paper.",
      "Platinum's high melting point and density make it more resistant to wear but harder and more costly to cast and work.",
      "Lost-wax casting allows intricate, repeatable jewellery forms, but cast pieces still require substantial hand-finishing.",
      "Annealing restores workability to metal that has become brittle through repeated shaping, by relieving internal stress.",
    ],
    quiz: [
      {
        prompt: "What is sterling silver, and why is it used instead of pure silver?",
        options: [
          { text: "A silver-platinum alloy used for its colour" },
          { text: "92.5 percent silver alloyed mainly with copper, for added hardness and durability", correct: true },
          { text: "A trade name with no fixed composition" },
          { text: "Pure silver that has been specially polished" },
        ],
        explanation: "Sterling silver alloys silver with copper, at 92.5 percent silver, to gain hardness and durability that pure silver lacks.",
      },
      {
        prompt: "What does annealing do to metal that has become work-hardened?",
        options: [
          { text: "It increases the metal's fineness" },
          { text: "It relieves internal stress and restores workability, reducing brittleness", correct: true },
          { text: "It permanently changes the metal's colour" },
          { text: "It removes the need for hallmarking" },
        ],
        explanation: "Work-hardened metal resists further shaping and can crack; controlled heating and cooling through annealing restores its crystal structure and workability.",
      },
      {
        prompt: "Why might a platinum setting cost significantly more than a nearly identical gold one?",
        options: [
          { text: "Platinum is always rarer in the earth's crust than gold" },
          { text: "Platinum's density, high melting point, and greater tool wear increase material and labour cost", correct: true },
          { text: "Gold cannot legally be used for prong settings" },
          { text: "There is no real cost difference in practice" },
        ],
        explanation: "Platinum's working properties, higher density, higher melting point, and greater demands on tools, translate into real material and labour cost differences, not just a marketing premium.",
      },
    ],
  },
  {
    chapter: "IV",
    reading: [
      {
        heading: "The two kinds of market",
        paragraphs: [
          "Precious metals trade in two overlapping but distinct markets. The physical market involves the actual movement of metal, bars, coins, jewellery, between miners, refiners, vaults, and buyers. The financial market involves contracts, futures, and other instruments that reference the price of the metal without necessarily involving physical delivery at all. Exchanges such as COMEX in New York primarily serve this financial layer, while organisations such as the London Bullion Market Association coordinate standards and price-setting for the physical, over-the-counter trade centred on London.",
          "A professional advising clients needs to know which market a given transaction actually sits in. A client buying a Good Delivery bar for a vault is participating in the physical market; a client trading a futures contract is participating in a financial market that may never result in metal changing hands at all. Confusing the two, or implying that a financial position is equivalent to owning physical metal, is a common and consequential error.",
        ],
      },
      {
        heading: "Refiners of record",
        paragraphs: [
          "Not every refinery's bars are accepted at face value everywhere. Major markets maintain lists of accredited \"refiners of record\", refineries that have been independently audited and approved to have their bars accepted as Good Delivery without further assay. Accreditation typically covers not only technical capability, the refinery's ability to consistently produce bars at the required purity, but increasingly also responsible sourcing practices, covering how the refinery satisfies itself about the origin of the metal it processes.",
          "This accreditation system is what allows the phrase \"refiner of record\" to function as a meaningful credential in a conversation with a client, rather than a piece of jargon. It signals that a bar's quality and, increasingly, its supply chain have been reviewed by an independent body, not simply asserted by the refiner itself.",
        ],
      },
      {
        heading: "Chain of custody and responsible sourcing",
        paragraphs: [
          "Chain of custody describes the documented path metal takes from its point of origin to the final bar or piece, recording who handled it and under what conditions at each stage. In precious metals, this has become central to responsible sourcing efforts, particularly around conflict-affected and high-risk areas, where industry frameworks encourage refiners and their suppliers to conduct due diligence on the origin of the metal they process.",
          "For a sales or advisory professional, being able to describe, honestly and without overstating certainty, what a chain-of-custody claim does and does not guarantee is a mark of real expertise. It typically reflects that a refiner has implemented a due diligence process consistent with recognised industry guidance; it is not the same as an unbroken, publicly verifiable record of every hand a specific ounce of metal has passed through since it left the ground.",
        ],
      },
    ],
    takeaways: [
      "The physical market and the financial market for precious metals overlap but are not the same thing; only one guarantees ownership of actual metal.",
      "\"Refiner of record\" is a specific, audited accreditation, not a generic compliment.",
      "Chain-of-custody and responsible sourcing frameworks describe a due diligence process, not an unbroken public record of every prior owner.",
      "Advisors should be precise about what a sourcing or accreditation claim actually guarantees, rather than rounding it up to something stronger.",
    ],
    quiz: [
      {
        prompt: "What is the key difference between the physical and financial precious metals markets?",
        options: [
          { text: "The physical market only exists in London" },
          { text: "The financial market always involves higher purity metal" },
          { text: "The physical market involves actual metal changing hands; the financial market can involve contracts that never result in delivery", correct: true },
          { text: "There is no meaningful difference" },
        ],
        explanation: "Physical market transactions move real metal between parties; financial instruments such as futures reference price without necessarily involving physical delivery.",
      },
      {
        prompt: "What does \"refiner of record\" status actually indicate?",
        options: [
          { text: "The refiner is the oldest in its country" },
          { text: "The refiner has been independently audited and accredited to produce bars accepted at face value", correct: true },
          { text: "The refiner only processes recycled metal" },
          { text: "The refiner sets the daily gold price" },
        ],
        explanation: "Refiner of record status is a specific accreditation granted after independent audit, covering both technical quality and, increasingly, sourcing due diligence.",
      },
      {
        prompt: "What is the most accurate way to describe a chain-of-custody claim to a client?",
        options: [
          { text: "It guarantees the exact identity of every past owner of the metal" },
          { text: "It reflects a due diligence process consistent with industry guidance, not an unbroken public record", correct: true },
          { text: "It is a legally meaningless marketing phrase" },
          { text: "It only applies to platinum group metals" },
        ],
        explanation: "Responsible advising means describing chain-of-custody and sourcing claims precisely, as evidence of a due diligence process, without overstating them as an absolute, verifiable history.",
      },
    ],
  },
  {
    chapter: "V",
    reading: [
      {
        heading: "Urban mining",
        paragraphs: [
          "\"Urban mining\" describes the recovery of precious metals from products that already exist above ground, electronics, old jewellery, industrial catalysts, and scrap, rather than from freshly mined ore. Electronic waste in particular can carry meaningful concentrations of gold, silver, and platinum group metals in connectors, circuit boards, and catalytic converters, making end-of-life products a genuine secondary source of supply rather than simply a waste management problem.",
          "The appeal of urban mining sits in both economics and sustainability. Recovering metal from existing scrap typically requires far less energy and environmental disturbance than extracting it from new ore, since the metal has already been concentrated once by manufacturing rather than needing to be separated from raw rock. This makes recycled metal a genuinely different value proposition from newly mined metal, not merely a lower-cost substitute.",
        ],
      },
      {
        heading: "Closed loop refining",
        paragraphs: [
          "A closed loop system is one in which metal from end-of-life products, or from manufacturing offcuts and polishing dust in a workshop, is refined and returned to production rather than discarded or sold onward as generic scrap. Many jewellery ateliers now work with refiners who can process their own bench scrap and return it as newly cast metal of guaranteed purity, effectively keeping a workshop's material within its own supply chain.",
          "For a maison or independent workshop, closed loop refining is both a cost control and a provenance story: metal that never has to be reintroduced through an anonymous scrap market can be tracked with more confidence, which supports responsible sourcing claims discussed in the previous chapter.",
        ],
      },
      {
        heading: "The economics of recovery",
        paragraphs: [
          "Recycled precious metal is refined to the same purity standards as newly mined metal; once refined to a given fineness, a gold atom recovered from a laptop is indistinguishable from one mined a week earlier from fresh ore. What differs is the economics of getting there. Recovery costs depend heavily on concentration: a jeweller's polishing dust or an assay lab's crucible sweepings can be extremely rich in precious metal relative to their volume, while consumer electronics require industrial-scale processing to make recovery economically worthwhile per unit.",
          "This economic reality shapes who participates in recycling at what scale. Specialist refiners built for jewellery trade scrap, bench sweeps, and small-lot recycling exist alongside much larger industrial recyclers built to process electronic waste by the tonne. Recognising which kind of recycling operation a claim refers to helps an advisor avoid conflating a boutique atelier's responsible scrap programme with a large-scale industrial e-waste operation; they serve different parts of the same broader recycling economy.",
        ],
      },
    ],
    takeaways: [
      "Urban mining recovers precious metal from existing products, not fresh ore, and is a genuine secondary supply source.",
      "Recycled metal generally requires less energy to recover than newly mined metal, since manufacturing has already concentrated it once.",
      "Closed loop refining keeps a workshop's own scrap within its own supply chain, supporting cost control and provenance.",
      "Once refined to a given purity, recycled and newly mined metal are chemically indistinguishable; the differences are in recovery economics and scale.",
    ],
    quiz: [
      {
        prompt: "What is \"urban mining\"?",
        options: [
          { text: "Mining conducted underneath cities" },
          { text: "The recovery of precious metals from existing products such as electronics and scrap, rather than fresh ore", correct: true },
          { text: "A term for illegal, unregulated small-scale mining" },
          { text: "A specific refiner's proprietary process" },
        ],
        explanation: "Urban mining refers to recovering precious metal already concentrated in above-ground products, such as electronic waste and scrap, rather than extracting it from newly mined ore.",
      },
      {
        prompt: "Why does recycled metal typically require less energy to recover than newly mined metal?",
        options: [
          { text: "Recycled metal is always purer to begin with" },
          { text: "Manufacturing has already concentrated the metal once, reducing the extraction work needed", correct: true },
          { text: "Recycling does not require refining at all" },
          { text: "Recycled metal is measured in different units" },
        ],
        explanation: "Because the metal has already been separated from raw ore and concentrated into a product, recovering it typically demands less energy and disturbance than mining fresh ore.",
      },
      {
        prompt: "What does closed loop refining allow a jewellery atelier to do?",
        options: [
          { text: "Avoid hallmarking its finished pieces" },
          { text: "Keep its own workshop scrap within its own supply chain, refined and returned as new metal", correct: true },
          { text: "Bypass purity testing entirely" },
          { text: "Trade exclusively on the COMEX exchange" },
        ],
        explanation: "Closed loop refining processes a workshop's own bench scrap and returns it as newly cast, certified metal, rather than sending it into an anonymous general scrap market.",
      },
    ],
  },
  {
    chapter: "VI",
    reading: [
      {
        heading: "Reading a pour before it happens",
        paragraphs: [
          "Casting a large bar, a one kilogram gold bar among them, looks simple from the outside: molten metal poured into a mould. In practice it is a tightly controlled sequence. The furnace charge must be brought to a precise temperature well above the metal's melting point to ensure complete, even melting without excessive oxidation; the mould must be preheated so the metal does not cool and solidify unevenly the instant it makes contact; and the pour itself is timed and angled to avoid trapping air or oxide skin inside the cooling bar.",
          "A refiner casting for the Good Delivery market is not simply making a shape. Every stage, from charge composition to cooling rate, is managed to avoid the internal defects, porosity, inclusions, or uneven grain structure, that would cause a bar to fail assay or crack under the stress of stacking and transport.",
        ],
      },
      {
        heading: "From molten metal to marked bar",
        paragraphs: [
          "Once cast and cooled, a bar is not yet finished. It is cleaned, its surface inspected for defects, and its exact weight recorded to a fraction of a gram, since Good Delivery bars are traded by their actual weight rather than a rounded nominal figure. The refiner's hallmark, an assay stamp, a unique serial number, and the year of manufacture are then struck or engraved, turning an anonymous casting into a traceable, tradable unit that a bank on the other side of the world can accept without further testing.",
          "This final marking step is where every earlier chapter of this Institute converges: the geology that put the metal in the ground, the refining that purified it, the metallurgy that governed how it behaved in the mould, and the market standards that decide what counts as an acceptable bar. Studying the pour is, in miniature, studying the entire life of a piece of precious metal.",
        ],
      },
      {
        heading: "What a director should be able to explain",
        paragraphs: [
          "A director or advisor does not need to be able to cast a bar personally. What matters is being able to explain, credibly and without exaggeration, why a Good Delivery bar commands the confidence it does: because its production is not a single trusting handshake, but a sequence of controlled, inspected, and independently verifiable steps, each one adding to the guarantee a client is ultimately relying on when they accept a bar sight unseen.",
          "This closing chapter is deliberately less about new facts and more about synthesis: connecting extraction, refining, purity, metallurgy, market structure, and recycling into a single, coherent account of how a bar of metal earns the trust the market places in it.",
        ],
      },
    ],
    takeaways: [
      "Casting a Good Delivery bar is a precisely controlled sequence, not a simple pour, designed to avoid internal defects.",
      "A bar's weight, hallmark, assay stamp, serial number, and year of manufacture are what make it traceable and tradable worldwide.",
      "Every earlier topic in this Institute, geology, refining, metallurgy, markets, and recycling, converges in the final cast and marked bar.",
      "Confidence in a Good Delivery bar rests on a sequence of controlled, inspected, and independently verifiable steps, not a single act of trust.",
    ],
    quiz: [
      {
        prompt: "Why is the mould preheated before a bar is cast?",
        options: [
          { text: "To add a decorative finish to the bar" },
          { text: "To prevent the metal from cooling and solidifying unevenly on contact", correct: true },
          { text: "To increase the bar's final fineness" },
          { text: "It is a purely traditional, non-technical step" },
        ],
        explanation: "Preheating the mould helps the metal cool and solidify evenly, reducing the risk of internal defects such as porosity or uneven grain structure.",
      },
      {
        prompt: "What ultimately makes a cast bar traceable and tradable worldwide?",
        options: [
          { text: "Its exact colour" },
          { text: "The combination of recorded weight, hallmark, assay stamp, serial number, and year of manufacture", correct: true },
          { text: "The name of the client who commissioned it" },
          { text: "Being stored in a specific vault city" },
        ],
        explanation: "These markings and records together let any accredited buyer accept the bar without further testing, which is the practical foundation of Good Delivery trust.",
      },
      {
        prompt: "What is the main purpose of this closing chapter?",
        options: [
          { text: "To introduce an entirely new topic unrelated to earlier chapters" },
          { text: "To synthesise extraction, refining, metallurgy, markets, and recycling into one account of how a bar earns market trust", correct: true },
          { text: "To provide investment advice on gold prices" },
          { text: "To certify the learner as a professional assayer" },
        ],
        explanation: "The chapter is designed as a synthesis, connecting everything studied earlier in the Institute into a single narrative of how a bar of metal becomes trustworthy.",
      },
    ],
  },
];

export default preciousMetalsCurriculum;

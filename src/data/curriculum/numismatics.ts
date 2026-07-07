import type { ChapterContent } from "./types";

/**
 * Institute of Numismatics — full lesson content. Written under the same
 * Governance Charter constraints as the other Institutes: no fabricated
 * statistics, no named living individuals, and named grading services or
 * historical coinages are referenced only as public industry or historical
 * fact, never as an implied partner or affiliate of the Academy.
 */
const numismaticsCurriculum: ChapterContent[] = [
  {
    chapter: "I",
    reading: [
      {
        heading: "Where coinage begins",
        paragraphs: [
          "The earliest coins generally credited with starting true coinage emerged in the kingdom of Lydia, in what is now western Turkey, in the seventh century BCE, struck from electrum, a naturally occurring gold-silver alloy. What made these objects coins, rather than simply lumps of precious metal, was standardisation: a consistent weight and a mark struck into the metal by an authority guaranteeing that weight and purity, which let two strangers trade without weighing and assaying metal for every transaction.",
          "This innovation spread quickly around the ancient Mediterranean and beyond, with Greek city-states, and later Rome, developing increasingly sophisticated coinage systems that carried not only economic function but political and artistic messaging, portraits of rulers, images of gods, symbols of civic identity, struck into an object that circulated far beyond where it was made.",
        ],
      },
      {
        heading: "Coinage as a mirror of power",
        paragraphs: [
          "Across the following two and a half millennia, coinage consistently tracked the rise and fall of the authorities that issued it. Roman coinage debased in purity during periods of fiscal strain, a pattern later repeated by numerous other states; medieval European coinage fragmented into a bewildering variety of local issues as centralised authority weakened, then re-consolidated as nation-states strengthened their monetary control. A numismatist reading a coin is, in a real sense, reading a data point about the political and economic condition of the moment it was struck.",
          "This is why numismatics is properly understood as a historical discipline as much as a collecting one. A coin's design, weight, purity, and even its wear pattern can each carry evidence about the period, the issuing authority's confidence, and how the coin actually circulated, evidence that written histories alone do not always preserve.",
        ],
      },
      {
        heading: "From hammered to milled to modern",
        paragraphs: [
          "For most of coinage's history, coins were struck by hand, a die held against a blank and struck with a hammer, producing coins that vary slightly in centring and shape even within the same issue. The introduction of mechanised, screw-press and later steam-powered minting technology from the sixteenth century onward produced far more uniform coins, known as milled coinage, and eventually enabled the high-volume, precisely struck modern coinage familiar today.",
          "Recognising which production era a coin belongs to, hammered, early milled, or modern industrial, is often the first and fastest clue to its approximate age and origin, well before finer authentication or grading work begins.",
        ],
      },
    ],
    takeaways: [
      "True coinage began with Lydian electrum coins in the seventh century BCE, defined by standardised weight and an authority's guaranteeing mark.",
      "Coinage has consistently reflected the political and economic condition of its issuing authority throughout history.",
      "Debasement, fragmentation, and re-consolidation in coinage systems mirror the fortunes of the states or authorities behind them.",
      "The shift from hammered to milled to modern industrial minting is often the fastest first clue to a coin's approximate age.",
    ],
    quiz: [
      {
        prompt: "What made early Lydian coins genuinely different from simple lumps of precious metal?",
        options: [
          { text: "They were the first objects made of pure gold" },
          { text: "A standardised weight and an authority's guaranteeing mark let them be trusted without individual assay", correct: true },
          { text: "They were the first coins to depict a human portrait" },
          { text: "They were minted using a steam-powered press" },
        ],
        explanation: "Standardisation of weight, combined with an authority's mark guaranteeing it, is what allowed early coinage to function as trusted money rather than simply metal by weight.",
      },
      {
        prompt: "Why can a numismatist treat a coin as historical evidence, not just a collectible?",
        options: [
          { text: "Coins are always more accurate than written records" },
          { text: "A coin's design, purity, and wear can reveal information about its era that written histories may not capture", correct: true },
          { text: "Only coins from the Roman period carry historical information" },
          { text: "Coins cannot be dated without written documentation" },
        ],
        explanation: "Physical evidence in a coin, purity changes, design shifts, wear patterns, can offer historical insight into the issuing authority's condition at the time, complementing written records.",
      },
      {
        prompt: "What generally distinguishes hammered coinage from milled coinage?",
        options: [
          { text: "Hammered coins are always more valuable" },
          { text: "Hammered coins were struck by hand and often vary in centring; milled coins used mechanised presses for greater uniformity", correct: true },
          { text: "Milled coins were never made of precious metal" },
          { text: "Hammered coinage only existed in Lydia" },
        ],
        explanation: "Hand-struck hammered coins tend to show more variation in centring and shape, while mechanised milled coinage, developed from the sixteenth century onward, produced far more uniform results.",
      },
    ],
  },
  {
    chapter: "II",
    reading: [
      {
        heading: "The Sheldon scale",
        paragraphs: [
          "Coin condition in much of the modern trade is described using the Sheldon scale, a numeric grading system originally developed for large cents and later extended across coinage broadly, running from 1, a coin barely identifiable, to 70, a theoretically perfect example with no visible imperfections even under magnification. Grades in between are anchored by widely understood benchmarks: About Good, Fine, Very Fine, Extremely Fine, About Uncirculated, and Mint State, each with its own numeric band.",
          "The scale exists to replace vague, subjective language, \"pretty nice condition\", with a shared vocabulary precise enough that two dealers on opposite sides of the world can discuss a coin's condition without seeing it in hand, and arrive in similar expectations of what they will find when they do.",
        ],
      },
      {
        heading: "Third-party grading services",
        paragraphs: [
          "Independent, third-party grading services examine a coin, assign it a grade on the Sheldon scale, and encapsulate it in a tamper-evident holder, commonly called a slab, along with a certification number that can be checked against the grading service's own public records. Two of the most widely recognised services operating in this space are the Professional Coin Grading Service, generally abbreviated PCGS, and Numismatic Guaranty Company, abbreviated NGC, both founded to bring independent, consistent standards to a trade that had previously relied heavily on individual dealer judgement.",
          "Encapsulation and certification exist to solve the same basic problem the Good Delivery bar solves for bullion: they let a coin trade with confidence between parties who have never met, because the grade has been assigned by an accountable third party rather than asserted by whoever currently holds the coin.",
        ],
      },
      {
        heading: "Grading is a professional judgement, not a fact",
        paragraphs: [
          "Grading is a skilled, professional assessment, not a purely mechanical measurement; two experienced graders can occasionally differ by a point or two on a genuinely borderline coin, and grading standards themselves have shifted somewhat over the decades as the trade has matured. This is precisely why third-party grading services publish their own detailed standards and offer a review or resubmission process, rather than treating a single grade as infallible.",
          "An advisor should present a graded coin's slab and certification honestly: as strong, independent evidence of condition and authenticity, not as an unchallengeable, mathematically precise fact, and should be able to explain to a client what a grade genuinely represents.",
        ],
      },
    ],
    takeaways: [
      "The Sheldon scale runs from 1 to 70 and gives the trade a shared, numeric vocabulary for describing coin condition.",
      "Third-party services such as PCGS and NGC independently grade and encapsulate coins, adding accountability beyond a single dealer's opinion.",
      "Encapsulation and certification let a coin trade confidently between parties who have never met, similar to a bullion Good Delivery bar.",
      "Grading is professional judgement, not an infallible measurement; standards and individual assessments can occasionally vary.",
    ],
    quiz: [
      {
        prompt: "What problem does the Sheldon scale solve for the coin trade?",
        options: [
          { text: "It replaces the need for authentication entirely" },
          { text: "It replaces vague, subjective condition descriptions with a shared numeric vocabulary", correct: true },
          { text: "It sets the legal tender value of a coin" },
          { text: "It only applies to coins struck after 1900" },
        ],
        explanation: "The Sheldon scale gives dealers and collectors a consistent, numeric way to describe condition, allowing shared expectations even without the coin in hand.",
      },
      {
        prompt: "What is the main function of a third-party grading service such as PCGS or NGC?",
        options: [
          { text: "Setting the daily price of gold and silver" },
          { text: "Independently examining, grading, and encapsulating a coin with an accountable, checkable certification", correct: true },
          { text: "Manufacturing new commemorative coins" },
          { text: "Insuring coin collections against theft" },
        ],
        explanation: "Independent grading services assess and encapsulate coins, providing an accountable, third-party grade that supports confident trading between parties who have never met.",
      },
      {
        prompt: "Why should grading be presented to a client as professional judgement rather than infallible fact?",
        options: [
          { text: "Because grading services frequently commit fraud" },
          { text: "Because experienced graders can occasionally differ on borderline coins, and standards evolve over time", correct: true },
          { text: "Because grading has no real value to a buyer" },
          { text: "Because only ungraded coins are worth collecting" },
        ],
        explanation: "Grading is a skilled assessment that can vary slightly between graders on genuinely borderline coins, which is why it should be presented honestly as strong evidence rather than an unchallengeable fact.",
      },
    ],
  },
  {
    chapter: "III",
    reading: [
      {
        heading: "Die studies",
        paragraphs: [
          "Every coin is struck from a pair of dies, one for each face, and because dies wear, chip, and are occasionally recut or repaired during their working life, each die leaves subtle, identifiable characteristics on every coin it strikes. Die studies catalogue these characteristics, small die cracks, distinctive positioning of design elements, or recutting, allowing specialists to match a coin to a specific known die and, in turn, to a specific point in a mint's production run.",
          "This matters for authentication because a die study can confirm a coin was struck from dies genuinely documented as used by a historical mint, a much stronger form of evidence than surface appearance alone, and can also help identify die-based counterfeits, where a forger has attempted to replicate a die's characteristics without actually possessing an authentic original.",
        ],
      },
      {
        heading: "Weight, diameter, and specific gravity",
        paragraphs: [
          "Genuine coins from a given issue were struck to a specified weight and diameter tolerance, so precise measurement remains one of the most basic and effective authentication tools available. A coin that falls meaningfully outside documented tolerances for its type is either an anomaly worth investigating in its own right or, more often, a fake struck from an incorrect blank or a different metal.",
          "Specific gravity testing, comparing a coin's weight in air against its weight submerged in water, can help detect fakes made from a different metal or a plated base-metal core, since specific gravity is a reliable physical property of a given alloy and is difficult to fake convincingly without using the correct materials.",
        ],
      },
      {
        heading: "Patina and modern forensic tools",
        paragraphs: [
          "Genuine ancient and antique coins typically develop patina, a surface layer formed by chemical reaction with their storage environment over long periods, and the character of that patina, its colour, texture, and how it sits in the coin's recesses versus its high points, is difficult to convincingly replicate artificially. Specialists examine patina closely for signs of artificial ageing, such as unnaturally uniform colour or patina sitting where natural wear should have removed it.",
          "Modern forensic tools extend this examination considerably: high-resolution microscopy, X-ray fluorescence for non-destructive alloy analysis, and comparison against large reference databases of known genuine and known counterfeit examples. No single tool is decisive on its own; serious authentication combines several methods, much as bullion counterfeit detection does, rather than relying on any one test in isolation.",
        ],
      },
    ],
    takeaways: [
      "Die studies match a coin's subtle die characteristics to known, documented dies, offering strong evidence of authenticity or exposing die-based fakes.",
      "Precise weight and diameter measurement against documented tolerances is a basic but effective first authentication step.",
      "Specific gravity testing can reveal fakes made from an incorrect metal or a plated base-metal core.",
      "Genuine aged patina is difficult to convincingly fake, and modern forensic tools work best combined, not used in isolation.",
    ],
    quiz: [
      {
        prompt: "What is a die study primarily used to establish?",
        options: [
          { text: "The current market value of a coin" },
          { text: "A match between a coin's subtle die characteristics and a specific, documented historical die", correct: true },
          { text: "The exact date a coin was buried in a hoard" },
          { text: "The coin's Sheldon scale grade" },
        ],
        explanation: "Die studies catalogue the distinctive marks a specific die leaves on coins it strikes, letting specialists match a coin to a known, documented die as evidence of authenticity.",
      },
      {
        prompt: "What can specific gravity testing help reveal in a suspect coin?",
        options: [
          { text: "The coin's exact year of minting" },
          { text: "Whether the coin is made from an incorrect metal or has a plated base-metal core", correct: true },
          { text: "The coin's Sheldon scale grade" },
          { text: "Which grading service previously examined the coin" },
        ],
        explanation: "Specific gravity is a reliable physical property tied to a specific alloy, making it useful for detecting fakes made from the wrong metal or with a plated core.",
      },
      {
        prompt: "Why is genuine ancient patina difficult to convincingly fake?",
        options: [
          { text: "Because patina cannot form on precious metal at all" },
          { text: "Because its natural colour, texture, and placement relative to wear are hard to replicate artificially", correct: true },
          { text: "Because patina is regulated by international law" },
          { text: "Because only certain grading services can identify it" },
        ],
        explanation: "Natural patina forms unevenly and interacts with wear in specific ways over long periods, which artificial ageing techniques struggle to replicate convincingly.",
      },
    ],
  },
  {
    chapter: "IV",
    reading: [
      {
        heading: "What makes a proof coin different",
        paragraphs: [
          "A proof coin is struck using a specially prepared process, polished dies, carefully selected blanks, and often multiple strikes, intended to produce the sharpest possible detail and a distinctive finish, typically a mirror-like field contrasted against frosted design elements. Proof coins are generally struck in much smaller numbers than ordinary circulation coinage and are intended from the outset for collectors rather than everyday commerce.",
          "It is worth being precise with a client that \"proof\" describes a method of manufacture and finish, not automatically a guarantee of rarity or future value; some proof issues are produced in relatively large numbers and trade close to their metal or issue value, while others, for various reasons of low mintage or enduring demand, command significant premiums.",
        ],
      },
      {
        heading: "Commemorative issues and series collecting",
        paragraphs: [
          "Modern mints regularly issue commemorative coins marking historical anniversaries, cultural themes, or significant events, often as part of an ongoing themed series designed to encourage collectors to pursue a complete set over multiple years. Series collecting has become a significant driver of modern numismatic demand, since a collector pursuing a specific series will often value completing that set more highly than any single coin's individual merits would suggest in isolation.",
          "Understanding a series' structure, its planned scope, mintage pattern across individual issues, and how actively it is still being pursued by collectors, helps explain why two coins of similar age, metal content, and even mintage can command noticeably different premiums in the secondary market.",
        ],
      },
      {
        heading: "The secondary market for modern issues",
        paragraphs: [
          "Unlike ancient and historical coins, whose supply is essentially fixed, modern proof and commemorative issues begin their life with a known, often publicly stated mintage figure, which shapes secondary market pricing from the outset. Prices for these modern issues can be considerably more volatile in the short term than historical coinage, often moving with collector sentiment, series completion demand, and broader trends in modern collecting, rather than purely with the underlying metal price.",
          "An advisor working in this segment should distinguish clearly between a coin's bullion or metal value, its collector premium tied to mintage and series demand, and any short-term speculative activity, since conflating these three is a common source of client disappointment when a modern issue's premium later contracts.",
        ],
      },
    ],
    takeaways: [
      "Proof describes a manufacturing method and finish, not automatically a guarantee of rarity or future value.",
      "Commemorative series collecting is a major driver of modern numismatic demand, often valuing set completion above individual coin merit.",
      "A series' scope, mintage pattern, and ongoing collector interest help explain premium differences between superficially similar coins.",
      "Modern issues carry three distinct value components, metal value, collector premium, and any speculative activity, that should not be conflated.",
    ],
    quiz: [
      {
        prompt: "What does the term \"proof\" actually describe in numismatics?",
        options: [
          { text: "A guarantee that the coin will increase in value" },
          { text: "A specific manufacturing process and finish, distinct from any guarantee of rarity", correct: true },
          { text: "A coin's official grading certificate" },
          { text: "A coin struck only from ancient dies" },
        ],
        explanation: "Proof refers to a careful striking process and distinctive finish, not automatically to rarity or investment value, which can vary widely between different proof issues.",
      },
      {
        prompt: "Why does series collecting significantly affect modern numismatic demand?",
        options: [
          { text: "Because series coins are always struck in gold" },
          { text: "Because collectors often value completing a set more highly than any individual coin's standalone merits", correct: true },
          { text: "Because series coins cannot be graded by third-party services" },
          { text: "Because series collecting is limited to ancient coinage" },
        ],
        explanation: "The desire to complete a themed series can drive demand and premiums for individual coins beyond what their standalone rarity or condition alone would suggest.",
      },
      {
        prompt: "What three value components should an advisor keep distinct when discussing a modern proof or commemorative issue?",
        options: [
          { text: "Weight, diameter, and specific gravity" },
          { text: "Metal value, collector premium tied to mintage and series demand, and any short-term speculative activity", correct: true },
          { text: "Sheldon grade, PCGS certification, and NGC certification" },
          { text: "Die study, patina, and forensic analysis" },
        ],
        explanation: "Conflating a modern coin's bullion value with its collector premium and any speculative demand is a common source of client confusion when a premium later contracts.",
      },
    ],
  },
  {
    chapter: "V",
    reading: [
      {
        heading: "Reading an auction catalogue",
        paragraphs: [
          "A well-prepared numismatic auction catalogue entry includes a detailed physical description, the coin's grade and certifying service if applicable, its provenance where known, meaning its documented history of prior ownership or publication, and an estimate range reflecting the auction house's professional expectation of likely selling price. Reading a catalogue closely, rather than skimming the photograph and estimate, often reveals important details: a note on a die variety, a mention of a prior notable sale, or a caveat about a minor condition issue that a casual glance would miss.",
          "Provenance in particular can carry real value beyond the coin's physical characteristics alone; a coin previously held in a well-documented historical collection, or published in a recognised reference work, often commands a premium purely for that documented history, since it adds a further layer of confidence about authenticity and offers a story a collector can attach to the piece.",
        ],
      },
      {
        heading: "Bidding strategy",
        paragraphs: [
          "Disciplined bidding starts well before the auction itself, with independent research into recent comparable sales for similar coins, rather than relying solely on the auction house's own estimate, which is a professional opinion but not a guarantee of eventual price. Setting a firm personal maximum in advance, and being genuinely willing to stop at it, protects a bidder from the well-documented psychological pull of a live auction room, where competitive momentum can carry a bid well past a coin's considered value.",
          "Absentee and online bidding options, now offered by most serious auction houses, allow a bidder to participate without being physically swept up in room dynamics, which can be a genuine advantage for a bidder prone to overextending in the moment, though it removes the option of reading the room's mood in real time.",
        ],
      },
      {
        heading: "Preparing a consignment",
        paragraphs: [
          "A client considering selling through auction benefits from careful preparation: professional photography, accurate cataloguing detail, and, where a coin's value justifies the cost, third-party grading in advance, since an unslabbed coin of genuine quality may sell for less simply because bidders discount for the uncertainty of ungraded condition. Choosing an auction house and sale with an established track record and genuine audience for the specific type of material being consigned matters as much as the coin itself.",
          "An advisor preparing a client's consignment should set realistic expectations grounded in comparable recent sales, rather than the client's own attachment to the piece, and should be transparent about the auction house's commission structure and any other fees that will apply to the eventual proceeds.",
        ],
      },
    ],
    takeaways: [
      "A thorough auction catalogue entry, including grade, provenance, and condition notes, rewards careful reading beyond the photograph and estimate.",
      "Documented provenance can add real value to a coin, independent of its physical characteristics alone.",
      "Disciplined bidding relies on independent research and a firm pre-set maximum, resisting the momentum of a live auction room.",
      "Preparing a consignment well, professional photography, grading, and the right choice of sale, meaningfully affects the eventual result.",
    ],
    quiz: [
      {
        prompt: "Why can documented provenance add value to a coin beyond its physical characteristics?",
        options: [
          { text: "Provenance always increases a coin's Sheldon grade" },
          { text: "A well-documented ownership or publication history adds confidence and a collectible story, independent of physical condition", correct: true },
          { text: "Provenance is required for legal ownership" },
          { text: "It has no real effect on price" },
        ],
        explanation: "A documented history of prior ownership or publication adds confidence in authenticity and a narrative collectors value, which can command a premium beyond the coin's physical merits alone.",
      },
      {
        prompt: "What is the main risk a firm, pre-set bidding maximum is designed to protect against?",
        options: [
          { text: "Overpaying due to the competitive momentum of a live auction room", correct: true },
          { text: "Losing the auction to an absentee bidder" },
          { text: "Being outbid by the auction house itself" },
          { text: "Missing the estimate range entirely" },
        ],
        explanation: "Live auctions can create competitive pressure that pushes bids beyond a coin's considered value, which a firm, disciplined maximum set in advance is meant to guard against.",
      },
      {
        prompt: "Why might third-party grading be worth the cost before consigning a valuable coin to auction?",
        options: [
          { text: "Grading is legally required for all auction sales" },
          { text: "Ungraded coins of genuine quality can sell for less because bidders discount for condition uncertainty", correct: true },
          { text: "Grading guarantees a specific final sale price" },
          { text: "Only graded coins can be photographed for a catalogue" },
        ],
        explanation: "Bidders often apply a discount to ungraded coins to account for condition uncertainty, so pre-sale grading can help a genuinely high-quality coin achieve its fuller value.",
      },
    ],
  },
  {
    chapter: "VI",
    reading: [
      {
        heading: "Why ten coins, not a hundred",
        paragraphs: [
          "A focused examination of ten well-chosen coins, spanning different eras, production methods, and conditions, teaches more transferable skill than a rushed survey of a much larger group, because each coin can be handled slowly enough to actually apply die study, measurement, patina assessment, and grading vocabulary in combination rather than in isolation. This studio chapter is designed as an application of everything studied earlier in the Institute, not an introduction of new material.",
          "A well-designed ten-coin study set typically includes at least one hammered issue, one early milled issue, one modern proof, one coin with a documented die variety, and one deliberately ambiguous or borderline example, so that the full range of authentication and grading judgement gets genuine practice, not just the easy cases.",
        ],
      },
      {
        heading: "A disciplined examination sequence",
        paragraphs: [
          "A disciplined approach to examining any unfamiliar coin follows a consistent sequence: identify the type and expected specifications first, weight, diameter, and known die characteristics for that issue; assess wear pattern and surface condition next, forming a provisional grade; examine patina and surface for any signs inconsistent with genuine age or handling; and only then consult any existing certification or provenance documentation, so that a bidder's independent judgement is not simply anchored to a prior label before forming an unbiased first impression.",
          "This sequence matters because it trains the habit of examining a coin on its own physical evidence first, then testing that impression against documentation, rather than the reverse, reading a certificate first and looking at the coin merely to confirm what the label already claims.",
        ],
      },
      {
        heading: "Writing up the findings",
        paragraphs: [
          "Completing this studio chapter well means producing a clear, honest written assessment for each coin: type and attribution, condition and provisional grade, any authentication concerns or points of confidence, and, where relevant, an honest note about genuine uncertainty rather than false confidence. This habit, writing findings down precisely rather than only forming an impression, is what separates a professional numismatic practice from an enthusiast's private judgement.",
          "A director who can produce this kind of written assessment credibly, for a client, an insurer, or an auction house, has demonstrated the practical synthesis this Institute has been building toward across all six chapters.",
        ],
      },
    ],
    takeaways: [
      "A focused ten-coin study applies die study, measurement, patina, and grading judgement in combination, not as isolated exercises.",
      "A well-designed study set deliberately includes borderline and ambiguous examples, not only easy, clear-cut coins.",
      "Examining a coin's physical evidence before consulting certification or provenance trains independent, unbiased judgement.",
      "A clear, honest written assessment, including genuine uncertainty where it exists, is the mark of professional numismatic practice.",
    ],
    quiz: [
      {
        prompt: "Why does a focused study of ten coins teach more than a rushed survey of a much larger group?",
        options: [
          { text: "Ten is the maximum number of coins any collection may legally contain" },
          { text: "It allows each coin to be examined slowly enough to apply multiple skills in combination", correct: true },
          { text: "Larger groups always contain fakes" },
          { text: "Fewer coins are always more valuable" },
        ],
        explanation: "A slower, more thorough examination of a smaller, well-chosen set allows die study, measurement, patina assessment, and grading to be applied together, building real transferable skill.",
      },
      {
        prompt: "In a disciplined examination sequence, why should a coin's physical evidence be assessed before consulting its certification?",
        options: [
          { text: "Certifications are generally unreliable" },
          { text: "It trains independent judgement rather than anchoring an impression to a prior label", correct: true },
          { text: "Certification documents are not permitted during examination" },
          { text: "Physical evidence is always more accurate than certification" },
        ],
        explanation: "Forming a provisional, independent assessment first, before checking documentation, builds the habit of testing labels against evidence, rather than simply confirming what a label already claims.",
      },
      {
        prompt: "What distinguishes professional numismatic practice from an enthusiast's private judgement, according to this chapter?",
        options: [
          { text: "Owning more expensive coins" },
          { text: "Producing a clear, honest written assessment, including genuine uncertainty where it exists", correct: true },
          { text: "Only ever handling certified, slabbed coins" },
          { text: "Avoiding ancient coinage entirely" },
        ],
        explanation: "Writing findings down precisely, and being honest about uncertainty rather than projecting false confidence, is presented as the mark of a professional numismatic practice.",
      },
    ],
  },
];

export default numismaticsCurriculum;

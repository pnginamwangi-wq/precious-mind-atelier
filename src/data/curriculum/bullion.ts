import type { ChapterContent } from "./types";

/**
 * Institute of Bullion — full lesson content. Written under the same
 * Governance Charter constraints as Precious Metals: no fabricated
 * statistics, no named living individuals, and any real refiner, mint, or
 * exchange named below is referenced only as a matter of public industry
 * fact, never as an implied partner, sponsor, or affiliate of the Academy.
 */
const bullionCurriculum: ChapterContent[] = [
  {
    chapter: "I",
    reading: [
      {
        heading: "Cast, minted, and kilobar",
        paragraphs: [
          "Investment gold and silver reach a buyer in a small number of standard formats. Cast bars are poured directly into a mould and cooled, leaving a slightly uneven, sometimes frosted surface; they are typically the least expensive to produce and are common in larger sizes such as the 400 ounce Good Delivery bar. Minted bars, by contrast, start as a cast blank that is then rolled, cut, and stamped under high pressure using dies, in much the same way a coin is struck, giving a sharp, uniform finish that many retail investors associate with a premium product.",
          "The kilobar sits at the centre of Asian retail and wholesale bullion trade, valued at exactly one kilogram of metal and produced by refiners in both cast and minted form. Its size makes it liquid enough for private investors while remaining efficient for institutions to move in volume, which is why it has become something of a universal reference unit across multiple regional markets rather than a single house's speciality.",
        ],
      },
      {
        heading: "Reading a bar's markings",
        paragraphs: [
          "Every bar intended for serious trade carries a consistent set of markings: the refiner's hallmark or logo, the fineness, the weight, a unique serial number, and often a small assay stamp confirming the bar has been tested and approved. On a minted bar these are typically struck cleanly into the surface; on a cast bar they may be stamped into a flatter face left for that purpose during the pour.",
          "The serial number is not decorative. It allows a specific bar to be tracked against a refiner's own records and, increasingly, against third-party registries, which matters enormously if a bar is ever lost, stolen, or disputed. A buyer who cannot read these markings is, in practice, trusting a seller's word alone; a buyer who can read them is verifying a claim against a physical, checkable object.",
        ],
      },
      {
        heading: "Assay cards and tamper-evident packaging",
        paragraphs: [
          "Since the early 2000s, many minted bars have shipped sealed inside a tamper-evident assay card: a rigid plastic sleeve, heat-sealed shut, printed with the bar's details and often the assayer's signature facsimile, designed so that any attempt to open it and remove the bar leaves visible damage to the seal. This packaging exists because a sealed, undisturbed card lets a bar trade multiple times without each new buyer needing to re-test it themselves.",
          "This convenience carries a trade-off worth explaining honestly to a client: a broken seal does not necessarily mean a bar is fraudulent, but it does mean the bar has lost the frictionless resale status the sealed card conferred, and will likely need re-assay or a discount to reflect that uncertainty before its next sale.",
        ],
      },
    ],
    takeaways: [
      "Cast, minted, and kilobar are the three dominant formats, each with different production methods and different resale expectations.",
      "A bar's markings, hallmark, fineness, weight, and serial number, are what make it individually identifiable and verifiable.",
      "Serial numbers allow a specific bar to be checked against refiner or registry records, not merely taken on trust.",
      "Tamper-evident assay packaging preserves frictionless resale; once broken, a bar typically needs re-assay or trades at a discount.",
    ],
    quiz: [
      {
        prompt: "What generally distinguishes a minted bar from a cast bar?",
        options: [
          { text: "Minted bars are always heavier" },
          { text: "Minted bars are struck from a cast blank under pressure, giving a sharper, more uniform finish", correct: true },
          { text: "Cast bars cannot legally be sold to the public" },
          { text: "Minted bars are never sealed in assay packaging" },
        ],
        explanation: "Minted bars are produced by rolling, cutting, and striking a cast blank, which is why they typically have a cleaner, more uniform finish than a directly cast bar.",
      },
      {
        prompt: "Why does a bar's serial number matter to a buyer?",
        options: [
          { text: "It sets the bar's daily market price" },
          { text: "It allows the specific bar to be checked against refiner or registry records rather than trusted on word alone", correct: true },
          { text: "It is required only for coins, not bars" },
          { text: "It replaces the need for a hallmark" },
        ],
        explanation: "A serial number makes an individual bar traceable and checkable, which matters especially in disputes over loss, theft, or authenticity.",
      },
      {
        prompt: "What happens, practically, once a tamper-evident assay card has been broken open?",
        options: [
          { text: "The bar becomes legally unsellable" },
          { text: "Nothing changes; the seal has no practical function" },
          { text: "The bar typically loses frictionless resale status and may need re-assay or a discount", correct: true },
          { text: "The bar automatically increases in value" },
        ],
        explanation: "A broken seal removes the guarantee the sealed card provided, so a bar will usually need independent re-assay, or trade at a discount reflecting that uncertainty, before its next sale.",
      },
    ],
  },
  {
    chapter: "II",
    reading: [
      {
        heading: "Why vault location matters",
        paragraphs: [
          "Bullion is not stored evenly around the world; it concentrates in a small number of financial centres with the security infrastructure, insurance markets, and legal certainty to support large scale precious metal storage. London has historically held one of the largest concentrations of vaulted gold in the world, supporting the over-the-counter trading conducted through the London market. Zurich, Singapore, and New York each play a comparable role for their surrounding regions, offering deep vaulting capacity, established legal frameworks for ownership, and proximity to major trading and refining activity.",
          "For an advisor, the choice of vault location is rarely only about the metal itself; it is also a choice about jurisdiction, currency exposure to storage fees, ease of physical delivery if a client ever wants the metal in hand, and the tax and reporting treatment that applies in that location. A client's home country and travel patterns can matter as much as the vault's reputation.",
        ],
      },
      {
        heading: "Allocated versus unallocated storage",
        paragraphs: [
          "Allocated storage means specific, identified bars or coins are set aside in a client's name; the client owns those exact items, and the vault operator holds them purely as custodian, with no claim on that metal for its own purposes. Unallocated storage, by contrast, means a client holds a claim on a quantity of metal rather than title to specific bars, and the institution holding it may use that metal as part of its own broader trading book, subject to the terms of the agreement.",
          "The practical difference becomes most visible in the event of the storage provider's financial difficulty. Allocated metal is generally treated as the client's own property, held off the provider's balance sheet; unallocated metal typically represents a contractual claim against the provider, which places the client in a different legal position depending on that provider's solvency. An advisor's obligation is to make sure a client understands which arrangement they actually hold, since the two are frequently marketed with similar-sounding language.",
        ],
      },
      {
        heading: "Insurance and audit",
        paragraphs: [
          "Reputable vault operators insure the metal they hold against loss, theft, and physical damage, and commission periodic independent audits to confirm that recorded holdings match what is physically present. A client is entitled to ask, plainly, who insures the metal, to what value, and how recently an independent audit confirmed the vault's holdings, rather than accepting a vault's reputation alone as sufficient assurance.",
          "These questions are not a sign of distrust; they are standard due diligence in any market where a client is paying to store a valuable, portable asset they cannot personally inspect on a daily basis. An advisor who can walk a client through exactly what to ask, and why, adds real value beyond simply recommending a vault by name.",
        ],
      },
    ],
    takeaways: [
      "Bullion vaulting concentrates in a small number of centres, chiefly London, Zurich, Singapore, and New York, each with its own legal and market advantages.",
      "Allocated storage means ownership of specific, identified metal; unallocated storage means a contractual claim on a quantity of metal.",
      "The allocated versus unallocated distinction matters most if a storage provider runs into financial difficulty.",
      "Clients are entitled to ask about insurance coverage and independent audit history, not simply trust a vault's reputation.",
    ],
    quiz: [
      {
        prompt: "What is the key difference between allocated and unallocated bullion storage?",
        options: [
          { text: "Allocated storage is always cheaper" },
          { text: "Allocated storage gives title to specific, identified metal; unallocated gives a contractual claim on a quantity", correct: true },
          { text: "Unallocated storage is only available for silver" },
          { text: "There is no practical difference between the two" },
        ],
        explanation: "Allocated metal is the client's identified property held in custody; unallocated metal represents a claim against the provider, which behaves differently if that provider faces financial difficulty.",
      },
      {
        prompt: "Why do major vaulting centres concentrate in places like London, Zurich, Singapore, and New York?",
        options: [
          { text: "Because gold can only be legally stored in those four cities" },
          { text: "Because they offer established security infrastructure, legal certainty, and proximity to trading and refining activity", correct: true },
          { text: "Because those cities have the lowest storage fees globally" },
          { text: "Because international law requires it" },
        ],
        explanation: "These centres combine security infrastructure, legal frameworks for ownership, insurance markets, and closeness to trading and refining, which is why vaulting activity concentrates there.",
      },
      {
        prompt: "What should a client reasonably ask a vault operator before storing metal with them?",
        options: [
          { text: "Only the current spot price of gold" },
          { text: "Who insures the metal, to what value, and how recently holdings were independently audited", correct: true },
          { text: "Nothing; reputation alone is sufficient assurance" },
          { text: "Only the vault's opening hours" },
        ],
        explanation: "Insurance coverage and independent audit history are standard due diligence questions for any client storing valuable metal they cannot personally inspect day to day.",
      },
    ],
  },
  {
    chapter: "III",
    reading: [
      {
        heading: "What \"spot price\" actually means",
        paragraphs: [
          "The spot price is the price for immediate delivery of a standard unit of metal, typically quoted per troy ounce, and it moves continuously during trading hours in response to the same forces that move any global market: supply and demand, currency movements, interest rates, and broader investor sentiment. It is a wholesale reference price, generated primarily by trading among large financial institutions, refiners, and market makers, not the price any individual retail buyer will actually pay.",
          "The London bullion market conducts a twice-daily auction process, commonly referred to as \"the fix\", which produces a widely used benchmark price for gold and silver, referenced in contracts, valuations, and financial reporting well beyond the auction's own participants. Understanding that the fix is a benchmark-setting mechanism, not a retail price list, is the first step toward explaining to a client why the number they see quoted in the news differs from the number on an invoice.",
        ],
      },
      {
        heading: "Premium: the gap between spot and retail",
        paragraphs: [
          "The premium is the amount a buyer pays above the spot price for a physical product, and it reflects real costs: refining and minting, distribution, dealer margin, insurance, and the simple fact that smaller units cost more, proportionally, to produce and handle than large bars. A one ounce coin will typically carry a noticeably higher premium, as a percentage of its metal value, than a 400 ounce Good Delivery bar, because the fixed costs of producing and handling it are spread across far less metal.",
          "Premiums also move independently of the metal price itself, particularly during periods of high demand, when mint and refiner production capacity is stretched and dealers hold less inventory relative to buying interest. A client who understands this distinguishes, correctly, between \"the gold price fell\" and \"the price I am quoted fell\", which are related but genuinely different things.",
        ],
      },
      {
        heading: "Spread and the cost of trading",
        paragraphs: [
          "The spread is the difference between a dealer's buy-back price and its sell price for the same product at the same moment, and it represents the dealer's margin for standing ready to trade in both directions. A tight spread signals a liquid, competitive market for that specific product; a wide spread often signals a thinner, less liquid market, higher handling costs, or simply a less competitive dealer.",
          "For a client thinking about bullion as part of a longer-term holding, the spread matters as much as the headline premium, since it is effectively the cost of entering and later exiting a position. An advisor who quotes only the buy price, without discussing the likely spread on resale, is giving a client an incomplete picture of the true cost of ownership.",
        ],
      },
    ],
    takeaways: [
      "Spot price is a continuously moving wholesale reference price, not the price a retail buyer actually pays.",
      "The twice-daily London fix produces a widely used benchmark, distinct from the constantly moving spot price.",
      "Premium reflects real costs of refining, minting, distribution, and dealer margin, and rises for smaller units and during high demand.",
      "Spread, the gap between a dealer's buy and sell price, is effectively the cost of entering and exiting a bullion position.",
    ],
    quiz: [
      {
        prompt: "What does the spot price of gold actually represent?",
        options: [
          { text: "The exact retail price a buyer pays at any dealer" },
          { text: "A continuously moving wholesale reference price for immediate delivery of a standard unit", correct: true },
          { text: "A fixed annual price set by central banks" },
          { text: "The price only used for jewellery manufacturing" },
        ],
        explanation: "Spot price is a wholesale, continuously updated reference price, driven by broad market forces, not the specific retail price charged for a physical product.",
      },
      {
        prompt: "Why does a one ounce coin typically carry a higher premium, as a percentage of value, than a large bar?",
        options: [
          { text: "Coins are always made from higher purity metal" },
          { text: "Fixed production and handling costs are spread across far less metal in a smaller unit", correct: true },
          { text: "Coins are subject to a different spot price" },
          { text: "Large bars are not allowed to carry any premium" },
        ],
        explanation: "The refining, minting, distribution, and handling costs behind a product are largely fixed per unit, so they represent a much larger percentage of value on a small coin than on a large bar.",
      },
      {
        prompt: "What does the \"spread\" measure in a bullion transaction?",
        options: [
          { text: "The physical distance between mine and vault" },
          { text: "The gap between a dealer's buy-back and sell price for the same product at the same time", correct: true },
          { text: "The difference between gold and silver spot prices" },
          { text: "The tax rate applied to bullion sales" },
        ],
        explanation: "Spread is the dealer's margin for trading in both directions, and it effectively represents the built-in cost of both buying and later reselling a position.",
      },
    ],
  },
  {
    chapter: "IV",
    reading: [
      {
        heading: "Why brand matters in a fungible market",
        paragraphs: [
          "Gold is gold, chemically, once refined to a given purity; a molecule of fine gold does not carry a maker's identity. And yet, in practice, bars and coins from certain refiners and mints trade with noticeably higher liquidity and buyer confidence than others of identical purity. This is because accreditation, consistent quality, and a long public track record reduce the friction and perceived risk of a transaction, particularly for a buyer who is not personally able to assay the metal.",
          "This is the genuine, defensible sense in which brand equity exists in bullion: not as a claim that one refiner's gold is somehow purer than another's at the same stated fineness, but as a reflection of trust built through accreditation, consistency, and market history, which in turn affects how easily a specific bar or coin can be resold without a discount.",
        ],
      },
      {
        heading: "Refiners, mints, and their accreditation",
        paragraphs: [
          "Independent refiners such as those based in Switzerland and Australia, alongside sovereign mints operating on behalf of national governments, together produce the large majority of bars and coins that circulate in global bullion trade. Refiners are typically accredited through the same Good Delivery and responsible sourcing frameworks discussed in the Institute of Precious Metals; sovereign mints additionally carry the further backing of the government under whose authority they strike legal tender coinage.",
          "This distinction, refiner-accredited bar versus sovereign-minted legal tender coin, is not simply technical trivia. A legal tender coin often carries additional recognition and, in some jurisdictions, different tax treatment compared with a bar, purely because of its sovereign status, independent of the metal content the two might share.",
        ],
      },
      {
        heading: "Liquidity as the practical test",
        paragraphs: [
          "The clearest, least subjective test of a bullion brand's standing is liquidity: how quickly, and at how narrow a spread, a specific product can be resold in a given market. Widely recognised bars and coins from established, accredited producers generally trade with tighter spreads and faster turnaround than unfamiliar or thinly traded products, even when the underlying metal content is identical.",
          "An advisor's task is not to promote any single refiner or mint, but to help a client understand that liquidity, not marketing, is the real measure of a bullion brand's value, and that this liquidity can differ meaningfully across regional markets for the same product.",
        ],
      },
    ],
    takeaways: [
      "Brand equity in bullion reflects trust, accreditation, and market history, not a difference in the purity of refined metal itself.",
      "Independent refiners and sovereign mints are accredited through different, though related, frameworks, and mints carry additional government backing.",
      "Legal tender coin status can carry recognition or tax treatment distinct from a bar of identical metal content.",
      "Liquidity, how easily and cheaply a product resells, is the clearest practical test of a bullion brand's standing.",
    ],
    quiz: [
      {
        prompt: "In what sense does \"brand\" genuinely matter for otherwise identical refined gold?",
        options: [
          { text: "Certain refiners' gold is chemically purer at the same stated fineness" },
          { text: "Trust, accreditation, and track record affect liquidity and resale confidence, not the metal's chemistry", correct: true },
          { text: "Brand has no effect on any aspect of a bullion transaction" },
          { text: "Only sovereign mints are allowed to sell gold internationally" },
        ],
        explanation: "Once refined to a stated fineness, gold from different accredited sources is chemically equivalent; brand equity instead reflects trust and track record, which affects how easily a product resells.",
      },
      {
        prompt: "What additional status does a sovereign mint's coin carry that a refiner's bar generally does not?",
        options: [
          { text: "A higher guaranteed purity" },
          { text: "Legal tender status backed by a national government", correct: true },
          { text: "Automatic exemption from all storage fees" },
          { text: "A permanently fixed resale price" },
        ],
        explanation: "Sovereign mint coins carry legal tender status under government authority, which can carry additional recognition or tax treatment distinct from a refiner's bar of similar metal content.",
      },
      {
        prompt: "What is the clearest practical measure of a bullion brand's real standing in the market?",
        options: [
          { text: "The refiner's advertising budget" },
          { text: "How quickly and at how narrow a spread the product can be resold", correct: true },
          { text: "The number of countries the refiner operates in" },
          { text: "The colour of the bar's packaging" },
        ],
        explanation: "Liquidity, the ease and cost of resale, is the most objective, practical test of a bullion product's standing, since it reflects real buyer confidence rather than marketing.",
      },
    ],
  },
  {
    chapter: "V",
    reading: [
      {
        heading: "Why bullion attracts regulatory attention",
        paragraphs: [
          "Precious metals combine high value, physical portability, and relative anonymity of ownership once metal changes hands outside a regulated exchange, which makes bullion a category regulators watch closely for money laundering and sanctions evasion risk. This is not a comment on the industry's integrity; it is simply a structural feature of any asset that is valuable, compact, and can move across borders without leaving the same electronic trail as a bank transfer.",
          "Reputable dealers, refiners, and vault operators accordingly operate anti-money laundering, commonly abbreviated AML, and know-your-customer, abbreviated KYC, programmes: verifying a client's identity, understanding the source of funds for large purchases, and reporting transactions that meet regulatory thresholds or raise genuine concern. An advisor should be comfortable explaining why these checks exist, rather than treating them as bureaucratic friction imposed for no reason.",
        ],
      },
      {
        heading: "Counterfeit detection",
        paragraphs: [
          "Counterfeiting in bullion ranges from crude fakes, wrong weight or obviously incorrect markings, to sophisticated efforts such as tungsten-filled bars, since tungsten's density is close to gold's, making a filled bar pass a simple weight check while failing more rigorous testing. Non-destructive tools such as ultrasonic thickness testing, X-ray fluorescence, and specific gravity testing, alongside the simple discipline of buying only sealed, accredited products from reputable sources, are the practical defences available to a buyer or dealer.",
          "No single test is entirely foolproof on its own, which is why serious counterfeit prevention relies on combining several methods along with sourcing discipline, rather than trusting any one instrument or check in isolation.",
        ],
      },
      {
        heading: "Insured transport and chain of custody",
        paragraphs: [
          "Moving bullion between a refiner, a vault, and a client involves specialist secure logistics providers, insured transport, and a documented chain of custody at every handover, precisely because the metal is valuable, portable, and attractive to theft. A client purchasing bullion for delivery, rather than vault storage, should expect and ask about exactly this: which carrier, what insurance covers the shipment in transit, and what documentation confirms the metal's condition and identity at each stage.",
          "Treating transport and custody as an afterthought is a common and avoidable error. The security of a bar sitting in an accredited vault is only as strong as the weakest link in how it got there, and how it will move if the client ever wants to relocate or liquidate the holding.",
        ],
      },
    ],
    takeaways: [
      "Bullion's high value, portability, and relative anonymity make it a natural focus for AML and KYC regulatory attention.",
      "AML and KYC programmes exist to verify identity and understand the source of funds, not as arbitrary bureaucracy.",
      "Counterfeit detection relies on combining multiple non-destructive tests plus sourcing discipline, since no single method is foolproof.",
      "Insured transport and a documented chain of custody at every handover are essential, not optional, when bullion physically moves.",
    ],
    quiz: [
      {
        prompt: "Why does bullion attract particular attention from AML and KYC regulation?",
        options: [
          { text: "Because it is the only asset class regulators monitor" },
          { text: "Because its high value, portability, and relative anonymity once transferred create real money laundering risk", correct: true },
          { text: "Because bullion is always illegal to own privately" },
          { text: "Because only banks are permitted to hold precious metal" },
        ],
        explanation: "The combination of high value, physical portability, and reduced transaction traceability once metal changes hands is what makes bullion a structural focus for AML and KYC regulation.",
      },
      {
        prompt: "Why is a tungsten-filled fake bar a particularly sophisticated form of counterfeiting?",
        options: [
          { text: "Tungsten is more valuable than gold" },
          { text: "Tungsten's density is close to gold's, so the fake can pass a simple weight check", correct: true },
          { text: "Tungsten cannot be detected by any known method" },
          { text: "It is only used in coin counterfeiting, never bars" },
        ],
        explanation: "Because tungsten's density closely matches gold's, a tungsten-filled bar can deceive a simple weight-based check, which is why more rigorous, non-destructive testing methods are needed.",
      },
      {
        prompt: "What should a client expect when arranging physical delivery of purchased bullion?",
        options: [
          { text: "No documentation is needed once payment clears" },
          { text: "Insured transport with a specialist carrier and a documented chain of custody at each handover", correct: true },
          { text: "Delivery is never insured, by industry convention" },
          { text: "Only vault storage is ever offered; physical delivery does not exist" },
        ],
        explanation: "Because bullion is valuable and portable, reputable delivery involves insured, specialist transport and clear documentation confirming the metal's condition and identity at each stage.",
      },
    ],
  },
  {
    chapter: "VI",
    reading: [
      {
        heading: "Starting with the client's actual goal",
        paragraphs: [
          "A bullion allocation should follow from a client's actual goal, not a generic recommendation: capital preservation against currency risk, portfolio diversification, a specific liquidity need, or simply a wish to hold a tangible asset outside the financial system. These goals lead to genuinely different structures. A client seeking maximum liquidity for a future need may prefer widely recognised, smaller units even at a higher premium; a client focused purely on cost efficiency for a long-term holding may prefer large Good Delivery bars in allocated storage.",
          "An advisor's first task in any real conversation is to ask enough questions to understand which of these goals, or which mix of them, actually applies, rather than defaulting to whatever product happens to be easiest to sell.",
        ],
      },
      {
        heading: "Scaling the structure to the size of the holding",
        paragraphs: [
          "A ten thousand allocation and a ten million allocation are not the same conversation scaled up; they involve different practical considerations entirely. At smaller scale, product selection, premium, and a single reputable dealer relationship dominate the decision. At larger scale, considerations such as diversifying across more than one vault jurisdiction, negotiating institutional-grade storage terms, and building a documented ownership and succession record become genuinely important, not optional refinements.",
          "A director advising across this full range needs to recognise which considerations actually change with scale, and resist the temptation to apply a private client's approach to an institutional-sized holding, or vice versa.",
        ],
      },
      {
        heading: "Documenting the advice, not just giving it",
        paragraphs: [
          "A sound bullion allocation should leave the client with clear documentation: what was purchased, from which accredited source, where and how it is stored, what the insurance and audit arrangements are, and what the plan is if the client later wants to sell, gift, or pass the holding to an heir. This is a matter of professional practice as much as client service, since disputes and confusion are far more likely when a large, tangible asset's paper trail is thin.",
          "Ending an advisory relationship with a well-documented position, rather than simply a completed transaction, is what distinguishes a genuine practicum in client advisory from a single successful sale.",
        ],
      },
    ],
    takeaways: [
      "A bullion allocation should be built around a client's specific goal, capital preservation, diversification, liquidity, or tangible ownership, not a default product.",
      "Small and large allocations raise genuinely different practical considerations; scale changes the advisory conversation, not just its size.",
      "At larger scale, jurisdiction diversification, institutional storage terms, and succession documentation become central concerns.",
      "Clear documentation of what was bought, how it is stored, and what happens at exit is a core part of responsible advisory practice.",
    ],
    quiz: [
      {
        prompt: "Why might a client seeking maximum future liquidity choose smaller, widely recognised units even at a higher premium?",
        options: [
          { text: "Smaller units are always cheaper overall" },
          { text: "Widely recognised smaller units tend to resell more easily and quickly when a liquidity need arises", correct: true },
          { text: "Large bars cannot legally be resold" },
          { text: "Premiums do not apply to smaller units" },
        ],
        explanation: "Smaller, widely recognised products generally offer easier, faster resale, which matters most to a client prioritising liquidity over minimising premium cost.",
      },
      {
        prompt: "What genuinely changes as a bullion allocation grows from a modest private holding to an institutional-sized one?",
        options: [
          { text: "Nothing meaningful changes besides the total value" },
          { text: "Considerations such as multi-jurisdiction storage, institutional storage terms, and succession documentation become central", correct: true },
          { text: "Only the premium percentage changes" },
          { text: "Larger holdings no longer require insurance" },
        ],
        explanation: "At larger scale, factors like diversifying across vault jurisdictions and formal succession documentation become genuinely important considerations, not simply a bigger version of a small private holding.",
      },
      {
        prompt: "What should a responsible advisor leave a client with, beyond the completed purchase itself?",
        options: [
          { text: "Nothing further; the transaction is the deliverable" },
          { text: "Clear documentation covering sourcing, storage, insurance, audit, and exit plans", correct: true },
          { text: "A verbal assurance only, to avoid paperwork" },
          { text: "Access to the advisor's personal trading account" },
        ],
        explanation: "Thorough documentation of sourcing, storage, insurance, audit history, and exit planning is what distinguishes sound advisory practice from a one-off sale.",
      },
    ],
  },
];

export default bullionCurriculum;

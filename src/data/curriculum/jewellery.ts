/**
 * Institute of Jewellery — full lesson content.
 *
 * Written under the same Governance Charter constraints as the other
 * Institutes: no fabricated statistics, no named living individuals, and
 * any named house, period, or maker's mark convention referenced below is
 * public historical or industry fact, never an implied partnership,
 * sponsorship, or affiliation with the Academy.
 */

import type { ChapterContent } from "./types";

const jewelleryCurriculum: ChapterContent[] = [
  {
    chapter: "I",
    reading: [
      {
        heading: "Gold before writing",
        paragraphs: [
          "Adornment predates written history and appears to be a near-universal human impulse: gold work from ancient Egypt shows sophisticated granulation and inlay techniques already in use thousands of years ago, often built around religious and funerary meaning rather than decoration alone. Understanding jewellery as a director requires seeing it first as a continuous human practice, not a modern retail category, since the emotional weight clients bring to a purchase is inherited from this much longer history whether they articulate it or not.",
          "Techniques such as granulation, the fusing of tiny gold spheres to a surface, and cloisonné, enamel or stone set within metal cells, were refined independently across multiple ancient cultures, showing that fine jewellery craft has never been the property of a single era or region.",
        ],
      },
      {
        heading: "From court to counter",
        paragraphs: [
          "The Belle Époque period, spanning roughly the final decades of the nineteenth century into the early twentieth, marks a turning point where jewellery houses as recognisable commercial institutions, with named ateliers, signature styles, and international clienteles, take the shape a director would recognise today. Platinum's growing use in this period, prized for its strength allowing finer, lighter settings, enabled a lace-like delicacy that earlier metal technology could not achieve.",
          "This period also formalised many conventions still standard today: the presentation box, the maison's signature on a piece, and the idea of a house style distinct from any single craftsman, allowing continuity of brand identity across generations of makers.",
        ],
      },
      {
        heading: "Why history is a sales tool",
        paragraphs: [
          "A director who can place a piece in its historical lineage, without overclaiming a specific attribution that cannot be verified, gives a client a genuine framework for appreciation rather than a sales pitch. History used honestly deepens trust; history used loosely, claiming a specific maker or period without evidence, is a disclosure failure this Academy treats seriously.",
          "This chapter's role is to build that lineage in outline, from ancient goldwork through the Belle Époque to contemporary design, so later chapters on craft, high jewellery, and provenance have a shared historical spine to draw on.",
        ],
      },
    ],
    takeaways: [
      "Adornment is a near-universal, ancient human practice, not a modern retail invention, and gold techniques like granulation predate written history.",
      "The Belle Époque period established the recognisable modern jewellery house: named ateliers, signature styles, and international clienteles.",
      "Platinum's strength enabled finer, lighter settings that changed what jewellery design could achieve.",
      "Historical context deepens genuine client appreciation, but only when used honestly and without unverifiable attribution claims.",
    ],
    quiz: [
      {
        prompt: "What does granulation refer to in ancient goldwork?",
        options: [
          { text: "Polishing a surface to a high shine" },
          { text: "Fusing tiny spheres of gold to a surface", correct: true },
          { text: "Setting gemstones using prongs" },
          { text: "Engraving a maker's signature into metal" },
        ],
        explanation: "Granulation is the technique of fusing small gold spheres to a surface, refined independently by several ancient cultures.",
      },
      {
        prompt: "Why was platinum significant to jewellery design in the Belle Époque period?",
        options: [
          { text: "It was cheaper than gold at the time" },
          { text: "Its strength allowed finer, lighter, more delicate settings", correct: true },
          { text: "It could not be engraved or hallmarked" },
          { text: "It replaced diamonds as the primary gemstone" },
        ],
        explanation: "Platinum's strength let jewellers create finer, lace-like settings that earlier metals could not support structurally.",
      },
      {
        prompt: "What does this chapter caution against when using history in client conversations?",
        options: [
          { text: "Mentioning any historical period at all" },
          { text: "Claiming a specific maker or period attribution without verifiable evidence", correct: true },
          { text: "Referencing ancient Egyptian techniques" },
          { text: "Discussing the Belle Époque period" },
        ],
        explanation: "Historical context is valuable when accurate; claiming a specific, unverifiable attribution is a disclosure failure the Academy treats seriously.",
      },
    ],
  },
  {
    chapter: "II",
    reading: [
      {
        heading: "The house drawing tradition",
        paragraphs: [
          "Before a single stone is set or a gram of metal cast, a piece of high jewellery typically exists as a drawing, historically rendered in gouache, an opaque watercolour medium capable of depicting metal's reflectivity and a gemstone's depth of colour with a precision line drawing cannot match. This tradition served both a creative and a practical function: the gouache rendering communicated a design to craftsmen, patrons, and workshop across language and specialism barriers before physical production began.",
          "Learning to read a gouache rendering, understanding what its conventions communicate about proportion, metal colour, and stone placement, is a foundational literacy for anyone advising on custom or high jewellery commissions, since the rendering is the contract of intent before the physical object exists.",
        ],
      },
      {
        heading: "From concept to full colour",
        paragraphs: [
          "The design process typically begins with rough concept sketches exploring form and composition, narrows to a small number of developed directions, and culminates in a full colour rendering of the selected design, often shown from multiple angles to communicate how the piece will sit and move on the body. Technical drawings accompany the artistic rendering, specifying exact stone sizes, metal weights, and construction details the workshop will need.",
          "This two-track approach, artistic rendering for vision and technical drawing for execution, persists in digital design tools today even as the physical gouache tradition has become less universal; the underlying discipline of separating what a client sees from what a workshop builds remains unchanged.",
        ],
      },
      {
        heading: "Presenting a design to a client",
        paragraphs: [
          "A director presenting a design rendering should be able to explain what is fixed in the design, such as stone placement and proportion, and what remains adjustable, such as minor sizing or metal tone, before the client commits. Managing this expectation clearly at the design stage prevents costly and relationship-damaging revisions once fabrication has begun.",
          "The rendering is also where a director can responsibly set expectations about a piece's eventual weight and scale, since a beautiful drawing can visually mislead a client about actual size if proportion is not discussed explicitly alongside it.",
        ],
      },
    ],
    takeaways: [
      "Gouache renderings historically communicated jewellery designs across craftsmen, patrons, and workshops before production began.",
      "Design typically moves from rough concept sketches to a small number of developed directions to a full colour rendering.",
      "Technical drawings accompanying the artistic rendering specify stone sizes, metal weights, and construction details.",
      "A director should clearly distinguish fixed design elements from adjustable ones before a client commits to a commission.",
    ],
    quiz: [
      {
        prompt: "Why was gouache historically favoured for jewellery design renderings?",
        options: [
          { text: "It dries faster than any other medium" },
          { text: "It can depict metal's reflectivity and gemstone colour depth precisely", correct: true },
          { text: "It is the cheapest painting medium available" },
          { text: "It cannot be used for technical specifications" },
        ],
        explanation: "Gouache's opaque, richly pigmented qualities let it convincingly render metal sheen and gemstone colour, making it well suited to jewellery design.",
      },
      {
        prompt: "What is the purpose of technical drawings alongside the artistic rendering?",
        options: [
          { text: "To replace the need for any artistic rendering" },
          { text: "To specify exact stone sizes, metal weights, and construction details for the workshop", correct: true },
          { text: "To show the piece being worn by a client" },
          { text: "To document the piece's provenance after sale" },
        ],
        explanation: "Technical drawings provide the precise specifications a workshop needs to execute the design shown in the artistic rendering.",
      },
      {
        prompt: "Why should a director discuss proportion explicitly alongside a design rendering?",
        options: [
          { text: "Renderings always show the piece at exact life size" },
          { text: "A beautiful drawing can visually mislead a client about the piece's actual scale", correct: true },
          { text: "Proportion is only relevant after fabrication is complete" },
          { text: "Clients never ask about size before a commission" },
        ],
        explanation: "Discussing scale and proportion explicitly at the design stage prevents client expectations from being set inaccurately by the rendering alone.",
      },
    ],
  },
  {
    chapter: "III",
    reading: [
      {
        heading: "Piercing and filing",
        paragraphs: [
          "At the bench, piercing uses a fine saw to cut intricate shapes from sheet metal, a technique demanding steady control since the blade can snap easily if forced. Filing shapes and refines those cut edges, removing saw marks and establishing the clean lines that later polishing will bring to a final shine. These two techniques together are the foundation of nearly all fabricated, as opposed to cast, jewellery construction.",
          "Understanding the physical difficulty and time investment behind piercing and filing gives a director a genuine basis for explaining labour costs to a client, rather than relying on vague language about craftsmanship that a skeptical buyer may reasonably question.",
        ],
      },
      {
        heading: "Soldering as controlled risk",
        paragraphs: [
          "Soldering joins metal components using a filler metal with a lower melting point than the base metal, applied with a torch at carefully controlled temperature and duration. The risk in soldering is real: too much heat can melt the piece being joined, too little leaves a weak, failure-prone joint, and heat applied unevenly can distort delicate work entirely. Experienced jewellers develop a feel for this balance that no written description fully substitutes for.",
          "Multi-step pieces often require several solder joins using filler metals with progressively lower melting points, so that earlier joints do not melt when later ones are made, a sequencing discipline that demands the piece's entire construction be planned before the first joint is soldered.",
        ],
      },
      {
        heading: "Setting as the final trust",
        paragraphs: [
          "Setting secures a gemstone into the metal using techniques such as prong, bezel, pavé, or channel setting, each offering a different balance of security, light exposure to the stone, and visual style. A poorly executed setting risks the single outcome every client fears most: a lost stone, and setters are trained specifically to test a stone's security through careful, deliberate manipulation before a piece ever leaves the workshop.",
          "This chapter closes by tying craft directly to trust: every technique described here exists in service of a piece that will perform reliably for the client wearing it, not simply one that looks correct in a photograph.",
        ],
      },
    ],
    takeaways: [
      "Piercing and filing form the physical foundation of fabricated jewellery construction, distinct from cast pieces.",
      "Soldering uses controlled heat and sequenced filler metals of progressively lower melting points to join components safely.",
      "Setting techniques such as prong, bezel, pavé, and channel each balance security, light exposure, and visual style differently.",
      "Bench craft ultimately exists to produce a piece that performs reliably for the wearer, not only one that photographs well.",
    ],
    quiz: [
      {
        prompt: "What is the main risk involved in soldering jewellery components?",
        options: [
          { text: "The metal becoming too shiny" },
          { text: "Uneven or excessive heat melting or distorting the piece, or insufficient heat leaving a weak joint", correct: true },
          { text: "The solder becoming visible after polishing" },
          { text: "The piece becoming too heavy" },
        ],
        explanation: "Soldering requires carefully controlled heat; too much risks melting or distorting the piece, and too little produces a weak joint.",
      },
      {
        prompt: "Why do multi-join pieces use filler metals with progressively lower melting points?",
        options: [
          { text: "To make the piece lighter overall" },
          { text: "So earlier solder joints do not melt when later joints are made", correct: true },
          { text: "To change the final colour of the metal" },
          { text: "Because it is the cheapest option available" },
        ],
        explanation: "Sequencing solder joins with decreasing melting points prevents earlier joints from failing during later stages of construction.",
      },
      {
        prompt: "What is the primary purpose of testing a stone's security after setting?",
        options: [
          { text: "To verify the stone's carat weight" },
          { text: "To prevent the outcome clients fear most: a lost stone", correct: true },
          { text: "To determine the stone's country of origin" },
          { text: "To check whether the stone has been treated" },
        ],
        explanation: "Setters test security deliberately before a piece leaves the workshop, since a lost stone is the primary failure a client experiences directly.",
      },
    ],
  },
  {
    chapter: "IV",
    reading: [
      {
        heading: "The one of one brief",
        paragraphs: [
          "High jewellery, often described by the French term haute joaillerie, refers to unique, exceptionally crafted pieces typically made to a specific brief rather than produced in any series. The process begins with a brief, whether from a client's stated wishes or a house's own creative direction, that establishes an occasion, a budget range, and an emotional intent the piece must serve, before any stone is selected.",
          "A director's role at this stage is translation: turning a client's sometimes vague aspiration, an anniversary, a milestone, a personal symbol, into a brief specific enough for a design team to act on, without narrowing the creative possibility prematurely.",
        ],
      },
      {
        heading: "Stone selection as its own discipline",
        paragraphs: [
          "For high jewellery, stone selection often happens before final design finalisation, since the specific character of an exceptional stone, its exact colour, cut, and proportions, can shape the design around it rather than the reverse. Sourcing such stones may involve reviewing parcels from specialist dealers or auction opportunities, and matching stones for a suite of pieces so their colour and character read as a coherent set is itself a specialist skill.",
          "This sequencing, stone before final design, is one of the clearest distinctions between high jewellery and standard collection pieces, where a design is finalised first and then stones of a specified grade are sourced to fit it.",
        ],
      },
      {
        heading: "Workshop and presentation",
        paragraphs: [
          "Once design and stones are settled, workshop execution can take anywhere from weeks to many months depending on complexity, often involving several specialist craftspeople in sequence: a setter, an engraver, a polisher, each handling the stage suited to their particular skill. Presentation of the finished piece, frequently in a private setting rather than a retail floor, is treated as an occasion in itself, consistent with the significance and cost of the commission.",
          "A director overseeing this process needs to manage client expectations honestly across the entire timeline, since exceptional craft cannot be meaningfully rushed without risking the quality the commission was undertaken to achieve in the first place.",
        ],
      },
    ],
    takeaways: [
      "High jewellery pieces are typically unique commissions built to a specific brief rather than produced in series.",
      "Stone selection in high jewellery often precedes final design, letting an exceptional stone's character shape the piece.",
      "Matching stones for a coherent suite is a specialist skill distinct from single-stone selection.",
      "Workshop execution can take weeks to months and should never be rushed at the expense of the commission's quality.",
    ],
    quiz: [
      {
        prompt: "What distinguishes high jewellery from standard collection pieces in terms of process sequencing?",
        options: [
          { text: "High jewellery always uses synthetic stones" },
          { text: "Stone selection often happens before final design, letting the stone shape the piece", correct: true },
          { text: "High jewellery pieces are always produced in large series" },
          { text: "Design is always finalised before any client brief exists" },
        ],
        explanation: "In high jewellery, an exceptional stone's specific character frequently shapes the design around it, reversing the usual design-then-source sequence.",
      },
      {
        prompt: "What is a director's primary role at the initial brief stage of a high jewellery commission?",
        options: [
          { text: "Selecting the final gemstones personally" },
          { text: "Translating a client's aspiration into a brief specific enough for a design team to act on", correct: true },
          { text: "Soldering the initial metal components" },
          { text: "Setting the final retail price immediately" },
        ],
        explanation: "The director's role is to translate a client's sometimes vague wishes into an actionable brief without prematurely narrowing creative possibility.",
      },
      {
        prompt: "Why should exceptional craft timelines not be rushed?",
        options: [
          { text: "Rushing has no effect on quality" },
          { text: "Rushing risks the quality the commission was undertaken to achieve", correct: true },
          { text: "Workshops are legally required to take a minimum time" },
          { text: "Clients always prefer longer timelines regardless of quality" },
        ],
        explanation: "Exceptional craft requires the time each specialist stage demands; compressing it risks undermining the very quality the commission sought.",
      },
    ],
  },
  {
    chapter: "V",
    reading: [
      {
        heading: "Reading a maker's mark",
        paragraphs: [
          "Maker's marks, hallmarks, and signatures stamped discreetly into a piece are a primary tool for establishing who made a piece and often when, since many jurisdictions have historically required metal purity marks alongside maker identification. Reading these marks requires reference knowledge of historical mark conventions, which have changed across jurisdictions and eras, and a caution against assuming a mark's authenticity without corroborating evidence, since marks can be forged or, more commonly, misread by an inexperienced eye.",
          "A director should treat a maker's mark as one input among several, not a conclusive attribution on its own, particularly for pieces without accompanying documentation or a clear provenance chain.",
        ],
      },
      {
        heading: "Signed pieces and the market",
        paragraphs: [
          "Pieces attributable to a recognised historical house or period generally command a premium in the secondary market, reflecting both craftsmanship expectations associated with that attribution and collector demand for pieces with documented history. This premium creates a genuine incentive for misattribution, whether through innocent error or deliberate misrepresentation, and a director's diligence in verifying attribution protects both the client and the Academy's own credibility.",
          "Provenance, in the fullest sense, includes not only who made a piece but its ownership history, and pieces with a well-documented chain of ownership, sometimes traced through exhibition records, estate inventories, or prior sale catalogues, are generally considered more secure attributions than a mark alone.",
        ],
      },
      {
        heading: "The secondary market as its own ecosystem",
        paragraphs: [
          "The estate and secondary jewellery market operates differently from new commissions: pieces are valued on a combination of intrinsic material value, craftsmanship, historical or design significance, and condition, with attribution and provenance often the single largest swing factor in value among visually similar pieces. Understanding this market requires comfort with genuine uncertainty, since not every piece arrives with complete documentation, and a director must learn to communicate confidence levels honestly rather than rounding uncertainty up into false certainty.",
          "This honest handling of uncertainty is itself a professional skill, directly consistent with the Academy's broader disclosure principles applied throughout every Institute.",
        ],
      },
    ],
    takeaways: [
      "Maker's marks and hallmarks help establish who made a piece and when, but should be treated as one input, not a conclusive attribution alone.",
      "Attribution to a recognised historical house generally commands a market premium, which creates a genuine incentive for misattribution.",
      "Provenance in the fullest sense includes ownership history, often traced through exhibition records or prior sale catalogues.",
      "Communicating attribution confidence honestly, rather than rounding uncertainty into false certainty, is a core professional skill in the estate market.",
    ],
    quiz: [
      {
        prompt: "Why should a maker's mark be treated as one input rather than a conclusive attribution?",
        options: [
          { text: "Maker's marks are never used in the jewellery trade" },
          { text: "Marks can be forged or misread, so corroborating evidence strengthens attribution", correct: true },
          { text: "Marks only indicate metal weight, never a maker" },
          { text: "All marks are legally guaranteed authentic" },
        ],
        explanation: "Marks can be forged or misinterpreted, so a responsible attribution combines the mark with other corroborating provenance evidence.",
      },
      {
        prompt: "What does provenance include beyond who made a piece?",
        options: [
          { text: "Only the current retail price" },
          { text: "The piece's ownership history, sometimes traced through exhibition or sale records", correct: true },
          { text: "The chemical composition of the gemstones only" },
          { text: "The name of the current owner exclusively" },
        ],
        explanation: "Full provenance includes the ownership history of a piece, which strengthens or clarifies attribution alongside any maker's mark.",
      },
      {
        prompt: "What professional habit does this chapter emphasise for handling attribution uncertainty?",
        options: [
          { text: "Rounding uncertain attributions up to full certainty for the client" },
          { text: "Communicating confidence levels honestly rather than overstating certainty", correct: true },
          { text: "Avoiding any discussion of provenance with clients" },
          { text: "Assuming every signed piece is guaranteed authentic" },
        ],
        explanation: "Honest communication of attribution confidence, rather than false certainty, is treated as core professional practice consistent with the Academy's disclosure principles.",
      },
    ],
  },
  {
    chapter: "VI",
    reading: [
      {
        heading: "Curating rather than accumulating",
        paragraphs: [
          "Curating a capsule collection for a private client means selecting a coherent set of pieces that work together and reflect a clear point of view, rather than simply assembling attractive individual items. Coherence might be built around a colour palette, a historical period, a particular gemstone family, or a design language, and the curator's judgement is precisely in choosing which organising principle serves this particular client's taste and life rather than applying a generic template.",
          "This requires genuinely understanding a client beyond stated preferences: how they dress, where they will wear a piece, what occasions matter to them, and what emotional associations specific stones or styles might carry for them personally.",
        ],
      },
      {
        heading: "Presentation as part of the work",
        paragraphs: [
          "The vitrine, a display case, is a literal and symbolic focus of this chapter: how pieces are arranged, lit, and sequenced within a presentation materially affects how a client perceives them, independent of the pieces' intrinsic qualities. Sequencing a presentation, deciding what a client sees first, what builds anticipation, and what closes the viewing, is a deliberate skill much closer to curating an exhibition than arranging a display case.",
          "Lighting deserves particular attention: colour temperature and angle can flatter or distort a stone's true colour, and a director bears a disclosure responsibility to ensure a client's viewing conditions reflect how a piece will actually look in ordinary wear, not only under flattering showroom light.",
        ],
      },
      {
        heading: "The collection as a closing argument",
        paragraphs: [
          "A well-curated capsule collection makes its own argument for coherence and quality without requiring an overt sales pitch, allowing a director's narrative to support rather than substitute for the pieces' genuine merit. This chapter closes the Institute by asking learners to design and justify such a collection for a defined but fictional private client, tying together history, craft, high jewellery process, and provenance literacy from every preceding chapter into a single practical exercise.",
          "As with every Institute, completing this exercise and its associated knowledge check reflects disciplined self-study of the Institute's curriculum, not a professional credential or industry certification.",
        ],
      },
    ],
    takeaways: [
      "Curating a capsule collection means selecting a coherent set of pieces around a clear organising principle, not simply attractive individual items.",
      "Understanding a client's real life and preferences shapes which organising principle is appropriate for a given curation.",
      "Presentation, including sequencing and lighting, materially affects how a client perceives a collection's quality.",
      "A well-curated collection should make its own argument for coherence, with the director's narrative supporting rather than replacing genuine merit.",
    ],
    quiz: [
      {
        prompt: "What defines a well-curated capsule collection, according to this chapter?",
        options: [
          { text: "The largest possible number of pieces shown at once" },
          { text: "A coherent set of pieces organised around a clear guiding principle suited to the client", correct: true },
          { text: "Pieces selected purely by their individual retail price" },
          { text: "A random assortment of the newest available stock" },
        ],
        explanation: "Coherence around a deliberate organising principle, chosen to suit the specific client, is what distinguishes curation from simple accumulation.",
      },
      {
        prompt: "Why does lighting in a presentation carry a disclosure responsibility?",
        options: [
          { text: "Lighting has no effect on how a stone's colour appears" },
          { text: "Flattering showroom light can distort a stone's true colour compared to ordinary wear", correct: true },
          { text: "Clients are legally required to view pieces in daylight only" },
          { text: "Lighting only affects photography, not in-person viewing" },
        ],
        explanation: "Colour temperature and angle can flatter or distort perceived stone colour, so a director should ensure viewing conditions reasonably reflect real-world appearance.",
      },
      {
        prompt: "What does completing this capstone exercise represent?",
        options: [
          { text: "A professional curatorial certification" },
          { text: "Disciplined completion of the Institute's self-study curriculum and knowledge check", correct: true },
          { text: "Legal authority to appraise estate jewellery" },
          { text: "Automatic entry into a jewellery house's employment" },
        ],
        explanation: "As with all Institutes, completion reflects disciplined self-study rather than a professional credential or industry certification.",
      },
    ],
  },
];

export default jewelleryCurriculum;

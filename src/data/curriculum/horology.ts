/**
 * Institute of Horology — full lesson content.
 *
 * Written under the same Governance Charter constraints as the other
 * Institutes: no fabricated statistics, no named living individuals, and
 * any named manufacture referenced below (including in Chapter IV) is
 * public industry fact about the mechanical watchmaking landscape, never
 * an implied partnership, sponsorship, or affiliation with the Academy.
 */

import type { ChapterContent } from "./types";

const horologyCurriculum: ChapterContent[] = [
  {
    chapter: "I",
    reading: [
      {
        heading: "The problem a movement solves",
        paragraphs: [
          "A mechanical watch movement exists to divide continuous time into countable, consistent units without any external power source beyond stored mechanical energy. The mainspring, a tightly coiled ribbon of metal housed in a barrel, stores this energy when wound and releases it gradually through a gear train, the series of wheels that step the energy down into usable, regular motion.",
          "Understanding a movement begins with this basic energy story: stored, released, regulated, displayed. Every component in a watch exists to serve one of those four functions, and a director who can trace that path through an actual movement, rather than reciting component names, has genuine fluency rather than memorised vocabulary.",
        ],
      },
      {
        heading: "The escapement and the beat",
        paragraphs: [
          "The escapement is the mechanism that periodically releases the gear train's energy in small, controlled increments, converting continuous mainspring force into the discrete ticking motion a watch displays. It works in concert with the balance wheel, a weighted wheel oscillating back and forth at a regular rate, governed by a hairspring whose elasticity determines the oscillation's frequency.",
          "This escapement and balance wheel pairing is what actually keeps time: the balance wheel's oscillation rate, typically several times per second in a modern movement, is the watch's true clock, and everything else in the movement exists to keep that oscillation going and to translate its beats into hands moving across a dial.",
        ],
      },
      {
        heading: "Why accuracy varies",
        paragraphs: [
          "Mechanical accuracy is affected by temperature changes, which alter the hairspring's elasticity and metal components' dimensions, by gravity's effect on the balance wheel in different watch orientations, and by wear in the gear train over time. Manufactures address these factors through material choices, such as temperature-resistant alloys, and through regulation, the fine adjustment of a movement's rate during assembly and servicing.",
          "A director should be able to explain, in plain language, why even an excellent mechanical watch will not match the precision of a quartz movement, and why that trade-off is precisely the point for a client drawn to mechanical watchmaking rather than a limitation to apologise for.",
        ],
      },
    ],
    takeaways: [
      "A mechanical movement stores, releases, regulates, and displays energy, and every component serves one of those four functions.",
      "The escapement converts continuous mainspring force into the discrete, controlled releases that make a watch tick.",
      "The balance wheel and hairspring together set the movement's actual timekeeping rate.",
      "Mechanical accuracy is inherently affected by temperature, gravity, and wear, a trade-off central to the appeal of mechanical watchmaking rather than a flaw to hide.",
    ],
    quiz: [
      {
        prompt: "What is the primary function of the escapement in a mechanical movement?",
        options: [
          { text: "To store energy from winding" },
          { text: "To release the gear train's energy in small, controlled increments", correct: true },
          { text: "To display the time on the dial" },
          { text: "To power the watch using a battery" },
        ],
        explanation: "The escapement converts the mainspring's continuous stored energy into the discrete, regulated releases that drive the balance wheel and hands.",
      },
      {
        prompt: "What actually governs a mechanical watch's timekeeping rate?",
        options: [
          { text: "The mainspring alone" },
          { text: "The balance wheel's oscillation rate, set by the hairspring", correct: true },
          { text: "The watch case material" },
          { text: "The number of gear teeth in the mainspring barrel" },
        ],
        explanation: "The balance wheel oscillating at a regular rate, governed by the hairspring's elasticity, is the movement's true timekeeping element.",
      },
      {
        prompt: "Why does mechanical accuracy vary compared to quartz movements?",
        options: [
          { text: "Mechanical movements have no moving parts" },
          { text: "Temperature, gravity, and wear all affect the balance wheel and hairspring's behaviour", correct: true },
          { text: "Mechanical movements are always more accurate than quartz" },
          { text: "Accuracy is unaffected by any external factor" },
        ],
        explanation: "Physical factors like temperature, orientation relative to gravity, and mechanical wear inherently affect a mechanical movement's precision.",
      },
    ],
  },
  {
    chapter: "II",
    reading: [
      {
        heading: "Complications as added arguments",
        paragraphs: [
          "A complication is any function beyond basic timekeeping built into a movement, and each one is fundamentally an argument about what time, or related physical phenomena, is worth measuring and displaying. A chronograph adds stopwatch functionality, measuring elapsed time using additional gear trains and levers engaged and disengaged by pushers on the case, independent of the main timekeeping train.",
          "Understanding a complication means understanding the specific mechanical problem it solves and the added complexity that solution requires, since every complication added to a movement increases the number of components and the difficulty of keeping them all functioning reliably together over decades of use.",
        ],
      },
      {
        heading: "Calendars and cosmic mechanics",
        paragraphs: [
          "A perpetual calendar complication tracks the date while correctly accounting for months of varying length and leap years, mechanically encoding the irregularities of the calendar itself so the watch requires no manual date correction across ordinary use for a very long period. This represents a genuinely different kind of achievement from a chronograph: rather than measuring an external event, it encodes a rule system, the modern calendar, directly into gears and levers.",
          "A tourbillon addresses a different problem entirely: gravity's uneven effect on a balance wheel depending on the watch's orientation. By mounting the escapement and balance wheel in a rotating cage that continuously changes orientation, a tourbillon averages out gravity's positional effects over each rotation, a solution to a problem that arguably matters less in an era of quartz-level external accuracy, but remains a celebrated feat of miniaturised mechanical engineering.",
        ],
      },
      {
        heading: "The minute repeater and sound as function",
        paragraphs: [
          "A minute repeater sounds the time on demand using tiny hammers striking gongs coiled within the case, a complication historically developed to tell time in darkness before electric lighting and now valued primarily for its acoustic and mechanical artistry rather than practical necessity. Tuning a repeater's gongs to a pleasing, clear tone is considered one of the most demanding skills in all of watchmaking, requiring both mechanical precision and something closer to a musician's ear.",
          "A director explaining complications to a client should be candid about which ones solve a practical problem today, such as a chronograph, and which persist primarily as celebrated mechanical art forms, such as the tourbillon and minute repeater, since conflating the two overstates practical utility a client may reasonably expect to use.",
        ],
      },
    ],
    takeaways: [
      "A complication is any function beyond basic timekeeping, each solving a specific mechanical or measurement problem.",
      "A perpetual calendar mechanically encodes the calendar's irregularities, including leap years, directly into the movement.",
      "A tourbillon averages out gravity's positional effect on the balance wheel by continuously rotating the escapement.",
      "A director should distinguish complications solving a practical problem today from those valued primarily as mechanical art.",
    ],
    quiz: [
      {
        prompt: "What problem does a tourbillon specifically address?",
        options: [
          { text: "Temperature fluctuations affecting the mainspring" },
          { text: "Gravity's uneven effect on the balance wheel depending on watch orientation", correct: true },
          { text: "The irregular length of calendar months" },
          { text: "Wear in the gear train over time" },
        ],
        explanation: "A tourbillon rotates the escapement and balance wheel continuously to average out gravity's positional effect over each rotation.",
      },
      {
        prompt: "What does a perpetual calendar complication mechanically achieve?",
        options: [
          { text: "It sounds the time acoustically on demand" },
          { text: "It measures elapsed time using pushers on the case" },
          { text: "It encodes the calendar's irregularities, including leap years, so no manual correction is needed for a long period", correct: true },
          { text: "It averages out gravity's effect on timekeeping" },
        ],
        explanation: "A perpetual calendar mechanically tracks varying month lengths and leap years, encoding the calendar's rules directly into the movement.",
      },
      {
        prompt: "Why should a director distinguish practical complications from those valued as mechanical art?",
        options: [
          { text: "Because complications have no meaningful differences" },
          { text: "To avoid overstating the practical utility a client may reasonably expect", correct: true },
          { text: "Because only chronographs are considered legitimate complications" },
          { text: "Because minute repeaters are now the most commonly used complication" },
        ],
        explanation: "Being candid about which complications solve today's practical problems versus which persist as celebrated mechanical artistry prevents overstating a piece's everyday utility.",
      },
    ],
  },
  {
    chapter: "III",
    reading: [
      {
        heading: "Finissage as a visual language",
        paragraphs: [
          "Finissage refers to the decorative hand-finishing applied to movement components, work that is largely invisible in ordinary wear but forms the basis on which watchmakers and collectors judge a movement's true quality. Côtes de Genève, a pattern of parallel, wave-like stripes applied to bridges and plates, is one of the most recognisable finishing techniques, applied both for visual appeal and, historically, to help catch and channel away dust and metal particles.",
          "Recognising finissage techniques and understanding what they signal about a manufacture's standards is a core literacy for a director, since these details are frequently what separates a movement's stated price tier from another visually similar one when a client removes the case back and looks inside.",
        ],
      },
      {
        heading: "Anglage and the discipline of the bevel",
        paragraphs: [
          "Anglage, or bevelling, is the hand-finishing of a component's edges into a precise angled bevel, then polished to a mirror finish, a technique that when done by hand requires exceptional skill and patience since a single slip can require reworking or scrapping the component entirely. Hand anglage is distinguishable from machine-applied bevelling by the crispness of internal angles at corners, something an experienced eye, or a loupe, can detect reliably.",
          "The persistence of hand anglage in high-end watchmaking, despite machine alternatives existing, reflects the industry's broader values: certain finishing techniques are preserved not because they are the only way to achieve a functional result, but because the hand technique itself carries meaning collectors and connoisseurs value directly.",
        ],
      },
      {
        heading: "Black polish and the standard of finish",
        paragraphs: [
          "Black polish, also called mirror or specular polish, is an extremely fine polishing technique applied to small steel components, producing a surface so smooth it appears black when viewed from certain angles, absorbing rather than reflecting light directly back to the eye, and flashing brilliant white when the angle shifts. Achieving true black polish requires painstaking hand work and is considered one of the clearest signals of top-tier finishing standards in the industry.",
          "A director able to identify Côtes de Genève, hand anglage, and black polish, and explain plainly why each represents meaningful craft investment rather than arbitrary decoration, gives a client genuine grounds for understanding what a price difference between two movements actually reflects.",
        ],
      },
    ],
    takeaways: [
      "Finissage is largely invisible decorative hand-finishing that forms the basis for judging a movement's true quality.",
      "Côtes de Genève is a recognisable striped finishing pattern applied to bridges and plates.",
      "Hand anglage, the bevelling and polishing of component edges, is distinguishable from machine finishing by the crispness of internal angles.",
      "Black polish is an extremely fine hand-applied finish that alternates between appearing black and flashing brilliant white depending on viewing angle.",
    ],
    quiz: [
      {
        prompt: "What is Côtes de Genève?",
        options: [
          { text: "A type of complication measuring elapsed time" },
          { text: "A pattern of parallel, wave-like stripes applied as decorative finishing to bridges and plates", correct: true },
          { text: "A brand-specific movement caliber name" },
          { text: "A method for regulating a balance wheel's rate" },
        ],
        explanation: "Côtes de Genève is a recognisable decorative finishing pattern, one of the most common visual signals of movement quality.",
      },
      {
        prompt: "How can hand anglage typically be distinguished from machine-applied bevelling?",
        options: [
          { text: "Hand anglage is always a different colour" },
          { text: "By the crispness of internal angles at corners, visible under a loupe", correct: true },
          { text: "Machine bevelling cannot be applied to steel" },
          { text: "Hand anglage is always applied only to the case, never the movement" },
        ],
        explanation: "The crispness of internal corner angles is a reliable signal distinguishing careful hand bevelling from machine-applied finishing.",
      },
      {
        prompt: "What visually distinguishes true black polish?",
        options: [
          { text: "It is permanently matte and non-reflective from every angle" },
          { text: "It appears black from some angles and flashes brilliant white from others", correct: true },
          { text: "It only appears on gold components" },
          { text: "It is applied exclusively to the watch dial" },
        ],
        explanation: "Black polish's extreme smoothness absorbs light from most angles, appearing black, while flashing white as the viewing angle shifts.",
      },
    ],
  },
  {
    chapter: "IV",
    reading: [
      {
        heading: "Manufactures and their reputations",
        paragraphs: [
          "The watchmaking landscape includes long-established manufactures such as Patek Philippe, Audemars Piguet, and Vacheron Constantin, each with a distinct history, house style, and area of technical or aesthetic emphasis built over generations of continuous production. Understanding these houses as public industry history, their founding periods, signature complications, and notable design lineages, gives a director shared vocabulary with knowledgeable clients, without implying any partnership between these houses and the Academy.",
          "Each house's reputation rests on a combination of factors: consistency of quality over long periods, in-house movement development capability, and a design language recognisable across decades, all of which take far longer to build than a single well-marketed product cycle.",
        ],
      },
      {
        heading: "Independent watchmaking",
        paragraphs: [
          "Alongside the established houses, a smaller ecosystem of independent watchmakers produces movements in far smaller volumes, often emphasising unconventional mechanical solutions, hand-finishing performed by a very small team, or design approaches that differ markedly from major manufacture house styles. Independent watchmaking has grown in collector prominence in recent decades, valued partly for its rarity and partly for the closer relationship between a specific watchmaker's hand and the finished piece.",
          "A director should understand independent watchmaking as a genuinely different value proposition from established houses, not a lesser version of the same thing: collectors drawn to independents are often specifically seeking the qualities that small-scale, less standardised production offers.",
        ],
      },
      {
        heading: "Speaking about houses credibly",
        paragraphs: [
          "Discussing manufactures credibly means being precise about what is verifiable public history, a house's founding period, documented design lineage, publicly known technical achievements, and being clear when a claim moves into subjective taste or unverifiable rumour, which circulates readily in this industry. A director's credibility with sophisticated clients often rests less on enthusiasm and more on this precision.",
          "This chapter's purpose is not to rank houses but to build the factual literacy that lets a director have an informed, honest conversation about the landscape these houses and independents collectively represent.",
        ],
      },
    ],
    takeaways: [
      "Established manufactures build reputations over generations through consistent quality, in-house capability, and recognisable design language.",
      "Independent watchmakers offer a genuinely different value proposition, prized for rarity and closer maker-to-piece relationships, not a lesser alternative.",
      "Discussing manufactures credibly requires distinguishing verifiable public history from subjective taste or unverified rumour.",
      "This chapter builds factual literacy about the landscape rather than ranking specific houses.",
    ],
    quiz: [
      {
        prompt: "What does an established manufacture's reputation typically rest on?",
        options: [
          { text: "A single recent marketing campaign" },
          { text: "Consistency of quality, in-house capability, and recognisable design language built over generations", correct: true },
          { text: "The lowest price point in the market" },
          { text: "Exclusive use of quartz movements" },
        ],
        explanation: "Long-term reputational strength in watchmaking comes from sustained quality, technical capability, and design consistency built over a long period.",
      },
      {
        prompt: "How should independent watchmaking be understood relative to established houses?",
        options: [
          { text: "As a lesser, budget alternative to established houses" },
          { text: "As a genuinely different value proposition prized for rarity and closer maker involvement", correct: true },
          { text: "As identical in every respect to major manufactures" },
          { text: "As a category that no longer exists in the modern market" },
        ],
        explanation: "Independent watchmaking offers distinct qualities, small-scale production and closer maker relationships, that some collectors specifically seek out.",
      },
      {
        prompt: "What does this chapter emphasise about discussing manufactures with clients?",
        options: [
          { text: "Ranking houses definitively from best to worst" },
          { text: "Distinguishing verifiable public history from subjective taste or unverified rumour", correct: true },
          { text: "Avoiding any mention of specific manufactures" },
          { text: "Presenting all industry rumours as established fact" },
        ],
        explanation: "Credibility rests on precision: being clear about what is documented public history versus what is opinion or unverified claim.",
      },
    ],
  },
  {
    chapter: "V",
    reading: [
      {
        heading: "What a service actually does",
        paragraphs: [
          "Servicing a mechanical watch typically involves fully disassembling the movement, cleaning each component, replacing worn parts such as mainsprings or gaskets, re-lubricating with appropriate oils, reassembling, and regulating the movement's rate before final testing across multiple positions and over several days. Lubricants degrade over years of use, and worn or dried lubrication is a common cause of gradual accuracy loss and eventual component wear if left unaddressed.",
          "A director should understand service intervals as a genuine maintenance need tied to a mechanical watch's moving parts, not an optional upsell, while also being honest that actual intervals vary by movement design, usage pattern, and manufacturer guidance, rather than following one universal rule.",
        ],
      },
      {
        heading: "Papers, boxes, and the paper trail",
        paragraphs: [
          "Original papers, warranty cards, and boxes accompanying a watch contribute meaningfully to secondary market value, both as authenticity indicators and as a record of a piece's documented history and original specification. A service history, ideally documented with dated invoices or a manufacturer's service record, similarly strengthens a piece's market position by demonstrating the movement has been properly maintained rather than neglected or serviced by unknown parties using non-original parts.",
          "A director evaluating a pre-owned watch should treat the completeness of this documentation as one clear, verifiable data point among several, alongside physical condition and movement authenticity, rather than the sole determinant of value.",
        ],
      },
      {
        heading: "The secondary market's own logic",
        paragraphs: [
          "The secondary and vintage watch market values originality highly: original dials, hands, and unpolished cases are often prized over pieces that have been refinished or had parts replaced with non-original components, even when the replacement improves cosmetic appearance. This creates a counterintuitive dynamic for clients new to the category, where a watch showing genuine wear can be more valuable than an outwardly cleaner example with replaced parts.",
          "Explaining this logic honestly, including its counterintuitive elements, helps a director build lasting credibility with clients entering the vintage and pre-owned market, where value drivers differ meaningfully from new retail purchases.",
        ],
      },
    ],
    takeaways: [
      "Servicing involves full disassembly, cleaning, part replacement, re-lubrication, reassembly, and regulation, addressing genuine wear over time.",
      "Original papers, boxes, and documented service history contribute meaningfully to a watch's secondary market value.",
      "Completeness of documentation should be treated as one data point among several, not the sole determinant of value.",
      "The vintage market often prizes originality, including genuine wear, over cosmetically cleaner but non-original replacement parts.",
    ],
    quiz: [
      {
        prompt: "What is a common cause of gradual accuracy loss in a mechanical watch over time?",
        options: [
          { text: "The case material weakening" },
          { text: "Worn or degraded lubrication within the movement", correct: true },
          { text: "The dial fading from light exposure" },
          { text: "The mainspring becoming too strong" },
        ],
        explanation: "Lubricants degrade over years of use, and worn or dried lubrication commonly causes gradual accuracy loss and further component wear if unaddressed.",
      },
      {
        prompt: "Why do original papers and boxes contribute to a watch's secondary market value?",
        options: [
          { text: "They have no real effect on value" },
          { text: "They serve as authenticity indicators and a record of documented history and specification", correct: true },
          { text: "They are legally required for resale" },
          { text: "They replace the need for any physical inspection" },
        ],
        explanation: "Original documentation supports authenticity and provides a verifiable record of a piece's history and original specification.",
      },
      {
        prompt: "Why might a watch with genuine wear be valued above a cosmetically cleaner example with replaced parts?",
        options: [
          { text: "Wear always improves a movement's accuracy" },
          { text: "The vintage market often prizes originality over non-original cosmetic replacement", correct: true },
          { text: "Cleaner watches are never accepted in the secondary market" },
          { text: "Replacement parts are always more valuable than original ones" },
        ],
        explanation: "Originality is highly valued in the vintage market, sometimes outweighing the cosmetic appeal of non-original refinishing or replaced parts.",
      },
    ],
  },
  {
    chapter: "VI",
    reading: [
      {
        heading: "The studio format",
        paragraphs: [
          "This capstone chapter is a guided, hands-on examination of significant mechanical pieces drawn from a private cabinet, spanning the technical range covered across the Institute: varied complications, a range of finissage standards, and pieces with differing service and provenance histories. Each piece is examined under supervision using a loupe and, where the case back permits, direct observation of the movement's finishing and construction.",
          "The exercise is structured to build practical recognition skill: identifying complications by sight, assessing finissage quality against the standards described in earlier chapters, and forming a reasoned, appropriately hedged view on authenticity and condition using the documentation literacy from the previous chapter.",
        ],
      },
      {
        heading: "Building a disciplined examination sequence",
        paragraphs: [
          "For each piece, the learner records observations in a consistent sequence: overall case and dial condition first, movement finishing quality second where visible, complications identified and their apparent function third, and any documentation reviewed last. Recording observations in this order before consulting reference information about the piece ensures the learner's own judgement is genuinely tested, not simply confirmed against an already-known answer.",
          "This disciplined sequence mirrors what a director will need in practice: a client rarely presents a watch alongside a complete explanation, and the ability to build an accurate picture methodically, piece by piece, is what distinguishes genuine expertise from surface familiarity.",
        ],
      },
      {
        heading: "From studio to client conversation",
        paragraphs: [
          "The final stage of the exercise asks the learner to explain each piece's complications, finishing quality, and any provenance considerations in plain, accurate language suitable for a client conversation, avoiding both jargon and unwarranted certainty about matters that remain genuinely uncertain.",
          "As with every Institute in this Academy, completing this studio exercise and its associated knowledge check demonstrates disciplined completion of the self-study curriculum, not a professional watchmaking or appraisal certification.",
        ],
      },
    ],
    takeaways: [
      "The studio exercise examines significant mechanical pieces under supervision, spanning complications, finishing standards, and provenance histories.",
      "A consistent, disciplined observation sequence, case and dial, then movement, then complications, then documentation, builds genuine examination skill.",
      "Recording observations before consulting reference information tests the learner's judgement honestly.",
      "Completion reflects disciplined self-study of the curriculum, not professional watchmaking or appraisal certification.",
    ],
    quiz: [
      {
        prompt: "What is the recommended sequence for examining a piece in this studio exercise?",
        options: [
          { text: "Documentation first, then case condition, then movement" },
          { text: "Case and dial condition, then movement finishing, then complications, then documentation", correct: true },
          { text: "Complications only, ignoring case and documentation" },
          { text: "Whichever order the learner personally prefers with no structure" },
        ],
        explanation: "A consistent, disciplined sequence builds methodical examination skill that mirrors how a director must assess an unfamiliar piece in practice.",
      },
      {
        prompt: "Why does the exercise ask learners to record observations before reviewing reference information about a piece?",
        options: [
          { text: "To save time during the session" },
          { text: "To ensure the learner's own judgement is genuinely tested rather than simply confirmed", correct: true },
          { text: "Because reference information is unreliable" },
          { text: "Because complications cannot be identified visually" },
        ],
        explanation: "Recording independent observations first ensures genuine skill-building rather than the learner simply matching a known answer.",
      },
      {
        prompt: "What does completing this chapter's studio exercise represent?",
        options: [
          { text: "A professional watchmaking certification" },
          { text: "Disciplined completion of the Institute's self-study curriculum and knowledge check", correct: true },
          { text: "Legal authority to service mechanical movements" },
          { text: "Formal accreditation as an appraiser" },
        ],
        explanation: "Consistent with the Academy's Governance Charter, completion reflects disciplined self-study rather than a professional credential.",
      },
    ],
  },
];

export default horologyCurriculum;
